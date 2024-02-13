import React from 'react'
import { classNames } from '../../../helpers'
import style from './Paragraph.module.css'

type ParagraphProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
  color?: 'default' | 'primary' | 'back';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  weight?: 'none' | 'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  className?: string | string[];
  styles?: React.CSSProperties;
}

export const Paragraph = ({
    children,
    props,
    className = '',
    weight = 'normal',
    color = 'default',
    size = 'md',
    styles
}: ParagraphProps) => {
  return (
    <p style={styles} className={classNames('paragraph',  {
      [`${className}`]: className,
      [style[`size-${size}`]]: size,
      [style[`color-${color}`]]: color,
      [style[`weight-${weight}`]]: weight
    })} {...props}>
        {children}
    </p>
  )
}
