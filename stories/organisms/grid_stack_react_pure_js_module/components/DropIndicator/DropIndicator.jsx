/**
 * src/components/DropIndicator/DropIndicator.jsx
 *
 * Small component that shows a visual indicator where the drop will land.
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './DropIndicator.module.css'; // optional: you can fallback to inline style
import { getGlobalStyle } from '../../../../../helpers';

/**
 * DropIndicator
 * @param {{target: {x:number,y:number,w:number,h:number}, pxHelpers: object, animation: object}} props
 */
const DropIndicator = ({ target, pxHelpers, animation = { duration: 180, easing: 'cubic-bezier(.2,.8,.2,1)' } }) => {
  if (!target || !pxHelpers) return null;

  const style = useMemo(() => {
    const left = pxHelpers.gridToPx(target.x, false);
    const top = pxHelpers.gridToPx(target.y, true);
    const width = pxHelpers.widthPx(target.w);
    const height = pxHelpers.heightPx(target.h);

    return {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex: 998,
      backgroundColor: getGlobalStyle('--color-neutral-gray-silver'),
      borderRadius: 6,
      opacity: 0.7,
      transition: `all ${animation.duration}ms ${animation.easing}`,
      pointerEvents: 'none',
    };
  }, [target, pxHelpers, animation]);

  return <div className={styles.dropIndicator} style={style} data-drop-indicator />;
};

DropIndicator.propTypes = {
  target: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    w: PropTypes.number,
    h: PropTypes.number,
  }),
  pxHelpers: PropTypes.object.isRequired,
  animation: PropTypes.object,
};

export default DropIndicator;
