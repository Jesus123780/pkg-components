import styled from 'styled-components'
import { type QuantityButtonProps } from './types'

export const ContainerQuantity = styled.div<QuantityButtonProps>`
  display: inline-flex;
  border: ${({ border }) => {
    return border ?? '1px solid #dcdcdc'
  }};
  border-radius: 4px;
  margin-right: 10px;
  line-height: 1.15;
  font-family: PFont-Regular;
  font-size: 16px;
  box-sizing: border-box;
  display: inline-flex;
  border-radius: 4px;
  margin-right: 15px;
  width: ${({ width }) => {
    return width ?? '100%'
  }};
  margin: ${({ margin }) => {
    return margin ?? 'auto'
  }};
  @media only screen and (min-width: 960px) {
    .dish-action__counter {
      margin-right: 15px;
    }
  }
`
interface MarmitaCounterProps {
  padding?: string
}
export const MarmitaCounter = styled.div<MarmitaCounterProps>`
  display: inline-flex;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  ${({ padding }) => {
    return `padding: ${padding ?? '10px'}`
  }}
`

export const ButtonIncrement = styled.button`
  margin-left: 0;
  margin-right: 0;
  background-color: transparent;
  &&:disabled {
    opacity: 0.4;
    cursor: no-drop;
  }

  .btn-icon.btn-icon--transparent {
    background: transparent;
    color: #ea1d2c;
  }
`
export const ButtonDecrement = styled(ButtonIncrement)``
