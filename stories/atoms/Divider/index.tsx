import React from 'react';
import PropTypes from 'prop-types';
import styles from './Divider.module.css';

export interface DividerProps {
  borderTop?: boolean;
  borderBottom?: boolean;
  margin?: number;
}

export const Divider: React.FC<DividerProps> = ({ borderTop, borderBottom, margin }) => {
  const dividerStyle: React.CSSProperties = {
    borderTop: borderTop ? '1px solid var(--color-neutral-gray)' : 'none',
    borderBottom: borderBottom ? '1px solid var(--color-neutral-gray)' : 'none',
    margin: margin ? `${margin}px` : '0',
  };

  return <div className={styles.divider} style={dividerStyle}></div>;
};

Divider.propTypes = {
  borderTop: PropTypes.bool,
  borderBottom: PropTypes.bool,
  margin: PropTypes.number,
};

