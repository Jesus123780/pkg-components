import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import styles from './style.module.css'

import {
  Icon,
  Text
} from '../../atoms'

import {
  getGlobalStyle
} from '../../../helpers'

export type Layout =
  | 'list'
  | 'columns'

interface LayoutOption {
  value: Layout
  label: string
  icon: string
}

interface LayoutSwitcherProps {
  setLayout: (layout: Layout) => void
  layout?: Layout

  disabled?: boolean

  /**
   * Permite reutilizar el componente
   * con un aria-label diferente.
   */
  ariaLabel?: string

  /**
   * Muestra el texto junto al icono.
   * Por defecto mantiene el comportamiento actual.
   */
  showLabels?: boolean

  /**
   * Tamaño visual del selector.
   */
  size?: 'sm' | 'md'

  /**
   * Hace que el switcher ocupe todo
   * el ancho disponible.
   */
  fullWidth?: boolean

  /**
   * Clase adicional para personalización externa.
   */
  className?: string
}

const LAYOUT_OPTIONS: LayoutOption[] = [
  {
    value: 'list',
    label: 'Lista',
    icon: 'IconListBullet'
  },
  {
    value: 'columns',
    label: 'Columnas',
    icon: 'IconGrid'
  }
]

const LAYOUT_VALUES: Layout[] =
  LAYOUT_OPTIONS.map(
    option => option.value
  )

const getLayoutIndex = (
  layout: Layout
): number => {
  const index =
    LAYOUT_VALUES.indexOf(layout)

  return index >= 0 ? index : 0
}

export const LayoutSwitcher: React.FC<
LayoutSwitcherProps
> = ({
  setLayout,
  layout = 'list',
  disabled = false,
  ariaLabel = 'Cambiar vista',
  showLabels = true,
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const toolbarRef =
    useRef<HTMLDivElement | null>(null)

  const buttonsRef =
    useRef<
    Array<HTMLButtonElement | null>
    >([])

  const animationFrameRef =
    useRef<number | null>(null)

  const [
    sliderStyle,
    setSliderStyle
  ] = useState<{
    left: number
    width: number
    visible: boolean
  }>({
    left: 0,
    width: 0,
    visible: false
  })

  const activeIndex =
    getLayoutIndex(layout)

  const activeOption =
    LAYOUT_OPTIONS[activeIndex]

  /**
   * Cancela cualquier RAF pendiente.
   */
  const cancelAnimationFrame =
    useCallback(() => {
      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        )

        animationFrameRef.current = null
      }
    }, [])

  /**
   * Calcula la posición exacta
   * del indicador respecto al toolbar.
   */
  const updateSlider = useCallback(() => {
    cancelAnimationFrame()

    animationFrameRef.current =
      window.requestAnimationFrame(() => {
        const toolbar =
          toolbarRef.current

        const activeButton =
          buttonsRef.current[
            activeIndex
          ]

        if (
          !toolbar ||
          !activeButton
        ) {
          setSliderStyle(
            previous => ({
              ...previous,
              visible: false
            })
          )

          return
        }

        const toolbarRect =
          toolbar.getBoundingClientRect()

        const buttonRect =
          activeButton.getBoundingClientRect()

        const left =
          buttonRect.left -
          toolbarRect.left

        const width =
          buttonRect.width

        setSliderStyle({
          left,
          width,
          visible:
            width > 0
        })
      })
  }, [
    activeIndex,
    cancelAnimationFrame
  ])

  /**
   * Mide nuevamente el indicador:
   *
   * - al cambiar de layout
   * - al cambiar tamaño
   * - al cambiar contenido
   * - cuando cambia el viewport
   */
  useLayoutEffect(() => {
    updateSlider()

    const toolbar =
      toolbarRef.current

    if (
      typeof ResizeObserver ===
      'undefined'
    ) {
      window.addEventListener(
        'resize',
        updateSlider
      )

      return () => {
        window.removeEventListener(
          'resize',
          updateSlider
        )

        cancelAnimationFrame()
      }
    }

    const resizeObserver =
      new ResizeObserver(() => {
        updateSlider()
      })

    if (toolbar) {
      resizeObserver.observe(
        toolbar
      )
    }

    buttonsRef.current.forEach(
      button => {
        if (button) {
          resizeObserver.observe(
            button
          )
        }
      }
    )

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame()
    }
  }, [
    updateSlider,
    cancelAnimationFrame
  ])

  /**
   * Mantiene la referencia del botón.
   */
  const setButtonRef = useCallback(
    (
      index: number,
      element: HTMLButtonElement | null
    ) => {
      buttonsRef.current[index] =
        element
    },
    []
  )

  /**
   * Cambia el layout y opcionalmente
   * mueve el foco al nuevo botón.
   */
  const changeLayout = useCallback(
    (
      nextLayout: Layout,
      shouldFocus = false
    ) => {
      if (disabled) {
        return
      }

      setLayout(nextLayout)

      if (shouldFocus) {
        const nextIndex =
          getLayoutIndex(
            nextLayout
          )

        window.requestAnimationFrame(
          () => {
            buttonsRef.current[
              nextIndex
            ]?.focus()
          }
        )
      }
    },
    [
      disabled,
      setLayout
    ]
  )

  /**
   * Navegación con teclado:
   *
   * ArrowLeft / ArrowRight
   * Home / End
   *
   * Mantiene el selector usable
   * sin necesidad del mouse.
   */
  const handleKeyDown =
    useCallback(
      (
        event: React.KeyboardEvent<HTMLButtonElement>
      ) => {
        if (disabled) {
          return
        }

        const currentIndex =
          getLayoutIndex(layout)

        let nextIndex =
          currentIndex

        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            event.preventDefault()

            nextIndex =
              Math.max(
                0,
                currentIndex - 1
              )

            break

          case 'ArrowRight':
          case 'ArrowDown':
            event.preventDefault()

            nextIndex =
              Math.min(
                LAYOUT_OPTIONS.length - 1,
                currentIndex + 1
              )

            break

          case 'Home':
            event.preventDefault()

            nextIndex = 0

            break

          case 'End':
            event.preventDefault()

            nextIndex =
              LAYOUT_OPTIONS.length - 1

            break

          default:
            return
        }

        if (
          nextIndex ===
          currentIndex
        ) {
          return
        }

        changeLayout(
          LAYOUT_OPTIONS[nextIndex]
            .value,
          true
        )
      },
      [
        disabled,
        layout,
        changeLayout
      ]
    )

  /**
   * Evita que el slider
   * capture interacciones.
   */
  const handleSliderClick =
    useCallback(
      (
        event: React.MouseEvent<HTMLDivElement>
      ) => {
        event.stopPropagation()
      },
      []
    )

  const toolbarClassName = [
    styles.toolbar,
    size === 'sm'
      ? styles.small
      : '',
    fullWidth
      ? styles.fullWidth
      : '',
    disabled
      ? styles.disabled
      : '',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={toolbarRef}
      className={
        toolbarClassName
      }
      role="group"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      data-layout={layout}
      data-size={size}
      data-full-width={
        fullWidth
      }
      data-disabled={
        disabled
      }
    >
      <div
        aria-hidden="true"
        className={
          styles.slider
        }
        onClick={
          handleSliderClick
        }
        style={{
          transform: `translate3d(${sliderStyle.left}px, 0, 0)`,
          width: sliderStyle.width,
          opacity:
            sliderStyle.visible
              ? 1
              : 0
        }}
      />

      {LAYOUT_OPTIONS.map(
        (
          option,
          index
        ) => {
          const isActive =
            option.value ===
            activeOption.value

          return (
            <button
              key={
                option.value
              }
              ref={element => {
                setButtonRef(
                  index,
                  element
                )
              }}
              type="button"
              role="button"
              aria-pressed={
                isActive
              }
              aria-label={
                showLabels
                  ? undefined
                  : option.label
              }
              title={
                showLabels
                  ? undefined
                  : option.label
              }
              disabled={disabled}
              tabIndex={
                isActive
                  ? 0
                  : -1
              }
              className={[
                styles.button,
                isActive
                  ? styles.activeButton
                  : ''
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                changeLayout(
                  option.value
                )
              }}
              onKeyDown={
                handleKeyDown
              }
            >
              <span
                className={
                  styles.icon
                }
                aria-hidden="true"
              >
                <Icon
                  icon={
                    option.icon
                  }
                  size={
                    size === 'sm'
                      ? 18
                      : 20
                  }
                  color={getGlobalStyle(
                    '--color-icons-primary'
                  )}
                />
              </span>

              {showLabels && (
                <Text>
                  {option.label}
                </Text>
              )}
            </button>
          )
        }
      )}
    </div>
  )
}

export default LayoutSwitcher
