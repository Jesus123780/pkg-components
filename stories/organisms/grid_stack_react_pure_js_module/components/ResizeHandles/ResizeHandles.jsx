/**
 * src/components/ResizeHandles/ResizeHandles.jsx
 *
 * Renders tiny handles for resizing and wires pointerdown events.
 * The parent should handle pointer capture (GridStack already does).
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getGlobalStyle } from '../../../../../helpers';

/**
 * ResizeHandles
 * @param {{corners: string[], onPointerDown: (e, corner) => void}} props
 */
const ResizeHandles = ({ corners = ['se'], onPointerDown = () => {} }) => {
  const cornerMap = {
    se: { right: 6, bottom: 6, cursor: 'se-resize' },
    sw: { left: 6, bottom: 6, cursor: 'sw-resize' },
    ne: { right: 6, top: 6, cursor: 'ne-resize' },
    nw: { left: 6, top: 6, cursor: 'nw-resize' },
  };

  return (
    <>
      {corners.map((c) => {
        const pos = cornerMap[c] || cornerMap.se;
        const style = {
          position: 'absolute',
          width: 14,
          height: 14,
          borderRadius: 3,
          backgroundColor: getGlobalStyle('--color-background-overline'),
          display: 'block',
          opacity: getGlobalStyle('--opacity-25'),
          zIndex: 5,
          ...(pos.left != null ? { left: pos.left } : { right: pos.right }),
          ...(pos.top != null ? { top: pos.top } : { bottom: pos.bottom }),
          cursor: pos.cursor,
        };

        return (
          <div
            key={c}
            role="button"
            aria-label={`resize-${c}`}
            style={style}
            className="resizeHandle"
            data-resize-handle
            onPointerDown={(e) => onPointerDown(e, c)}
          />
        );
      })}
    </>
  );
};

ResizeHandles.propTypes = {
  corners: PropTypes.arrayOf(PropTypes.string),
  onPointerDown: PropTypes.func,
};

export default ResizeHandles;
