import styled, { css } from 'styled-components'
import { BGColor, EColor, SEGColor, SFColor } from '../../../../assets/colors'

export const BoxInput = styled.div`
  position: relative;
  padding: ${({ padding }) => {
    return padding || '15px 5px'
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  ${({ minWidth }) => {
    return (
      minWidth &&
      css`
        min-width: ${minWidth};
      `
    )
  }}
  ${({ maxWidth }) => {
    return (
      maxWidth &&
      css`
        max-width: ${maxWidth};
      `
    )
  }}
`
export const Listbox = styled.ul`
  position: absolute;
  width: 98%;
  border: 1px solid #aaa;
  margin: 13px 0px;
  background-color: ${BGColor};
  font-weight: 300;
  font-size: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 2;
  padding: ${({ padding }) => {
    return padding || '15px 5px'
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  ${({ minWidth }) => {
    return (
      minWidth &&
      css`
        min-width: ${minWidth};
      `
    )
  }}
  ${({ maxWidth }) => {
    return (
      maxWidth &&
      css`
        max-width: ${maxWidth};
      `
    )
  }}
`
export const List = styled.ul`
  position: relative;
  padding: ${({ padding }) => {
    return padding || '15px 5px'
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  ${({ minWidth }) => {
    return (
      minWidth &&
      css`
        min-width: ${minWidth};
      `
    )
  }}
  ${({ maxWidth }) => {
    return (
      maxWidth &&
      css`
        max-width: ${maxWidth};
      `
    )
  }}
    &:hover {
    cursor: pointer;
    background-color: #aca5a537;
  }
`
export const ShowPass = styled.button`
  position: absolute;
  left: 80%;
  top: 26px;
  background-color: transparent;
  margin: auto;
`
export const Tooltip = styled.div`
  display: block;
  background-color: transparent;
  border-radius: 2px;
  z-index: 10;
  font-size: 10px;
  color: ${SEGColor};
`
export const LabelInput = styled.span`
  position: absolute;
  transition: 0.2s ease;
  text-align: left;
  font-size: ${({ value }) => {
    return value ? '1rem' : '16px'
  }};
  top: ${({ value, labelTop }) => {
    return value ? '7px' : labelTop || '35px'
  }};
  left: ${({ value }) => {
    return value ? '10px' : '25px'
  }};
  color: ${({ value, error }) => {
    const errorColor = error ? EColor : SFColor
    return value ? SFColor : errorColor
  }};
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  background-color: var(--color-base-white);
  ${({ type }) => {
    return (
      type === 'date' &&
      css`
        top: -8px;
        left: 5px;
      `
    )
  }}
`
export const TextAreaInput = styled.textarea`
  color: ${(props) => {
    return props.type === 'date' && !props.value ? '#CCC' : '#272323'
  }};
  padding: ${(props) => {
    return props.padding ? props.padding : '15px 10px'
  }};
  outline: 0;
  border: ${({ border }) => {
    return border || '1px solid #ccc'
  }};
  font-weight: 600;
  font-size: ${({ size }) => {
    return size || '13px'
  }};
  width: ${({ width }) => {
    return width || '-webkit-fill-available'
  }};
  border-radius: ${({ radius }) => {
    return radius || '2px'
  }};
  ${({ margin }) => {
    return (
      !!margin &&
      css`
        margin: ${margin};
      `
    )
  }}
  ${({ minWidth }) => {
    return (
      minWidth &&
      css`
        min-width: ${minWidth};
      `
    )
  }}
    &:focus ~ ${LabelInput} {
    top: -6px;
    left: 0px;
    font-size: 14px;
    color: #ccc;
    background-color: ${BGColor};
    padding: 0px 5px;
  }
  &:focus {
    border: 1px solid '#35a8df';
  }
  &:disabled {
    cursor: no-drop;
  }
  &:hover ~ ${Tooltip} {
    display: block;
  }
  ${({ error }) => {
    return (
      error &&
      css`
        border: 0.5px solid ${EColor};
      `
    )
  }}
  ${({ height }) => {
    return (
      !!height &&
      css`
        max-height: ${height};
      `
    )
  }}
    ${({ height }) => {
    return (
      !!height &&
      css`
        min-height: ${height};
      `
    )
  }}
`
/**
 * Styled input component
 * @component
 */
export const InputV = styled.input`
  outline: none;
  font-family: PFont-Light;
  font-weight: 500;
  border: none;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 0px 1px inset;
    ${({ border = '#524e4e' }) => {
    return border
  }};
  font-size: ${({ size = '15px' }) => {
    return size
  }};
  width: ${({ width = '100%' }) => {
    return width
  }};
  border-radius: ${({ radius = '5px' }) => {
    return radius
  }};

  // Conditional Styles
  color: ${({ type, value }) => {
    return type === 'date' && !value ? '#0f0e0e' : '#272323'
  }};
  padding: ${({ type, paddingInput }) => {
    return type === 'date' ? '15px' : paddingInput || '20px 10px'
  }};

  // Focus Styles
  &:focus {
    ~ ${LabelInput} {
      top: -6px;
      left: 0px;
      font-size: 14px;
      color: #ccc;
      background-color: ${BGColor};
      padding: 0px 5px;
    }
  }

  // Disabled Styles
  &:disabled {
    cursor: no-drop;
  }

  // Hover Styles
  &:hover ~ ${Tooltip} {
    display: block;
  }

  // Error Styles
  ${({ error }) => {
    return (
      error &&
      css`
        border: 0.5px solid ${EColor};
      `
    )
  }}

  // Margins
  ${({ margin }) => {
    return (
      !!margin &&
      css`
        margin: ${margin};
      `
    )
  }}

  // Minimum Width
  ${({ minWidth }) => {
    return (
      minWidth &&
      css`
        min-width: ${minWidth};
      `
    )
  }}
`
