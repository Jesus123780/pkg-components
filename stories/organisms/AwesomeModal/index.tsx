import PropTypes from 'prop-types'
import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { IconClose } from '../../../assets/icons'
import { Button } from '../../atoms/Button'
import { BUTTONS_TEXT, MODAL_SIZES } from './constanst'
import {
  BtnClose,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Wrapper
} from './styled'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'
interface IPropsAwesomeModal {
  backgroundColor?: string
  title?: string
  size?: string
  show?: boolean
  disabled?: any
  display?: any
  zIndex?: any
  cancel?: string
  confirm?: string
  padding?: any
  backdrop?: string
  iconConfirm?: any
  useScroll?: boolean
  keyboard?: boolean
  footer?: boolean
  btnCancel?: boolean
  openLateral?: any
  btnConfirm?: boolean
  children?: any
  hideOnConfirm?: boolean
  timeOut?: number
  backdropAnimation?: boolean
  height?: any
  bgColor?: any
  question?: boolean
  customHeight?: any
  submit?: boolean
  header?: boolean
  sizeIconClose?: string
  borderRadius?: string
  onHide?: () => void
  onCancel?: () => void
  onConfirm?: () => void

}
export const AwesomeModal: React.FC<IPropsAwesomeModal> = ({
  backgroundColor = '',
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
  height,
  bgColor,
  question = false,
  customHeight = '',
  submit = false,
  header = true,
  sizeIconClose = '30px',
  borderRadius = '.3rem',
  onHide = () => {
  },
  onCancel = () => {
  },
  onConfirm = () => {
  }
}) => {
  const [state, setState] = useState<boolean | undefined>(show)
  const [modal, setModal] = useState<boolean>(false)
  const hide = useCallback(() => {
    setState(false)
    onCancel()
    setModal(false)
    setTimeout(onHide, timeOut)
  }, [onCancel, onHide, timeOut])

  const onShowQuestion = (): void => {
    return setModal(!modal)
  }

  useEffect(() => {
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.code === 'Escape') {
        setModal(true)
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

  useEffect(() => {
    if (show === true && useScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show, useScroll])

  const clickCancel = (): void => {
    setState(false)
    onCancel()
    setModal(false)
    setTimeout(onHide, timeOut)
    onCancel()
  }
  const clickConfirm = (): void => {
    if (hideOnConfirm) setState(false)
    onCancel()
    setModal(false)
    if (hideOnConfirm) {
      setTimeout(onHide, timeOut)
    }
    onConfirm()
  }

  return (
    <Container
      show={show}
      state={state}
      zIndex={zIndex}
    >
      <Wrapper>
        <Modal
          borderRadius={borderRadius}
          height={height}
          onMouseDown={(e) => {
            return e.stopPropagation()
          }}
          size={size}
          state={state}
        >
          {header && (
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <button
                style={{ backgroundColor: getGlobalStyle('--color-base-transparent'), cursor: 'pointer' }}
                onClick={() => {
                  return question ? onShowQuestion() : hide()
                }}
              >
                <IconClose color={getGlobalStyle('--color-background-primary')} size={sizeIconClose} />
              </button>
            </ModalHeader>
          )}
          <ModalBody
            bgColor={backgroundColor}
            borderRadius={borderRadius}
            display={display}
            height={customHeight !== '' ? customHeight : 'calc(100vh - 50px)'}
            padding={padding}
          >
            {children}
          </ModalBody>
          {footer && (
            <div className={styles.footer_modal} >
              {btnCancel && (
                <Button
                  disabled={disabled}
                  onClick={clickCancel}
                  type='button'
                >
                  {cancel ?? BUTTONS_TEXT.cancel}
                </Button>
              )}
              {btnConfirm && (
                <Button
                  primary
                  border='primary'
                  onClick={clickConfirm}
                  type={submit ? 'submit' : 'button'}
                >
                  {confirm ?? BUTTONS_TEXT.confirm}
                  {iconConfirm}
                </Button>
              )}
            </div>
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
