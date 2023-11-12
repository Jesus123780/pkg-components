import styled, { css, keyframes } from 'styled-components'
import { BColor, BGColor, EColor, PColor, PLColor, PVColor, SEGColor, SFColor, SFVColor } from '../../../../assets/colors'

export const BoxSelect = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  justify-content: center;
  align-items: center;
  min-width: ${({ minWidth }) => {
    return minWidth || 'auto'
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  border-radius: ${({ radius }) => {
    return radius || '0px'
  }};
  ${({ padding }) => {
    return (
      !!padding &&
      css`
        padding: ${padding};
      `
    )
  }}
  position: relative;
`
export const ButtonAction = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  height: 40px;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  color: rgb(57, 58, 61);
  background-color: rgb(212, 215, 220);
  &:hover {
    background-color: #fcebea;
    color: ${BColor};
  }
  &:hover > svg {
    fill: ${BGColor};
  }
`
export const LabelInput = styled.label`
  position: absolute;
  text-align: left;
  transition: 0.2s ease;
  font-size: ${({ value }) => {
    return value ? '1rem' : '16px'
  }};
  top: ${({ value, topTitle }) => {
    const top = topTitle || '15px'
    return value ? '-8px' : top
  }};
  left: ${({ value }) => {
    return value ? '-8px' : '10px'
  }};
  color: ${({ value, error }) => {
    const errorColor = error ? PColor : SFVColor
    return value ? SFColor : errorColor
  }};
  font-family: PFont-Light;
  pointer-events: none;
  white-space: nowrap;
  width: min-content;
  background-color: ${({ value }) => {
    return value ? BGColor : 'transparent'
  }};
  padding-left: ${({ value }) => {
    return value ? '16px' : '0px'
  }};
  @media only screen and (max-width: 960px) {
    top: ${({ value }) => { return value ? '0px' : '25px' }};
  }
  ${(props) => {
    return (
      props.noLabel &&
      css`
        top: 13px;
        font-size: 15px;
        color: ${BColor};
        font-family: PFont-Regular;
        background-color: transparent;
      `
    )
  }}
  z-index: 9;
`
export const ContainerItems = styled.div`
  position: absolute;
  top: 98%;
  z-index: 4;
  left: 0;
  transform-origin: 200% 50%;
  transition: 0.2s ease;
  z-index: 9999999 !important;
  box-shadow: hsl(0, 0%, 80%);
  transform-origin: top left;
  ${({ active }) => {
    return active
      ? css`
          display: block;
        `
      : css`
          display: none;
        `
  }}
`
export const Tooltip = styled.div`
  position: absolute;
  display: block;
  right: 5px;
  top: -20px;
  background-color: ${PColor};
  padding: 0 10px;
  border-radius: 2px;
  z-index: 10;
  font-size: 11px;
  color: ${BGColor};
  &::after,
  &::before {
    top: 100%;
    left: 90%;
    border: solid transparent;
    content: '';
    position: absolute;
    pointer-events: none;
  }
  &::after {
    border-top-color: ${PColor};
    border-width: 4px;
  }
  &::before {
    border-top-color: ${PColor};
    border-width: 5px;
    margin-left: -1px;
  }
`
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const IconSel = styled.div`
  position: absolute;
  right: 8px;
  top: 30%;
  width: min-content;
  pointer-events: none;

  ${({ loading }) => {
    return loading && css`
      & > svg {
        animation: ${rotate} 1s linear infinite;
      }
    `
  }}
`
// Select
export const MainButton = styled.button`
  position: relative;
  display: block;
  background-color: ${({ bgColor, disabled, error }) => {
    const bgColorDisabled = error ? BGColor : bgColor || 'var(--color-base-white)'
    return disabled ? 'rgba(239, 239, 239, 0.3)' : bgColorDisabled
  }};
  border: ${({ border }) => {
    return border || `1px solid ${SFVColor}`
  }};
  text-align: left;
  height: ${({ height }) => {
    return height || '50px'
  }};
  white-space: nowrap;
  border-radius: 2px;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  color: ${({ color }) => {
    return color || SFColor
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  &:hover {
    color: ${PColor};
    cursor: ${({ disabled }) => {
    return disabled ? 'no-drop' : 'pointer'
  }};
    ${({ hover }) => {
    return (
      hover &&
      css`
          color: ${PVColor};
        `
    )
  }}
  }
  &:hover > ${IconSel} {
    color: ${PColor};
    cursor: ${({ disabled }) => {
    return disabled ? 'no-drop' : 'pointer'
  }};
    ${({ hover }) => {
    return (
      hover &&
      css`
          color: ${PVColor};
        `
    )
  }}
  }
  &:hover ~ ${Tooltip} {
    display: block;
  }
  &:focus > svg {
    fill: ${PLColor};
  }
`
export const CustomButtonS = styled.button`
  position: relative;
  display: block;
  background-color: ${({ bgColor, disabled, error }) => {
    const errorColor = error ? EColor : bgColor || '#fff'
    return disabled ? 'rgba(239, 239, 239, 0.3)' : errorColor
  }};
  outline: 0;
  border-bottom: ${({ border }) => {
    return border || `1px solid ${SFVColor}`
  }};
  text-align: left;
  height: ${({ height }) => {
    return height || '45px'
  }};
  white-space: nowrap;
  border-radius: 2px;
  /* text-overflow: ellipsis;
    overflow: hidden; */
  font-family: PFont-Light;
  color: ${({ color }) => {
    return color || SFColor
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  &:hover {
    background-color: ${'#f4f4f4'};
    color: ${PColor};
    cursor: ${({ disabled }) => {
    return disabled ? 'no-drop' : 'pointer'
  }};
    ${({ hover }) => {
    return (
      hover &&
      css`
          color: ${PVColor};
        `
    )
  }}
  }
  &:hover ~ ${Tooltip} {
    display: block;
  }
  &:focus {
    border: 1px solid ${PColor};
  }
`
export const BoxOptions = styled.div`
  bottom: ${({ bottom }) => {
    return bottom || '0'
  }};
  top: ${({ top, search }) => {
    return top && search ? '0%' : '0'
  }};
  width: 100%;
  min-width: ${(props) => {
    return props.fullName ? 'min-content' : 'auto'
  }};
  background-color: ${BGColor};
  border: 1px solid #cccccc50;
  overflow-y: auto;
  height: ${({ heightBox, search }) => {
    return heightBox && search ? 'min-content' : 'auto'
  }};
  z-index: 9999999888;
  max-height: 300px;
`
export const ContentBox = styled.div`
  bottom: ${({ search }) => {
    return search ? '-20px' : '0'
  }};
`
export const SpanText = styled.label`
  font-size: 14px;
  color: ${SFColor};
  ${(props) => {
    return (
      props.noLabel &&
      css`
        display: none;
      `
    )
  }}
`
export const TextNotResult = styled.span`
  font-size: 20px;
  color: ${SEGColor};
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
// Input Text (search engine)
export const InputText = styled.input`
  width: 100%;
  margin: 0;
  padding: 20px 8px;
  outline: none;
  border: 1px solid #ccc;
  font-size: 12px;
`
