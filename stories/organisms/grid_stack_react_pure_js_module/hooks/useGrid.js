import { useCallback, useEffect, useRef, useState } from 'react';
import { resolveCollision, findPlacementBFS } from '../utils/collision';
import { cloneLayout } from '../utils/grid-utils';

const POINTER_CAPTURE_RETRY = 3;

const rectsOverlap = (a, b) => {
  if (!a || !b) return false;
  return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
};


/**
 * Ensure no overlap with optional upward "sticky" compaction.
 *
 * @param {Array} inputLayout
 * @param {number} cols
 * @param {number} reflowMaxDepth
 * @param {boolean} sticky
 * @returns {Array}
 */
const ensureNoOverlap = (inputLayout = [], cols = 12, reflowMaxDepth = 8, sticky = false) => {
  const layout = (inputLayout || []).map(l => ({ ...l }));
  layout.sort((a, b) => (a.y - b.y) || (a.x - b.x));
  const placed = [];

  for (const node of layout) {
    let candidate = { ...node };
    let attempts = 0;
    while (placed.some(p => rectsOverlap(p, candidate)) && attempts < 400) {
      candidate = { ...candidate, y: candidate.y + 1 };
      attempts += 1;
      if (candidate.x + candidate.w > cols) {
        candidate.x = Math.max(0, cols - candidate.w);
      }
    }

    if (attempts >= 400) {
      const others = placed.map(p => ({ ...p }));
      const fallback = findPlacementBFS(others, candidate, cols, reflowMaxDepth);
      if (fallback) {
        candidate = { ...fallback, i: candidate.i };
      } else {
        candidate.y = Math.max(0, candidate.y);
        candidate.x = Math.max(0, Math.min(cols - candidate.w, candidate.x));
      }
    }

    placed.push(candidate);
  }

  const byId = new Map(placed.map(p => [p.i, p]));
  const out = inputLayout.map(orig => ({ ...(byId.get(orig.i) || orig) }));

  // apply upward sticky compaction if requested
  if (sticky) {
    // lazy import of compactUp from collision utils to avoid circular deps
    try {
      // eslint-disable-next-line global-require
      const { compactUp } = require('../utils/collision');
      // compactUp returns normalized layout; map back to ids
      const compacted = compactUp(out, cols);
      const byId2 = new Map(compacted.map(p => [p.i, p]));
      return inputLayout.map(orig => ({ ...(byId2.get(orig.i) || orig) }));
    } catch (_) {
      return out;
    }
  }

  return out;
};

/**
 * useGrid (revised)
 */
export function useGrid({
  items = [],
  cols = 12,
  preventCollision = true,
  collisionMode = 'push',
  dragThrottleMs = 0,
  onLayoutChange = () => { },
  allowOverlapDuringDrag = false,
  animateOnDrop = true,
  collisionSolverOpts = {},
  overlayAnchor = 'grab',
  reflowDuringDrag = true,
  reflowMaxDepth = 8,
  reflowSymmetry = true,
  snapEnabled = true,
  sticky = false,
  snapThreshold = 0,
} = {}) {
  const initial = (items || []).map((it) => ({
    i: it.id,
    x: it.x ?? 0,
    y: it.y ?? 0,
    w: it.w ?? 3,
    h: it.h ?? 4,
    static: !!it.static,
  }));

  const [layout, setLayout] = useState(initial);
  const layoutRef = useRef(layout);
  useEffect(() => { layoutRef.current = layout; }, [layout]);

  const [overlay, setOverlay] = useState(null);

  const dragState = useRef(null);
  const rafRef = useRef(null);
  const lastThrottleRef = useRef(0);

  useEffect(() => {
    setLayout(() => (items || []).map((it) => ({
      i: it.id,
      x: it.x ?? 0,
      y: it.y ?? 0,
      w: it.w ?? 3,
      h: it.h ?? 4,
      static: !!it.static,
    })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);


  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const commitLayout = useCallback((nextLayout) => {
    const nl = cloneLayout(nextLayout)
    const bounded = nl.map(n => {
      const out = { ...n }
      if (out.x < 0) out.x = 0
      if (out.y < 0) out.y = 0
      if (out.x + out.w > cols) out.x = Math.max(0, cols - out.w)
      return out
    })
    const fixed = ensureNoOverlap(bounded, cols, reflowMaxDepth, sticky)
    setLayout(fixed)
    onLayoutChange(fixed)
  }, [onLayoutChange, cols, reflowMaxDepth, sticky])

  const schedule = useCallback((fn) => {
    if (dragThrottleMs > 0) {
      const now = Date.now()
      if (now - lastThrottleRef.current >= dragThrottleMs) {
        lastThrottleRef.current = now
        fn()
      }
      return
    }
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      fn()
      rafRef.current = null
    })
  }, [dragThrottleMs])



  const pxToGrid = useCallback((pxValue, pxHelpers, isVertical = false) => {
    const offset = isVertical ? pxHelpers.containerPadding[1] : pxHelpers.containerPadding[0]
    const cell = isVertical ? pxHelpers.rowHeight : pxHelpers.colWidth
    const gap = isVertical ? pxHelpers.marginY : pxHelpers.marginX
    const effective = pxValue - offset
    const grid = effective / (cell + gap)
    if (!snapEnabled) return Math.max(0, grid)
    const floored = Math.floor(grid)
    const fraction = grid - floored
    const thresholdNorm = Math.max(0, Math.min(1, snapThreshold))
    const shouldIncrement = thresholdNorm > 0 && fraction >= (1 - thresholdNorm)
    return Math.max(0, shouldIncrement ? floored + 1 : floored)
  }, [snapEnabled, snapThreshold])

  const gridToPx = useCallback((gridPos, pxHelpers, isVertical = false) => {
    const offset = isVertical ? pxHelpers.containerPadding[1] : pxHelpers.containerPadding[0]
    const cell = isVertical ? pxHelpers.rowHeight : pxHelpers.colWidth
    const gap = isVertical ? pxHelpers.marginY : pxHelpers.marginX
    return offset + gridPos * (cell + gap)
  }, [])

  const validateBounds = useCallback((node) => {
    const out = { ...node }
    if (out.x < 0) out.x = 0
    if (out.y < 0) out.y = 0
    if (out.x + out.w > cols) out.x = Math.max(0, cols - out.w)
    return out
  }, [cols])

  const cancelInteraction = useCallback(() => {
    dragState.current = null
    setOverlay(null)
  }, [])

  const startDrag = useCallback((e, node, pxHelpers) => {
    if (!node || node.static) return
    const pointerId = e.pointerId
    for (let i = 0; i < POINTER_CAPTURE_RETRY; i++) {
      try { e.currentTarget?.setPointerCapture?.(pointerId); break } catch (err) {
        if (i === POINTER_CAPTURE_RETRY - 1) console.warn('Pointer capture failed on drag start', err)
      }
    }

    const leftGridPx = pxHelpers.gridToPx(node.x)
    const topGridPx = pxHelpers.gridToPx(node.y, true)
    const widthPx = pxHelpers.widthPx(node.w)
    const heightPx = pxHelpers.heightPx(node.h)
    const containerRect = pxHelpers.containerRect || { left: 0, top: 0 }

    let grabOffsetX, grabOffsetY
    if (overlayAnchor === 'center') {
      grabOffsetX = widthPx / 2
      grabOffsetY = heightPx / 2
    } else {
      grabOffsetX = e.clientX - (containerRect.left + leftGridPx)
      grabOffsetY = e.clientY - (containerRect.top + topGridPx)
    }

    dragState.current = {
      pointerId,
      type: 'drag',
      itemId: node.i,
      orig: { ...node },
      grabOffsetX,
      grabOffsetY,
      pxHelpers,
      containerRect,
    }

    setOverlay({
      i: node.i,
      pxLeft: leftGridPx,
      pxTop: topGridPx,
      widthPx,
      heightPx,
      committedLayout: cloneLayout(layoutRef.current),
      targetGrid: { x: node.x, y: node.y, w: node.w, h: node.h },
    })
  }, [overlayAnchor])

  const startResize = useCallback((e, node, corner, pxHelpers) => {
    if (!node || node.static) return
    const actualCorner = corner ?? 'se'
    try { e.currentTarget?.setPointerCapture?.(e.pointerId) } catch (err) { console.warn('Pointer capture failed on resize start', err) }

    dragState.current = {
      pointerId: e.pointerId,
      type: 'resize',
      itemId: node.i,
      orig: { ...node },
      corner: actualCorner,
      pxHelpers,
      containerRect: pxHelpers.containerRect || { left: 0, top: 0 },
      startClientX: e.clientX,
      startClientY: e.clientY,
    }

    setOverlay({
      i: node.i,
      pxLeft: gridToPx(node.x, pxHelpers),
      pxTop: gridToPx(node.y, pxHelpers, true),
      widthPx: pxHelpers.widthPx(node.w),
      heightPx: pxHelpers.heightPx(node.h),
      committedLayout: cloneLayout(layoutRef.current),
      targetGrid: { x: node.x, y: node.y, w: node.w, h: node.h },
    })
  }, [gridToPx])

  const handleDragMove = useCallback((e, st) => {
    const { pxHelpers, containerRect, grabOffsetX, grabOffsetY, orig, itemId } = st;
    const pxLeft = e.clientX - (containerRect.left ?? 0) - grabOffsetX;
    const pxTop = e.clientY - (containerRect.top ?? 0) - grabOffsetY;

    const gridX = pxToGrid(pxLeft, pxHelpers);
    const gridY = pxToGrid(pxTop, pxHelpers, true);

    let candidate = validateBounds({ ...orig, x: gridX, y: gridY });

    if (!snapEnabled) {
      const base = cloneLayout(layoutRef.current);
      const idx = base.findIndex(n => n.i === itemId);
      if (idx >= 0) {
        base[idx] = { ...base[idx], ...candidate };
      } else {
        base.push({ ...candidate, i: itemId });
      }

      setOverlay({
        i: itemId,
        pxLeft,
        pxTop,
        widthPx: pxHelpers.widthPx(candidate.w),
        heightPx: pxHelpers.heightPx(candidate.h),
        committedLayout: base,
        targetGrid: candidate,
        fallback: false,
      });
      return;
    }

    const rcOpts = {
      cols,
      collisionMode: preventCollision ? collisionMode : 'none',
      allowOverlap: allowOverlapDuringDrag,
      maxDepth: reflowMaxDepth,
      reflow: reflowDuringDrag,
      reflowSymmetry,
      sticky,
      ...collisionSolverOpts,
    };

    const resolved = resolveCollision(layoutRef.current, candidate, rcOpts);

    if (resolved && resolved.success) {
      let finalLayout = ensureNoOverlap(resolved.layout, cols, reflowMaxDepth, sticky);
      const targetItem = finalLayout.find(n => n.i === itemId) || candidate;

      setOverlay({
        i: itemId,
        pxLeft,
        pxTop,
        widthPx: pxHelpers.widthPx(candidate.w),
        heightPx: pxHelpers.heightPx(candidate.h),
        committedLayout: finalLayout,
        targetGrid: targetItem,
      });
      return;
    }

    const others = layoutRef.current.filter(n => n.i !== itemId);
    const fallback = findPlacementBFS(others, candidate, cols, reflowMaxDepth);

    if (fallback) {
      let preview = [...others.map(n => ({ ...n })), { ...fallback, i: itemId }];
      preview = ensureNoOverlap(preview, cols, reflowMaxDepth, sticky);

      setOverlay({
        i: itemId,
        pxLeft,
        pxTop,
        widthPx: pxHelpers.widthPx(fallback.w),
        heightPx: pxHelpers.heightPx(fallback.h),
        committedLayout: preview,
        targetGrid: fallback,
        fallback: true,
      });
    } else {
      setOverlay({
        i: itemId,
        pxLeft,
        pxTop,
        widthPx: pxHelpers.widthPx(candidate.w),
        heightPx: pxHelpers.heightPx(candidate.h),
        committedLayout: cloneLayout(layoutRef.current),
        targetGrid: candidate,
        fallback: false,
      });
    }
  }, [
    allowOverlapDuringDrag,
    collisionMode,
    collisionSolverOpts,
    cols,
    pxToGrid,
    preventCollision,
    reflowDuringDrag,
    reflowMaxDepth,
    reflowSymmetry,
    setOverlay,
    snapEnabled,
    validateBounds,
  ]);

  /**
   * 🔥 FIX CLAVE: sticky aplicado también en SUCCESS PATH
   */
  const handleResizeMove = useCallback((e, st) => {
    const { pxHelpers, startClientX, startClientY, orig, corner, itemId } = st;

    const dx = e.clientX - startClientX;
    const dy = e.clientY - startClientY;

    const deltaW = Math.round(dx / (pxHelpers.colWidth + pxHelpers.marginX));
    const deltaH = Math.round(dy / (pxHelpers.rowHeight + pxHelpers.marginY));

    let candidate = { ...orig };

    if (corner.includes('e')) candidate.w = Math.max(1, orig.w + deltaW);
    if (corner.includes('s')) candidate.h = Math.max(1, orig.h + deltaH);

    candidate = validateBounds(candidate);

    const rcOpts = {
      cols,
      collisionMode: preventCollision ? collisionMode : 'none',
      allowOverlap: allowOverlapDuringDrag,
      maxDepth: reflowMaxDepth,
      reflow: reflowDuringDrag,
      reflowSymmetry,
      sticky,
      ...collisionSolverOpts,
    };

    const resolved = resolveCollision(layoutRef.current, candidate, rcOpts);

    if (resolved?.success) {
      const finalLayout = ensureNoOverlap(
        resolved.layout,
        cols,
        reflowMaxDepth,
        sticky // 👈 AQUÍ estaba el bug
      );

      const targetItem =
        finalLayout.find(n => n.i === itemId) || candidate;

      setOverlay({
        i: itemId,
        pxLeft: pxHelpers.gridToPx(targetItem.x),
        pxTop: pxHelpers.gridToPx(targetItem.y, true),
        widthPx: pxHelpers.widthPx(targetItem.w),
        heightPx: pxHelpers.heightPx(targetItem.h),
        committedLayout: finalLayout,
        targetGrid: targetItem,
      });

      return;
    }

  }, [
    allowOverlapDuringDrag,
    collisionMode,
    collisionSolverOpts,
    cols,
    preventCollision,
    reflowDuringDrag,
    reflowMaxDepth,
    reflowSymmetry,
    sticky,
    validateBounds,
  ]);

  const onPointerMove = useCallback((e) => {
    const st = dragState.current;
    if (!st) return;
    if (typeof e.pointerId === 'number' && st.pointerId !== e.pointerId) return;

    schedule(() => {
      const active = dragState.current;
      if (!active) return;
      if (active.type === 'drag') {
        handleDragMove(e, active);
      } else if (active.type === 'resize') {
        handleResizeMove(e, active);
      }
    });
  }, [handleDragMove, handleResizeMove, schedule]);

  const endInteraction = useCallback((e) => {
    const st = dragState.current;
    if (st && typeof e?.pointerId === 'number') {
      try {
        e.currentTarget?.releasePointerCapture?.(e.pointerId);
      } catch (err) {
        console.warn('Failed to release pointer capture', err);
      }
    }
    dragState.current = null;

    try {
      const committed = overlay?.committedLayout
        ? ensureNoOverlap(cloneLayout(overlay.commitedLayout || overlay.committedLayout), cols, reflowMaxDepth, sticky)
        : ensureNoOverlap(cloneLayout(layoutRef.current), cols, reflowMaxDepth, sticky);
      commitLayout(committed);
    } catch (err) {
      console.error('Failed to commit layout after interaction', err);
      commitLayout(layoutRef.current);
    }

    if (animateOnDrop) {
      setTimeout(() => setOverlay(null), 40);
    } else {
      setOverlay(null);
    }
  }, [overlay, commitLayout, animateOnDrop, cols, reflowMaxDepth]);

  return {
    layout,
    overlay,
    startDrag,
    startResize,
    onPointerMove,
    endInteraction,
    cancelInteraction,
    setLayout: commitLayout,
  };
}

export default {
  useGrid,
};
