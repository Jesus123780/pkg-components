import styled, { css } from "styled-components"

export const InputHookProducts = ({
    placeholder,
    borderRadius,
    value,
    onChange,
    onFocus,
    inputText,
    type,
    color,
    ...props
  }) => {
    return (
      <>
        <Input
          {...props}
          borderRadius={borderRadius}
          color={color}
          inputText={inputText}
          onChange={onChange ? e => { return onChange(e.target.value) } : undefined}
          onFocus={onFocus}
          placeholder={placeholder || ''}
          type={type || 'text'}
          value={value || ''}
        />
      </>
    )
  }
  
  const Input = styled.input`
    width: 100%;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 25%);
    outline: none;
    border: none;
    ${props => { return props.margin && css`margin: ${props.margin};` }}
    ${props => { return props.padding && css`padding: ${props.padding};` }}
    ${props => { return props.borderRadius && css`border-radius: ${props.borderRadius};` }}
    ${props => {
    return props.card && css`
    padding: 25px;
    border: 2px solid ${PColor};
    `}}
    ${props => {
    return props.inputText && css`
        font-weight: 500;
        margin: 0.625rem 0 0;
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => { return color }};
        outline: none;
        /* padding: 5px; */
        border: 2px solid transparent;
    `}}
    ${props => {
    return props.inputText && css`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => { return color }};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}}
    ${props => {
    return props.checkbox && css`
        cursor: inherit;
        zoom: inherit;
        margin: 0;
        z-index: 2;
    `}}
    &&::after {
        border-width: 6px;
        visibility: visible;
        border: 1 solid #ea1d2c;
        border: 1 solid #ea1d2c;
        background: transparent;
        z-index: 1;
        transition: .15s cubic-bezier(.25,.46,.45,.94);
        visibility: hidden;
        background: transparent;
        z-index: 1;
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: transparent;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 50%;
    }
`