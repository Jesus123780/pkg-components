
'use client'

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import type {
  CSSProperties,
  MouseEvent,
  ReactNode,
  TransitionEvent
} from 'react'

import { Button } from '../../atoms/Button'
import { BUTTONS_TEXT, MODAL_SIZES } from './constanst'
import { getGlobalStyle } from '../../../helpers'
import { Icon, Text } from '../../atoms'
import styles from './styles.module.css'

type ModalPhase =
  | 'preparing'
  | 'opening'
  | 'open'
  | 'closing'
  | 'closed'

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
  children?: ReactNode
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

const DEFAULT_MODAL_ENTER_DURATION = 400
const DEFAULT_MODAL_EXIT_DURATION = 360
const DEFAULT_OVERLAY_ENTER_DURATION = 180

const TRANSITION_FALLBACK_GRACE = 80

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

const normalizeDuration = (
  value: number | undefined,
  fallback: number
): number => {
  const duration = Number(value)

  if (!Number.isFinite(duration)) {
    return fallback
  }

  return Math.max(0, duration)
}

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false
  }

  return window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
}

const getFocusableElements = (
  container: HTMLElement
): HTMLElement[] => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter(element => (
    element.getAttribute('aria-hidden') !== 'true' &&
    element.getAttribute('aria-disabled') !== 'true' &&
    element.getClientRects().length > 0
  ))
}

/**
 * Bloqueo compartido del scroll.
 *
 * Evita que una instancia restaure el overflow del body
 * mientras otra instancia mantiene el scroll bloqueado.
 */
let bodyScrollLockCount = 0
let previousBodyOverflow: string | null = null

const acquireBodyScrollLock = (): (() => void) => {
  if (typeof document === 'undefined') {
    return () => {}
  }

  if (bodyScrollLockCount === 0) {
    previousBodyOverflow = document.body.style.overflow
  }

  bodyScrollLockCount += 1
  document.body.style.overflow = 'hidden'

  let released = false

  return () => {
    if (released) {
      return
    }

    released = true
    bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1)

    if (bodyScrollLockCount === 0) {
      document.body.style.overflow = previousBodyOverflow ?? ''
      previousBodyOverflow = null
    }
  }
}

export const AwesomeModal = ({
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
  timeOut = DEFAULT_MODAL_EXIT_DURATION,
  height,
  bgColor,
  question = false,
  customHeight = '',
  submit = false,
  header = true,
  sizeIconClose = 30,
  borderRadius = '.3rem',
  onHide = () => {},
  onCancel = () => {},
  onConfirm = () => {}
}: IPropsAwesomeModal) => {
  const initiallyVisible = Boolean(show)

  const titleId = useId()

  /**
   * =========================================================
   * ESTADO PRINCIPAL
   * =========================================================
   *
   * preparing:
   * El modal acaba de montarse fuera del viewport.
   *
   * opening:
   * El modal está realizando su transición de entrada.
   *
   * open:
   * El modal terminó de abrirse.
   *
   * closing:
   * El overlay y el modal realizan sus transiciones
   * independientes de salida.
   *
   * closed:
   * El modal terminó su ciclo de vida.
   */

  const [isMounted, setIsMounted] = useState(initiallyVisible)

  const [phase, setPhaseState] = useState<ModalPhase>(
    initiallyVisible ? 'preparing' : 'closed'
  )

  const isClosing = phase === 'closing'

  const initialMountedRef = useRef(initiallyVisible)

  const phaseRef = useRef<ModalPhase>(
    initiallyVisible ? 'preparing' : 'closed'
  )

  const mountedRef = useRef(initiallyVisible)
  const closingRef = useRef(false)

  /**
   * =========================================================
   * REFERENCIAS DE ANIMACIÓN
   * =========================================================
   */

  const modalRef = useRef<HTMLDivElement>(null)

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const enterFrameRef = useRef<number | null>(null)

  const restoreFocusFrameRef = useRef<number | null>(null)

  const closeSequenceRef = useRef(0)

  const activeCloseDurationRef = useRef<number | null>(null)

  const notifyParentRef = useRef(false)

  const previousFocusRef = useRef<HTMLElement | null>(null)

  /**
   * =========================================================
   * CALLBACKS ACTUALIZADOS
   * =========================================================
   */

  const onHideRef = useRef(onHide)
  const onCancelRef = useRef(onCancel)
  const onConfirmRef = useRef(onConfirm)

  onHideRef.current = onHide
  onCancelRef.current = onCancel
  onConfirmRef.current = onConfirm

  /**
   * =========================================================
   * CAMBIO DE ESTADO
   * =========================================================
   */

  const setPhase = useCallback((nextPhase: ModalPhase): void => {
    phaseRef.current = nextPhase
    setPhaseState(nextPhase)
  }, [])

  /**
   * =========================================================
   * LIMPIEZA DE RECURSOS
   * =========================================================
   */

  const clearCloseTimer = useCallback((): void => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const cancelEnterFrame = useCallback((): void => {
    if (
      enterFrameRef.current !== null &&
      typeof window !== 'undefined'
    ) {
      window.cancelAnimationFrame(enterFrameRef.current)
      enterFrameRef.current = null
    }
  }, [])

  const cancelRestoreFocusFrame = useCallback((): void => {
    if (
      restoreFocusFrameRef.current !== null &&
      typeof window !== 'undefined'
    ) {
      window.cancelAnimationFrame(restoreFocusFrameRef.current)
      restoreFocusFrameRef.current = null
    }
  }, [])

  /**
   * =========================================================
   * RESTAURACIÓN DEL FOCO
   * =========================================================
   */

  const restoreFocus = useCallback((): void => {
    const previousElement = previousFocusRef.current

    if (!previousElement || typeof window === 'undefined') {
      return
    }

    cancelRestoreFocusFrame()

    restoreFocusFrameRef.current = window.requestAnimationFrame(() => {
      restoreFocusFrameRef.current = null

      if (mountedRef.current) {
        return
      }

      if (previousElement.isConnected) {
        previousElement.focus({
          preventScroll: true
        })
      }

      if (previousFocusRef.current === previousElement) {
        previousFocusRef.current = null
      }
    })
  }, [cancelRestoreFocusFrame])

  /**
   * =========================================================
   * FINALIZACIÓN DEL CIERRE
   * =========================================================
   *
   * El identificador de generación invalida cualquier evento
   * o temporizador perteneciente a un cierre anterior.
   */

  const finishClose = useCallback((
    expectedSequence: number
  ): void => {
    if (
      !mountedRef.current ||
      !closingRef.current ||
      expectedSequence !== closeSequenceRef.current
    ) {
      return
    }

    clearCloseTimer()
    cancelEnterFrame()

    const shouldNotifyParent = notifyParentRef.current

    mountedRef.current = false
    closingRef.current = false
    notifyParentRef.current = false
    activeCloseDurationRef.current = null

    setPhase('closed')
    setIsMounted(false)

    restoreFocus()

    if (shouldNotifyParent) {
      onHideRef.current()
    }
  }, [
    clearCloseTimer,
    cancelEnterFrame,
    restoreFocus,
    setPhase
  ])

  /**
   * =========================================================
   * INICIO DEL CIERRE
   * =========================================================
   */

  const startClose = useCallback((
    notifyParent: boolean,
    notifyCancel: boolean
  ): void => {
    if (!mountedRef.current || closingRef.current) {
      return
    }

    const currentPhase = phaseRef.current

    closingRef.current = true
    notifyParentRef.current = notifyParent

    const configuredDuration = normalizeDuration(
      timeOut,
      DEFAULT_MODAL_EXIT_DURATION
    )

    const effectiveDuration = prefersReducedMotion()
      ? 1
      : configuredDuration

    activeCloseDurationRef.current = effectiveDuration

    clearCloseTimer()
    cancelEnterFrame()

    const sequence = ++closeSequenceRef.current

    setPhase('closing')

    const finishImmediately =
      currentPhase === 'preparing' ||
      configuredDuration === 0

    if (!finishImmediately) {
      closeTimerRef.current = setTimeout(() => {
        finishClose(sequence)
      }, effectiveDuration + TRANSITION_FALLBACK_GRACE)
    }

    if (notifyCancel) {
      onCancelRef.current()
    }

    if (finishImmediately) {
      finishClose(sequence)
    }
  }, [
    timeOut,
    clearCloseTimer,
    cancelEnterFrame,
    finishClose,
    setPhase
  ])

  /**
   * =========================================================
   * APERTURA / REAPERTURA
   * =========================================================
   *
   * Si está cerrándose, recupera su posición desde el punto
   * geométrico en el que se encuentra.
   *
   * No vuelve a trasladarse artificialmente al punto inicial.
   */

  const openModal = useCallback((): void => {
    const wasMounted = mountedRef.current

    clearCloseTimer()
    cancelEnterFrame()
    cancelRestoreFocusFrame()

    closeSequenceRef.current += 1

    mountedRef.current = true
    closingRef.current = false
    notifyParentRef.current = false
    activeCloseDurationRef.current = null

    if (wasMounted) {
      setPhase('opening')
      return
    }

    setIsMounted(true)
    setPhase('preparing')
  }, [
    clearCloseTimer,
    cancelEnterFrame,
    cancelRestoreFocusFrame,
    setPhase
  ])

  /**
   * =========================================================
   * PREPARACIÓN DE LA ENTRADA
   * =========================================================
   */

  useLayoutEffect(() => {
    if (!isMounted || phase !== 'preparing') {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      enterFrameRef.current = null

      if (
        !mountedRef.current ||
        closingRef.current ||
        phaseRef.current !== 'preparing'
      ) {
        return
      }

      setPhase('opening')
    })

    enterFrameRef.current = frame

    return () => {
      if (enterFrameRef.current === frame) {
        window.cancelAnimationFrame(frame)
        enterFrameRef.current = null
      }
    }
  }, [isMounted, phase, setPhase])

  /**
   * =========================================================
   * SINCRONIZACIÓN CON SHOW
   * =========================================================
   */

  useEffect(() => {
    if (show) {
      if (!mountedRef.current || closingRef.current) {
        openModal()
      }

      return
    }

    if (mountedRef.current && !closingRef.current) {
      startClose(false, false)
    }
  }, [show, openModal, startClose])

  /**
   * =========================================================
   * CAPTURA DEL FOCO ANTERIOR
   * =========================================================
   */

  useLayoutEffect(() => {
    if (!isMounted || previousFocusRef.current) {
      return
    }

    const activeElement = document.activeElement

    if (
      activeElement instanceof HTMLElement &&
      activeElement !== document.body &&
      !modalRef.current?.contains(activeElement)
    ) {
      previousFocusRef.current = activeElement
    }
  }, [isMounted])

  /**
   * =========================================================
   * FOCO INICIAL
   * =========================================================
   */

  useEffect(() => {
    if (!isMounted || isClosing) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      if (!mountedRef.current || closingRef.current) {
        return
      }

      const modalElement = modalRef.current

      if (!modalElement) {
        return
      }

      const focusableElements = getFocusableElements(modalElement)

      const elementToFocus =
        focusableElements[0] ?? modalElement

      elementToFocus.focus({
        preventScroll: true
      })
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [isMounted, isClosing])

  /**
   * =========================================================
   * TRAMPA DE FOCO
   * =========================================================
   */

  useEffect(() => {
    if (!isMounted || isClosing) {
      return
    }

    const handleTabKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') {
        return
      }

      const modalElement = modalRef.current

      if (!modalElement) {
        return
      }

      const focusableElements = getFocusableElements(modalElement)

      if (focusableElements.length === 0) {
        event.preventDefault()

        modalElement.focus({
          preventScroll: true
        })

        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[
        focusableElements.length - 1
      ]

      const activeElement = document.activeElement

      if (!modalElement.contains(activeElement)) {
        event.preventDefault()

        const target = event.shiftKey
          ? lastElement
          : firstElement

        target.focus({
          preventScroll: true
        })

        return
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()

        lastElement.focus({
          preventScroll: true
        })

        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()

        firstElement.focus({
          preventScroll: true
        })
      }
    }

    document.addEventListener('keydown', handleTabKeyDown)

    return () => {
      document.removeEventListener('keydown', handleTabKeyDown)
    }
  }, [isMounted, isClosing])

  /**
   * =========================================================
   * TECLA ESCAPE
   * =========================================================
   */

  useEffect(() => {
    if (!isMounted || isClosing || !keyboard) {
      return
    }

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') {
        return
      }

      if (backdrop === 'static') {
        return
      }

      startClose(true, true)
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    isMounted,
    isClosing,
    keyboard,
    backdrop,
    startClose
  ])

  /**
   * =========================================================
   * SCROLL DEL DOCUMENTO
   * =========================================================
   */

  useEffect(() => {
    if (!useScroll || !isMounted) {
      return
    }

    return acquireBodyScrollLock()
  }, [useScroll, isMounted])

  /**
   * =========================================================
   * FINALIZACIÓN DE TRANSICIÓN
   * =========================================================
   */

  const handleModalTransitionEnd = useCallback((
    event: TransitionEvent<HTMLDivElement>
  ): void => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.propertyName !== 'transform') {
      return
    }

    if (phaseRef.current === 'closing') {
      finishClose(closeSequenceRef.current)
      return
    }

    if (phaseRef.current === 'opening') {
      setPhase('open')
    }
  }, [finishClose, setPhase])

  /**
   * =========================================================
   * ACCIONES
   * =========================================================
   */

  const hide = useCallback((): void => {
    startClose(true, true)
  }, [startClose])

  const clickCancel = useCallback((): void => {
    startClose(true, true)
  }, [startClose])

  const clickConfirm = useCallback((): void => {
    if (closingRef.current || !mountedRef.current) {
      return
    }

    if (hideOnConfirm) {
      startClose(true, false)
    }

    onConfirmRef.current()
  }, [hideOnConfirm, startClose])

  const clickCloseButton = useCallback((): void => {
    if (question) {
      return
    }

    hide()
  }, [question, hide])

  const onClickBackdrop = useCallback((
    event: MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (backdrop === 'static') {
      return
    }

    hide()
  }, [backdrop, hide])

  /**
   * =========================================================
   * DURACIONES CSS
   * =========================================================
   */

  const configuredCloseDuration = normalizeDuration(
    timeOut,
    DEFAULT_MODAL_EXIT_DURATION
  )

  const currentCloseDuration =
    activeCloseDurationRef.current ?? configuredCloseDuration

  const overlayCloseDuration = Math.min(
    180,
    Math.max(80, Math.round(currentCloseDuration * 0.5))
  )

  const containerStyle = {
    zIndex: zIndex ?? 100,

    '--modal-enter-duration':
      `${DEFAULT_MODAL_ENTER_DURATION}ms`,

    '--modal-close-duration':
      `${currentCloseDuration}ms`,

    '--overlay-enter-duration':
      `${DEFAULT_OVERLAY_ENTER_DURATION}ms`,

    '--overlay-close-duration':
      `${overlayCloseDuration}ms`
  } as CSSProperties

  /**
   * =========================================================
   * CLASES CSS
   * =========================================================
   */

  const sizeClasses: Record<string, string> = {
    [MODAL_SIZES.small]: styles.small,
    [MODAL_SIZES.medium]: styles.medium,
    [MODAL_SIZES.large]: styles.large
  }

  const sizeClass =
    sizeClasses[size] ??
    (size === MODAL_SIZES.medium ? styles.medium : size)

  const phaseClasses: Record<ModalPhase, string> = {
    preparing: styles.preparing,
    opening: styles.opening,
    open: styles.open,
    closing: styles.closing,
    closed: ''
  }

  const containerClassName = [
    styles.container,
    phaseClasses[phase]
  ].filter(Boolean).join(' ')

  const modalClassName = [
    styles.modal,
    sizeClass
  ].filter(Boolean).join(' ')

  /**
   * =========================================================
   * LIMPIEZA AL DESMONTAR
   * =========================================================
   *
   * La referencia inicial permite recuperar correctamente
   * mountedRef durante la doble ejecución de efectos
   * que realiza React Strict Mode en desarrollo.
   */

  useEffect(() => {
    mountedRef.current = initialMountedRef.current

    return () => {
      clearCloseTimer()
      cancelEnterFrame()
      cancelRestoreFocusFrame()

      mountedRef.current = false
      closingRef.current = false
      notifyParentRef.current = false
    }
  }, [
    clearCloseTimer,
    cancelEnterFrame,
    cancelRestoreFocusFrame
  ])

  /**
   * =========================================================
   * RENDER
   * =========================================================
   */

  if (!isMounted) {
    return null
  }

  const backdropStyle: CSSProperties = {
    background: bgColor ?? getGlobalStyle(
      '--color-background-overline'
    )
  }

  const modalStyle: CSSProperties = {
    height: height ?? 'auto',
    borderRadius: borderRadius ?? undefined
  }

  const bodyStyle: CSSProperties = {
    backgroundColor,
    borderRadius,
    display,
    padding,
    height: customHeight !== ''
      ? customHeight
      : 'calc(100vh - 80px)'
  }

  return (
    <div
      className={containerClassName}
      style={containerStyle}
    >
      <div
        className={styles.backdrop}
        style={backdropStyle}
        aria-hidden='true'
        onMouseDown={onClickBackdrop}
      />

      <div className={styles.wrapper}>
        <div
          ref={modalRef}
          className={modalClassName}
          style={modalStyle}
          role='dialog'
          aria-modal='true'
          aria-labelledby={header && title ? titleId : undefined}
          aria-label={
            !(header && title)
              ? 'Ventana de diálogo'
              : undefined
          }
          tabIndex={-1}
          onTransitionEnd={handleModalTransitionEnd}
          onMouseDown={event => event.stopPropagation()}
        >
          {header && (
            <div className={styles.modal_header}>
              <Text
                as='h2'
                id={titleId}
                className={styles.modal_title}
                styles={{
                  paddingLeft: padding
                }}
              >
                {title}
              </Text>

              <button
                type='button'
                className={styles.close_button}
                aria-label='Cerrar ventana'
                disabled={isClosing}
                style={{
                  backgroundColor: getGlobalStyle(
                    '--color-base-transparent'
                  ),
                  cursor: isClosing ? 'default' : 'pointer'
                }}
                onClick={clickCloseButton}
              >
                <Icon
                  icon='IconCancel'
                  color={getGlobalStyle(
                    '--color-background-primary'
                  )}
                  size={sizeIconClose}
                />
              </button>
            </div>
          )}

          <div
            className={styles.modal_body}
            style={bodyStyle}
          >
            {children}
          </div>

          {footer && (
            <div className={styles.footer_modal}>
              {btnCancel && (
                <Button
                  disabled={disabled || isClosing}
                  onClick={clickCancel}
                  type='button'
                >
                  {cancel ?? BUTTONS_TEXT.cancel}
                </Button>
              )}

              {btnConfirm && (
                <Button
                  disabled={disabled || isClosing}
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
