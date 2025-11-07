'use client'

import { CustomText } from './styled'
import { classNames } from '../../../helpers'
import style from './text.module.css'

export type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | '2xs'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '9xl'
  | '10xl'
  | 'md2'
export type TextLineHeight =
  | 'none'
  | 'xs'
  | '2xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '9xl'
  | '10xl'

export type TextWeight =
  | 'none'
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
export type TextFont = 'regular' | 'medium' | 'bold' | 'light' | string

interface TextProps {
  as?: string
  children: React.ReactNode
  className?: string | string[]
  color?:
  | 'default'
  | 'primary'
  | 'blue'
  | 'white'
  | 'gray'
  | 'gray-dark'
  | 'green'
  lineHeight?: TextLineHeight
  size?: TextSize
  font?: TextFont
  customSize?: string | TextSize
  weight?: TextWeight
  title?: string
  styles?: React.CSSProperties
  align?: 'start' | 'center' | 'end'
}

export const Text: React.FC<TextProps> = ({
  children,
  color = 'default',
  size = '',
  align = 'start',
  font = '',
  weight = 400,
  className = '',
  title = '',
  lineHeight,
  as: Component = 'span',
  styles = {},
  customSize = ''
}) => {
  const textStyle = {
    fontSize: size ?? customSize,
    ...styles
  }
  const combinedClasses = Array.isArray(className)
    ? className.filter(Boolean).join(' ')
    : String(className)

  return (
    <CustomText
      title={title}
      font={font}
      as={Component}
      className={classNames('text', {
        [`${combinedClasses}`]: combinedClasses,
        [style[`size-${size}`]]: size,
        [style[`color-${color}`]]: color,
        [style[`weight-${weight}`]]: weight,
        [style[`font-${font}`]]: font,
        [style[`align-${align}`]]: align,
        [style[`line-height-${lineHeight}`]]: lineHeight
      })}
      style={textStyle}
    >
      {children}
    </CustomText>
  )
}
