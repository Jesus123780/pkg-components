'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode
} from 'react'

import { IconLoading } from '../../../assets'
import { getGlobalStyle } from '../../../utils'
import { BGColor, PColor } from '../../../assets/colors'
import styles from './RippleButton.module.css'

type NativeButtonProps = Omit<
ButtonHTMLAttributes<HTMLButtonElement>,
| 'children'
| 'style'
| 'type'
| 'disabled'
| 'onClick'
| 'onKeyPress'
| 'color'
>

export interface RippleButtonProps extends NativeButtonProps {
  /** Texto principal del botón. Se conserva el nombre y tipo flexible de la API original. */
  label?: any

  onClick?: (e: MouseEvent<HTMLButtonElement>) => void

  loading?: boolean

  style?: CSSProperties

  family?: string

  border?: string

  height?: string

  disabled?: boolean

  /** Prop conservada por compatibilidad con usos existentes. */
  standard?: boolean

  /** Se refleja como data-active para permitir estilos externos sin filtrar props desconocidas al DOM. */
  active?: any

  type?: 'button' | 'submit' | 'reset'

  bgColor?: string

  color?: string

  margin?: string

  padding?: string

  radius?: string

  children?: ReactNode

  onKeyPress?: (e: KeyboardEvent<HTMLButtonElement>) => void

  /** Orden de navegación por teclado. */
  tabIndex?: number

  /** Activa o desactiva el efecto ripple. Por defecto: true. */
  ripple?: boolean

  /** Duración de la onda en milisegundos (se limita entre 100 y 2000 ms). Por defecto: 650. */
  rippleDuration?: number

  /** Color CSS de la onda ripple. */
  rippleColor?: string

  /** Mantiene el ancho del botón al 100%; false permite que se ajuste al contenido. Por defecto: true. */
  fullWidth?: boolean

  /** Ancho explícito del botón. Se consume en el componente y no se reenvía al DOM. */
  widthButton?: CSSProperties['width']

  /** Texto anunciado por lectores de pantalla mientras loading es true. */
  loadingLabel?: ReactNode
}

interface RippleItem {
  id: number
  x: number
  y: number
  diameter: number
}

type RippleButtonStyle = CSSProperties & Record<`--${string}`, string | number | undefined>

const MAX_VISIBLE_RIPPLES = 5
const DEFAULT_RIPPLE_DURATION = 650
const MIN_RIPPLE_DURATION = 100
const MAX_RIPPLE_DURATION = 2000

export const RippleButton = (props: RippleButtonProps) => {
  const {
    label = '',
    onClick,
    loading = false,
    style = {},
    family = 'PFont-Light',
    disabled = false,
    active,
    standard,
    type = 'button',
    bgColor,
    color,
    margin,
    border,
    height,
    padding,
    radius,
    tabIndex,
    onKeyPress,
    ripple = true,
    rippleDuration = DEFAULT_RIPPLE_DURATION,
    rippleColor = 'rgba(255, 255, 255, 0.42)',
    fullWidth = true,
    widthButton,
    loadingLabel = 'Cargando…',
    children,
    className,
    id,
    ...nativeButtonProps
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null)
  const nextRippleId = useRef(0)
  const rippleTimeouts = useRef(
    new Map<number, ReturnType<typeof setTimeout>>()
  )
  const [ripples, setRipples] = useState<RippleItem[]>([])
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  const safeRippleDuration = Number.isFinite(rippleDuration)
    ? Math.min(
      Math.max(rippleDuration, MIN_RIPPLE_DURATION),
      MAX_RIPPLE_DURATION
    )
    : DEFAULT_RIPPLE_DURATION

  const removeRipple = (rippleId: number): void => {
    const timeout = rippleTimeouts.current.get(rippleId)

    if (timeout !== undefined) {
      clearTimeout(timeout)
      rippleTimeouts.current.delete(rippleId)
    }

    setRipples((currentRipples) =>
      currentRipples.filter((currentRipple) => currentRipple.id !== rippleId)
    )
  }

  useEffect(() => {
    return () => {
      rippleTimeouts.current.forEach((timeout) => clearTimeout(timeout))
      rippleTimeouts.current.clear()
    }
  }, [])

  const createRipple = (event: MouseEvent<HTMLButtonElement>): void => {
    if (!ripple || loading || disabled) return

    const element = buttonRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    // JSDOM y algunos entornos embebidos pueden devolver dimensiones cero.
    const width = rect.width || element.clientWidth || 1
    const height = rect.height || element.clientHeight || 1

    // detail === 0 suele indicar activación por teclado o tecnología asistiva.
    const isKeyboardActivation = event.detail === 0
    const rawX = isKeyboardActivation ? width / 2 : event.clientX - rect.left
    const rawY = isKeyboardActivation ? height / 2 : event.clientY - rect.top
    const x = Math.min(Math.max(rawX, 0), width)
    const y = Math.min(Math.max(rawY, 0), height)

    // La onda cubre incluso la esquina más alejada del punto donde se hizo clic.
    const farthestCorner = Math.max(
      Math.hypot(x, y),
      Math.hypot(width - x, y),
      Math.hypot(x, height - y),
      Math.hypot(width - x, height - y)
    )

    const rippleId = nextRippleId.current++
    const newRipple: RippleItem = {
      id: rippleId,
      x,
      y,
      diameter: Math.max(Math.ceil(farthestCorner * 2), 2)
    }

    setRipples((currentRipples) =>
      [...currentRipples, newRipple].slice(-MAX_VISIBLE_RIPPLES)
    )

    // Respaldo por si animationend no se dispara (por ejemplo, con reduced motion).
    const timeout = setTimeout(() => {
      rippleTimeouts.current.delete(rippleId)
      setRipples((currentRipples) =>
        currentRipples.filter((currentRipple) => currentRipple.id !== rippleId)
      )
    }, safeRippleDuration + 180)

    rippleTimeouts.current.set(rippleId, timeout)
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (loading || disabled) {
      event.preventDefault()
      return
    }

    createRipple(event)
    onClick?.(event)
  }

  const buttonStyle: RippleButtonStyle = {
    ...style,
    '--rb-bg-color': bgColor ?? 'var(--color-primary-red)',
    '--rb-color': color ?? BGColor,
    '--rb-font-family': family,
    '--rb-margin': margin ?? '0',
    '--rb-border': border ?? 'none',
    '--rb-height': height ?? 'auto',
    '--rb-padding': padding ?? '1em',
    '--rb-radius': radius ?? '0',
    '--rb-disabled-bg': `${PColor}69`,
    '--rb-ripple-color': rippleColor,
    '--rb-ripple-duration': `${safeRippleDuration}ms`,
    // widthButton es un prop de estilo legacy: nunca debe llegar al DOM.
    width: widthButton ?? style.width ?? (fullWidth ? '100%' : 'auto'),
    cursor: loading || disabled ? 'not-allowed' : style.cursor ?? 'pointer'
  }

  const buttonClassName = [
    'ripple-button',
    styles.rippleButton,
    !fullWidth || widthButton !== undefined ? styles.autoWidth : '',
    loading ? styles.isLoading : '',
    className ?? ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <button
        {...nativeButtonProps}
        ref={buttonRef}
        id={id}
        type={type}
        tabIndex={tabIndex}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onClick={handleClick}
        onKeyPress={onKeyPress}
        className={buttonClassName}
        data-active={active == null ? undefined : String(active)}
        data-standard={standard == null ? undefined : String(standard)}
        style={buttonStyle}
      >
        <span
          id={`${reactId}-label`}
          className={styles.buttonContent}
        >
          {label}
        </span>

        {children != null && (
          <span className={styles.buttonContent}>{children}</span>
        )}

        {ripples.map((currentRipple) => (
          <span
            key={currentRipple.id}
            className={styles.ripple}
            data-testid="ripple-wave"
            aria-hidden="true"
            onAnimationEnd={() => removeRipple(currentRipple.id)}
            style={{
              left: currentRipple.x,
              top: currentRipple.y,
              width: currentRipple.diameter,
              height: currentRipple.diameter
            }}
          />
        ))}

        {loading && (
          <span
            id={`${reactId}-loading`}
            className={styles.loadingWrapper}
            aria-hidden="true"
            data-testid="loading"
          >
            <span className={styles.loadingSpinner}>
              <IconLoading
                color={getGlobalStyle('--color-base-white') || '#ffffff'}
                size={30}
              />
            </span>
          </span>
        )}
      </button>

      {loading && (
        <span
          className={styles.visuallyHidden}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-testid="loading-status"
        >
          {loadingLabel}
        </span>
      )}
    </>
  )
}

export default RippleButton
