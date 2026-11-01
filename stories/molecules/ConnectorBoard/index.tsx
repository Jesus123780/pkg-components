// ConnectorBoard.tsx
import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import {
    CardData,
    ConnectorBoardHandle,
    ConnectorControl,
    NodeRegistryItem
} from './types';
import { ConnectorContext } from './context';
import { useConnectorPositions } from './hooks';
import { computeAnchors } from './helper';
import { getGlobalStyle } from '../../../helpers';

/** ================================
 * LineConnector (fixed + bounce + offset)
 *
 * - Fixes the 'jump' by computing pointer offset when drag starts
 * - Uses a damped sine bounce on release
 * - Animates path entrance
 * - Keeps hooks order stable
 * ================================ */
const LineConnector: React.FC<{
    id: string;
    from: string;
    to: string;
    control: ConnectorControl | null;
    curve?: boolean; // NEW prop

    onControl: (id: string, c: ConnectorControl) => void
}> = ({ id, from, to, control, curve = true, onControl }) => {
    // Hooks (stable order)
    const { positions } = useConnectorPositions(); // 1
    const svgRef = useRef<SVGSVGElement | null>(null); // 2
    const pathRef = useRef<SVGPathElement | null>(null); // 3
    const [dragging, setDragging] = useState(false); // 4
    const [hovered, setHovered] = useState(false); // 5

    // Refs for offset and bounce frame
    const pointerOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const bounceFrameRef = useRef<number | null>(null);
    const controlRef = useRef<ConnectorControl | null>(control); // keep latest control
    useEffect(() => {
        controlRef.current = control;
    }, [control]);

    // Cleanup RAF when unmount
    useEffect(() => {
        return () => {
            if (bounceFrameRef.current) cancelAnimationFrame(bounceFrameRef.current);
        };
    }, []);

    // Global pointer handlers while dragging (always declared)
    useEffect(() => {
        if (!dragging) return;

        const onPointerMove = (e: PointerEvent) => {
            // Respect offset to avoid jump (client coords - offset = target control absolute coords)
            const newCx = e.clientX - pointerOffsetRef.current.x;
            const newCy = e.clientY - pointerOffsetRef.current.y;
            onControl(id, { cx: newCx, cy: newCy });
        };

        const onPointerUp = () => {
            setDragging(false);
            startBounce(); // launch bounce towards default
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [dragging, id, onControl]); // stable deps

    // Compute endpoints (after hooks)
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

    // geometry
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const offset = Math.min(120, distance / 2);

    // candidate control points
    const control1 = {
        x: start.x + dx * 0.25 - (dy / distance) * offset,
        y: start.y + dy * 0.25 + (dx / distance) * offset
    };
    const control2 = {
        x: start.x + dx * 0.75 - (dy / distance) * offset,
        y: start.y + dy * 0.75 + (dx / distance) * offset
    };

    const bias = (t: { x: number; y: number }, ctrlPt: ConnectorControl) => ({
        x: t.x * 0.6 + ctrlPt.cx * 0.4,
        y: t.y * 0.6 + ctrlPt.cy * 0.4
    });

    const c1 = bias(control1, defaultCtrl);
    const c2 = bias(control2, defaultCtrl);

    // svg bbox
    const padding = 28;
    const minX = Math.min(start.x, end.x, defaultCtrl.cx) - padding;
    const minY = Math.min(start.y, end.y, defaultCtrl.cy) - padding;
    const maxX = Math.max(start.x, end.x, defaultCtrl.cx) + padding;
    const maxY = Math.max(start.y, end.y, defaultCtrl.cy) + padding;
    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);

    // local coords
    const toLocal = (p: { x: number; y: number }) => ({ x: p.x - minX, y: p.y - minY });
    const s = toLocal(start);
    const e = toLocal(end);

    const localC1 = toLocal(c1);
    const localC2 = toLocal(c2);

    // current control absolute (use latest prop if provided, else default)
    const currentCtrlAbs = controlRef.current ?? defaultCtrl;
    const localCtrl = toLocal({ x: currentCtrlAbs.cx, y: currentCtrlAbs.cy });

    const pathD = `M ${s.x},${s.y} C ${localC1.x},${localC1.y} ${localC2.x},${localC2.y} ${e.x},${e.y}`;

    // bounce (damped sine) after release — uses latest controlRef/current default
    const startBounce = () => {
        // cancel old
        if (bounceFrameRef.current) {
            cancelAnimationFrame(bounceFrameRef.current);
            bounceFrameRef.current = null;
        }

        const startTime = performance.now();
        const duration = 800;
        const freq = 6.5;
        const damping = 6.5;

        // source (current) and target (default)
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

            // continue while visible oscillation
            if (t < 1 && Math.abs(deltaX * factor) + Math.abs(deltaY * factor) > 0.4) {
                bounceFrameRef.current = requestAnimationFrame(step);
            } else {
                onControl(id, { cx: target.cx, cy: target.cy });
                bounceFrameRef.current = null;
            }
        };

        bounceFrameRef.current = requestAnimationFrame(step);
    };

    // pointerdown handler on the handle: compute offset and capture pointer
    const onHandlePointerDown = (ev: React.PointerEvent<SVGCircleElement>) => {
        ev.stopPropagation();
        const clientX = ev.clientX;
        const clientY = ev.clientY;
        // determine the current absolute control center
        const cur = controlRef.current ?? defaultCtrl;
        pointerOffsetRef.current = { x: clientX - cur.cx, y: clientY - cur.cy }; // store offset
        try {
            (ev.target as Element).setPointerCapture((ev as any).pointerId);
        } catch { }
        setDragging(true);
    };

    // visual state
    const strokeColor = dragging ? '#007aff' : hovered ? '#0b1220' : '#1f2937';

    if (!curve) {
        // simple straight path from start to end (no handle)
        const straightPath = `M ${s.x},${s.y} L ${e.x},${e.y}`;

        return (
            <svg
                ref={svgRef}
                style={{
                    position: 'absolute',
                    left: minX,
                    top: minY,
                    width,
                    height,
                    overflow: 'visible',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
                aria-hidden
            >
                <defs>
                    <marker id={`arrow-${id}`} markerWidth='10' markerHeight='8' refX='8' refY='4' orient='auto'>
                        <path d='M0,0 L8,4 L0,8 z' fill={getGlobalStyle('--color-icons-black')} />
                    </marker>
                </defs>

                <path
                    ref={pathRef}
                    d={straightPath}
                    stroke={getGlobalStyle('--color-icons-black')}
                    strokeWidth={Math.max(1, Math.min(2.8, distance / 220 + 1))}
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    markerEnd={`url(#arrow-${id})`}
                    style={{ transition: 'stroke 140ms ease' }}
                    pointerEvents='none'
                />
            </svg>
        );
    }

    return (
        <svg
            ref={svgRef}
            style={{
                position: 'absolute',
                left: minX,
                top: minY,
                width: 2,
                height,
                overflow: 'visible',
                pointerEvents: 'none',
                zIndex: 0
            }}
            aria-hidden
        >
            <defs>
                <filter id={`softShadow-${id}`} x='-50%' y='-50%' width='200%' height='200%'>
                    <feDropShadow dx='0' dy='6' stdDeviation='8' floodColor='rgba(0,0,0,0.06)' />
                </filter>

                {/* marker as a circle */}
                <marker
                    id={`arrow-${id}`}
                    markerWidth='12'
                    markerHeight='12'
                    refX='6'
                    refY='6'
                    orient='auto'
                    markerUnits='strokeWidth'
                >
                    <circle cx='6' cy='6' r='4' fill={strokeColor} pointerEvents='none' />
                </marker>
            </defs>

            {/* soft shadow under path */}
            <path
                d={pathD}
                stroke='rgba(0,0,0,0.06)'
                strokeWidth={4}
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                style={{ filter: `url(#softShadow-${id})`, opacity: 0.96 }}
                pointerEvents='none'
            />

            {/* main animated path */}
            <path
                ref={pathRef}
                className='main-connector'
                d={pathD}
                stroke={strokeColor}
                strokeWidth={Math.max(0.8, 2.2 - (distance / 100))}
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                markerEnd={`url(#arrow-${id})`}
                style={{ transition: 'stroke 160ms ease' }}
                pointerEvents='none'
            />

            {/* decorative control visuals */}
            <circle
                cx={localC1.x}
                cy={localC1.y}
                r={6}
                fill={getGlobalStyle('--color-icons-white')}
                width={2}
                stroke={getGlobalStyle('--color-icons-black')}
                strokeWidth={0.2}
                pointerEvents='none'
            />
            <circle
                cx={localC2.x}
                cy={localC2.y}
                r={6}
                fill={getGlobalStyle('--color-icons-white')}
                width={2}
                stroke={getGlobalStyle('--color-icons-black')}
                strokeWidth={0.2}
                pointerEvents='none'
            />

            {/* draggable handle (group) positioned using transform; pointerEvents enabled */}
            <g
                transform={`translate(${localCtrl.x}, ${localCtrl.y})`}
                style={{
                    pointerEvents: 'all',
                    cursor: dragging ? 'grabbing' : 'grab'
                }}
            >
                <circle
                    cx={0}
                    cy={0}
                    r={hovered || dragging ? 12 : 9}
                    fill={getGlobalStyle('--color-icons-white')}
                    stroke={strokeColor}
                    strokeWidth={0.6}
                    onPointerDown={onHandlePointerDown}
                    onPointerUp={(ev) => {
                        try {
                            (ev.target as Element).releasePointerCapture((ev as any).pointerId);
                        } catch { }
                        setDragging(false);
                        startBounce();
                    }}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                    style={{ transition: 'r 140ms cubic-bezier(.22,1,.36,1), transform 160ms' }}
                />
                <circle cx={0} cy={0} r={1} fill={strokeColor} pointerEvents='none' />
            </g>
        </svg>
    );
};

/** ================================
 * Card (unchanged but solid)
 * ================================ */

const Card: React.FC<{
    data: CardData;
    onMove: (next: CardData) => void;
}> = ({ data, onMove }) => {
    const ctx = useContext(ConnectorContext);
    if (!ctx) throw new Error('Must be inside ConnectorBoard');

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
            drag.current = true
            offset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y }
            try { box.setPointerCapture(e.pointerId); } catch { }
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

        box.addEventListener('pointerdown', down as any);
        window.addEventListener('pointermove', move as any);
        window.addEventListener('pointerup', up as any);

        return () => {
            box.removeEventListener('pointerdown', down as any);
            window.removeEventListener('pointermove', move as any);
            window.removeEventListener('pointerup', up as any);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={el}
            style={{
                position: 'absolute',
                transform: `translate(${data.x}px, ${data.y}px)`,
                width: data.width ?? 150,
                height: data.height ?? 60,
                backgroundColor: getGlobalStyle('--color-icons-white'),
                border: '1.5px solid #222',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'grab',
                userSelect: 'none',
                zIndex: 2
            }}
        >
            {data.label ?? data.id}
        </div>
    );
};

/** ================================
 * ConnectorBoard
 * ================================ */

export const ConnectorBoard = forwardRef<ConnectorBoardHandle, {
    initial: CardData[];
    relations: { from: string; to: string; curve?: boolean }[];
}>(({ initial, relations }, ref) => {
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

    const ctxValue = useMemo(() => ({ register, unregister, updatePos, getRects, recalc }), [
        register,
        unregister,
        updatePos,
        getRects,
        recalc
    ]);

    const handleControl = (id: string, c: ConnectorControl) => {
        setControls((p) => ({ ...p, [id]: c }));
    };

    return (
        <ConnectorContext.Provider value={ctxValue}>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 600,
                    background:
                        'repeating-linear-gradient(0deg,#fff,#fff 24px,#f8f8f8 24px,#f8f8f8 48px)',
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
                            curve={r.curve}
                        />
                    );
                })}

                {/* cards */}
                {cards.map((c) => (
                    <Card
                        key={c.id}
                        data={c}
                        onMove={(n) => setCards((p) => p.map((x) => (x.id === n.id ? n : x)))}
                    />
                ))}
            </div>
        </ConnectorContext.Provider>
    );
});

/** ================================
 * Example usage
 * ================================ */

/**
 * Build nodes and relations from your shoppingCart item
 * - returns nodes (initial) and relations [{ from, to, curve? }]
 */
const buildGraphData = (cart: any) => {
    const nodes: Array<{ id: string; label: string; x: number; y: number }> = [];
    const relations: Array<{ from: string; to: string; curve?: boolean }> = [];

    const root = cart.products;
    const rootId = root.pId;
    // root node
    nodes.push({ id: rootId, label: root.pName || 'Product', x: 160, y: 100 });

    // Optional categories
    (root.ExtProductFoodOptional || []).forEach((opt: any, i: number) => {
        const optId = opt.opExPid;
        nodes.push({ id: optId, label: opt.OptionalProName || `Option ${i + 1}`, x: 40, y: 220 + i * 180 });
        relations.push({ from: rootId, to: optId, curve: true });

        // sub options (children)
        (opt.ExtProductFoodsSubOptionalAll || []).forEach((sub: any, j: number) => {
            const subId = sub.opSubExPid;
            nodes.push({ id: subId, label: sub.OptionalSubProName || `Sub ${j + 1}`, x: 360, y: 200 + i * 180 + j * 120 });
            relations.push({ from: optId, to: subId, curve: true });
        });
    });

    // Extras with price
    (root.ExtProductFoodsAll || []).forEach((extra: any, k: number) => {
        const exId = extra.exPid;
        nodes.push({ id: exId, label: `${extra.extraName} ($${extra.extraPrice})`, x: 160, y: 540 + k * 140 });
        relations.push({ from: rootId, to: exId, curve: true });
    });

    // dedupe nodes by id (safe)
    const map = new Map<string, any>();
    nodes.forEach(n => map.set(n.id, n));
    const uniqueNodes = Array.from(map.values());

    return { initial: uniqueNodes, relations };
};

/** Example usage with corrected props and an initial recalc on mount */
export const ConnectorBoardExample: React.FC = () => {
    const ref = useRef<ConnectorBoardHandle | null>(null);

    const data = [
        {
            'shoppingCartId': '062c1bdb-ba81-4f45-90ce-8c1c31cef781',
            'id': '',
            'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
            'shoppingCartRefCode': 'REF-f77R8t2LZRC5Wj3IUe1DXPXLPPXE1bvNjq4c',
            'priceProduct': 5000,
            'comments': '',
            'cantProducts': 1,
            'refCodePid': '65QR8oStwVx44tAMOjtS',
            'idUser': null,
            'idStore': '10366d29-0bc3-41a8-ad43-b50bf94c3276',
            'sState': 1,
            'createdAt': '2025-12-04 22:51:53.278 -0500',
            'updatedAt': '2025-12-04 22:51:53.309 -0500',
            'products': {
                'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                'carProId': '347bb749-e5c6-497b-b9eb-c98bfc007a0c',
                'sizeId': null,
                'colorId': null,
                'idStore': '10366d29-0bc3-41a8-ad43-b50bf94c3276',
                'cId': null,
                'caId': null,
                'dId': null,
                'ctId': null,
                'tpId': null,
                'fId': null,
                'pName': 'Producto con sub items 3',
                'pCode': 'BLScvigFDr',
                'ProPrice': 5000,
                'free': 0,
                'ProDescuento': null,
                'ProUniDisponibles': null,
                'ProDescription': null,
                'ValueDelivery': null,
                'ProProtegido': null,
                'ProAssurance': null,
                'ProImage': '/images/placeholder-image.webp',
                'ProStar': null,
                'ProWidth': null,
                'ProHeight': 1,
                'ProLength': '1',
                'ProWeight': '1',
                'ProQuantity': 1,
                'ProOutstanding': null,
                'ProDelivery': null,
                'ProVoltaje': null,
                'pState': 1,
                'tgId': null,
                'sTateLogistic': 0,
                'ProBarCode': null,
                'stock': 0,
                'manageStock': true,
                'vat': 0,
                'ExtProductFoodOptional': [
                    {
                        'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                        'opExPid': '8a8b3c58-6318-408a-b1e5-17ccf25f40d8',
                        'OptionalProName': 'CATEGORIA 1',
                        'state': 1,
                        'code': 'GEwTw0jVV',
                        'required': 0,
                        'numbersOptionalOnly': 2,
                        'createdAt': '2025-12-04 22:51:53.314 -0500',
                        'updatedAt': '2025-12-04 22:51:53.314 -0500',
                        'ExtProductFoodsSubOptionalAll': [
                            {
                                'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                                'opExPid': '8a8b3c58-6318-408a-b1e5-17ccf25f40d8',
                                'idStore': '10366d29-0bc3-41a8-ad43-b50bf94c3276',
                                'opSubExPid': '5a06e202-edcd-4f39-ad9c-4de492a1bcaa',
                                'OptionalSubProName': 'SUB 2',
                                'exCodeOptionExtra': 'GEwTw0jVV',
                                'exCode': 'WEmjUJlrD',
                                'state': 1,
                                '__typename': 'ExtProductFoodSubOptional'
                            },
                            {
                                'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                                'opExPid': '8a8b3c58-6318-408a-b1e5-17ccf25f40d8',
                                'idStore': '10366d29-0bc3-41a8-ad43-b50bf94c3276',
                                'opSubExPid': 'fb594a4b-b272-4c2b-b038-3ff0dce7cc4d',
                                'OptionalSubProName': 'SUB 1',
                                'exCodeOptionExtra': 'GEwTw0jVV',
                                'exCode': 'ZhYn3EGGx',
                                'state': 1,
                                '__typename': 'ExtProductFoodSubOptional'
                            }
                        ],
                        '__typename': 'ExtProductFoodOptional'
                    },
                    {
                        'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                        'opExPid': 'fb5c981f-c8de-4135-ab24-5d4b9ce56b11',
                        'OptionalProName': 'CATEGORIA 2',
                        'state': 1,
                        'code': 'wrhD5hCY9',
                        'required': 0,
                        'numbersOptionalOnly': 2,
                        'createdAt': '2025-12-04 22:51:53.314 -0500',
                        'updatedAt': '2025-12-04 22:51:53.314 -0500',
                        'ExtProductFoodsSubOptionalAll': [
                            {
                                'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                                'opExPid': 'fb5c981f-c8de-4135-ab24-5d4b9ce56b11',
                                'idStore': '10366d29-0bc3-41a8-ad43-b50bf94c3276',
                                'opSubExPid': '3f33b798-8f17-4d2b-9113-aa813e4b669c',
                                'OptionalSubProName': 'SUB 2',
                                'exCodeOptionExtra': 'wrhD5hCY9',
                                'exCode': 'Ew0g6ylbQ',
                                'state': 1,
                                '__typename': 'ExtProductFoodSubOptional'
                            },
                            {
                                'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                                'opExPid': 'fb5c981f-c8de-4135-ab24-5d4b9ce56b11',
                                'idStore': '10366d29-0bc3-41a8-ad43-b50bf94c3276',
                                'opSubExPid': 'bfc764f5-9b41-4902-9aa8-0e32a908f52d',
                                'OptionalSubProName': 'SUB 1',
                                'exCodeOptionExtra': 'wrhD5hCY9',
                                'exCode': 'KGvYATTMk',
                                'state': 1,
                                '__typename': 'ExtProductFoodSubOptional'
                            }
                        ],
                        '__typename': 'ExtProductFoodOptional'
                    }
                ],
                'ExtProductFoodsAll': [
                    {
                        'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                        'exPid': '914c5f5f-469c-4910-8059-afca65d9c8b6',
                        'exState': 1,
                        'extraName': 'PRECIO 1',
                        'extraPrice': 5000,
                        'quantity': 4,
                        'newExtraPrice': null,
                        'state': null,
                        'createdAt': '2025-12-04 22:51:53.312 -0500',
                        'updatedAt': '2025-12-04 22:51:53.312 -0500',
                        '__typename': 'ExtProductFood'
                    },
                    {
                        'pId': 'db08cbab-c8fc-458d-98c7-2bae7f92fb5b',
                        'exPid': 'fb9e3cf5-f633-4fa8-a6e7-6caf0dadaa8d',
                        'exState': 1,
                        'extraName': 'PRECIO 2',
                        'extraPrice': 5000,
                        'quantity': 1,
                        'newExtraPrice': null,
                        'state': null,
                        'createdAt': '2025-12-04 22:51:53.312 -0500',
                        'updatedAt': '2025-12-04 22:51:53.312 -0500',
                        '__typename': 'ExtProductFood'
                    }
                ],
                'createdAt': '2025-12-04 22:51:53.307 -0500',
                'updatedAt': '2025-12-04 22:51:53.307 -0500',
                '__typename': 'ProductFood'
            },
            '__typename': 'ShoppingCart'
        }
    ][0]; // <- coloca tu objeto aquí o impórtalo
    const { initial, relations } = buildGraphData(data);

    // ensure connectors recalc after mount (DOM measurements)
    useEffect(() => {
        // small delay so cards register
        const t = setTimeout(() => ref.current?.recalc(), 40);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={{ padding: 12 }}>
            <button onClick={() => ref.current?.recalc()}>Recalc Lines</button>
            <div style={{ marginTop: 12 }}>
                <ConnectorBoard
                    ref={ref}
                    initial={initial}     // <- CORRECT prop name
                    relations={relations} // shape: { from, to, curve? }
                />
            </div>
        </div>
    );
};

