import { CSSProperties, ReactNode } from 'react';

interface Animation {
  duration: number;
  easing: string;
}

interface Overlay {
  pxLeft: number;
  pxTop: number;
  widthPx?: number;
  heightPx?: number;
}

interface DragLayerProps {
  radio: number;
  overlay: Overlay | null;
  animation?: Animation;
  children?: ReactNode;
}

const layerStyle: CSSProperties = {
  position: 'absolute',
  zIndex: 999,
  pointerEvents: 'none',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  background: 'white',
  transformOrigin: '0 0',
  opacity: 0.9,
};

const DragLayer = ({ 
  radio, 
  overlay, 
  animation = { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' }, 
  children 
}: DragLayerProps) => {
  if (!overlay) return null;

  const style: CSSProperties = {
    ...layerStyle,
    borderRadius: radio,
    left: `${overlay.pxLeft}px`,
    top: `${overlay.pxTop}px`,
    width: overlay.widthPx ? `${overlay.widthPx}px` : 'auto',
    height: overlay.heightPx ? `${overlay.heightPx}px` : 'auto',
    transition: `transform ${animation.duration}ms ${animation.easing}, width ${animation.duration}ms ${animation.easing}, height ${animation.duration}ms ${animation.easing}`,
  };

  return (
    <div style={style} aria-hidden data-drag-layer>
      {children}
    </div>
  );
};

export default DragLayer;
