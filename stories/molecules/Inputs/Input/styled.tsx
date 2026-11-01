import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'


type InputVProps = InputHTMLAttributes<HTMLInputElement> & {
    border?: string;
    size?: string;
    width?: string;
    radius?: string;
    paddingInput?: string;
    margin?: string;
    error?: string;
    minWidth?: string;
}

type LabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
    value?: string | number | readonly string[];
    labelTop?: string;
    labelColor?: string;
    error?: string;
    type?: string;
}


export const Tooltip = styled.div`
  display: block;
  background-color: transparent;
  border-radius: 2px;
  z-index: 10;
  font-size: 10px;
  color: blue;
`

export const LabelInput = styled.span<LabelInputProps>`
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
    const errorColor = error ? 'red' : '#ccc'
    return value ? '#ccc' : errorColor
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

export const InputV: any = styled.input<InputVProps>`
  outline: none;
  font-family: PFont-Light;
  font-weight: 500;
  border: 1px solid #D0D5DD;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 0px 1px inset;
    ${({ border = '#524e4e' }) => {
    return border
  }};
  font-size: ${({ size = '18px' }) => {
    return size || '18px'
  }};
  width: ${({ width = '100%' }) => {
    return width
  }};
  border-radius: ${({ radius = '15px 5px 5px 15px' }) => {
    return radius || '15px 5px 5px 15px'
  }};

  color: ${({ type, value }) => {
    return type === 'date' && !value ? '#0f0e0e' : '#707070'
  }};
  padding: ${({ type, paddingInput }) => {
    return type === 'date' ? '15px' : paddingInput || '20px 10px'
  }};

  &:focus {
    ~ ${LabelInput} {
      top: -6px;
      left: 0px;
      font-size: 18px;
      color: #ccc;
      background-color: red;
      padding: 0px 5px;
    }
  }

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
        border: 0.5px solid red;
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