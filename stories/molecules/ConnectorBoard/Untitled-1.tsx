// ConnectorBoard.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";

/** ================================
 * Types
 * ================================ */

export interface CardData {
  id: string;
  label?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  parentId?: string | null;
}

interface NodeRegistryItem {
  id: string;
  el: HTMLElement | null;
  rect?: DOMRect;
  data: CardData;
}

export interface ConnectorControl {
  cx: number;
  cy: number;
}

export interface ConnectorBoardHandle {
  recalc(): void;
  getRects(): Record<string, DOMRect | undefined>;
}

/** Relation supports optional curve flag now */
export interface Relation {
  from: string;
  to: string;
  curve?: boolean; // optional: true = curved, false = straight
}

/** ================================
 * Context
 * ================================ */

const ConnectorContext = createContext<{
  register: (id: string, el: HTMLElement | null, data: CardData) => void;
  unregister: (id: string) => void;
  updatePos: (id: string, x: number, y: number) => void;
  getRects: () => Record<string, DOMRect | undefined>;
  recalc: () => void;
} | null>(null);

export const useConnectorPositions = () => {
  const ctx = useContext(ConnectorContext);
  if (!ctx) throw new Error("Must use inside <ConnectorBoard>");
  return { positions: ctx.getRects(), recalc: ctx.recalc };
};

/** ================================
 * Utils
 * ================================ */

const computeAnchors = (a?: DOMRect, b?: DOMRect) => {
  if (!a || !b) return null;

  const aEdges = [
    { x: a.left + a.width / 2, y: a.top }, // top
    { x: a.left + a.width / 2, y: a.bottom }, // bottom
    { x: a.left, y: a.top + a.height / 2 }, // left
    { x: a.right, y: a.top + a.height / 2 } // right
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
  return best ? ([best.p, best.q] as const) : null;
};

/** ================================
 * LineConnector (now supports `curve?: boolean`)
 * - curve=true => Cubic Bezier with handle
 * - curve=false => Straight line (no handle)
 * Hooks order stable.
 * ================================ */
const LineConnector: React.FC<{
  id: string;
  from: string;
  to: string;
  control: ConnectorControl | null;
  onControl: (id: string, c: ConnectorControl) => void;
  curve?: boolean; // NEW prop
}> = ({ id, from, to, control, onControl, curve = true }) => {
  // STABLE HOOKS
  const { positions } = useConnectorPositions(); // 1
  const svgRef = useRef<SVGSVGElement | null>(null); // 2
  const pathRef = useRef<SVGPathElement | null>(null); // 3
  const circleRef = useRef<SVGCircleElement | null>(null); // 4
  const [dragging, setDragging] = useState(false); // 5
  const [hovered, setHovered] = useState(false); // 6

  // refs for offset & bounce
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const bounceFrameRef = useRef<number | null>(null);
  const controlRef = useRef<ConnectorControl | null>(control);
  useEffect(() => {
    controlRef.current = control;
  }, [control]);

  useEffect(() => {
    return () => {
      if (bounceFrameRef.current) cancelAnimationFrame(bounceFrameRef.current);
    };
  }, []);

  // compute endpoints (after hooks)
  const startRect = positions[from];
  const endRect = positions[to];
  if (!startRect || !endRect) return null;

  const anchors = computeAnchors(startRect, endRect);
  if (!anchors) return null;
  const [start, end] = anchors;

  // default control (absolute coords)
  const defaultCtrl = control ?? {
    cx: (start.x + end.x) / 2,
    cy: (start.y + end.y) / 2 - 40
  };

  // geometry helpers for both modes
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.max(1, Math.hypot(dx, dy));
  const ctrlOffset = Math.min(120, distance / 2);

  // two candidate control points for curves
  const control1 = {
    x: start.x + dx * 0.25 - (dy / distance) * ctrlOffset,
    y: start.y + dy * 0.25 + (dx / distance) * ctrlOffset
  };
  const control2 = {
    x: start.x + dx * 0.75 - (dy / distance) * ctrlOffset,
    y: start.y + dy * 0.75 + (dx / distance) * ctrlOffset
  };

  const bias = (t: { x: number; y: number }, ctrlPt: ConnectorControl) => ({
    x: t.x * 0.6 + ctrlPt.cx * 0.4,
    y: t.y * 0.6 + ctrlPt.cy * 0.4
  });

  const biased1 = bias(control1, defaultCtrl);
  const biased2 = bias(control2, defaultCtrl);

  // compute SVG bounding box that contains everything (safe padding)
  const padding = 28;
  const minX = Math.min(start.x, end.x, (controlRef.current ?? defaultCtrl).cx) - padding;
  const minY = Math.min(start.y, end.y, (controlRef.current ?? defaultCtrl).cy) - padding;
  const maxX = Math.max(start.x, end.x, (controlRef.current ?? defaultCtrl).cx) + padding;
  const maxY = Math.max(start.y, end.y, (controlRef.current ?? defaultCtrl).cy) + padding;
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);

  const toLocal = (p: { x: number; y: number }) => ({ x: p.x - minX, y: p.y - minY });
  const s = toLocal(start);
  const e = toLocal(end);

  // If straight line mode
  if (!curve) {
    // simple straight path from start to end (no handle)
    const straightPath = `M ${s.x},${s.y} L ${e.x},${e.y}`;

    // path entrance animation (dash)
    useEffect(() => {
      const el = pathRef.current;
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      requestAnimationFrame(() => {
        el.style.transition = "stroke-dashoffset 420ms cubic-bezier(.22,1,.36,1)";
        el.style.strokeDashoffset = "0";
      });
    }, [from, to]);

    return (
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          left: minX,
          top: minY,
          width,
          height,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 0
        }}
        aria-hidden
      >
        <defs>
          <marker id={`arrow-${id}`} markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#111" />
          </marker>
        </defs>

        <path
          ref={pathRef}
          d={straightPath}
          stroke="#111"
          strokeWidth={Math.max(1, Math.min(2.8, distance / 220 + 1))}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={`url(#arrow-${id})`}
          style={{ transition: "stroke 140ms ease" }}
          pointerEvents="none"
        />
      </svg>
    );
  }

  // --- curve mode (curved Cubic Bezier with handle) ---

  // bias control points toward current control (gives organic feel)
  const ctrlAbs = controlRef.current ?? defaultCtrl;
  const b1 = bias(control1, ctrlAbs);
  const b2 = bias(control2, ctrlAbs);

  const localC1 = toLocal(b1);
  const localC2 = toLocal(b2);
  const localCtrl = toLocal(ctrlAbs);

  const pathD = `M ${s.x},${s.y} C ${localC1.x},${localC1.y} ${localC2.x},${localC2.y} ${e.x},${e.y}`;

  // entrance animation for path (dash)
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      el.style.transition = "stroke-dashoffset 520ms cubic-bezier(.22,1,.36,1)";
      el.style.strokeDashoffset = "0";
    });
  }, [from, to, control]);

  // Dragging: compute offset so handle doesn't jump
  useEffect(() => {
    if (!dragging) return;

    const onPointerMove = (e: PointerEvent) => {
      const newCx = e.clientX - pointerOffsetRef.current.x;
      const newCy = e.clientY - pointerOffsetRef.current.y;
      onControl(id, { cx: newCx, cy: newCy });
    };

    const onPointerUp = () => {
      setDragging(false);
      startBounce();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [dragging, id, onControl]);

  // Bounce (damped sine)
  const startBounce = () => {
    if (bounceFrameRef.current) {
      cancelAnimationFrame(bounceFrameRef.current);
      bounceFrameRef.current = null;
    }

    const startTime = performance.now();
    const duration = 800;
    const freq = 6.5;
    const damping = 6.5;

    const src = controlRef.current ?? defaultCtrl;
    const target = defaultCtrl;
    const deltaX = src.cx - target.cx;
    const deltaY = src.cy - target.cy;

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const damp = Math.exp(-damping * t);
      const osc = Math.cos(2 * Math.PI * freq * t);
      const factor = damp * osc;
      const cx = target.cx + deltaX * factor;
      const cy = target.cy + deltaY * factor;
      onControl(id, { cx, cy });

      if (t < 1 && Math.abs(deltaX * factor) + Math.abs(deltaY * factor) > 0.4) {
        bounceFrameRef.current = requestAnimationFrame(step);
      } else {
        onControl(id, { cx: target.cx, cy: target.cy });
        bounceFrameRef.current = null;
      }
    };

    bounceFrameRef.current = requestAnimationFrame(step);
  };

  // compute actual center of handle in screen coords so we can compute pointer offset
  const getHandleCenter = () => {
    const el = circleRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  };

  const onHandlePointerDown = (ev: React.PointerEvent<SVGCircleElement>) => {
    ev.stopPropagation();
    try {
      (ev.target as Element).setPointerCapture((ev as any).pointerId);
    } catch {}
    const center = getHandleCenter();
    if (center) {
      pointerOffsetRef.current = { x: ev.clientX - center.cx, y: ev.clientY - center.cy };
    } else {
      // fallback to control absolute pos
      pointerOffsetRef.current = { x: ev.clientX - ctrlAbs.cx, y: ev.clientY - ctrlAbs.cy };
    }
    setDragging(true);
  };

  const baseStroke = Math.max(1.2, Math.min(3.2, distance / 220 + 1.2));
  const strokeColor = dragging ? "#0A84FF" : hovered ? "#111" : "#1F2937";

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        left: minX,
        top: minY,
        width,
        height,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 0
      }}
      aria-hidden
    >
      <defs>
        <filter id={`softShadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.06)" />
        </filter>
        <marker id={`arrow-${id}`} markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
          <path d="M0,0 L10,4 L0,8 z" fill={strokeColor} />
        </marker>
      </defs>

      {/* subtle shadow */}
      <path
        d={pathD}
        stroke="rgba(0,0,0,0.06)"
        strokeWidth={baseStroke + 4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `url(#softShadow-${id})`, opacity: 0.9 }}
        pointerEvents="none"
      />

      {/* main path */}
      <path
        ref={pathRef}
        d={pathD}
        stroke={strokeColor}
        strokeWidth={baseStroke}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#arrow-${id})`}
        style={{ transition: "stroke 160ms ease" }}
        pointerEvents="none"
      />

      {/* decorative small handles (visual) */}
      <circle cx={localC1.x} cy={localC1.y} r={6} fill="#fff" stroke="#111" strokeWidth={1} pointerEvents="none" />
      <circle cx={localC2.x} cy={localC2.y} r={6} fill="#fff" stroke="#111" strokeWidth={1} pointerEvents="none" />

      {/* draggable handle */}
      <g transform={`translate(${localCtrl.x}, ${localCtrl.y})`} style={{ pointerEvents: "all", cursor: dragging ? "grabbing" : "grab" }}>
        <circle
          ref={circleRef}
          cx={0}
          cy={0}
          r={hovered || dragging ? 12 : 9}
          fill="#fff"
          stroke={strokeColor}
          strokeWidth={1.6}
          onPointerDown={onHandlePointerDown}
          onPointerUp={() => {
            setDragging(false);
            startBounce();
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          style={{ transition: "r 140ms cubic-bezier(.22,1,.36,1)" }}
        />
        <circle cx={0} cy={0} r={3} fill={strokeColor} pointerEvents="none" />
      </g>
    </svg>
  );
};

/** ================================
 * Card component (unchanged)
 * ================================ */
const Card: React.FC<{ data: CardData; onMove: (next: CardData) => void }> = ({ data, onMove }) => {
  const ctx = useContext(ConnectorContext);
  if (!ctx) throw new Error("Must be inside ConnectorBoard");

  const el = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: data.x, y: data.y });
  const drag = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    ctx.register(data.id, el.current, data);
    return () => ctx.unregister(data.id);
  }, [data.id, ctx]);

  useEffect(() => {
    const box = el.current;
    if (!box) return;

    const down = (e: PointerEvent) => {
      drag.current = true;
      offset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y };
      try {
        box.setPointerCapture(e.pointerId);
      } catch {}
    };

    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      const x = e.clientX - offset.current.x;
      const y = e.clientY - offset.current.y;
      pos.current = { x, y };
      box.style.transform = `translate(${x}px, ${y}px)`;
      ctx.updatePos(data.id, x, y);
      onMove({ ...data, x, y });
    };

    const up = () => (drag.current = false);

    box.addEventListener("pointerdown", down as any);
    window.addEventListener("pointermove", move as any);
    window.addEventListener("pointerup", up as any);

    return () => {
      box.removeEventListener("pointerdown", down as any);
      window.removeEventListener("pointermove", move as any);
      window.removeEventListener("pointerup", up as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={el}
      style={{
        position: "absolute",
        transform: `translate(${data.x}px, ${data.y}px)`,
        width: data.width ?? 150,
        height: data.height ?? 60,
        background: "#fff",
        border: "1.5px solid #222",
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "grab",
        userSelect: "none",
        zIndex: 2
      }}
    >
      {data.label ?? data.id}
    </div>
  );
};

/** ================================
 * ConnectorBoard (relations now accept curve?)
 * ================================ */
export const ConnectorBoard = forwardRef<ConnectorBoardHandle, { initial: CardData[]; relations: Relation[] }>(
  ({ initial, relations }, ref) => {
    const registry = useRef<Record<string, NodeRegistryItem>>({});
    const [cards, setCards] = useState<CardData[]>(() => initial.map((c) => ({ ...c })));
    const [controls, setControls] = useState<Record<string, ConnectorControl>>({});

    const register = useCallback((id: string, el: HTMLElement | null, data: CardData) => {
      if (!el) {
        registry.current[id] = { id, el: null, rect: undefined, data };
        return;
      }
      const w = el.offsetWidth || data.width || 150;
      const h = el.offsetHeight || data.height || 60;
      registry.current[id] = {
        id,
        el,
        rect: {
          x: data.x,
          y: data.y,
          width: w,
          height: h,
          top: data.y,
          left: data.x,
          right: data.x + w,
          bottom: data.y + h
        } as DOMRect,
        data
      };
    }, []);

    const unregister = useCallback((id: string) => {
      delete registry.current[id];
    }, []);

    const updatePos = useCallback((id: string, x: number, y: number) => {
      const node = registry.current[id];
      if (!node) return;
      node.data.x = x;
      node.data.y = y;
      if (node.el) {
        const w = node.el.offsetWidth || (node.data.width ?? 150);
        const h = node.el.offsetHeight || (node.data.height ?? 60);
        node.rect = {
          x,
          y,
          width: w,
          height: h,
          left: x,
          top: y,
          right: x + w,
          bottom: y + h
        } as DOMRect;
      }
    }, []);

    const getRects = useCallback(() => {
      const out: Record<string, DOMRect | undefined> = {};
      for (const k in registry.current) {
        const node = registry.current[k];
        if (!node.el) {
          out[k] = node.rect;
          continue;
        }
        const w = node.el.offsetWidth || (node.data.width ?? 150);
        const h = node.el.offsetHeight || (node.data.height ?? 60);
        const x = node.data.x;
        const y = node.data.y;
        out[k] = {
          x,
          y,
          width: w,
          height: h,
          left: x,
          top: y,
          right: x + w,
          bottom: y + h
        } as DOMRect;
      }
      return out;
    }, []);

    const recalc = useCallback(() => {
      for (const k in registry.current) {
        const n = registry.current[k];
        if (n.el) {
          const w = n.el.offsetWidth || (n.data.width ?? 150);
          const h = n.el.offsetHeight || (n.data.height ?? 60);
          n.rect = {
            x: n.data.x,
            y: n.data.y,
            width: w,
            height: h,
            left: n.data.x,
            top: n.data.y,
            right: n.data.x + w,
            bottom: n.data.y + h
          } as DOMRect;
        }
      }
    }, []);

    useImperativeHandle(ref, () => ({ recalc, getRects }), [recalc, getRects]);

    const ctxValue = useMemo(
      () => ({ register, unregister, updatePos, getRects, recalc }),
      [register, unregister, updatePos, getRects, recalc]
    );

    const handleControl = (id: string, c: ConnectorControl) => {
      setControls((p) => ({ ...p, [id]: c }));
    };

    return (
      <ConnectorContext.Provider value={ctxValue}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 600,
            background: "repeating-linear-gradient(0deg,#fff,#fff 24px,#f8f8f8 24px,#f8f8f8 48px)",
            borderRadius: 8
          }}
        >
          {/* connectors under cards */}
          {relations.map((r) => {
            const id = `${r.from}-${r.to}`;
            return (
              <LineConnector
                key={id}
                id={id}
                from={r.from}
                to={r.to}
                control={controls[id] ?? null}
                onControl={handleControl}
                curve={typeof r.curve === "boolean" ? r.curve : true} // default true
              />
            );
          })}

          {/* cards */}
          {cards.map((c) => (
            <Card key={c.id} data={c} onMove={(n) => setCards((p) => p.map((x) => (x.id === n.id ? n : x)))} />
          ))}
        </div>
      </ConnectorContext.Provider>
    );
  }
);

/** ================================
 * Example usage
 * ================================ */
export const ConnectorBoardExample: React.FC = () => {
  const ref = useRef<ConnectorBoardHandle | null>(null);

  return (
    <div>
      <button onClick={() => ref.current?.recalc()}>Recalc Lines</button>

      <ConnectorBoard
        ref={ref}
        initial={[
          { id: "A", label: "Product A", x: 80, y: 160 },
          { id: "B", label: "Product B", x: 350, y: 120, parentId: "A" },
          { id: "C", label: "Product C", x: 650, y: 70, parentId: "B" },
          { id: "D", label: "Sub D", x: 620, y: 260, parentId: "A" }
        ]}
        relations={[
          { from: "A", to: "B", curve: true }, // curved
          { from: "B", to: "C", curve: false }, // straight
          { from: "A", to: "D" } // default curved
        ]}
      />
    </div>
  );
};
