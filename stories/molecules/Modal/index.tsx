import React, { useCallback, useEffect, useState } from "react"
import {
  BtnClose,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Wrapper,
} from "./styled"
import { BUTTONS_TEXT, MODAL_SIZES } from "./helpers"
import { Button, Icon } from "../../atoms"

export type AwesomeModalProps = {
  animationBackdropAnimation?: boolean
  backdrop?: string
  backgroundColor?: string
  bgColor?: string
  borderRadius?: string
  iconColor?: string
  btnCancel?: boolean
  btnConfirm?: boolean
  children: React.ReactNode
  customHeight?: string
  disabled?: boolean
  display?: string
  footer?: boolean
  header?: boolean
  height?: string
  hideOnConfirm?: boolean
  iconConfirm?: any
  keyboard?: boolean
  padding?: string
  iconSize?: number
  question?: boolean
  show: boolean
  size?: string
  headerColor?: string
  submit?: boolean
  timeOut?: number
  title?: string
  useScroll?: boolean
  zIndex?: number
  cancel?: boolean
  confirm?: boolean
  justifyButtons?: 'end' | 'center' | 'space-between' | 'start-end' | 'start-center' | 'start-space-between' | 'end-center' | 'end-space-between' | 'center-space-between'
  onCancel?: () => void
  onConfirm?: () => void
  onHide?: () => void
}


export const AwesomeModal: React.FC<AwesomeModalProps> = ({
  backgroundColor,
  title,
  size = MODAL_SIZES.medium,
  show,
  disabled,
  display,
  zIndex,
  cancel,
  confirm,
  padding,
  justifyButtons,
  iconSize,
  backdrop = "",
  iconColor = "",
  iconConfirm = null,
  useScroll = false,
  keyboard = true,
  footer = false,
  btnCancel = true,
  btnConfirm = true,
  children,
  hideOnConfirm = true,
  timeOut = 200,
  animationBackdropAnimation = false,
  height,
  bgColor,
  question = false,
  customHeight = "",
  headerColor = "",
  submit = false,
  header = true,
  borderRadius = ".3rem",
  onHide = () => {
    return
  },
  onCancel = () => {
    return
  },
  onConfirm = () => {
    return
  },
}) => {
  const [state, setState] = useState<boolean>(show)
  const [modal, setModal] = useState<boolean>(false)
  const [animationBackdrop, setAnimationBackdrop] = useState<boolean>(false)

  const hide = useCallback(() => {
    setState(false)
    onCancel()
    setModal(false)
    setTimeout(onHide, timeOut)
  }, [onCancel, onHide, timeOut])

  const onShowQuestion = () => {
    return setModal(!modal)
  }

  const clickCancel = ():void => {
    setState(false)
    onCancel()
    setModal(false)
    setTimeout(onHide, timeOut)
    onCancel()
  }
  const clickConfirm = () => {
    if (hideOnConfirm) setState(false)
    onCancel()
    setModal(false)
    if (hideOnConfirm) {
      setTimeout(onHide, timeOut)
    }
    onConfirm()
  }


  useEffect(() => {
    /**
     * Handles the key up event to detect the "Escape" key press.
     *
     * @param {KeyboardEvent} e - The keyboard event object.
     * @returns {void}
     */
    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        setModal(true)
      }
    }

    if (question && backdrop === "static" && state && show) {
      window.addEventListener("keyup", handleKeyUp)
      return () => {
        if (keyboard) window.removeEventListener("keyup", handleKeyUp)
      }
    }

    if (backdrop !== "static" && keyboard && show) {
      window.addEventListener("keyup", handleKeyUp)
      return () => {
        window.removeEventListener("keyup", handleKeyUp)
      }
    }

    // Cleanup for other cases
    return () => {}
  }, [keyboard, hide, show, backdrop, question, modal, state])

  /**
   * Handles the backdrop hiding logic based on specific conditions.
   *
   * @param {Event} e - The event object.
   * @returns {void}
   */
  const onBackdropHide = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (backdrop === "static") {
      setAnimationBackdrop(true)
    } else {
      hide()
    }
    setTimeout(() => {
      setAnimationBackdrop(false)
    }, 100)
  }

  useEffect(() => {
    if (show && useScroll) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [show, useScroll])

  useEffect(() => {
    setState(show)
  }, [show])

  const onClickBackdrop = () => {
    if (animationBackdropAnimation) {
      setAnimationBackdrop(false)
    }
  }

  return (
    <Container
      bgColor={bgColor}
      onMouseDown={onBackdropHide}
      show={show}
      state={state}
      zIndex={zIndex}
    >
      <Wrapper animationBackdrop={animationBackdrop} onMouseDown={onClickBackdrop}>
        <Modal
          animationBackdrop={animationBackdrop}
          borderRadius={borderRadius}
          height={height}
          padding={padding}
          onMouseDown={(e) => {
            return e.stopPropagation()
          }}
          show={show}
          size={size}
          state={state}
        >
          {header && (
            <ModalHeader headerColor={headerColor}>
              <ModalTitle>{title}</ModalTitle>
              <BtnClose
                onClick={() => {
                  return question ? onShowQuestion() : hide()
                }}
              >
               <Icon size={iconSize || 56.92} icon="IconClose" color={iconColor} />
              </BtnClose>
            </ModalHeader>
          )}
          <ModalBody
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            display={display}
            height={customHeight || "100%"}
          >
            {children}
          </ModalBody>
          {footer && (
            <ModalFooter backgroundColor={backgroundColor} justifyButtons={justifyButtons}>
              {btnCancel && (
                <Button
                  styles={{ marginRight: '16px' }}
                  disabled={disabled}
                  onClick={clickCancel}
                  type='button'
                  fontSize="25px"
                  width='274px'
                >
                  {cancel || BUTTONS_TEXT.cancel}
                </Button>
              )}
              {btnConfirm && (
                <Button
                  primary
                  padding="22px 90px"
                  type={submit ? 'submit' : 'button'}
                  width='274px'
                  fontSize="25px"

                >
                  {confirm || BUTTONS_TEXT.confirm}
                  {iconConfirm}
                </Button>
              )}
            </ModalFooter>
          )}
        </Modal>
      </Wrapper>
    </Container>
  )
}
