import styled, { css, keyframes } from 'styled-components'
import { MODAL_SIZES } from './helpers'
import {
  type BtnCancelProps,
  type BtnCloseProps,
  type BtnConfirmProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalHeaderProps,
  type ModalProps,
  type WrapperProps
} from './interfaces'

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

export const Container = styled.div<ModalProps>`
  display: ${({ show, state }) => {
    if (show && state) return 'block'
    else if (show && !state) return 'block'
    else if (!show && !state) return 'none'
  }};
  position: fixed;
  background: ${({ bgColor }) => {
    return 'rgba(0,0,0,.4)'
  }};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ zIndex }) => {
    return zIndex || '100'
  }};
  opacity: 1;
  ${({ show, state }) => {
    if (show && state) {
 return css`
        animation: ${fadeIn} 0.1s linear;
      `
} else if (show && !state) {
 return css`
        animation: ${fadeIn} .s linear;
      `
}
  }}
`

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  background: transparent;
  width: 100%;
  height: 100%;
  z-index: 888;
  display: flex;
  align-items: center;
  ${(props) => {
    return (
      props.animationBackdrop &&
      css`
        animation: ${Pulse} 0.2s forwards;
      `
    )
  }}
  justify-content: center;
`

export const Modal = styled.div<ModalProps>`
  background: #fff;
  width: ${({ size }) => {
    if (size === MODAL_SIZES.small) return '30%'
    else if (size === MODAL_SIZES.medium) return '60%'
    else if (size === MODAL_SIZES.large) return '100%'
    return size
  }};
  ${(props) => {
    return (
      props.animationBackdrop &&
      css`
        animation: ${Pulse} 0.2s forwards;
      `
    )
  }}
  min-width: 340px;
  border-radius: ${({ borderRadius }) => {
    return borderRadius
  }};
  z-index: 999;
  padding: ${({ padding }) => {
    return padding || '30px 20px'
  }};
  box-shadow: 4px 3px 7px #d6d6d6;
  height: ${({ height }) => {
    return height || 'auto'
  }};
  min-height: ${({ height }) => {
    return height || 'auto'
  }};
  ${({ state }) => {
    return state
      ? css`
          animation: ${fadeInTop} 0.2s forwards;
        `
      : css`
          animation: ${fadeOutTop} 0.2s forwards;
        `
  }}
`

export const ModalHeader = styled.div<ModalHeaderProps>`
  display: flex;
  z-index: 9999;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: ${({ headerColor }) => {
    return headerColor || 'var(--color-base-white)'
  }};
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`

export const ModalTitle = styled.h4`
  margin: 0;
  color: "red";
  font-size: 17px;
  width: auto;
  font-weight: 500;
  color: var(--color-neutral-white);
  font-family: PFont-Regular;
  font-size: 25px;
  margin-left: 60px;
`
export const BtnClose = styled.button<BtnCloseProps>`
  ${({ fixed }) => {
    return (
      fixed &&
      css`
        position: absolute;
        right: 6px;
        top: 6px;
      `
    )
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

export const ModalBody = styled.div<ModalBodyProps>`
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
  border-radius: ${({ borderRadius }) => {
    return borderRadius || 'none'
  }};
  display: ${({ display }) => {
    return display || 'block'
  }};
  height: ${({ height }) => {
    return height || 'auto'
  }};
  min-height: ${({ height }) => {
    return height || 'auto'
  }};
  padding: ${({ padding }) => {
    return padding || '0'
  }};
  .modal-wrapper {
    background-color: #ffffff;
    border-radius: 5px;
    bottom: 0;
    box-shadow: -1px -1px 15px -6px rgba(0, 0, 0, 0.75);
    height: 140px;
    left: 0;
    margin: auto;
    min-width: 300px;
    padding: 20px;
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    z-index: 1000;
    h2 {
      font-family: PFont-Regular;
      font-size: 15px;
      font-weight: 300;
      margin-bottom: 20px;
      text-align: center;
    }
  }
  .modal-confirm {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    place-content: center;
  }
`

export const ModalFooter = styled.div<ModalFooterProps>`
  border-top: 1px solid #eee;
  bottom: 0;
  display: flex;
  justify-content: ${({ justifyButtons }) => { return justifyButtons || 'space-between' }};
  left: 0;
  margin: auto;
  padding: 25px 5px;
  position: absolute;
  right: 0;
  width: 99%;
`

export const BtnConfirm = styled.button<BtnConfirmProps>`
  flex-direction: row;
  padding: ${({ padding }) => {
    return padding || '5px'
  }};
  cursor: pointer;
  border: ${({ border }) => {
    return border ? '1px solid red' : 'none'
  }};
  border-radius: 30px;
  font-size: var(--font-size-base);
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => {
    return height || 'auto'
  }};
  background-color: ${({ bgColor }) => {
    return bgColor || 'transparent'
  }};
  &:disabled {
    cursor: no-drop;
  }
`

export const BtnCancel = styled.button<BtnCancelProps>`
  flex-direction: row;
  padding: ${({ padding }) => {
    return padding || '5px'
  }};
  cursor: pointer;
  border: ${({ border }) => {
    return border ? `${'1px solid \'red\''}` : 'none'
  }};
  border-radius: 30px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => {
    return height || 'auto'
  }};
  background-color: ${({ bgColor }) => {
    return bgColor || 'transparent'
  }};
  &:disabled {
    cursor: no-drop;
  }
`
