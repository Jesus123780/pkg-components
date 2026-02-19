/**
 * src/components/DragLayer.jsx
 *
 * Renders an overlay layer used when dragging (the "ghost" element).
 * Uses the overlay object from useGrid which contains pxLeft, pxTop, widthPx, heightPx.
 */

import React from 'react';
import PropTypes from 'prop-types';

const layerStyle = {
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

/**
 * DragLayer
 * @param {{overlay: object, animation: object, children: React.ReactNode}} props
 */
const DragLayer = ({ overlay, animation = { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' }, children }) => {
  if (!overlay) return null;

  const style = {
    ...layerStyle,
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

DragLayer.propTypes = {
  overlay: PropTypes.object,
  animation: PropTypes.shape({
    duration: PropTypes.number,
    easing: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default DragLayer;
