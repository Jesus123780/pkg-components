'use client'

import { CustomText } from './styled'
import { classNames } from '../../../helpers'
import style from './text.module.css'
import { TextProps } from 'pkg-components-types'

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
