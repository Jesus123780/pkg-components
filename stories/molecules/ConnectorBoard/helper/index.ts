/**
 * Builds nodes and relations from the product JSON.
 * Each card gets a random starting position (you can tweak this).
 */
export const buildGraphData = (cart: any) => {
  const nodes: Array<{ id: string; label: string; x: number; y: number }> = [];
  const relations: Array<{ parentId: string; childId: string }> = [];

  const rootId = cart.products.pId;

  // 1. Product root
  nodes.push({
    id: rootId,
    label: cart.products.pName,
    x: 200,
    y: 100
  });

  // 2. Optional categories
  cart.products.ExtProductFoodOptional.forEach((opt: any, i: number) => {
    nodes.push({
      id: opt.opExPid,
      label: opt.OptionalProName,
      x: 100,
      y: 250 + i * 200
    });

    relations.push({
      parentId: rootId,
      childId: opt.opExPid
    });

    // Sub-options (subcategories)
    opt.ExtProductFoodsSubOptionalAll.forEach((sub: any, j: number) => {
      nodes.push({
        id: sub.opSubExPid,
        label: sub.OptionalSubProName,
        x: 400,
        y: 250 + i * 200 + j * 120
      });

      relations.push({
        parentId: opt.opExPid,
        childId: sub.opSubExPid
      });
    });
  });

  // 3. Extras with price
  cart.products.ExtProductFoodsAll.forEach((extra: any, i: number) => {
    nodes.push({
      id: extra.exPid,
      label: `${extra.extraName} ($${extra.extraPrice})`,
      x: 200,
      y: 600 + i * 150
    });

    relations.push({
      parentId: rootId,
      childId: extra.exPid
    });
  });

  return { nodes, relations };
}

/** ================================
 * Utility: select best edge anchors
 * ================================ */
export const computeAnchors = (a?: DOMRect, b?: DOMRect) => {
    if (!a || !b) return null;

    const aEdges = [
        { x: a.left + a.width / 2, y: a.top },
        { x: a.left + a.width / 2, y: a.bottom },
        { x: a.left, y: a.top + a.height / 2 },
        { x: a.right, y: a.top + a.height / 2 }
    ];
    const bEdges = [
        { x: b.left + b.width / 2, y: b.top },
        { x: b.left + b.width / 2, y: b.bottom },
        { x: b.left, y: b.top + b.height / 2 },
        { x: b.right, y: b.top + b.height / 2 }
    ];

    let best: any = null;

    for (const p of aEdges) {
        for (const q of bEdges) {
            const d = Math.hypot(p.x - q.x, p.y - q.y);
            if (!best || d < best.dist) best = { p, q, dist: d };
        }
    }

    return best ? [best.p, best.q] as const : null;
};
