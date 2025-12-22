import { JSX } from 'react'
/**
 * Props for VirtualizedList
 * @template T
 */
export interface VirtualizedListProps<T> {
  grid?: boolean;
  columns?: number;
  minColumnWidth?: number;
  columnGap?: number;
  viewHeight?: number | 'auto';
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
  emptyComponent?: React.ReactNode;
}