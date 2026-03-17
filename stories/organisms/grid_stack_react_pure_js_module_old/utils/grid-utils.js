/**
 * src/utils/grid-utils.js
 *
 * Utility helpers for grid layout: collision detection, cloning and bounds checks.
 */

const getId = (item) => item?.i ?? item?.id;

/**
 * normalizeNode - ensure node has numeric x,y,w,h and property 'i' (id)
 */
export const normalizeNode = (node = {}) => {
  const i = getId(node);
  const x = Number.isFinite(Number(node.x)) ? Number(node.x) : 0;
  const y = Number.isFinite(Number(node.y)) ? Number(node.y) : 0;
  const w = Number.isFinite(Number(node.w)) ? Math.max(1, Number(node.w)) : 1;
  const h = Number.isFinite(Number(node.h)) ? Math.max(1, Number(node.h)) : 1;
  const _static = !!node.static;
  return { i, x, y, w, h, static: _static };
};

/**
 * cloneLayout - deep-ish clone of layout and normalize nodes
 */
export const cloneLayout = (layout = []) => {
  if (!Array.isArray(layout)) return [];
  return layout.map((it) => ({ ...normalizeNode(it) }));
};

/**
 * dedupeLayoutById - keep the last occurrence for each id (preserve order of first appearance)
 * This prevents accidental duplicates like [...other, movingNode, otherCopy]
 */
export const dedupeLayoutById = (layout = []) => {
  const map = new Map();
  // iterate forward but overwrite so last same-id wins (useful when appending movingNode)
  for (const it of layout) {
    const node = normalizeNode(it);
    map.set(node.i, node);
  }
  return Array.from(map.values());
};

/**
 * rectsCollide - robust collision check using numeric coersion.
 * Treats touching edges as NON-colliding (consistent with grid usage).
 */
export const rectsCollide = (a = {}, b = {}) => {
  if (!a || !b) return false;
  const ax1 = Number(a.x || 0);
  const ay1 = Number(a.y || 0);
  const ax2 = ax1 + Number(a.w || 0);
  const ay2 = ay1 + Number(a.h || 0);

  const bx1 = Number(b.x || 0);
  const by1 = Number(b.y || 0);
  const bx2 = bx1 + Number(b.w || 0);
  const by2 = by1 + Number(b.h || 0);

  if (ax2 <= bx1) return false;
  if (ax1 >= bx2) return false;
  if (ay2 <= by1) return false;
  if (ay1 >= by2) return false;
  return true;
};

/**
 * inBounds - node inside horizontal bounds [0..cols) and y >= 0
 */
export const inBounds = (node = {}, cols = 12) => {
  if (!node) return false;
  if (typeof cols !== 'number' || cols <= 0) return false;
  const n = normalizeNode(node);
  if (n.x < 0 || n.y < 0) return false;
  if (n.x + n.w > cols) return false;
  return true;
};

export const findById = (layout = [], id) => {
  if (!Array.isArray(layout)) return null;
  return layout.find((it) => getId(it) === id) || null;
};

export const toNumber = (val, fallback = 0) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
};

export default {
  getId,
  cloneLayout,
  dedupeLayoutById,
  rectsCollide,
  inBounds,
  findById,
  toNumber,
  normalizeNode,
};
