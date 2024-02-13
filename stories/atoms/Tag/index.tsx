import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.css';

interface TagProps {
  label?: string;
  children?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ label = 'OBLIGATORIO', children }) => {
  return (
    <span className={styles['marmita-minitag']}>
      {label}
      {children}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
};
