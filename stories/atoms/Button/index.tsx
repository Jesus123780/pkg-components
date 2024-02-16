import React from 'react'
import { classNames } from '../../../helpers'
import style from './button.module.css'

export type ButtonProps = {
  width?: string;
  borderRadius?: string;
  fontSize?: string;
  padding?: string;
  type?: string | 'secundary' | 'primary';
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  borderRadius,
  fontSize,
  width,
  padding,
  disabled,
  primary = false,
  styles = {},
  type = '',
  onClick = () => {},
  ...res
}) => {

  const buttonStyle = {
    padding: padding || '10px 20px',
    borderRadius: borderRadius || '',
    cursor: 'pointer',
    outline: 'none',
    width,
    fontSize,
    color: primary ? 'white' : 'var(--color-primary-red)',
    ...styles
  };

  return (
    <button
      disabled={disabled}
      className={classNames(style['button'], {
        [style[`button--${type}`]]: type,
        [style['button--primary']]: primary,
        [style['button--secondary']]: !primary
      })}
      style={buttonStyle}
      onClick={onClick}
      {...res}
    >
      {children}
    </button>
  );
};

