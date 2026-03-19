import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './GridStack.module.css'

import { useGrid } from '../../hooks/useGrid'
import DragLayer from '../DragLayer'
import DropIndicator from '../DropIndicator/DropIndicator'
import ResizeHandles from '../ResizeHandles/ResizeHandles'
import { corners } from '../../utils/constants'

/**
 * GridStack with improved FLIP animations (translate + scale) for displaced items.
 * Includes "soft displacement": subtle, distance-aware translation + tiny scale + optional rotateX depth cue.
 */

/* =========================
   Component
   ========================= */
export default function GridStack(props) {
  const {
    items = [],
    cols = 12,
    rowHeight = 30,
    margin = [20, 20],
    containerPadding = [0, 0],
    isDraggable = true,
    isResizable = true,
    preventCollision = true,
    onLayoutChange = () => { },
    componentMap = {},
    dragMode = 'overlay',
    collisionMode = 'push',
    animation = { duration: 260, easing: 'cubic-bezier(.2,.9,.25,1)' },
    dragThrottleMs = 0,
    allowOverlapDuringDrag = false,
    animateOnDrop = true,
    overlayAnchor = 'grab',
    snapEnabled = true,
    snapThreshold = 12,
    showGrid = false,

    // New roll props
    enableRollOnPush = false,
    rollAngleMax = 20,
    rollDuration = 320,
    rollStagger = 30,
    sticky = false,
    radio = 15,
  } = props

  const containerRef = useRef(null)
  const [lastDropId, setLastDropId] = useState(null)

  // store refs to inner wrappers for FLIP animation
  const itemInnerRefs = useRef({}) // id -> DOM element (inner wrapper)

  // PREVIEW states for live preview (overlay.committedLayout)
  const [previewCommittedLayout, setPreviewCommittedLayout] = useState(null)
  const dragSnapshotRef = useRef(null) // original layout snapshot at drag start
  const lastCommittedLayoutRef = useRef(null)
  const [previewMode, setPreviewMode] = useState(null) // null | 'live' | 'reverting'

  // cleanup handlers for running animations
  const animCleanupRef = useRef({}) // id -> cleanup fn / timeout id

  const getPxHelpers = useCallback(() => {
    const containerWidth = Math.max(800, containerRef.current?.clientWidth || 1200)
    const colWidth = Math.max(40, (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols)
    return {
      colWidth,
      rowHeight,
      marginX: margin[0],
      marginY: margin[1],
      containerPadding,
      gridToPx: (gridX, isY = false) =>
        (isY ? Math.round((rowHeight + margin[1]) * gridX + containerPadding[1]) : Math.round((colWidth + margin[0]) * gridX + containerPadding[0])),
      widthPx: (w) => Math.round(colWidth * w + margin[0] * (w - 1)),
      heightPx: (h) => Math.round(rowHeight * h + margin[1] * (h - 1)),
      containerRect: containerRef.current?.getBoundingClientRect?.() || { left: 0, top: 0 },
    }
  }, [cols, margin, rowHeight, containerPadding])

  const grid = useGrid({
    items,
    cols,
    rowHeight,
    margin,
    containerPadding,
    preventCollision,
    dragMode,
    collisionMode: collisionMode,
    dragThrottleMs,
    onLayoutChange,
    allowOverlapDuringDrag,
    animateOnDrop,
    overlayAnchor,
    snapEnabled,
    snapThreshold,
    reflowDuringDrag: true,
    sticky,
    reflowMaxDepth: 20,
  })

  // Save layout snapshot at drag start for revert animation
  const saveDragSnapshot = useCallback(() => {
    try {
      dragSnapshotRef.current = grid.layout.map((l) => ({ ...l }))
    } catch (err) {
      dragSnapshotRef.current = null
    }
  }, [grid.layout])

  const handleHeaderPointerDown = (e, node) => {
    if (!isDraggable || node.static) return
    try {
      e.currentTarget?.setPointerCapture?.(e.pointerId)
    } catch (err) {
      console.error('Failed to set pointer capture:', err)
    }

    saveDragSnapshot()
    const pxHelpers = getPxHelpers()
    pxHelpers.containerRect = containerRef.current?.getBoundingClientRect?.() || { left: 0, top: 0 }
    grid.startDrag(e, node, pxHelpers)
  }

  // FLIP helpers
  const measureRects = (ids) => {
    const rects = {}
    if (!containerRef.current) return rects
    const containerRect = containerRef.current.getBoundingClientRect()
    ids.forEach((id) => {
      const el = itemInnerRefs.current[id]
      if (!el) return
      const r = el.getBoundingClientRect()
      rects[id] = {
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        width: r.width,
        height: r.height,
      }
    })
    return rects
  }

  /**
   * Play FLIP (first-last invert play).
   * Uses the global `animation` param for duration/easing and forces simultaneous start.
   *
   * @param {Object} firstRects
   * @param {Object} lastRects
   * @param {Object} options
   */
  const playFLIP = (firstRects, lastRects, options = {}) => {
    const baseDuration = options.duration ?? animation?.duration ?? 260;
    const displacementEasing = options.displacementEasing ?? animation?.easing ?? 'cubic-bezier(0.22,1,0.36,1)';

    // cleanup previous animations
    Object.keys(animCleanupRef.current || {}).forEach((k) => {
      const c = animCleanupRef.current[k];
      try { if (typeof c === 'function') c(); else clearTimeout(c); } catch (_) { }
      delete animCleanupRef.current[k];
    });

    const animEntries = [];
    Object.keys(lastRects).forEach((id) => {
      const el = itemInnerRefs.current[id];
      if (!el) return;
      const first = firstRects[id];
      const last = lastRects[id];
      if (!first || !last) return;

      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = (first.width && last.width) ? first.width / last.width : 1;
      const sy = (first.height && last.height) ? first.height / last.height : 1;

      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3 && Math.abs(1 - sx) < 0.01 && Math.abs(1 - sy) < 0.01) return;

      // **use global duration for all items** so they move synchronized
      const dynDuration = baseDuration;
      const invertTransform = `translate(${Math.round(dx)}px, ${Math.round(dy)}px) scale(${sx}, ${sy})`;

      // prepare element for FLIP invert transform
      el.style.transition = 'none';
      el.style.transformOrigin = '50% 50%';
      el.style.transform = invertTransform;
      el.style.opacity = '0.99';
      el.style.willChange = 'transform, opacity';

      // prevent child components from running their own transitions during the FLIP
      el.classList.add('gs-animating');

      animEntries.push({ id, el, dynDuration });
    });

    if (animEntries.length === 0) return;

    // start all at the same RAF tick
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animEntries.forEach(({ id, el, dynDuration }) => {
          // no per-item delay -> start together
          el.style.transition = `transform ${dynDuration}ms ${displacementEasing} 0ms, opacity ${Math.max(120, Math.round(dynDuration / 2))}ms ease 0ms`;
          el.style.transform = '';
          el.style.opacity = '1';

          let finished = false;
          const onEnd = (ev) => {
            if (ev && ev.propertyName && ev.propertyName !== 'transform') return;
            if (finished) return;
            finished = true;
            try {
              el.removeEventListener('transitionend', onEnd);
              el.style.transition = '';
              el.style.willChange = '';
              el.style.transform = '';
              el.style.opacity = '';
              el.classList.remove('gs-animating'); // restore inner transitions
            } catch (_) { }
          };
          el.addEventListener('transitionend', onEnd);

          const tid = setTimeout(() => {
            if (!finished) {
              finished = true;
              try { el.removeEventListener('transitionend', onEnd); } catch (_) { }
              try {
                el.style.transition = '';
                el.style.willChange = '';
                el.style.transform = '';
                el.style.opacity = '';
                el.classList.remove('gs-animating');
              } catch (_) { }
            }
          }, dynDuration + 120);

          animCleanupRef.current[`flip-${id}`] = () => {
            try { el.removeEventListener('transitionend', onEnd); } catch (_) { }
            clearTimeout(tid);
            try { el.classList.remove('gs-animating'); } catch (_) { }
          };
        });
      });
    });
  };

  /* =========================
     SOFT DISPLACEMENT FUNCTIONS (NEW)
     ========================= */

  /**
  * Compute soft displacement (synchronous durations).
  * All items will use animation.duration so they animate in same rhythm.
  *
  * @param {Object} firstRects
  * @param {Object} lastRects
  * @param {string|null} movingId
  * @returns {Object}
  */
  const computeSoftDisplacement = (firstRects = {}, lastRects = {}, movingId = null) => {
    const out = {};
    const ids = Object.keys(lastRects);
    if (!ids.length) return out;

    const sampledHeights = ids.map(id => (firstRects[id] || lastRects[id] || {}).height).filter(Boolean);
    const approxRow = sampledHeights.length ? (sampledHeights.reduce((a, b) => a + b, 0) / sampledHeights.length) : 40;

    const movingRect = movingId ? (firstRects[movingId] || lastRects[movingId] || null) : null;
    const distFromMoving = (r) => {
      if (!movingRect || !r) return 0;
      const dx = (r.left + (r.width || 0) / 2) - (movingRect.left + (movingRect.width || 0) / 2);
      const dy = (r.top + (r.height || 0) / 2) - (movingRect.top + (movingRect.height || 0) / 2);
      return Math.hypot(dx, dy);
    };

    for (const id of ids) {
      const f = firstRects[id];
      const l = lastRects[id];
      if (!f || !l) continue;
      const dyPx = l.top - f.top;
      const dxPx = l.left - f.left;
      if (Math.abs(dyPx) < 1.5 && Math.abs(dxPx) < 1.5) continue;

      const rowsMoved = dyPx / Math.max(1, approxRow);
      const intensity = Math.max(0, Math.min(1, Math.abs(rowsMoved) / 3));
      const softenFactor = 0.94 + 0.06 * (1 - intensity);
      const dy = Math.round(dyPx * softenFactor);
      const dx = Math.round(dxPx * 0.94);
      const scale = dyPx > 0 ? (1 - 0.01 * intensity) : 1;

      // use single global duration for harmony
      const duration = animation?.duration ?? 260;

      const angle = dyPx > 0 ? Math.min(8, Math.round(rowsMoved * 2.2)) : 0;

      out[id] = { dx, dy, delay: 0, duration, scale, angle, distance: distFromMoving(f) };
    }

    return out;
  };

  /**
   * Apply soft displacement synchronized to global animation param.
   *
   * @param {Object} map - id -> {dx, dy, delay, duration, scale, angle}
   */
  const applySoftDisplacement = (map = {}) => {
    // cleanup previous handlers
    Object.keys(animCleanupRef.current || {}).forEach(k => {
      if (!k.startsWith('soft-') && !k.startsWith('hit-')) return;
      try {
        const c = animCleanupRef.current[k];
        if (typeof c === 'function') c();
        else clearTimeout(c);
      } catch (_) { }
      delete animCleanupRef.current[k];
    });

    const baseEase = animation?.easing ?? 'cubic-bezier(0.22,0.9,0.28,1)';
    const globalDuration = animation?.duration ?? 260;

    const entries = Object.entries(map).map(([id, spec]) => {
      const el = itemInnerRefs.current[id];
      if (!el) return null;
      const dx = spec.dx || 0;
      const dy = spec.dy || 0;
      const scale = spec.scale || 1;
      const angle = spec.angle || 0;
      const target = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})${rotate}`;
      const startDx = Math.round(dx * 0.25);
      const startDy = Math.round(dy * 0.25);
      const start = `translate3d(${startDx}px, ${startDy}px, 0) scale(${Math.max(0.995, scale - 0.002)})${rotate}`;
      return { id, el, start, target, duration: globalDuration };
    }).filter(Boolean);

    if (entries.length === 0) return;

    // set initial state for all
    entries.forEach(({ el, start }) => {
      el.classList.add('gs-animating');
      el.style.transition = 'none';
      el.style.willChange = 'transform, opacity';
      el.style.transformOrigin = '50% 20%';
      el.style.transform = start;
      el.style.opacity = '0.99';
    });

    // apply transitions to all in same RAF
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        entries.forEach(({ el, target, duration }) => {
          el.style.transition = `transform ${duration}ms ${baseEase} 0ms, opacity ${Math.max(90, Math.round(duration / 2))}ms ease 0ms`;
          el.style.transform = target;
          el.style.opacity = '1';

          let finished = false;
          const onEnd = (ev) => {
            if (ev && ev.propertyName && ev.propertyName !== 'transform') return;
            if (finished) return;
            finished = true;
            try {
              el.removeEventListener('transitionend', onEnd);
              el.style.transition = '';
              el.style.transform = '';
              el.style.willChange = '';
              el.style.opacity = '';
              el.classList.remove('gs-animating');
            } catch (_) { }
          };
          el.addEventListener('transitionend', onEnd);

          const tid = setTimeout(() => {
            if (!finished) {
              finished = true;
              try { el.removeEventListener('transitionend', onEnd); } catch (_) { }
              try {
                el.style.transition = '';
                el.style.transform = '';
                el.style.willChange = '';
                el.style.opacity = '';
                el.classList.remove('gs-animating');
              } catch (_) { }
            }
          }, duration + 120);

          animCleanupRef.current[`soft-${el.dataset?.gridId || Math.random()}`] = () => {
            try { el.removeEventListener('transitionend', onEnd); } catch (_) { }
            clearTimeout(tid);
            try { el.classList.remove('gs-animating'); } catch (_) { }
          };
        });
      });
    });
  };



  /* =========================
     computeRollMap (unchanged)
     ========================= */
  const computeRollMap = (fromLayout, toLayout, movingId) => {
    if (!enableRollOnPush || !fromLayout || !toLayout) return {};
    const byIdFrom = new Map(fromLayout.map((l) => [l.i, l]));
    const byIdTo = new Map(toLayout.map((l) => [l.i, l]));
    const roll = {};

    const movingFrom = byIdFrom.get(movingId) || null;
    const movingTo = byIdTo.get(movingId) || null;

    for (const [id, to] of byIdTo.entries()) {
      if (id === movingId) continue;
      const fr = byIdFrom.get(id);
      if (!fr) continue;

      const deltaRows = (to.y || 0) - (fr.y || 0);
      if (deltaRows <= 0) continue; // only roll on downward displacement

      const refMoving = movingFrom || movingTo || { x: 0, y: 0 };
      const relX = (fr.x || 0) - (refMoving.x || 0);
      const relY = (fr.y || 0) - (refMoving.y || 0);

      const primaryAxis = Math.abs(relY) >= Math.abs(relX) ? 'y' : 'x';
      const magnitude = Math.max(-rollAngleMax, Math.min(rollAngleMax, deltaRows * (rollAngleMax / 2)));

      let angle = magnitude;
      if (primaryAxis === 'y') {
        angle = relY > 0 ? Math.abs(magnitude) : -Math.abs(magnitude);
      } else {
        angle = relX > 0 ? Math.abs(magnitude) : -Math.abs(magnitude);
      }

      const moving = byIdFrom.get(movingId) || { x: 0, y: 0 };
      const distance = Math.hypot((fr.x - moving.x), (fr.y - moving.y));
      const delay = Math.round(Math.min(rollStagger * distance, 350));

      roll[id] = { deltaRows, angle, delay, axis: primaryAxis };
    }

    return roll;
  };

  /* =========================
     Effects: useLayoutEffect for precise before-paint FLIP
     ========================= */
  useLayoutEffect(() => {
    const newCommitted = grid.overlay?.committedLayout ?? null
    if (!newCommitted) return

    const ids = grid.layout.map((l) => l.i)
    const firstRects = measureRects(ids)

    setPreviewCommittedLayout(newCommitted)
    setPreviewMode('live')
    lastCommittedLayoutRef.current = newCommitted

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lastRects = measureRects(ids)
        const draggedId = grid.overlay?.i
        if (draggedId) {
          delete firstRects[draggedId]
          delete lastRects[draggedId]
        }

        // compute softened displacement (assumes computeSoftDisplacement exists)
        const displaceMap = computeSoftDisplacement(firstRects, lastRects, draggedId)
        applySoftDisplacement(displaceMap)

        const delayMap = {}
        Object.entries(displaceMap).forEach(([id, m]) => { delayMap[id] = m.delay || 0 })

        playFLIP(firstRects, lastRects, {
          duration: animation.duration,
          easing: animation.easing,
          displacementEasing: 'cubic-bezier(0.22,1,0.36,1)',
          delayMap,
        })

        // roll map (unchanged)
        const rollMap = computeRollMap(grid.layout, newCommitted, draggedId)
        if (enableRollOnPush && rollMap) {
          Object.entries(rollMap).forEach(([id, { angle, delay, axis }]) => {
            const el = itemInnerRefs.current[id]
            if (!el) return
            const rotateStr = axis === 'y' ? `rotateX(${angle}deg)` : `rotateY(${angle}deg)`
            el.style.transition = `transform ${rollDuration}ms cubic-bezier(.2,.9,.25,1) ${delay}ms`
            requestAnimationFrame(() => {
              try { el.style.transform = el.style.transform ? `${el.style.transform} ${rotateStr}` : rotateStr; el.style.transformOrigin = '50% 50%' } catch (_) { }
            })
            const tid = setTimeout(() => { try { el.style.transition = ''; el.style.transform = '' } catch (_) { } }, rollDuration + 40)
            animCleanupRef.current[`roll-${id}`] = () => clearTimeout(tid)
          })
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid.overlay?.committedLayout])

  /* =========================
     Effect: fallback effect (keeps backward compatibility)
     ========================= */
  useEffect(() => {
    const newCommitted = grid.overlay?.committedLayout ?? null
    if (!newCommitted) return

    const ids = grid.layout.map((l) => l.i)

    const firstRects = measureRects(ids)

    setPreviewCommittedLayout(newCommitted)
    setPreviewMode('live')
    lastCommittedLayoutRef.current = newCommitted

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lastRects = measureRects(ids)
        const draggedId = grid.overlay?.i

        if (draggedId) {
          delete firstRects[draggedId]
          delete lastRects[draggedId]
        }

        const displaceMap = computeSoftDisplacement(firstRects, lastRects, draggedId)
        // apply soft displacement visually
        applySoftDisplacement(displaceMap)

        const delayMap = {}
        Object.entries(displaceMap).forEach(([id, m]) => {
          delayMap[id] = m.delay || 0
        })

        // 🔥 SOLO FLIP
        playFLIP(firstRects, lastRects, {
          duration: animation.duration,
          easing: animation.easing,
          displacementEasing: 'cubic-bezier(0.22,1,0.36,1)',
          delayMap,
        })

        // roll effect cleanly
        if (enableRollOnPush) {
          const rollMap = computeRollMap(grid.layout, newCommitted, draggedId)

          Object.entries(rollMap).forEach(([id, { angle, delay }]) => {
            const el = itemInnerRefs.current[id]
            if (!el) return

            el.style.transition =
              `transform ${rollDuration}ms cubic-bezier(.2,.9,.25,1) ${delay}ms`

            el.style.transform = `rotateX(${angle}deg)`

            const tid = setTimeout(() => {
              el.style.transition = ''
              el.style.transform = ''
            }, rollDuration + 40)

            animCleanupRef.current[`roll-${id}`] = () => clearTimeout(tid)
          })
        }
      })
    })
  }, [grid.overlay?.committedLayout])

  /**
   * Cancel handler: animate items back to original snapshot (FLIP revert)
   */
  const handlePointerCancel = useCallback((e) => {
    grid.cancelInteraction?.(e)

    const preview = lastCommittedLayoutRef.current
    const original = dragSnapshotRef.current
    if (!preview || !original) {
      setPreviewCommittedLayout(null)
      setPreviewMode(null)
      return
    }

    const ids = Array.from(new Set([...preview.map(p => p.i), ...original.map(o => o.i)]))

    // ensure preview positions are rendered
    setPreviewCommittedLayout(preview)
    setPreviewMode('reverting')

    requestAnimationFrame(() => {
      const firstRects = measureRects(ids)

      // put DOM at original positions (jump) so lastRects reflect original target
      setPreviewCommittedLayout(original)

      requestAnimationFrame(() => {
        const lastRects = measureRects(ids)
        const draggedId = grid.overlay?.i
        if (draggedId) {
          delete firstRects[draggedId]
          delete lastRects[draggedId]
        }

        playFLIP(firstRects, lastRects, { duration: animation.duration, easing: animation.easing })

        // clear preview after animation
        setTimeout(() => {
          setPreviewCommittedLayout(null)
          setPreviewMode(null)
          dragSnapshotRef.current = null
          lastCommittedLayoutRef.current = null
        }, (animation?.duration ?? 260) + 40)
      })
    })
  }, [grid, animation.duration, animation.easing])

  const handlePointerMove = (e) => {
    grid.onPointerMove(e)
  }

  const handlePointerUp = (e) => {
    try {
      e.currentTarget?.releasePointerCapture?.(e.pointerId)
    } catch (err) {
      console.error('Failed to release pointer capture:', err)
    }

    grid.endInteraction(e)

    const droppedId = grid.overlay?.i ?? null
    if (droppedId) {
      setLastDropId(droppedId)
      setTimeout(() => setLastDropId(null), (animation?.duration ?? 260) + 40)
    }

    setPreviewCommittedLayout(null)
    setPreviewMode(null)
    dragSnapshotRef.current = null
    lastCommittedLayoutRef.current = null

    if (animCleanupRef.current) {
      Object.values(animCleanupRef.current).forEach((c) => {
        if (typeof c === 'function') try { c() } catch (e) { }
        if (typeof c === 'number') clearTimeout(c)
      })
      animCleanupRef.current = {}
    }
  }

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'Escape') {
        handlePointerCancel({ pointerId: null, currentTarget: containerRef.current })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePointerCancel])

  const handleResizePointerDown = (e, node, corner) => {
    if (!isResizable || node.static) return
    try {
      e.currentTarget?.setPointerCapture?.(e.pointerId)
    } catch (err) {
      console.error('Failed to set pointer capture:', err)
    }
    saveDragSnapshot()
    const pxHelpers = getPxHelpers()
    pxHelpers.containerRect = containerRef.current?.getBoundingClientRect?.() || { left: 0, top: 0 }
    grid.startResize(e, node, corner, pxHelpers)
  }

  /**
   * posToStyle aligned with global animation param so static transitions are in-sync.
   *
   * @param {Object} node
   * @returns {Object}
   */
  const posToStyle = (node) => {
    const pxHelpers = getPxHelpers();
    const left = Math.round(pxHelpers.gridToPx(node.x));
    const top = Math.round(pxHelpers.gridToPx(node.y, true));
    const width = `${pxHelpers.widthPx(node.w)}px`;
    const height = `${pxHelpers.heightPx(node.h)}px`;

    const isPreviewActive = Boolean(previewCommittedLayout && (previewMode === 'live' || previewMode === 'reverting'));
    const transformDuration = isPreviewActive ? (animation?.duration ?? 260) : (animation?.duration ?? 200);
    const transformEasing = animation?.easing ?? 'cubic-bezier(0.22, 1, 0.36, 1)';
    const isDragged = grid.overlay?.i === node.i;

    const transition = isDragged
      ? 'none'
      : `transform ${transformDuration}ms ${transformEasing}, width ${transformDuration}ms ${transformEasing}, height ${transformDuration}ms ${transformEasing}`;

    return {
      transform: `translate3d(${left}px, ${top}px, 0)`,
      width,
      height,
      transition,
      willChange: 'transform, width, height',
    };
  };

  // helper to compute a preview style for a node from previewCommittedLayout or original snapshot
  const previewStyleFor = (node, pxHelpers, sourceLayout) => {
    const srcLayout = sourceLayout || previewCommittedLayout
    const found = (srcLayout || []).find(l => l.i === node.i)
    if (!found) return posToStyle(node)
    const left = Math.round(pxHelpers.gridToPx(found.x))
    const top = Math.round(pxHelpers.gridToPx(found.y, true))
    const width = `${pxHelpers.widthPx(found.w)}px`
    const height = `${pxHelpers.heightPx(found.h)}px`
    return { transform: `translate3d(${left}px, ${top}px, 0)`, width, height }
  }

  const highestRow = Math.max(...grid.layout.map((l) => l.y + l.h), 1)
  const gridHeight = Math.max(200, (rowHeight + margin[1]) * highestRow + 40)
  const gridClassName = `${styles.grid} ${grid.overlay ? styles.gridDragging : ''}`
  const containerClassName = `${styles.container} ${showGrid ? styles.showGrid : ''}`

  const draggedNodeId = grid.overlay?.i
  const draggedItemData = items.find(it => it.id === draggedNodeId) || null

  // compute rollMap for rendering (used to augment style.transform with rotateX)
  const currentRollMap = enableRollOnPush && previewCommittedLayout
    ? computeRollMap(grid.layout, previewCommittedLayout, draggedNodeId)
    : {}

  // --- Grid visual alignment: expose CSS variables from JS so the grid lines match layout math ---
  useEffect(() => {
    if (!containerRef.current) return;

    const applyCssVars = () => {
      const px = getPxHelpers(); // uses cols, margin, rowHeight, containerPadding
      // cell size used for background grid: include gap
      const cellW = Math.round(px.colWidth + px.marginX);
      const cellH = Math.round(px.rowHeight + px.marginY);

      const padX = (px.containerPadding && px.containerPadding[0]) || 0;
      const padY = (px.containerPadding && px.containerPadding[1]) || 0;

      const el = containerRef.current;
      el.style.setProperty('--gs-cell-w', `${cellW}px`);
      el.style.setProperty('--gs-cell-h', `${cellH}px`);
      el.style.setProperty('--gs-offset-x', `${padX}px`);
      el.style.setProperty('--gs-offset-y', `${padY}px`);
      // color/opacity tuned to your existing palette
      el.style.setProperty('--gs-grid-color', 'rgba(15,23,42,0.04)');
      el.style.setProperty('--gs-grid-line', '1px'); // grid line thickness
    };

    // initial
    applyCssVars();

    // respond to container size changes
    const ro = new ResizeObserver(() => applyCssVars());
    ro.observe(containerRef.current);

    // also on window resize (covers when cols change with breakpoints)
    window.addEventListener('resize', applyCssVars);

    return () => {
      try { ro.disconnect(); } catch (_) { }
      window.removeEventListener('resize', applyCssVars);
    };
  }, [cols, margin, rowHeight, containerPadding, getPxHelpers]);


  return (
    <div
      className={containerClassName}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      onContextMenu={()=> {
        return false
      }}
    >
      <div className={gridClassName} style={{ height: gridHeight, transition: 'height 0.3s ease-out' }}>
        {grid.layout.map((node) => {
          const pxHelpers = getPxHelpers()
          const Comp = componentMap[node.i] || null
          const itemData = items.find((it) => it.id === node.i) || {}
          const isBeingDragged = grid.overlay?.i === node.i

          // compute base style (layout-driven)
          let style = posToStyle(node)
          let classNames = [
            styles.gridItem,
            node.static ? styles.static : '',
            isBeingDragged ? styles.draggingItem : '',
            lastDropId === node.i ? styles.dropSuccess : '',
          ]

          // If previewCommittedLayout exists, we want other items to render at preview positions
          if (previewCommittedLayout && previewMode === 'live') {
            const previewEntry = previewCommittedLayout.find(l => l.i === node.i)
            if (previewEntry && node.i !== draggedNodeId) {
              style = previewStyleFor(node, pxHelpers, previewCommittedLayout)
              classNames.push(styles.previewMoving)
            }
          }

          // If reverting, previewCommittedLayout contains original snapshot later
          if (previewMode === 'reverting' && previewCommittedLayout) {
            classNames.push(styles.previewReverting)
          }

          // apply roll transform (if any)
          if (currentRollMap && currentRollMap[node.i] && node.i !== draggedNodeId) {
            const { angle, delay } = currentRollMap[node.i]
            // append rotateX to the existing transform
            style.transform = `${style.transform} rotateX(${angle}deg)`
            style.transition = `${style.transition}, transform ${rollDuration}ms cubic-bezier(.2,.9,.25,1) ${delay}ms`
            style.willChange = 'transform'
          }

          return (
            <div
              key={node.i}
              className={classNames.filter(Boolean).join(' ')}
              style={{
                ...style,
                borderRadius: radio,
              }}
              data-grid-id={node.i}
            >
              <div
                className={styles.gridItemInner}
                ref={(el) => {
                  if (el) itemInnerRefs.current[node.i] = el
                  else delete itemInnerRefs.current[node.i]
                }}
                onContextMenu={() => {
                  return false
                }}
                onPointerDown={(e) => {
                  if (!isDraggable || node.static) return

                  const isResizeHandle = e.target.closest('[data-resize-handle]')
                  if (isResizeHandle) return

                  handleHeaderPointerDown(e, node)
                }}
              >
                <div className={styles.content}
                  onContextMenu={() => {
                    return false
                  }}
                >
                  {Comp ? <Comp {...(itemData.component || {})} /> : null}
                </div>

                {isResizable && !node.static && (
                  <ResizeHandles corners={corners} onPointerDown={(e, corner) => handleResizePointerDown(e, node, corner)} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {grid.overlay?.targetGrid && (
        <DropIndicator target={grid.overlay.targetGrid} pxHelpers={getPxHelpers()} animation={animation} />
      )}

      <DragLayer overlay={grid.overlay} animation={animation}>
        {draggedNodeId && (() => {
          const Comp = draggedItemData ? componentMap[draggedNodeId] : null
          const data = draggedItemData?.component || {}
          if (!Comp) return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {draggedItemData?.title || draggedNodeId}
          </div>
          return <div style={{ width: '100%', height: '100%' }}>
            <Comp {...data} />
          </div>
        })()}
      </DragLayer>
    </div>
  )
}

GridStack.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    component: PropTypes.object,
  })),
  cols: PropTypes.number,
  rowHeight: PropTypes.number,
  margin: PropTypes.arrayOf(PropTypes.number),
  containerPadding: PropTypes.arrayOf(PropTypes.number),
  isDraggable: PropTypes.bool,
  isResizable: PropTypes.bool,
  preventCollision: PropTypes.bool,
  onLayoutChange: PropTypes.func,
  componentMap: PropTypes.object,
  dragMode: PropTypes.oneOf(['overlay', 'static']),
  collisionMode: PropTypes.oneOf(['push', 'compact', 'disable']),
  animation: PropTypes.shape({
    duration: PropTypes.number,
    easing: PropTypes.string,
  }),
  dragThrottleMs: PropTypes.number,
  allowOverlapDuringDrag: PropTypes.bool,
  animateOnDrop: PropTypes.bool,
  overlayAnchor: PropTypes.oneOf(['grab', 'center']),
  snapEnabled: PropTypes.bool,
  snapThreshold: PropTypes.number,
  showGrid: PropTypes.bool,
  // roll props
  enableRollOnPush: PropTypes.bool,
  rollAngleMax: PropTypes.number,
  rollDuration: PropTypes.number,
  rollStagger: PropTypes.number,
}
GridStack.defaultProps = {
  items: [],
  cols: 12,
  rowHeight: 30,
  margin: [20, 20],
  containerPadding: [10, 10],
  isDraggable: true,
  isResizable: true,
  preventCollision: true,
  onLayoutChange: () => { },
  componentMap: {},
  dragMode: 'overlay',
  collisionMode: 'push',
  animation: { duration: 260, easing: 'cubic-bezier(.2,.9,.25,1)' },
  dragThrottleMs: 0,
  allowOverlapDuringDrag: false,
  animateOnDrop: true,
  overlayAnchor: 'grab',
  snapEnabled: true,
  snapThreshold: 12,
  showGrid: false,

  enableRollOnPush: false,
  rollAngleMax: 20,
  rollDuration: 320,
  rollStagger: 30,
}
