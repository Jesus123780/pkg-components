import { css } from 'styled-components'

export const scrollStyle = css`
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0);
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &::-webkit-scrollbar:vertical {
    width: 10px;
  }

  &::-webkit-scrollbar-button:increment,
  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar:horizontal {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #797979;
    border: 2px solid #f1f2f3;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`
