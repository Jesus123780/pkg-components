import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect
} from "react";

/**
 * VirtualizedList - Grid + List virtualization with smooth non-overlapping transitions.
 * - Grid mode uses fixed itemHeight (required) and calculates itemWidth responsively.
 * - Includes safety logic to avoid overlap on small screens and friendly layout collapse.
 *
 * JSDoc in English.
 */

/**
 * Props for VirtualizedList
 * @template T
 */
export interface VirtualizedListProps<T> {
  grid?: boolean;
  columns?: number;
  minColumnWidth?: number;
  columnGap?: number;
  viewHeight?: number | "auto";
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
  itemHeight: number | ((item: T, index: number) => number);
  itemGap?: number;
  overscan?: number;
  as?: keyof JSX.IntrinsicElements;
  itemKey?: (item: T, index: number) => React.Key;
  className?: string;
  style?: React.CSSProperties;
  observeResize?: boolean;
}

/** Build prefix-sum array for heights. O(n). */
const buildPrefix = (heights: number[]) => {
  const prefix: number[] = new Array(heights.length + 1);
  prefix[0] = 0;
  for (let i = 0; i < heights.length; i++) {
    prefix[i + 1] = prefix[i] + heights[i];
  }
  return prefix;
};

/** Binary search on prefix sums */
const findIndexByScroll = (prefix: number[], value: number) => {
  let low = 0;
  let high = prefix.length - 1;
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
    viewHeight = "auto",
    items,
    render,
    itemHeight,
    itemGap = 0,
    overscan = 2,
    as = "div",
    itemKey,
    className,
    style,
    observeResize = true,
    grid = false,
    columns: fixedColumns,
    minColumnWidth = 120,
    columnGap = 15
  } = props;

  // animation config
  const ANIM_DURATION_MS = 220;
  const ANIM_EASING = "cubic-bezier(.2,.8,.2,1)";

  // Defensive checks
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
  const ticking = useRef(false);

  // container dims
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number>(() =>
    typeof viewHeight === "number" ? viewHeight : 300
  );

  // fixed height detection
  const isFixed = typeof itemHeight === "number";

  // warn fallback if grid + variable heights
  if (grid && !isFixed) {
    // eslint-disable-next-line no-console
    console.warn(
      "VirtualizedList: grid mode requires fixed numeric itemHeight for correct virtualization. Falling back to list mode."
    );
  }

  // variable heights (list)
  const heights = useMemo(() => {
    if (isFixed) return undefined;
    return items.map((it, idx) =>
      Math.max(0, (itemHeight as (i: T, n: number) => number)(it, idx))
    );
  }, [isFixed, itemHeight, items]);

  const prefix = useMemo(() => {
    if (isFixed) return undefined;
    const withGaps = heights!.map((h) => h + itemGap);
    return buildPrefix(withGaps);
  }, [isFixed, heights, itemGap]);

  // measure container size & observe (debounced-ish via rAF inside RO)
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let scheduled = false;
    const measure = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        const w = Math.max(0, Math.floor(el.clientWidth));
        const h =
          viewHeight === "auto" ? Math.max(0, Math.floor(el.clientHeight)) : (viewHeight as number);
        setContainerWidth(w);
        setContainerHeight(h);
      });
    };

    measure();

    if (!observeResize) return;

    const RO =
      (window as any).ResizeObserver && new (window as any).ResizeObserver(measure);

    if (RO) RO.observe(el);
    window.addEventListener("orientationchange", measure);
    return () => {
      if (RO) RO.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, [observeResize, viewHeight]);

  // rAF scroll handler
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
    setScrollTop(el.scrollTop);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * GRID & LIST layout calculations
   *
   * Enhancements for UX & anti-overlap:
   * - Ensure itemWidth >= minColumnWidth by decreasing columns if necessary
   * - Add `stackSafety` vertical spacing (small fraction of itemHeight) to avoid warp overlap during transitions
   * - Collapse to single column on very small screens (mobile-first UX)
   */
  const {
    columns,
    itemWidth,
    rowHeight,
    totalHeight,
    startIndex,
    endIndex,
    topOffset
  } = useMemo(() => {
    if (!grid || !isFixed) {
      if (items.length === 0) return { columns: 1, itemWidth: 0, rowHeight: 0, totalHeight: 0, startIndex: 0, endIndex: -1, topOffset: 0 };

      if (isFixed) {
        const h = itemHeight as number;
        // Add a small safety gap to avoid visual overlap during layout changes
        const stackSafety = Math.min(12, Math.max(2, Math.floor(h * 0.04)));
        const stride = h + itemGap + stackSafety;
        const effectiveViewHeight = viewHeight === "auto" ? containerHeight : (viewHeight as number);
        const rawStart = Math.floor(scrollTop / stride);
        const start = Math.max(0, rawStart - overscan);
        const visibleCount = Math.ceil(effectiveViewHeight / stride) + overscan * 2;
        const end = Math.min(items.length - 1, start + visibleCount - 1);
        const offset = start * stride;
        const totalH = items.length * stride - itemGap - stackSafety;
        return { columns: 1, itemWidth: containerWidth, rowHeight: stride, totalHeight: totalH, startIndex: start, endIndex: end, topOffset: offset };
      }

      // variable heights list
      const effectiveViewHeight = viewHeight === "auto" ? containerHeight : (viewHeight as number);
      const start = Math.max(0, findIndexByScroll(prefix!, scrollTop) - overscan);
      const end = Math.min(items.length - 1, findIndexByScroll(prefix!, scrollTop + effectiveViewHeight) + overscan);
      const offset = prefix![start];
      const totalH = prefix![prefix!.length - 1] - itemGap;
      return { columns: 1, itemWidth: containerWidth, rowHeight: 0, totalHeight: totalH, startIndex: start, endIndex: end, topOffset: offset };
    }

    // GRID mode (fixed itemHeight)
    const cw = Math.max(1, containerWidth);

    // Mobile-first UX thresholds (tweak if needed)
    const MOBILE_BREAKPOINT = 480; // collapse to 1 column under this width
    const SMALL_TABLET = 720; // prefer smaller number columns

    // start with either fixedColumns or estimate by minColumnWidth
    const initialColCount = fixedColumns && fixedColumns > 0
      ? Math.max(1, Math.floor(fixedColumns))
      : Math.max(1, Math.floor((cw + columnGap) / (minColumnWidth + columnGap)));

    // enforce breakpoint-based caps for better UX
    let colCount = initialColCount;
    if (cw <= MOBILE_BREAKPOINT) colCount = 1;
    else if (cw <= SMALL_TABLET) colCount = Math.min(colCount, 2);

    // reduce columns until item width >= minColumnWidth (prevents tiny cards and overlap)
    let colCountClamped = Math.max(1, colCount);
    let totalGaps = columnGap * (colCountClamped - 1);
    let rawItemWidth = Math.floor((cw - totalGaps) / colCountClamped);
    let itemW = Math.max(1, rawItemWidth);

    while (colCountClamped > 1 && itemW < minColumnWidth) {
      colCountClamped = colCountClamped - 1;
      totalGaps = columnGap * (colCountClamped - 1);
      rawItemWidth = Math.floor((cw - totalGaps) / colCountClamped);
      itemW = Math.max(1, rawItemWidth);
    }

    // final safety: if still < minColumnWidth (extremely narrow), collapse to 1 column
    if (itemW < minColumnWidth) {
      colCountClamped = 1;
      totalGaps = 0;
      rawItemWidth = cw;
      itemW = Math.max(1, rawItemWidth);
    }

    // small horizontal safety padding to reduce perceived collision (few px)
    const horizontalSafety = Math.min(8, Math.floor(itemW * 0.02));
    const effectiveItemWidth = Math.max(1, itemW - horizontalSafety);

    // vertical stride (row height) with stackSafety to avoid overlap during transitions
    const stackSafety = Math.min(12, Math.max(2, Math.floor((itemHeight as number) * 0.04)));
    const rowH = (itemHeight as number) + itemGap + stackSafety;

    const totalRows = Math.max(1, Math.ceil(items.length / colCountClamped));
    const totalH = totalRows * rowH - itemGap - stackSafety;

    const effectiveViewHeight = viewHeight === "auto" ? containerHeight : (viewHeight as number);
    const rawStartRow = Math.floor(scrollTop / rowH);
    const startRow = Math.max(0, rawStartRow - overscan);
    const visibleRows = Math.ceil(effectiveViewHeight / rowH) + overscan * 2;
    const endRow = Math.min(totalRows - 1, startRow + visibleRows - 1);

    const startIdx = startRow * colCountClamped;
    const endIdx = Math.min(items.length - 1, (endRow + 1) * colCountClamped - 1);
    const offsetTop = startRow * rowH;

    return {
      columns: colCountClamped,
      itemWidth: effectiveItemWidth,
      rowHeight: rowH,
      totalHeight: totalH,
      startIndex: startIdx,
      endIndex: endIdx,
      topOffset: offsetTop
    };
  }, [
    grid,
    isFixed,
    itemHeight,
    itemGap,
    items.length,
    scrollTop,
    overscan,
    viewHeight,
    containerHeight,
    containerWidth,
    fixedColumns,
    minColumnWidth,
    columnGap,
    prefix
  ]);

  // slice to render
  const slice = useMemo(() => {
    if (startIndex > endIndex) return [];
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  // refs map (keeps references for potential future measurements)
  const itemRefs = useRef<Map<number, HTMLElement | null>>(new Map());

  /**
   * Position each item using translate3d. Using transform (instead of top/left)
   * prevents visual overlap because changes animate smoothly on GPU.
   *
   * For list mode: translateY only (x = 0).
   * For grid mode: compute (left, top) based on columns & rowHeight.
   *
   * Note: the wrapper width is `itemWidth` (grid) and the child (MiniCardProduct)
   * should use `width: 100%` (CSS) and `min-width: 0` to avoid overflow causing overlap.
   */
  const getItemStyle = useCallback(
    (index: number) => {
      // animation values
      const transition = `transform ${ANIM_DURATION_MS}ms ${ANIM_EASING}, opacity ${ANIM_DURATION_MS / 2}ms ease`;

      if (!grid || !isFixed) {
        const top = isFixed ? index * ((itemHeight as number) + itemGap) : (prefix ? prefix[index] : 0);
        return {
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translate3d(0px, ${top}px, 0)`,
          width: "100%",
          boxSizing: "border-box",
          transition,
          willChange: "transform, opacity",
          pointerEvents: "auto"
        } as React.CSSProperties;
      }
      // grid mode
      const col = index % columns;
      const row = Math.floor(index / columns);
      const top = row * rowHeight;
      const left = col * (itemWidth + columnGap);
      return {
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate3d(${left}px, ${top}px, 0)`,
        width: `${itemWidth}px`,
        boxSizing: "border-box",
        transition,
        willChange: "transform, opacity",
        pointerEvents: "auto"
      } as React.CSSProperties;
    },
    [grid, isFixed, itemHeight, itemGap, prefix, columns, rowHeight, itemWidth, columnGap]
  );

  // inner style (keeps measured totalHeight so native scrollbar works)
  const innerStyle: React.CSSProperties = {
    position: "relative",
    height: `${totalHeight}px`,
    width: "100%"
  };

  return (
    <Container
      ref={outerRef}
      style={{
        overflowY: "auto",
        height: viewHeight === "auto" ? undefined : `${viewHeight}px`,
        WebkitOverflowScrolling: "touch",
        position: "relative",
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
    </Container>
  );
};
