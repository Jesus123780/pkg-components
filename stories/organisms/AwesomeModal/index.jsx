import PropTypes from 'prop-types'
import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { IconClose } from '../../../assets/icons'
import { RippleButton } from '../../atoms'
import { Button } from '../../atoms/Button'
import { BUTTONS_TEXT, MODAL_SIZES } from './constanst'
import { BtnClose, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Wrapper } from './styled'

export const AwesomeModal = ({
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
  backdrop = '',
  iconConfirm = null,
  useScroll = false,
  keyboard = true,
  footer = true,
  btnCancel = true,
  openLateral,
  btnConfirm = true,
  children,
  hideOnConfirm = true,
  timeOut = 200,
  backdropAnimation = false,
  height,
  bgColor,
  question = false,
  customHeight = '',
  submit = false,
  header = true,
  sizeIconClose = '30px',
  borderRadius = '.3rem',
  onHide = () => {
    return
  },
  onCancel = () => {
    return
  },
  onConfirm = () => {
    return
  }
}) => {
  const [state, setState] = useState(show)
  const [modal, setSModal] = useState(false)
  const [backdropA, setAnimationBackdrop] = useState(false)
  const hide = useCallback(() => {
    setState(false)
    onCancel()
    setSModal(false)
    setTimeout(onHide, timeOut)
  }, [onCancel, onHide, timeOut])
  const onShowQuestion = () => {
    return setSModal(!modal)
  }
  // eslint-disable-next-line consistent-return

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.code === 'Escape') {
        setSModal(true)
      }
    }

    if (question && backdrop === 'static' && state && show) {
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        if (keyboard) window.removeEventListener('keyup', handleKeyUp)
      }
    }

    if (backdrop !== 'static' && keyboard && show) {
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        window.removeEventListener('keyup', handleKeyUp)
      }
    }

    // Cleanup for other cases
    return () => {}
  }, [keyboard, hide, show, backdrop, question, modal, state])

  useEffect(() => {
    setState(show)
  }, [show])
  const onBackdropHide = (e) => {
    e.preventDefault()
    if (backdrop === 'static') {
      setAnimationBackdrop(true)
    } else {
      hide()
    }
    setTimeout(() => {
      return setAnimationBackdrop(false)
    }, 100)
  }
  useEffect(() => {
    if (show && useScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show, useScroll])
  const clickCancel = () => {
    setState(false)
    onCancel()
    setSModal(false)
    setTimeout(onHide, timeOut)
    onCancel()
  }
  const clickConfirm = () => {
    if (hideOnConfirm) setState(false)
    onCancel()
    setSModal(false)
    if (hideOnConfirm) {
      setTimeout(onHide, timeOut)
    }
    onConfirm()
  }
  const onClickBackdrop = () => {
    if (backdropAnimation) {
      setAnimationBackdrop(false)
    }
  }

  return (
    <Container
      bgColor={bgColor}
      onMouseDown={onBackdropHide}
      openLateral={openLateral}
      show={show}
      showLateral={show}
      state={state}
      zIndex={zIndex}
    >
      <Wrapper backdropA={backdropA} onMouseDown={onClickBackdrop}>
        <Modal
          backdropA={backdropA}
          borderRadius={borderRadius}
          height={height}
          onMouseDown={(e) => {
            return e.stopPropagation()
          }}
          show={show}
          showLateral={show}
          size={size}
          state={state}
        >
          {header && (
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <BtnClose
                onClick={() => {
                  return question ? onShowQuestion() : hide()
                }}
              >
                <IconClose color={PColor} size={sizeIconClose} />
              </BtnClose>
            </ModalHeader>
          )}
          <ModalBody
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            display={display}
            height={customHeight || 'calc(100vh - 50px)'}
            padding={padding}
          >
            {modal && show && (
              <div className='modal-wrapper'>
                <h2>{`¿Seguro que quieres cerrar ${title ?? ''}?`}</h2>
                <div className='modal-confirm'>
                  <RippleButton
                    border
                    disabled={disabled}
                    onClick={() => {
                      return setSModal(false)
                    }}
                    type='button'
                  >
                    {cancel || BUTTONS_TEXT.cancel}
                  </RippleButton>
                  <RippleButton
                    border
                    color={BGColor}
                    onClick={() => {
                      hide()
                    }}
                    type={submit ? 'submit' : 'button'}
                  >
                    {confirm || BUTTONS_TEXT.confirm}
                  </RippleButton>
                </div>
              </div>
            )}
            {children}
          </ModalBody>
          {footer && (
            <ModalFooter backgroundColor={backgroundColor}>
              {btnCancel && (
                <Button
                  backgroundColor={PColor}
                  border
                  disabled={disabled}
                  onClick={clickCancel}
                  type='button'
                  widthButton='200px'
                >
                  {cancel || BUTTONS_TEXT.cancel}
                </Button>
              )}
              {btnConfirm && (
                <Button
                  backgroundColor={PColor}
                  border
                  onClick={clickConfirm}
                  type={submit ? 'submit' : 'button'}
                  widthButton='200px'
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

AwesomeModal.propTypes = {
  backdrop: PropTypes.string,
  backdropAnimation: PropTypes.bool,
  backgroundColor: PropTypes.any,
  bgColor: PropTypes.any,
  borderRadius: PropTypes.string,
  btnCancel: PropTypes.bool,
  btnConfirm: PropTypes.bool,
  cancel: PropTypes.string,
  children: PropTypes.any,
  closeIcon: PropTypes.bool,
  confirm: PropTypes.any,
  customHeight: PropTypes.bool,
  disabled: PropTypes.any,
  display: PropTypes.any,
  footer: PropTypes.bool,
  header: PropTypes.bool,
  height: PropTypes.any,
  hideOnConfirm: PropTypes.bool,
  iconConfirm: PropTypes.any,
  keyboard: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onHide: PropTypes.func,
  openLateral: PropTypes.any,
  padding: PropTypes.any,
  question: PropTypes.bool,
  show: PropTypes.any,
  size: PropTypes.any,
  sizeIconClose: PropTypes.string,
  submit: PropTypes.bool,
  timeOut: PropTypes.number,
  title: PropTypes.string,
  useScroll: PropTypes.bool,
  zIndex: PropTypes.any
}
