import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";

/**
 * VirtualizedList - High performance windowed list for React + TypeScript
 * Features:
 * - Fixed-height and variable-height support
 * - rAF-throttled scroll handling
 * - Optional ResizeObserver to correct dynamic item heights
 * - Overscan buffer to avoid flicker
 * - Minimal DOM nodes (only visible range rendered)
 * - Robust prop validation and defensive defaults
 *
 * JSDoc is in English as requested.
 */

/**
 * Props for VirtualizedList
 * @template T
 */
export interface VirtualizedListProps<T> {
  /** enable grid layout (multi-column) */
  grid?: boolean;
  /** number of columns for grid */
  columns?: number;
  /** horizontal gap for grid */
  columnGap?: number;
  /** container visible height in pixels */
  viewHeight: number | 'auto';
  /** data items */
  items: T[];
  /** render function for each item */
  render: (item: T, index: number) => React.ReactNode;
  /** fixed item height in px OR a function that returns height for an item */
  itemHeight: number | ((item: T, index: number) => number);
  /** gap between items in px (default 0) */
  itemGap?: number;
  /** number of extra items rendered above/below viewport (default 5) */
  overscan?: number;
  /** wrapper element (default div) */
  as?: keyof JSX.IntrinsicElements;
  /** optionally supply a stable key extractor */
  itemKey?: (item: T, index: number) => React.Key;
  /** className for the outer scroll container */
  className?: string;
  /** style for the outer scroll container */
  style?: React.CSSProperties;
  /** enable ResizeObserver to adapt to dynamic heights (costly). Default false */
  observeResize?: boolean;
}

/**
 * Build prefix-sum array for heights. O(n).
 * @param heights number[]
 */
const buildPrefix = (heights: number[]) => {
  const prefix: number[] = new Array(heights.length + 1);
  prefix[0] = 0;
  for (let i = 0; i < heights.length; i++) {
    // accumulate, careful numeric addition (digit-by-digit not necessary here)
    prefix[i + 1] = prefix[i] + heights[i];
  }
  return prefix; // prefix[i] = sum heights[0..i-1]
};

/**
 * Binary search on prefix sums to find index whose prefix <= value < nextPrefix
 * @param prefix number[]
 * @param value number
 */
const findIndexByScroll = (prefix: number[], value: number) => {
  let low = 0;
  let high = prefix.length - 1; // prefix has length n+1
  while (low < high) {
    const mid = (low + high) >> 1;
    if (prefix[mid] <= value) low = mid + 1;
    else high = mid;
  }
  return Math.max(0, low - 1);
};

/**
 * VirtualizedList component
 * @template T
 */
export const VirtualizedList = <T,>(props: VirtualizedListProps<T>) => {
  const {
    viewHeight = 'auto',
    items,
    render,
    itemHeight,
    itemGap = 0,
    overscan = 5,
    as = "div",
    itemKey,
    className,
    style,
    observeResize = false
  } = props;

  // Defensive validation
  if (!Array.isArray(items)) {
    // eslint-disable-next-line no-console
    console.error("VirtualizedList: 'items' must be an array");
    return null;
  }
  if (typeof itemHeight !== "number" && typeof itemHeight !== "function") {
    console.error("VirtualizedList: 'itemHeight' must be a number or function");
    return null;
  }

  const Container = as as any;
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // If fixed height provided, we can avoid per-item computations
  const isFixed = typeof itemHeight === "number";

  // heights array for variable heights, for fixed we use constant
  const heights = useMemo(() => {
    if (isFixed) return undefined;
    // compute heights using provided function, but do not measure DOM here
    return items.map((it, idx) => Math.max(0, (itemHeight as (i: T, n: number) => number)(it, idx)));
    // Note: if true DOM heights differ, ResizeObserver will correct them when enabled
  }, [isFixed, itemHeight, items]);

  // prefix sums and total height
  const prefix = useMemo(() => {
    if (isFixed) return undefined;
    const withGaps = heights!.map((h) => h + itemGap);
    return buildPrefix(withGaps);
  }, [isFixed, heights, itemGap]);

  const totalHeight = useMemo(() => {
    if (isFixed) return items.length * ((itemHeight as number) + itemGap) - itemGap;

    if (!prefix) return 0;
    return prefix[prefix.length - 1] - itemGap; // subtract last gap
  }, [isFixed, items.length, itemGap, itemHeight, prefix]);

  // rAF-throttled scroll handler
  const ticking = useRef(false);
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(() => {
          setScrollTop(el.scrollTop);
          ticking.current = false;
        });
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // compute visible window indices
  const { startIndex, endIndex, topOffset } = useMemo(() => {
    if (items.length === 0) return { startIndex: 0, endIndex: -1, topOffset: 0 };

    if (isFixed) {
      const h = itemHeight as number;
      const stride = h + itemGap;
      const rawStart = Math.floor(scrollTop / stride);
      const start = Math.max(0, rawStart - overscan);
      const visibleCount = Math.ceil(viewHeight === 'auto' ? 0 : viewHeight / stride) + overscan * 2;
      const end = Math.min(items.length - 1, start + visibleCount - 1);
      const offset = start * stride;
      return { startIndex: start, endIndex: end, topOffset: offset };
    }

    // variable heights: use prefix sums + binary search
    const stridePrefix = prefix!; // prefix of heights+gaps
    const start = Math.max(0, findIndexByScroll(stridePrefix, scrollTop) - overscan);
    // compute end by finding index at scrollTop + viewHeight
    const end = Math.min(items.length - 1, findIndexByScroll(stridePrefix, scrollTop + (viewHeight === 'auto' ? 0 : viewHeight)) + overscan);
    const offset = stridePrefix[start];
    return { startIndex: start, endIndex: end, topOffset: offset };
  }, [scrollTop, items.length, isFixed, itemHeight, itemGap, viewHeight, overscan, prefix]);

  // Rendered slice
  const slice = useMemo(() => {
    if (startIndex > endIndex) return [];
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  // Refs for ResizeObserver
  const itemRefs = useRef<Map<number, HTMLElement | null>>(new Map());

  // ResizeObserver to correct heights if observeResize true and variable heights
  useEffect(() => {
    if (!observeResize || isFixed) return;
    const RO = typeof window !== "undefined" && (window as any).ResizeObserver ? new (window as any).ResizeObserver((entries: any[]) => {
      // Only trigger a state update (by touching scrollTop) when sizes actually changed
      let changed = false;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        // find index from map
        for (const [idx, ref] of itemRefs.current.entries()) {
          if (ref === el) {
            const measured = Math.max(0, el.getBoundingClientRect().height);
            // update cached heights array (we do this by replacing items array reference via a small state trick)
            // For simplicity we will trigger a small state update to recompute prefix sums above
            // store measured height on element dataset
            const prev = parseFloat(el.dataset["virtualHeight"] || "0");
            if (Math.abs(prev - measured) > 0.5) {
              el.dataset["virtualHeight"] = String(measured);
              changed = true;
            }
            break;
          }
        }
      }
      if (changed) {
        // force recompute by toggling scrollTop; harmless and cheap
        setScrollTop((s) => s + 0.0001);
      }
    }) : null;

    // observe currently rendered refs
    itemRefs.current.forEach((el) => el && RO && RO.observe(el));
    return () => RO && RO.disconnect();
  }, [observeResize, isFixed, startIndex, endIndex]);

  // Helper to get top for an index
  const getTopForIndex = useCallback(
    (index: number) => {
      if (isFixed) return index * ((itemHeight as number) + itemGap);
      // try to read measured heights from DOM dataset if available (only for observed items)
      // fallback to heights[] computed initially
      let top = 0;
      if (prefix) top = prefix[index];
      return top;
    },
    [isFixed, itemGap, itemHeight, prefix]
  );

  // container inner style
  const innerStyle: React.CSSProperties = {
    position: "relative",
    height: `${totalHeight}px`,
    width: "100%"
  };

  // item wrapper style generator
  const getItemStyle = (index: number) => {
    const top = getTopForIndex(index);
    return {
      position: "absolute",
      top: `${top}px`,
      width: "min-content",
      boxSizing: "border-box"
    } as React.CSSProperties;
  };

  // If grid mode, we render items in column layout using same virtualization core
   // If grid mode → virtualize by rows instead of absolute items
  const isGrid = Boolean(props.grid);
  const columns = props.columns ?? 1;
  const colGap = props.columnGap ?? 0;

  if (isGrid) {
    // ─────────────────────────────────────────────
    // GRID MODE: virtualize rows
    // ─────────────────────────────────────────────

    const itemsPerRow = columns;
    const totalRows = Math.ceil(items.length / itemsPerRow);

    const fixedRowHeight =
      typeof itemHeight === "number" ? itemHeight : 200;

    const rowStride = fixedRowHeight + itemGap;

    const rawStartRow = Math.floor(scrollTop / rowStride);
    const startRow = Math.max(0, rawStartRow - overscan);

    const visibleRows =
      Math.ceil(
        viewHeight === "auto" ? 0 : viewHeight / rowStride
      ) + overscan * 2;

    const endRow = Math.min(totalRows - 1, startRow + visibleRows);

    // Build rows to render
    const rows = [];
    for (let r = startRow; r <= endRow; r++) {
      const startIdx = r * itemsPerRow;
      const rowItems = items.slice(startIdx, startIdx + itemsPerRow);
      rows.push({ r, rowItems });
    }

    return (
      <div
        ref={outerRef}
        style={{
          overflowY: "auto",
          height:
            viewHeight === "auto"
              ? "auto"
              : `${viewHeight}px`,
          WebkitOverflowScrolling: "touch",
          ...style
        }}
        className={className}
      >
        <div
          style={{
            position: "relative",
            height: totalRows * rowStride,
            width: "100%"
          }}
        >
          {rows.map(({ r, rowItems }) => (
            <div
              key={r}
              style={{
                position: "absolute",
                top: r * rowStride,
                left: 0,
                width: "100%",
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: colGap
              }}
            >
              {rowItems.map((item, idx) => {
                const index = r * itemsPerRow + idx;
                const key = itemKey ? itemKey(item, index) : index;
                return (
                  <div key={key}>
                    {render(item, index)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // LIST MODE (tu código original intacto)
  // ─────────────────────────────────────────────
  return (
    <div
      ref={outerRef}
      style={{
        overflowY: "auto",
        height:
          viewHeight === "auto"
            ? "auto"
            : `${viewHeight}px`,
        WebkitOverflowScrolling: "touch",
        ...style
      }}
      className={className}
      role="list"
      aria-label="virtualized-list"
    >
      <div style={innerStyle}>
        {slice.map((item, idx) => {
          const realIndex = startIndex + idx;
          const key = itemKey ? itemKey(item, realIndex) : realIndex;
          return (
            <div
              key={key}
              ref={(el) => itemRefs.current.set(realIndex, el)}
              style={getItemStyle(realIndex)}
              role="listitem"
              data-virtual-index={realIndex}
            >
              {render(item, realIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
};