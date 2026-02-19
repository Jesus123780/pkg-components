import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './GridStack.module.css'

import { useGrid } from '../../hooks/useGrid'
import DragLayer from '../DragLayer'
import DropIndicator from '../DropIndicator/DropIndicator'
import ResizeHandles from '../ResizeHandles/ResizeHandles'
import { corners } from '../../utils/constants'
import { Text } from '../../../../atoms'

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
    enableHitOnPush = true,    // enable the hit / pulse overshoot
    hitMultiplier = 1.12,     // how far overshoot is (1.0 = no overshoot)
    hitDuration = 140,        // extra ms for the initial "hit" smoothing
    hitThresholdPx = 6,
    sticky = false,
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

  const playFLIP = (firstRects, lastRects, options = {}) => {
    const baseDuration = (options.duration ?? animation.duration) || 260
    const easing = options.easing ?? animation.easing ?? 'cubic-bezier(0.22, 1, 0.36, 1)'
    const delayMap = options.delayMap || {}
    const displacementEasing = options.displacementEasing ?? easing

    Object.keys(animCleanupRef.current || {}).forEach((k) => {
      const c = animCleanupRef.current[k]
      try { if (typeof c === 'function') c(); else clearTimeout(c) } catch (_) { }
      delete animCleanupRef.current[k]
    })

    const animEntries = []
    Object.keys(lastRects).forEach((id) => {
      const el = itemInnerRefs.current[id]
      if (!el) return
      const first = firstRects[id]
      const last = lastRects[id]
      if (!first || !last) return

      const dx = first.left - last.left
      const dy = first.top - last.top
      const sx = (first.width && last.width) ? first.width / last.width : 1
      const sy = (first.height && last.height) ? first.height / last.height : 1

      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3 && Math.abs(1 - sx) < 0.01 && Math.abs(1 - sy) < 0.01) return

      const distance = Math.hypot(dx, dy)
      const scaleDelta = Math.max(Math.abs(1 - sx), Math.abs(1 - sy))
      const dynDuration = Math.min(520, Math.max(120, Math.round(baseDuration + distance * 0.35 + scaleDelta * 220)))
      const delay = Math.max(0, delayMap[id] || 0)
      const invertTransform = `translate(${Math.round(dx)}px, ${Math.round(dy)}px) scale(${sx}, ${sy})`

      el.style.transition = 'none'
      el.style.transformOrigin = '50% 50%'
      el.style.transform = invertTransform
      el.style.opacity = '0.99'
      el.style.willChange = 'transform, opacity'

      animEntries.push({ id, el, dynDuration, delay })
    })

    if (animEntries.length === 0) return

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animEntries.forEach(({ id, el, dynDuration, delay }) => {
          el.style.transition = `transform ${dynDuration}ms ${displacementEasing} ${delay}ms, opacity ${Math.max(140, Math.round(dynDuration / 2))}ms ease ${delay}ms`
          el.style.transform = ''
          el.style.opacity = '1'

          let finished = false
          const onEnd = (ev) => {
            if (ev && ev.propertyName && ev.propertyName !== 'transform') return
            if (finished) return
            finished = true
            try {
              el.removeEventListener('transitionend', onEnd)
              el.style.transition = ''
              el.style.willChange = ''
              el.style.transform = ''
              el.style.opacity = ''
            } catch (_) { }
          }
          el.addEventListener('transitionend', onEnd)

          const tid = setTimeout(() => {
            if (!finished) {
              finished = true
              try { el.removeEventListener('transitionend', onEnd) } catch (_) { }
              try { el.style.transition = ''; el.style.willChange = ''; el.style.transform = ''; el.style.opacity = '' } catch (_) { }
            }
          }, dynDuration + delay + 120)

          animCleanupRef.current[`flip-${id}`] = () => {
            try { el.removeEventListener('transitionend', onEnd) } catch (_) { }
            clearTimeout(tid)
            el.style.transition = ''
            el.style.willChange = ''
          }
        })
      })
    })
  }

  /* =========================
     SOFT DISPLACEMENT FUNCTIONS (NEW)
     ========================= */

  const computeSoftDisplacement = (firstRects = {}, lastRects = {}, movingId = null) => {
    const out = {};
    const ids = Object.keys(lastRects);
    if (!ids.length) return out;

    const positions = ids.map(id => {
      const f = firstRects[id];
      const l = lastRects[id];
      return { id, f, l, dyPx: f && l ? l.top - f.top : 0, dxPx: f && l ? l.left - f.left : 0 };
    });

    // approximate row height
    const sampled = positions.map(p => (p.f ? p.f.height : 0)).filter(Boolean);
    const approxRow = sampled.length ? (sampled.reduce((a, b) => a + b, 0) / sampled.length) : 40;

    const movingRect = movingId ? (firstRects[movingId] || lastRects[movingId] || null) : null;
    const distFromMoving = (r) => {
      if (!movingRect || !r) return 0;
      const dx = (r.left + (r.width || 0) / 2) - (movingRect.left + (movingRect.width || 0) / 2);
      const dy = (r.top + (r.height || 0) / 2) - (movingRect.top + (movingRect.height || 0) / 2);
      return Math.hypot(dx, dy);
    };

    for (const p of positions) {
      const { id, f, l, dyPx, dxPx } = p;
      if (!f || !l) continue;
      // ignore micro jitter
      if (Math.abs(dyPx) < 1.5 && Math.abs(dxPx) < 1.5) continue;

      // rows moved normalized
      const rowsMoved = dyPx / Math.max(1, approxRow);
      const intensity = Math.max(0, Math.min(1, Math.abs(rowsMoved) / 3)); // 0..1

      // softer undershoot: closer to full target (less aggressive)
      const softenFactor = 0.94 + 0.06 * (1 - intensity); // 0.94..1.0
      const dy = Math.round(dyPx * softenFactor);
      const dx = Math.round(dxPx * 0.94);

      // subtle scale breathing
      const scale = dyPx > 0 ? (1 - 0.01 * intensity) : 1;

      // duration scaled but kept moderate (smoother)
      const duration = Math.round(Math.min(600, Math.max(160, 160 + Math.abs(dyPx) * 0.16 + Math.abs(dxPx) * 0.03)));

      // delay as small wave (shorter than before so motion feels coherent)
      const distance = distFromMoving(f);
      const delay = Math.round(Math.min(220, Math.max(0, distance * 0.045)));

      // very small angle for depth cue, scaled down
      const angle = dyPx > 0 ? Math.min(8, Math.round(rowsMoved * 2.2)) : 0;

      out[id] = { dx, dy, delay, duration, scale, angle, distance };
    }

    // group by approx column for stable vertical distribution (tiny adjustments)
    const byCol = {};
    for (const id of Object.keys(out)) {
      const r = firstRects[id] || lastRects[id];
      if (!r) continue;
      const key = Math.round(r.left / Math.max(1, r.width || approxRow));
      byCol[key] = byCol[key] || [];
      byCol[key].push({ id, top: r.top });
    }
    for (const k of Object.keys(byCol)) {
      const g = byCol[k].sort((a, b) => a.top - b.top);
      for (let i = 0; i < g.length; i++) {
        const id = g[i].id;
        if (!out[id]) continue;
        const boost = 1 + (i / Math.max(1, g.length)) * 0.03; // tiny boost
        out[id].dy = Math.round(out[id].dy * boost);
        out[id].duration = Math.round(out[id].duration * (1 + i * 0.01));
        out[id].delay = Math.round(out[id].delay + i * 8);
      }
    }

    return out;
  };


  const applySoftDisplacement = (map = {}) => {
    // cleanup previous soft/hit handlers
    Object.keys(animCleanupRef.current || {}).forEach(k => {
      if (!k.startsWith('soft-') && !k.startsWith('hit-')) return;
      try {
        const c = animCleanupRef.current[k];
        if (typeof c === 'function') c();
        else clearTimeout(c);
      } catch (_) { }
      delete animCleanupRef.current[k];
    });

    const baseEase = 'cubic-bezier(0.22, 0.9, 0.28, 1)'; // smooth natural
    const hitEase = 'cubic-bezier(0.2, 1.05, 0.3, 1)'; // gentle overshoot

    Object.entries(map).forEach(([id, { dx, dy, delay = 0, duration = 220, scale = 1, angle = 0 }]) => {
      const el = itemInnerRefs.current[id];
      if (!el) return;

      // ensure GPU layer
      el.style.willChange = 'transform, opacity';
      el.style.transformOrigin = '50% 20%';
      el.style.transition = 'none';

      const rotate = angle ? ` rotateX(${angle}deg)` : '';
      const target = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})${rotate}`;

      // micro initial offset (25% of target) to avoid jump and create smooth start
      const startDx = Math.round(dx * 0.25);
      const startDy = Math.round(dy * 0.25);
      const start = `translate3d(${startDx}px, ${startDy}px, 0) scale(${Math.max(0.995, scale - 0.002)})${rotate}`;

      // decide hit
      const movementMag = Math.hypot(dx || 0, dy || 0);
      const applyHit = enableHitOnPush && movementMag >= (hitThresholdPx || 6);

      if (applyHit) {
        // overshoot larger than target then return to target (gives impact)
        const overshootMul = Math.max(1.04, hitMultiplier || 1.08);
        const over = `translate3d(${Math.round(dx * overshootMul)}px, ${Math.round(dy * overshootMul)}px, 0) scale(${Math.min(1.04, scale * 1.01)})${rotate}`;

        // instant set to overshoot (no transition) to show impact quickly
        el.style.transform = over;

        // next RAF: animate back to target with hitEase and moderate duration
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const total = Math.max(140, duration);
            el.style.transition = `transform ${total}ms ${hitEase} ${delay}ms, opacity ${Math.max(100, Math.round(total / 2))}ms ease ${delay}ms`;
            el.style.transform = target;
          });
        });

        const tid = setTimeout(() => {
          try {
            el.style.transition = '';
            el.style.transform = '';
            el.style.willChange = '';
          } catch (_) { }
        }, Math.max(160, duration) + (delay || 0) + 80);

        animCleanupRef.current[`hit-${id}`] = () => clearTimeout(tid);
      } else {
        // Two-stage smooth movement: start (25%) -> full (target)
        el.style.transform = start;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = `transform ${duration}ms ${baseEase} ${delay}ms, opacity ${Math.max(90, Math.round(duration / 2))}ms ease ${delay}ms`;
            el.style.transform = target;
          });
        });

        // cleanup on transition end (robust)
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
            } catch (_) { }
          }
        }, duration + (delay || 0) + 120);

        animCleanupRef.current[`soft-${id}`] = () => {
          try { el.removeEventListener('transitionend', onEnd); } catch (_) { }
          clearTimeout(tid);
        };
      }
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

  const posToStyle = (node) => {
    const pxHelpers = getPxHelpers()
    const left = Math.round(pxHelpers.gridToPx(node.x))
    const top = Math.round(pxHelpers.gridToPx(node.y, true))
    const width = `${pxHelpers.widthPx(node.w)}px`
    const height = `${pxHelpers.heightPx(node.h)}px`
    return {
      transform: `translate3d(${left}px, ${top}px, 0)`,
      width,
      height,
      transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), width 160ms ease, height 160ms ease'
    }
  }

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
              style={style}
              data-grid-id={node.i}
            >
              <div
                className={styles.gridItemInner}
                ref={(el) => {
                  if (el) itemInnerRefs.current[node.i] = el
                  else delete itemInnerRefs.current[node.i]
                }}
                onPointerDown={(e) => {
                  if (!isDraggable || node.static) return

                  const isResizeHandle = e.target.closest('[data-resize-handle]')
                  if (isResizeHandle) return

                  handleHeaderPointerDown(e, node)
                }}
              >
                <div className={styles.content}>
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
          return <div style={{  width: '100%', height: '100%' }}>
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
