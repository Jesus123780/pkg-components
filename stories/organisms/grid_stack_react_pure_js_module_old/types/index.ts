export interface GridItem {
  title?: string
  id?: string
  i: string
  x: number
  y: number
  w: number
  h: number
  static?: boolean
  component?: Record<string, any>
}

export interface Overlay {
  i: string;
  pxLeft: number;
  pxTop: number;
  widthPx?: number;
  heightPx?: number;
  committedLayout?: GridItem[];
  targetGrid: GridItem | null;
  fallback?: boolean;
}

export interface GridStackProps {
  items: Array<GridItem>
  cols?: number
  rowHeight?: number
  radio?: number
  margin?: [number, number]
  containerPadding?: [number, number]
  isDraggable?: boolean
  isResizable?: boolean
  preventCollision?: boolean
  onLayoutChange?: (layout: Array<GridItem>) => void
  componentMap?: Record<string, React.ReactNode>
  dragMode?: 'preview' | 'overlay' | 'real'
  collisionMode?: 'push' | 'swap' | 'push-first' | 'none'
  animation?: { duration: number, easing: string }
  dragThrottleMs?: number
  allowOverlapDuringDrag?: boolean
  animateOnDrop?: boolean
  overlayAnchor?: 'grab' | 'pointer' | 'center'
  snapEnabled?: boolean
  snapThreshold?: number
  showGrid?: boolean
  // New roll props
  enableRollOnPush?: boolean
  rollAngleMax?: number
  rollDuration?: number
  rollStagger?: number
  enableHitOnPush?: boolean
  hitMultiplier?: number
  hitDuration?: number
  hitThresholdPx?: number
  sticky?: boolean
}