// FILE: src/utils/collision.js
import {
  rectsCollide,
  cloneLayout,
  inBounds,
  dedupeLayoutById,
  normalizeNode,
} from './grid-utils';

/** Get nodes colliding with `node`, excluding node id */
const getCollidingNodes = (layout = [], node, excludeId) =>
  (layout || []).filter((l) => (l.i ?? l.id) !== excludeId && rectsCollide(l, node));

/** Try swap but never swap into a static node */
const trySwap = (layout, movingNode, targetNode, cols) => {
  const target = normalizeNode(targetNode);
  if (target.static) return null;
  const candidate = { ...target, x: movingNode.x, y: movingNode.y };
  if (!inBounds(candidate, cols)) return null;

  const others = (layout || []).filter((l) => (l.i ?? l.id) !== target.i && (l.i ?? l.id) !== movingNode.i);
  const collision = others.find((o) => rectsCollide(o, candidate));
  if (collision) return null;

  // build new layout replacing target position and ensure unique ids
  const out = (layout || []).map((l) => {
    if ((l.i ?? l.id) === target.i) return candidate;
    if ((l.i ?? l.id) === (movingNode.i ?? movingNode.id)) return movingNode;
    return { ...l };
  });

  return dedupeLayoutById(out);
};

/**
 * Compact layout upward (apply "helium" / gravity to top)
 * Move each non-static node as far up as possible without collisions.
 * This operation is deterministic and conservative (no swaps); respects bounds.
 *
 * @param {Array} baseLayout - array of normalized nodes
 * @param {number} cols
 * @returns {Array} new layout (cloned)
 */
const compactUp = (baseLayout = [], cols = 12) => {
  // work on clones to avoid mutating callers
  const layout = (baseLayout || []).map((n) => ({ ...normalizeNode(n) }));
  // sort top-down then left-right so higher items float first
  layout.sort((a, b) => (a.y - b.y) || (a.x - b.x));

  const byId = new Map(layout.map((l) => [l.i, l]));

  for (const node of layout) {
    if (node.static) continue;
    let bestY = node.y;
    // try to pull node upwards step by step
    for (let tryY = node.y - 1; tryY >= 0; tryY--) {
      const candidate = { ...node, y: tryY };
      if (!inBounds(candidate, cols)) break;

      // check collisions against others (excluding itself)
      const others = layout.filter((o) => o.i !== node.i);
      const coll = others.find((o) => rectsCollide(o, candidate));
      if (coll) break; // cannot go further up
      bestY = tryY;
    }

    if (bestY !== node.y) {
      node.y = bestY;
      byId.set(node.i, node);
    }
  }

  return layout.map((n) => ({ ...n }));
};

/**
 * BFS placement search
 */
export const findPlacementBFS = (baseLayout = [], node, cols, maxDepth = 8) => {
  const normNode = normalizeNode(node);
  const seen = new Set();
  const keyOf = (x, y) => `${x},${y}`;

  const startX = Math.max(0, Math.min(normNode.x, cols - normNode.w));
  const startY = Math.max(0, normNode.y);

  const queue = [{ x: startX, y: startY, depth: 0 }];
  seen.add(keyOf(startX, startY));

  while (queue.length) {
    const cur = queue.shift();
    const candidate = { ...normNode, x: cur.x, y: cur.y };

    if (candidate.x >= 0 && candidate.y >= 0 && candidate.x + candidate.w <= cols) {
      const coll = (baseLayout || []).find((l) => (l.i ?? l.id) !== candidate.i && rectsCollide(l, candidate));
      if (!coll) return candidate;
    }

    if (cur.depth >= maxDepth) continue;

    // neighbors: down, right, left, up
    const neighbors = [
      { x: cur.x, y: cur.y + 1 },
      { x: cur.x + 1, y: cur.y },
      { x: cur.x - 1, y: cur.y },
      { x: cur.x, y: cur.y - 1 },
    ];

    for (const n of neighbors) {
      const k = keyOf(n.x, n.y);
      if (n.x < 0 || n.y < 0) continue; // stricter: no large negatives
      if (seen.has(k)) continue;
      // enforce horizontal bounds for candidate origin
      if (n.x + normNode.w > cols) continue;
      seen.add(k);
      queue.push({ x: n.x, y: n.y, depth: cur.depth + 1 });
    }
  }

  return null;
};

/**
 * findNearestFreePosition - lateral-first BFS biased by movingNode vector
 */
const findNearestFreePosition = (layout = [], movingNodeRaw, targetRaw, cols, maxDepth = 8) => {
  const movingNode = normalizeNode(movingNodeRaw);
  const target = normalizeNode(targetRaw);
  const base = (layout || []).filter((l) => (l.i ?? l.id) !== target.i);

  const acx = target.x + target.w / 2;
  const acy = target.y + target.h / 2;
  const mcx = movingNode.x + movingNode.w / 2;
  const mcy = movingNode.y + movingNode.h / 2;
  const vx = acx - mcx;
  const vy = acy - mcy;

  let directions = [];
  if (Math.abs(vx) > Math.abs(vy)) {
    const dir = vx >= 0 ? 1 : -1;
    directions = [
      { dx: dir, dy: 0 },
      { dx: -dir, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];
  } else {
    const dir = vy >= 0 ? 1 : -1;
    directions = [
      { dx: 0, dy: dir },
      { dx: 0, dy: -dir },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
    ];
  }

  const visited = new Set();
  const key = (x, y) => `${x},${y}`;
  const queue = [{ x: target.x, y: target.y, depth: 0 }];
  visited.add(key(target.x, target.y));

  while (queue.length) {
    const cur = queue.shift();
    const cand = { ...target, x: cur.x, y: cur.y };

    if (cand.x >= 0 && cand.y >= 0 && cand.x + cand.w <= cols) {
      const coll = base.find((l) => rectsCollide(l, cand));
      if (!coll) return cand;
    }

    if (cur.depth >= maxDepth) continue;

    for (const d of directions) {
      const nx = cur.x + d.dx;
      const ny = cur.y + d.dy;
      const k = key(nx, ny);
      if (visited.has(k)) continue;
      if (nx < 0 || ny < 0 || nx + target.w > cols) continue;
      visited.add(k);
      queue.push({ x: nx, y: ny, depth: cur.depth + 1 });
    }

    // expand diagonals lightly
    const extra = [
      { x: cur.x + 1, y: cur.y + 1 },
      { x: cur.x - 1, y: cur.y + 1 },
      { x: cur.x + 1, y: cur.y - 1 },
      { x: cur.x - 1, y: cur.y - 1 },
    ];
    for (const e of extra) {
      const k2 = key(e.x, e.y);
      if (!visited.has(k2) && e.x >= 0 && e.y >= 0 && e.x + target.w <= cols) {
        visited.add(k2);
        queue.push({ x: e.x, y: e.y, depth: cur.depth + 1 });
      }
    }
  }

  return null;
};

/**
 * reflowPropagation (improved, defensive) with optional upward sticky gravity
 */
const reflowPropagation = (baseLayout = [], movingNodeRaw, opts = {}) => {
  const { cols = 12, maxDepth = 8, symmetry = true, sticky = false } = opts;
  // work on normalized layout
  const layout = (baseLayout || []).map((l) => normalizeNode(l));
  const movedSet = new Set();

  const initialColls = getCollidingNodes(layout, movingNodeRaw, movingNodeRaw.i ?? movingNodeRaw.id);

  // if any colliding is static -> try BFS for movingNode
  if (initialColls.some((n) => n.static)) {
    const candidatePlace = findPlacementBFS(layout.filter(n => n.i !== (movingNodeRaw.i ?? movingNodeRaw.id)), movingNodeRaw, cols, maxDepth);
    if (candidatePlace) {
      const out = dedupeLayoutById([...layout.filter(n => n.i !== (movingNodeRaw.i ?? movingNodeRaw.id)), candidatePlace]);
      return { layout: out, success: true, movedSet };
    }
    return { layout: dedupeLayoutById([...layout, movingNodeRaw]), success: false, movedSet };
  }

  const queue = initialColls.map(c => c.i);
  let attempts = 0;
  const maxAttempts = Math.max(200, layout.length * 8);

  while (queue.length && attempts < maxAttempts) {
    attempts++;
    const targetId = queue.shift();
    const idx = layout.findIndex(l => l.i === targetId);
    if (idx === -1) continue;
    const target = layout[idx];
    if (target.static) continue;

    if (rectsCollide(target, movingNodeRaw)) {
      const placed = findNearestFreePosition(layout.filter(n => n.i !== target.i), movingNodeRaw, target, cols, maxDepth);
      if (placed) {
        layout[idx] = normalizeNode(placed);
        movedSet.add(targetId);
        // enqueue collisions with placed
        const newColls = layout.filter(n => n.i !== targetId).filter(n => rectsCollide(n, layout[idx]));
        newColls.forEach((nc) => {
          if (!movedSet.has(nc.i) && !nc.static) queue.push(nc.i);
        });
        continue;
      }

      // fallback global BFS for this target
      const fallback = findPlacementBFS(layout.filter(n => n.i !== target.i), target, cols, maxDepth);
      if (fallback) {
        layout[idx] = normalizeNode(fallback);
        movedSet.add(targetId);
        const newColls = layout.filter(n => n.i !== targetId).filter(n => rectsCollide(n, layout[idx]));
        newColls.forEach((nc) => {
          if (!movedSet.has(nc.i) && !nc.static) queue.push(nc.i);
        });
        continue;
      }
      // else skip for now
    }
  }

  // After propagation, final sanity: ensure no overlaps among layout
  // Simple greedy compact: move any remaining colliding nodes downwards
  // (This is a safety pass; heavy cases probably solved by increasing maxDepth.)
  const safety = [...layout];
  for (let i = 0; i < safety.length; i++) {
    for (let j = 0; j < safety.length; j++) {
      if (i === j) continue;
      const a = safety[i];
      const b = safety[j];
      if (rectsCollide(a, b)) {
        // push the lower one down
        if (a.y <= b.y) {
          safety[j] = { ...b, y: a.y + a.h };
        } else {
          safety[i] = { ...a, y: b.y + b.h };
        }
      }
    }
  }

  // Apply optional upward sticky gravity to compact free space towards the top
  const afterSticky = sticky ? compactUp(safety, cols) : safety;

  const finalColls = getCollidingNodes(afterSticky, movingNodeRaw, movingNodeRaw.i ?? movingNodeRaw.id);
  const success = finalColls.length === 0;

  const outLayout = success ? dedupeLayoutById([...afterSticky, normalizeNode(movingNodeRaw)]) : dedupeLayoutById([...layout, normalizeNode(movingNodeRaw)]);
  return { layout: outLayout, success, movedSet };
};

/**
 * resolveCollision main
 */
export function resolveCollision(layout = [], movingNodeRaw, opts = {}) {
  const {
    cols = 12,
    collisionMode = 'push',
    maxDepth = 8,
    allowOverlap = false,
    reflow = true,
    reflowOnResize = true,
    reflowSymmetry = true,
    sticky = false,
  } = opts;

  // normalize inputs defensively
  const base = cloneLayout(layout || []);
  const movingNode = normalizeNode(movingNodeRaw);
  const other = base.filter((l) => (l.i ?? l.id) !== movingNode.i);

  const initialColls = getCollidingNodes(other, movingNode, movingNode.i);
  if (initialColls.length === 0) {
    const out = dedupeLayoutById([...other, movingNode]);
    // apply sticky pass if requested
    return { layout: sticky ? compactUp(out, cols) : out, movedNode: movingNode, success: true };
  }

  if (collisionMode === 'none' || collisionMode === 'disable') {
    return {
      layout: allowOverlap ? dedupeLayoutById([...other, movingNode]) : dedupeLayoutById([...base]),
      movedNode: movingNode,
      success: allowOverlap,
    };
  }

  if (collisionMode === 'swap') {
    for (const target of initialColls) {
      const swapped = trySwap(base, movingNode, target, cols);
      if (swapped) {
        return { layout: swapped, movedNode: movingNode, success: true };
      }
    }
    // fallback to push
  }

  // If collision touches static node -> BFS place movingNode
  if (initialColls.some((n) => n.static)) {
    const candidatePlace = findPlacementBFS(other, movingNode, cols, maxDepth);
    if (candidatePlace) {
      const out = dedupeLayoutById([...other, candidatePlace]);
      return { layout: sticky ? compactUp(out, cols) : out, movedNode: candidatePlace, success: true };
    }
    return { layout: dedupeLayoutById([...base]), movedNode: movingNode, success: false };
  }

  // Reflow propagation
  if (reflow) {
    const { layout: rLayout, success, movedSet } = reflowPropagation(other, movingNode, {
      cols,
      maxDepth,
      symmetry: reflowSymmetry,
      sticky,
    });

    if (success) {
      const out = sticky ? compactUp(rLayout, cols) : rLayout;
      return { layout: out, movedNode: movingNode, success: true, changes: { moved: Array.from(movedSet) } };
    }
    // fallback to greedy push
  }

  // Greedy push fallback (downwards/backwards)
  let currentLayout = [...other];
  let movedIds = new Set();
  let queue = [...initialColls.map((c) => c.i)];
  let attempts = 0;
  const maxAttempts = 200;

  while (queue.length && attempts < maxAttempts) {
    attempts++;
    const idToMove = queue.shift();
    if (movedIds.has(idToMove)) continue;

    const idx = currentLayout.findIndex((n) => n.i === idToMove);
    if (idx === -1) continue;
    const affectedNode = currentLayout[idx];

    if (affectedNode.static) continue;

    let pushed = null;
    for (let d = 1; d <= maxDepth; d++) {
      const candidate = { ...affectedNode, y: affectedNode.y + d };

      if (candidate.x < 0 || candidate.x + candidate.w > cols) continue;
      const testLayout = currentLayout.map((n) => (n.i === idToMove ? candidate : n));
      const colliding = testLayout.find((n) => n.i !== movingNode.i && rectsCollide(n, movingNode));
      if (!colliding) {
        pushed = candidate;
        break;
      }
    }

    if (pushed) {
      currentLayout = currentLayout.map((n) => (n.i === idToMove ? pushed : n));
      movedIds.add(idToMove);
      const newColls = currentLayout.filter(n => n.i !== idToMove).filter((n) => rectsCollide(n, pushed));
      newColls.forEach((nc) => {
        if (!movedIds.has(nc.i) && !nc.static) queue.push(nc.i);
      });
    }
  }

  const finalColls = currentLayout.filter((n) => rectsCollide(n, movingNode));
  const success = finalColls.length === 0;

  const outLayoutRaw = success ? dedupeLayoutById([...currentLayout, movingNode]) : dedupeLayoutById([...base]);
  const outLayout = sticky ? compactUp(outLayoutRaw, cols) : outLayoutRaw;

  return {
    layout: outLayout,
    movedNode: movingNode,
    success,
    changes: { moved: Array.from(movedIds) },
  };
}

export default {
  resolveCollision,
};

