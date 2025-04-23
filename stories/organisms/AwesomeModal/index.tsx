import PropTypes from 'prop-types'
import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { Button } from '../../atoms/Button'
import { BUTTONS_TEXT, MODAL_SIZES } from './constanst'
import { getGlobalStyle } from '../../../helpers'
import { Icon, Text } from '../../atoms'
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
  sizeIconClose?: number
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
  sizeIconClose = 30,
  borderRadius = '.3rem',
  onHide = () => {
  },
  onCancel = () => {
  },
  onConfirm = () => {
  }
}) => {
  const [state, setState] = useState<boolean>(Boolean(show))
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
    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.code === 'Escape') {
        setModal(true)
      }
    }

    if (question && backdrop === 'static' && state && (show ?? false)) {
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        if (keyboard) window.removeEventListener('keyup', handleKeyUp)
      }
    }

    if (backdrop !== 'static' && keyboard && (show ?? false)) {
      window.addEventListener('keyup', handleKeyUp)
      return () => {
        window.removeEventListener('keyup', handleKeyUp as EventListener)
      }
    }

    // Cleanup for other cases
    return () => {}
  }, [keyboard, hide, show, backdrop, question, modal, state])

  useEffect(() => {
    return setState(Boolean(show))
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
  const onClickBackdrop = (): void => {
    return hide()
  }

  const classNames = [
    styles.container,
    (show ?? false) && state ? styles.fadeInFast : '',
    (show ?? false) && !state ? styles.fadeInSlow : ''
  ].join(' ')

  const sizeClass = {
    [MODAL_SIZES.small]: styles.small,
    [MODAL_SIZES.medium]: styles.medium,
    [MODAL_SIZES.large]: styles.large
  }[size as keyof typeof MODAL_SIZES] ?? ''

  return (
    <div
    className={classNames}
    style={{
      display: (show ?? false) ? 'block' : 'none',
      zIndex,
      background: bgColor ?? getGlobalStyle('--color-background-overline')
    }}
    >
      <div className={styles.warper} onMouseDown={onClickBackdrop}>
        <div
        className={`${styles.modal} ${sizeClass}`}
        style={{ height: height ?? 'auto', borderRadius: borderRadius ?? undefined }}
        onMouseDown={(e) => {
          return e.stopPropagation()
        }}
        >
        {header && (
          <div className={styles.modal_header}>
            <Text className={styles.modal_title} >
              {title}
            </Text>
            <button
              style={{ backgroundColor: getGlobalStyle('--color-base-transparent'), cursor: 'pointer' }}
              onClick={() => {
                return question ? onShowQuestion() : hide()
              }}
            >
              <Icon
              icon='IconCancel'
              color={getGlobalStyle('--color-background-primary')}
              size={sizeIconClose}
              />
            </button>
          </div>
        )}
        <div
          className={styles.modal_body}
          style={{
            backgroundColor,
            borderRadius,
            display,
            padding,
            height: customHeight !== '' ? customHeight : 'calc(100vh - 50px)'
          }}
        >
          {children}
        </div>
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
        </div>
      </div>
    </div>
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
  sizeIconClose: PropTypes.number,
  submit: PropTypes.bool,
  timeOut: PropTypes.number,
  title: PropTypes.string,
  useScroll: PropTypes.bool,
  zIndex: PropTypes.any
}
