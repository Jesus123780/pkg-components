import styled, { css, keyframes } from 'styled-components'
import {
  BGColor,
  DarkSilver,
  SEGColor
} from '../../../assets/colors'
import { MODAL_SIZES } from './constanst'
import { getGlobalStyle } from '../../../helpers'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const fadeInTop = keyframes`
    from {
      top: -10%;
      left: 50%;
      transform: translateY(-100%);
    }
  
    to {
      top: 15%;
      left: 50%;
      transform: translateY(-0%);
    }

`

export const Pulse = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

`

const fadeOutTop = keyframes`
    from {
        opacity: 1;
        top: 15%;
        left: 50%;
        transform: translateY(-15%);
    }
    to {
      opacity: 0;
      top: 10%;
      left: 50%;
      transform: translateY(-100%);
    }
  

`

interface IContainer {
  show: boolean | undefined
  state: boolean | undefined
  bgColor?: string
  zIndex?: string
}

export const Container: React.FC<IContainer> = styled.div<IContainer>`
    display: ${({ show, state }) =>
      ((show ?? false) && (state ?? false)) || ((show ?? false) && !(state ?? false))
        ? 'block'
        : 'none'};
    position: fixed;
    background: ${({ bgColor }) => bgColor ?? getGlobalStyle('--color-background-overline')};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: ${({ zIndex }) => zIndex ?? '100'};
    opacity: 1;
    animation: ${({ show, state }) =>
      (show ?? false) && (state ?? false)
        ? css`animation: ${fadeIn} .1s linear;`
        : (show ?? false) && !(state ?? false)
        ? css`animation: ${fadeIn} .s linear;`
        : 'none'};
  `

export const Wrapper = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    height: 100%;
    z-index: 888;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface ModalProps {
  size?: string
  backdropA?: boolean
  borderRadius?: string
  height?: string
  state?: boolean | undefined
}

export const Modal = styled.div<ModalProps>`
    background: #fff;
    width: ${({ size }) => {
    if (size === MODAL_SIZES.small) return '30%'
    else if (size === MODAL_SIZES.medium) return '60%'
    else if (size === MODAL_SIZES.large) return '100%'
    return size
  }};
    ${props => {
    return props.backdropA && css`
        animation: ${Pulse} .2s forwards;
    `
}}
    min-width: 340px;
    border-radius: ${({ borderRadius }) => { return borderRadius }};
    border: 1px solid rgba(0,0,0,.2);
    z-index: 999;
    height: ${({ height }) => { return height ?? 'auto' }};
    min-height: ${({ height }) => { return height ?? 'auto' }};
    min-height: ${({ height }) => { return height ?? 'auto' }};
    ${({ state }) => { return state ? css`animation: ${fadeInTop} .2s forwards;` : css`animation: ${fadeOutTop} .2s forwards;` }}
`

export const ModalHeader = styled.div`
    display: flex;
    /* position: fixed;
    left: 0; */
    z-index: 9999;
    align-items: center;
    justify-content: space-between;
    padding: .2rem;
    border-bottom: 1px solid #e9ecef;
    background-color: ${BGColor};
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
`

export const ModalTitle = styled.h4`
    margin: 0;
    color: ${SEGColor};
    font-size: 17px;
    width: auto;
    font-weight: 500;
    font-family: PFont-Light;
`
export const BtnClose = styled.button`
    ${({ fixed }) => {
    return fixed && css`
        position: absolute;
        right: 6px;
        top: 6px;
    `
}}
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    z-index: 999999;
    color: #898989;
    text-shadow: 0 1px 0 #fff;
    outline: none;
    cursor: pointer;
`

interface ModalBodyProps {
  borderRadius?: string
  backgroundColor?: string
  display?: string
  height?: string
  padding?: string
}

export const ModalBody = styled.div<ModalBodyProps>`
    position: relative;
    flex: 1 1 auto;
    overflow-y: auto;
    border-radius: ${({ borderRadius }) => { return borderRadius ?? 'none' }};
    background-color: ${({ backgroundColor }) => { return backgroundColor ?? BGColor }};
    display: ${({ display }) => { return display ?? 'block' }};
    height: ${({ height }) => { return height ?? 'auto' }};

    min-height: ${({ height }) => { return height ?? 'auto' }};
    min-height: ${({ height }) => { return height ?? 'auto' }};
    padding: ${({ padding }) => { return padding ?? '0' }};
.modal-wrapper {
    background-color: #FFFFFF;
    border-radius: 5px;
    bottom: 0;
    box-shadow: -1px -1px 15px -6px rgba(0,0,0,0.75);
    height: 140px;
    left: 0;
    margin: auto;
    min-width: 300px;
    padding: 20px;
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    z-index: 91000;
    h2 {
        text-align: center;
        font-size: 15px;
        margin-bottom: 20px;
        font-family: PFont-Regular;
        font-weight: 300;
    }

}
.modal-confirm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-content: center;
    gap: 10px;

}
`

export const ModalFooter = styled.div`
    bottom: 0;
    left: 0;
    width: 100%;
    right: 0;
    margin: auto;
    justify-content: space-between;
    display: flex;
    border-top: 1px solid ${`${DarkSilver}33`};
    background-color: ${({ backgroundColor }) => { return backgroundColor ?? BGColor }};
`

export const BtnConfirm = styled.button`
    flex-direction: row;
    padding: ${({ padding }) => { return padding ?? '5px' }};
    cursor: pointer;
    border: ${({ border }) => { return border ? `1px solid  ${SEGColor}` : 'none' }};
    border-radius: 30px;
    font-size: var(--font-size-base);
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => { return height ?? 'auto' }};
    background-color: ${({ bgColor }) => { return bgColor ?? 'transparent' }};
    &:disabled {
        cursor: no-drop;
    }
`

export const BtnCancel = styled.button`
    flex-direction: row;
    padding: ${({ padding }) => { return padding ?? '5px' }};
    cursor: pointer;
    border: ${({ border }) => { return border ? `${`1px solid ${SEGColor}`}` : 'none' }};
    border-radius: 30px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ height }) => { return height ?? 'auto' }};
    background-color: ${({ bgColor }) => { return bgColor ?? 'transparent' }};
    &:disabled {
        cursor: no-drop;
    }
`
