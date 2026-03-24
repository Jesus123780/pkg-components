// FILE: src/utils/collision.js
import {
  cloneLayout,
  dedupeLayoutById,
  normalizeNode,
} from './grid-utils';

/**
 * A compatibility alias that now behaves like a guided A* search.
 *
 * @param {Array} baseLayout
 * @param {Object} node
 * @param {number} cols
 * @param {number} maxDepth
 * @returns {Object|null}
 */
export const findPlacementBFS = (baseLayout = [], node, cols, maxDepth = 8) => {
  return findFreePlacementAStar(baseLayout, node, cols, {
    maxDepth,
    biasVector: { x: 0, y: 1 },
    symmetry: true,
    preferredX: normalizeNode(node).x,
    preferredY: normalizeNode(node).y,
    excludeId: getNodeId(node),
  });
};

/**
 * Returns a stable node identifier.
 *
 * @param {Object} node
 * @returns {string|number|undefined}
 */
const getNodeId = (node) => node?.i ?? node?.id;

/**
 * Safe numeric conversion.
 *
 * @param {*} value
 * @param {number} fallback
 * @returns {number}
 */
const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Clamp a value to a range.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const clamp = (value, min, max) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

/**
 * Creates a shallow clone of a node after normalization.
 *
 * @param {Object} node
 * @returns {Object}
 */
const cloneNode = (node) => ({ ...normalizeNode(node) });

/**
 * Returns true when two normalized rectangles overlap.
 * This is an AABB intersection test with strict area overlap.
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {boolean}
 */
const hasAabbCollision = (a, b) => {
  if (!a || !b) return false;

  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  );
};

/**
 * Computes the collision manifold between two rectangles.
 * The manifold includes penetration depth and a minimum translation vector (MTV).
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {null|Object}
 */
const getCollisionManifold = (a, b) => {
  if (!a || !b) return null;

  const left = Math.max(a.x, b.x);
  const right = Math.min(a.x + a.w, b.x + b.w);
  const top = Math.max(a.y, b.y);
  const bottom = Math.min(a.y + a.h, b.y + b.h);

  const overlapX = right - left;
  const overlapY = bottom - top;

  if (overlapX <= 0 || overlapY <= 0) return null;

  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + b.h / 2;

  const dx = ax - bx;
  const dy = ay - by;

  const directionX = dx >= 0 ? 1 : -1;
  const directionY = dy >= 0 ? 1 : -1;

  const axis = overlapX < overlapY ? 'x' : 'y';
  const depth = axis === 'x' ? overlapX : overlapY;

  const mtv =
    axis === 'x'
      ? { x: overlapX * directionX, y: 0 }
      : { x: 0, y: overlapY * directionY };

  return {
    overlapX,
    overlapY,
    depth,
    axis,
    directionX,
    directionY,
    mtv,
    centerDistance: {
      x: dx,
      y: dy,
    },
  };
};

/**
 * Returns the nodes colliding with `node`, excluding `excludeId`.
 *
 * @param {Array} layout
 * @param {Object} node
 * @param {string|number} excludeId
 * @returns {Array}
 */
export const getCollidingNodes = (layout = [], node, excludeId) =>
  (layout || []).filter((l) => getNodeId(l) !== excludeId && hasAabbCollision(l, node));

/**
 * Returns the total penetration score of a candidate against a layout.
 * Used as a heavy penalty in placement search.
 *
 * @param {Array} layout
 * @param {Object} candidate
 * @returns {number}
 */
const getCollisionPenalty = (layout = [], candidate) => {
  let penalty = 0;

  for (const item of layout || []) {
    if (getNodeId(item) === getNodeId(candidate)) continue;
    const manifold = getCollisionManifold(item, candidate);
    if (!manifold) continue;
    penalty += manifold.depth * 1000;
  }

  return penalty;
};

/**
 * Checks whether a candidate fits within the grid.
 *
 * @param {Object} node
 * @param {number} cols
 * @returns {boolean}
 */
const isWithinBounds = (node, cols) => {
  if (!node) return false;
  if (!Number.isFinite(cols) || cols <= 0) return false;
  return node.x >= 0 && node.y >= 0 && node.w > 0 && node.h > 0 && node.x + node.w <= cols;
};

/**
 * Tests whether a candidate collides with any node in the layout.
 *
 * @param {Array} layout
 * @param {Object} candidate
 * @param {string|number} excludeId
 * @returns {boolean}
 */
const collidesWithLayout = (layout = [], candidate, excludeId) =>
  (layout || []).some((item) => getNodeId(item) !== excludeId && hasAabbCollision(item, candidate));

/**
 * Returns a cost score for a position.
 * Lower is better.
 *
 * The cost model is intentionally biased toward lazy horizontal movement:
 * - horizontal displacement is cheaper than vertical displacement
 * - staying in the same row is preferred
 * - downward motion is expensive unless required
 * - collisions are penalized heavily
 *
 * @param {Array} layout
 * @param {Object} node
 * @param {number} x
 * @param {number} y
 * @param {number} cols
 * @param {Object} opts
 * @returns {number}
 */
const scorePosition = (layout, node, x, y, cols, opts = {}) => {
  const {
    preferredX = node.x,
    preferredY = node.y,
    gravityWeight = 1,
    inertiaWeight = 1,
    axisWeight = 1,
    edgeWeight = 1,
    centerBiasX = 0,
    centerBiasY = 0,
    penaltyForOverlap = true,
    horizontalWeight = 0.55,
    verticalWeight = 1.9,
    sameRowBonus = 0.9,
    downwardPenalty = 1.25,
    upwardPenalty = 0.85,
  } = opts;

  const candidate = { ...node, x, y };

  if (!isWithinBounds(candidate, cols)) return Number.POSITIVE_INFINITY;

  const collisionPenalty = penaltyForOverlap ? getCollisionPenalty(layout, candidate) : 0;
  if (collisionPenalty >= Number.POSITIVE_INFINITY) return Number.POSITIVE_INFINITY;

  const dx = Math.abs(x - preferredX);
  const dy = Math.abs(y - preferredY);
  const manhattan = dx + dy;

  const horizontalPenalty = horizontalWeight * dx;
  const verticalPenalty = verticalWeight * dy;

  const axisPenalty =
    axisWeight * (
      Math.abs((x - preferredX) - centerBiasX) +
      Math.abs((y - preferredY) - centerBiasY)
    );

  const gravityPenalty = gravityWeight * Math.max(0, y - preferredY);
  const inertiaPenalty = inertiaWeight * manhattan;

  const rowPenalty = y === preferredY ? -sameRowBonus : 0;
  const directionPenalty =
    y > preferredY ? downwardPenalty * (y - preferredY) : upwardPenalty * Math.abs(y - preferredY);

  const edgePenalty = edgeWeight * Math.max(0, x + candidate.w - cols);

  return (
    collisionPenalty +
    horizontalPenalty +
    verticalPenalty +
    axisPenalty +
    gravityPenalty +
    inertiaPenalty +
    directionPenalty +
    edgePenalty +
    rowPenalty
  );
};

/**
 * Minimal binary min-heap for A* search.
 */
class MinHeap {
  constructor(compare) {
    this.items = [];
    this.compare = compare;
  }

  push(value) {
    this.items.push(value);
    this.#bubbleUp(this.items.length - 1);
  }

  pop() {
    if (this.items.length === 0) return undefined;
    if (this.items.length === 1) return this.items.pop();

    const top = this.items[0];
    this.items[0] = this.items.pop();
    this.#bubbleDown(0);
    return top;
  }

  get size() {
    return this.items.length;
  }

  #bubbleUp(index) {
    let i = index;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compare(this.items[i], this.items[parent]) >= 0) break;
      [this.items[i], this.items[parent]] = [this.items[parent], this.items[i]];
      i = parent;
    }
  }

  #bubbleDown(index) {
    let i = index;
    const last = this.items.length - 1;

    while (true) {
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      let smallest = i;

      if (left <= last && this.compare(this.items[left], this.items[smallest]) < 0) smallest = left;
      if (right <= last && this.compare(this.items[right], this.items[smallest]) < 0) smallest = right;
      if (smallest === i) break;

      [this.items[i], this.items[smallest]] = [this.items[smallest], this.items[i]];
      i = smallest;
    }
  }
}

/**
 * Builds a deterministic neighbor order for search.
 * Horizontal movement is preferred over vertical movement by default.
 *
 * @param {Object} origin
 * @param {Object} targetVector
 * @param {boolean} symmetry
 * @param {Object} opts
 * @returns {Array<{dx:number, dy:number}>}
 */
const buildNeighborOrder = (origin, targetVector = { x: 0, y: 1 }, symmetry = true, opts = {}) => {
  const vx = toNumber(targetVector.x, 0);
  const vy = toNumber(targetVector.y, 1);

  const horizontalFirst = opts.horizontalFirst !== false;
  const dominantIsX = Math.abs(vx) >= Math.abs(vy);
  const primaryX = vx >= 0 ? 1 : -1;
  const primaryY = vy >= 0 ? 1 : -1;

  const base = horizontalFirst
    ? (dominantIsX
        ? [
            { dx: primaryX, dy: 0 },
            { dx: -primaryX, dy: 0 },
            { dx: 0, dy: primaryY },
            { dx: 0, dy: -primaryY },
          ]
        : [
            { dx: primaryX, dy: 0 },
            { dx: -primaryX, dy: 0 },
            { dx: 0, dy: primaryY },
            { dx: 0, dy: -primaryY },
          ])
    : (dominantIsX
        ? [
            { dx: primaryX, dy: 0 },
            { dx: -primaryX, dy: 0 },
            { dx: 0, dy: primaryY },
            { dx: 0, dy: -primaryY },
          ]
        : [
            { dx: 0, dy: primaryY },
            { dx: 0, dy: -primaryY },
            { dx: primaryX, dy: 0 },
            { dx: -primaryX, dy: 0 },
          ]);

  const extras = symmetry
    ? [
        { dx: primaryX, dy: primaryY },
        { dx: -primaryX, dy: primaryY },
        { dx: primaryX, dy: -primaryY },
        { dx: -primaryX, dy: -primaryY },
      ]
    : [];

  return [...base, ...extras].filter(
    (d, index, arr) => arr.findIndex((x) => x.dx === d.dx && x.dy === d.dy) === index
  );
};

/**
 * Generic A* guided free-space search.
 *
 * This function is tuned to prefer lateral displacement:
 * - same-row or near-row positions are cheaper
 * - vertical movement has a much higher cost than horizontal movement
 * - the search is bounded to keep interaction responsive
 *
 * @param {Array} baseLayout
 * @param {Object} node
 * @param {number} cols
 * @param {Object} opts
 * @returns {Object|null}
 */
const findFreePlacementAStar = (baseLayout = [], node, cols, opts = {}) => {
  const normNode = normalizeNode(node);

  const {
    maxDepth = 8,
    biasVector = { x: 0, y: 1 },
    symmetry = true,
    preferredX = normNode?.x ?? 0,
    preferredY = normNode?.y ?? 0,
    excludeId = getNodeId(normNode),
    horizontalFirst = true,
    horizontalWeight = 0.55,
    verticalWeight = 2.1,
    rowStickiness = 0.65,
    downwardWeight = 1.35,
    upwardWeight = 0.85,
  } = opts;

  const startX = Math.max(0, Math.min(toNumber(normNode.x, 0), Math.max(0, cols - normNode.w)));
  const startY = Math.max(0, toNumber(normNode.y, 0));

  const open = new MinHeap((a, b) => a.f - b.f || a.g - b.g || a.y - b.y || a.x - b.x);
  const visited = new Map();
  const maxVisited = Math.max(256, cols * 64);

  const keyOf = (x, y) => `${x},${y}`;

  const heuristic = (x, y) => {
    const dx = Math.abs(x - preferredX);
    const dy = Math.abs(y - preferredY);
    const hBias = horizontalWeight * dx;
    const vBias = verticalWeight * dy;
    const gravityBias = Math.max(0, y - preferredY) * downwardWeight;
    const upwardBias = Math.max(0, preferredY - y) * upwardWeight;
    const rowBias = y === preferredY ? -rowStickiness : 0;
    const directionalBias = Math.abs(x - startX) * Math.abs(biasVector.x || 0) * 0.06;
    return hBias + vBias + gravityBias + upwardBias + rowBias + directionalBias;
  };

  const neighborOrder = buildNeighborOrder(normNode, biasVector, symmetry, { horizontalFirst });

  open.push({
    x: startX,
    y: startY,
    g: 0,
    f: heuristic(startX, startY),
    depth: 0,
  });

  visited.set(keyOf(startX, startY), 0);

  while (open.size > 0 && visited.size <= maxVisited) {
    const cur = open.pop();
    if (!cur) break;

    const candidate = { ...normNode, x: cur.x, y: cur.y };

    if (isWithinBounds(candidate, cols) && !collidesWithLayout(baseLayout, candidate, excludeId)) {
      return candidate;
    }

    if (cur.depth >= maxDepth) continue;

    for (const dir of neighborOrder) {
      const nx = cur.x + dir.dx;
      const ny = cur.y + dir.dy;
      if (nx < 0 || ny < 0) continue;
      if (nx + normNode.w > cols) continue;

      const nKey = keyOf(nx, ny);
      const nextDepth = cur.depth + 1;
      const prevDepth = visited.get(nKey);

      if (prevDepth !== undefined && prevDepth <= nextDepth) continue;
      visited.set(nKey, nextDepth);

      const stepCost = 1 + Math.abs(dir.dx) * 0.08 + Math.abs(dir.dy) * 0.18;
      const g = cur.g + stepCost;
      const h = heuristic(nx, ny);
      open.push({ x: nx, y: ny, g, f: g + h, depth: nextDepth });
    }
  }

  return null;
};

/**
 * Compact layout upward with lateral packing.
 *
 * Strategy:
 * - keep static nodes fixed
 * - place movable nodes in a stable order
 * - search the nearest valid slot with preference for:
 *   1. lowest y
 *   2. minimal horizontal displacement
 *   3. compact packing near existing neighbors
 *
 * @param {Array} baseLayout
 * @param {number} cols
 * @returns {Array}
 */
const compactUp = (baseLayout = [], cols = 12) => {
  const layout = (baseLayout || []).map((n) => cloneNode(n));
  const statics = layout.filter((n) => n.static);
  const movables = layout.filter((n) => !n.static);

  movables.sort((a, b) => (a.y - b.y) || (a.x - b.x) || ((b.w * b.h) - (a.w * a.h)));

  const placed = [...statics];

  for (const node of movables) {
    const maxY = Math.max(0, node.y);
    let best = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x <= cols - node.w; x++) {
        const candidate = { ...node, x, y };
        if (!isWithinBounds(candidate, cols)) continue;
        if (collidesWithLayout(placed, candidate, node.i)) continue;

        const score =
          y * 1000 +
          Math.abs(x - node.x) * 15 +
          x * 0.35 +
          getCollisionPenalty(placed, candidate);

        if (score < bestScore) {
          bestScore = score;
          best = candidate;
        }
      }
    }

    placed.push(best ? best : node);
  }

  return dedupeLayoutById(placed.map((n) => ({ ...n })));
};

/**
 * Attempts a safe swap between the moving node and the target node.
 *
 * @param {Array} layout
 * @param {Object} movingNodeRaw
 * @param {Object} targetRaw
 * @param {number} cols
 * @returns {Array|null}
 */
const trySwap = (layout = [], movingNodeRaw, targetRaw, cols = 12) => {
  const movingNode = normalizeNode(movingNodeRaw);
  const target = normalizeNode(targetRaw);

  if (movingNode.i === target.i) return dedupeLayoutById(cloneLayout(layout || []));

  const without = (layout || [])
    .map((n) => cloneNode(n))
    .filter((n) => getNodeId(n) !== movingNode.i && getNodeId(n) !== target.i);

  const movingAtTarget = { ...movingNode, x: target.x, y: target.y };
  const targetAtMoving = { ...target, x: movingNode.x, y: movingNode.y };

  if (!isWithinBounds(movingAtTarget, cols) || !isWithinBounds(targetAtMoving, cols)) {
    return null;
  }

  if (
    collidesWithLayout(without, movingAtTarget, movingAtTarget.i) ||
    collidesWithLayout(without, targetAtMoving, targetAtMoving.i)
  ) {
    return null;
  }

  return dedupeLayoutById([...without, movingAtTarget, targetAtMoving]);
};

/**
 * Finds a near-free position for a target node using motion-aware bias.
 * The search favors lateral displacement and only falls back to vertical motion when needed.
 *
 * @param {Array} layout
 * @param {Object} movingNodeRaw
 * @param {Object} targetRaw
 * @param {number} cols
 * @param {number} maxDepth
 * @param {boolean} symmetry
 * @returns {Object|null}
 */
const findNearestFreePosition = (
  layout = [],
  movingNodeRaw,
  targetRaw,
  cols,
  maxDepth = 8,
  symmetry = true,
) => {
  const movingNode = normalizeNode(movingNodeRaw);
  const target = normalizeNode(targetRaw);
  const base = (layout || []).filter((l) => getNodeId(l) !== target.i);

  const acx = target.x + target.w / 2;
  const acy = target.y + target.h / 2;
  const mcx = movingNode.x + movingNode.w / 2;
  const mcy = movingNode.y + movingNode.h / 2;

  const vx = acx - mcx;
  const vy = acy - mcy;

  return findFreePlacementAStar(base, target, cols, {
    maxDepth,
    biasVector: { x: vx, y: vy },
    symmetry,
    preferredX: target.x,
    preferredY: target.y,
    excludeId: target.i,
    horizontalFirst: true,
    horizontalWeight: 0.5,
    verticalWeight: 2.3,
    rowStickiness: 0.85,
    downwardWeight: 1.4,
    upwardWeight: 0.8,
  });
};

/**
 * Resolves a node against a set of obstacles using a physics-inspired cost model.
 * This version strongly prefers horizontal displacement over vertical movement.
 *
 * @param {Array} layout
 * @param {Object} movingNodeRaw
 * @param {Object} targetRaw
 * @param {number} cols
 * @param {number} maxDepth
 * @param {boolean} symmetry
 * @returns {Object|null}
 */
const resolveTargetNode = (
  layout = [],
  movingNodeRaw,
  targetRaw,
  cols,
  maxDepth = 8,
  symmetry = true,
) => {
  const movingNode = normalizeNode(movingNodeRaw);
  const target = normalizeNode(targetRaw);
  const others = (layout || []).filter((l) => getNodeId(l) !== target.i);

  const manifolds = others
    .map((o) => ({ node: o, manifold: getCollisionManifold(o, target) }))
    .filter((item) => item.manifold);

  if (!manifolds.length) return target;

  manifolds.sort((a, b) => b.manifold.depth - a.manifold.depth);

  const strongest = manifolds[0];
  const mtv = strongest.manifold.mtv;

  const movingCx = movingNode.x + movingNode.w / 2;
  const targetCx = target.x + target.w / 2;

  const horizontalEscape = targetCx >= movingCx ? 1 : -1;

  const biasVector = {
    x: mtv.x !== 0 ? mtv.x : horizontalEscape * Math.max(1, target.w),
    y: mtv.y !== 0 ? mtv.y * 0.35 : target.y - movingNode.y,
  };

  const placed = findFreePlacementAStar(others, target, cols, {
    maxDepth,
    biasVector,
    symmetry,
    preferredX: target.x + (mtv.x ? mtv.x : horizontalEscape),
    preferredY: target.y + (mtv.y ? mtv.y * 0.25 : 0),
    excludeId: target.i,
    horizontalFirst: true,
    horizontalWeight: 0.45,
    verticalWeight: 2.45,
    rowStickiness: 1,
    downwardWeight: 1.45,
    upwardWeight: 0.8,
  });

  if (placed) return placed;

  return findNearestFreePosition(layout, movingNode, target, cols, maxDepth, symmetry);
};

/**
 * Reflow propagation engine.
 *
 * The algorithm is intentionally conservative:
 * - it resolves the direct collision first
 * - propagates only to affected neighbors
 * - uses a bounded queue to avoid infinite loops
 * - applies a final sanity pass and optional sticky compacting
 *
 * @param {Array} baseLayout
 * @param {Object} movingNodeRaw
 * @param {Object} opts
 * @returns {{ layout:Array, success:boolean, movedSet:Set<string|number> }}
 */
const reflowPropagation = (baseLayout = [], movingNodeRaw, opts = {}) => {
  const {
    cols = 12,
    maxDepth = 8,
    symmetry = true,
    sticky = false,
  } = opts;

  const layout = (baseLayout || []).map((l) => cloneNode(l));
  const movingNode = normalizeNode(movingNodeRaw);
  const movingId = getNodeId(movingNode);
  const movedSet = new Set();

  const initialColls = getCollidingNodes(layout, movingNode, movingId);

  if (initialColls.some((n) => n.static)) {
    const candidatePlace = findFreePlacementAStar(layout, movingNode, cols, {
      maxDepth,
      biasVector: { x: movingNode.x, y: movingNode.y },
      symmetry,
      preferredX: movingNode.x,
      preferredY: movingNode.y,
      excludeId: movingId,
      horizontalFirst: true,
      horizontalWeight: 0.5,
      verticalWeight: 2.3,
      rowStickiness: 0.9,
    });

    if (candidatePlace) {
      const out = dedupeLayoutById([...layout.filter((n) => getNodeId(n) !== movingId), candidatePlace]);
      return { layout: sticky ? compactUp(out, cols) : out, success: true, movedSet };
    }

    return { layout: dedupeLayoutById([...layout, movingNode]), success: false, movedSet };
  }

  const queue = initialColls.map((c) => getNodeId(c)).filter((id) => id !== undefined);
  const seen = new Set(queue);
  let attempts = 0;
  const maxAttempts = Math.max(200, layout.length * 10);

  while (queue.length && attempts < maxAttempts) {
    attempts++;
    const targetId = queue.shift();
    const idx = layout.findIndex((l) => getNodeId(l) === targetId);
    if (idx === -1) continue;

    const target = layout[idx];
    if (target.static) continue;

    const targetManifold = getCollisionManifold(target, movingNode);
    if (!targetManifold && !getCollidingNodes(layout, target, target.i).length) continue;

    const resolved = resolveTargetNode(layout, movingNode, target, cols, maxDepth, symmetry);
    if (!resolved) continue;

    layout[idx] = normalizeNode(resolved);
    movedSet.add(targetId);

    const nextColls = layout
      .filter((n) => getNodeId(n) !== targetId)
      .filter((n) => hasAabbCollision(n, layout[idx]));

    for (const nc of nextColls) {
      const id = getNodeId(nc);
      if (id === undefined || nc.static) continue;
      if (movedSet.has(id) || seen.has(id)) continue;
      seen.add(id);
      queue.push(id);
    }
  }

  const safety = layout.map((n) => ({ ...n }));
  let changed = true;
  let guard = 0;

  while (changed && guard < layout.length * 4) {
    guard++;
    changed = false;

    for (let i = 0; i < safety.length; i++) {
      for (let j = i + 1; j < safety.length; j++) {
        const a = safety[i];
        const b = safety[j];
        const manifold = getCollisionManifold(a, b);
        if (!manifold) continue;

        changed = true;

        const aCenterX = a.x + a.w / 2;
        const bCenterX = b.x + b.w / 2;
        const moveBFirst = bCenterX >= aCenterX;

        const stepX = manifold.axis === 'x'
          ? (manifold.mtv.x >= 0 ? 1 : -1)
          : (bCenterX >= aCenterX ? 1 : -1);

        const stepY = manifold.axis === 'y'
          ? (manifold.mtv.y >= 0 ? 1 : -1)
          : 1;

        const tryVariants = moveBFirst
          ? [
              { x: b.x + stepX, y: b.y },
              { x: b.x - stepX, y: b.y },
              { x: b.x + stepX, y: Math.max(0, b.y + 1) },
              { x: b.x - stepX, y: Math.max(0, b.y + 1) },
              { x: b.x, y: b.y + stepY },
            ]
          : [
              { x: a.x + stepX, y: a.y },
              { x: a.x - stepX, y: a.y },
              { x: a.x + stepX, y: Math.max(0, a.y + 1) },
              { x: a.x - stepX, y: Math.max(0, a.y + 1) },
              { x: a.x, y: a.y + stepY },
            ];

        if (moveBFirst && !b.static) {
          let placed = false;
          for (const candidate of tryVariants) {
            const next = { ...b, x: candidate.x, y: candidate.y };
            if (!isWithinBounds(next, cols)) continue;
            if (safety.some((n, idx) => idx !== j && hasAabbCollision(n, next))) continue;
            safety[j] = next;
            placed = true;
            break;
          }
          if (!placed) {
            safety[j] = { ...b, y: Math.max(0, b.y + 1) };
          }
        } else if (!a.static) {
          let placed = false;
          for (const candidate of tryVariants) {
            const next = { ...a, x: candidate.x, y: candidate.y };
            if (!isWithinBounds(next, cols)) continue;
            if (safety.some((n, idx) => idx !== i && hasAabbCollision(n, next))) continue;
            safety[i] = next;
            placed = true;
            break;
          }
          if (!placed) {
            safety[i] = { ...a, y: Math.max(0, a.y + 1) };
          }
        }
      }
    }
  }

  const afterSticky = sticky ? compactUp(safety, cols) : safety;
  const finalColls = getCollidingNodes(afterSticky, movingNode, movingId);
  const success = finalColls.length === 0;

  const outLayout = success
    ? dedupeLayoutById([...afterSticky, movingNode])
    : dedupeLayoutById([...layout, movingNode]);

  return {
    layout: outLayout,
    success,
    movedSet,
  };
};

/**
 * Main collision resolver.
 *
 * Behavior:
 * - no collision: inserts the moving node directly
 * - swap mode: attempts a safe swap
 * - static collision: uses A* placement search
 * - push/reflow: propagates collisions with a bounded, stable queue
 *
 * @param {Array} layout
 * @param {Object} movingNodeRaw
 * @param {Object} opts
 * @returns {{ layout:Array, movedNode:Object, success:boolean, changes?:Object }}
 */
export function resolveCollision(layout = [], movingNodeRaw, opts = {}) {
  const {
    cols = 12,
    collisionMode = 'push',
    maxDepth = 8,
    allowOverlap = false,
    reflow = true,
    reflowOnResize = true, // kept for compatibility; hook-level policy can use it upstream
    reflowSymmetry = true,
    sticky = false,
  } = opts;

  const base = cloneLayout(layout || []);
  const movingNode = normalizeNode(movingNodeRaw);
  const movingId = getNodeId(movingNode);
  const other = base.filter((l) => getNodeId(l) !== movingId);

  const initialColls = getCollidingNodes(other, movingNode, movingId);

  if (initialColls.length === 0) {
    const out = dedupeLayoutById([...other, movingNode]);
    return {
      layout: sticky ? compactUp(out, cols) : out,
      movedNode: movingNode,
      success: true,
    };
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
      if (target.static) continue;

      const swapped = trySwap(base, movingNode, target, cols);
      if (swapped) {
        return {
          layout: sticky ? compactUp(swapped, cols) : swapped,
          movedNode: movingNode,
          success: true,
        };
      }
    }
  }

  if (initialColls.some((n) => n.static)) {
    const candidatePlace = findFreePlacementAStar(other, movingNode, cols, {
      maxDepth,
      biasVector: { x: movingNode.x, y: movingNode.y },
      symmetry: reflowSymmetry,
      preferredX: movingNode.x,
      preferredY: movingNode.y,
      excludeId: movingId,
      horizontalFirst: true,
      horizontalWeight: 0.5,
      verticalWeight: 2.35,
      rowStickiness: 0.85,
    });

    if (candidatePlace) {
      const out = dedupeLayoutById([...other, candidatePlace]);
      return {
        layout: sticky ? compactUp(out, cols) : out,
        movedNode: candidatePlace,
        success: true,
      };
    }

    return {
      layout: dedupeLayoutById([...base]),
      movedNode: movingNode,
      success: false,
    };
  }

  if (reflow) {
    const { layout: rLayout, success, movedSet } = reflowPropagation(other, movingNode, {
      cols,
      maxDepth,
      symmetry: reflowSymmetry,
      sticky,
    });

    if (success) {
      const out = sticky ? compactUp(rLayout, cols) : rLayout;
      return {
        layout: out,
        movedNode: movingNode,
        success: true,
        changes: { moved: Array.from(movedSet) },
      };
    }
  }

  let currentLayout = [...other];
  const movedIds = new Set();
  const queue = [...initialColls.map((c) => getNodeId(c)).filter((id) => id !== undefined)];
  let attempts = 0;
  const maxAttempts = Math.max(200, currentLayout.length * 8);

  while (queue.length && attempts < maxAttempts) {
    attempts++;
    const idToMove = queue.shift();
    if (movedIds.has(idToMove)) continue;

    const idx = currentLayout.findIndex((n) => getNodeId(n) === idToMove);
    if (idx === -1) continue;

    const affectedNode = currentLayout[idx];
    if (affectedNode.static) continue;

    const candidateBias = {
      x: movingNode.x - affectedNode.x,
      y: movingNode.y - affectedNode.y,
    };

    let pushed = null;

    for (let d = 1; d <= maxDepth; d++) {
      const awayX = candidateBias.x >= 0 ? 1 : -1;

      const tryCandidates = [
        // horizontal first
        { x: affectedNode.x + awayX * d, y: affectedNode.y },
        { x: affectedNode.x - awayX * d, y: affectedNode.y },
        // small lateral + tiny vertical drift
        { x: affectedNode.x + awayX * d, y: Math.max(0, affectedNode.y + 1) },
        { x: affectedNode.x - awayX * d, y: Math.max(0, affectedNode.y + 1) },
        // only then vertical motion
        { x: affectedNode.x, y: affectedNode.y + d },
        { x: affectedNode.x, y: Math.max(0, affectedNode.y - 1) },
      ];

      let bestCandidate = null;
      let bestScore = Number.POSITIVE_INFINITY;

      for (const candidate of tryCandidates) {
        const next = { ...affectedNode, x: candidate.x, y: candidate.y };
        if (!isWithinBounds(next, cols)) continue;

        const testLayout = currentLayout.map((n) => (getNodeId(n) === idToMove ? next : n));
        const colliding = testLayout.some((n) => getNodeId(n) !== movingId && hasAabbCollision(n, movingNode));
        if (colliding) continue;

        const sc = scorePosition(
          currentLayout,
          affectedNode,
          next.x,
          next.y,
          cols,
          {
            preferredX: affectedNode.x + (awayX * Math.min(1, d)),
            preferredY: affectedNode.y,
            horizontalWeight: 0.4,
            verticalWeight: 2.4,
            rowStickiness: 1.2,
            gravityWeight: 0.4,
            inertiaWeight: 0.8,
            axisWeight: 0.4,
            edgeWeight: 0.2,
          }
        );

        if (sc < bestScore) {
          bestScore = sc;
          bestCandidate = next;
        }
      }

      if (bestCandidate) {
        pushed = bestCandidate;
        break;
      }
    }

    if (pushed) {
      currentLayout = currentLayout.map((n) => (getNodeId(n) === idToMove ? pushed : n));
      movedIds.add(idToMove);

      const newColls = currentLayout
        .filter((n) => getNodeId(n) !== idToMove)
        .filter((n) => hasAabbCollision(n, pushed));

      for (const nc of newColls) {
        const id = getNodeId(nc);
        if (id === undefined || nc.static) continue;
        if (!movedIds.has(id)) queue.push(id);
      }
    }
  }

  const finalColls = currentLayout.filter((n) => hasAabbCollision(n, movingNode));
  const success = finalColls.length === 0;

  const outLayoutRaw = success
    ? dedupeLayoutById([...currentLayout, movingNode])
    : dedupeLayoutById([...base]);

  const outLayout = sticky ? compactUp(outLayoutRaw, cols) : outLayoutRaw;

  return {
    layout: outLayout,
    movedNode: movingNode,
    success,
    changes: { moved: Array.from(movedIds) },
  };
}

export { compactUp, reflowPropagation };

export default {
  resolveCollision,
};