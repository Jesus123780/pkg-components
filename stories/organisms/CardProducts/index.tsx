
'use client'

import Image from 'next/image'
import React from 'react'

import {
  CardProductsContent,
  CtnBox,
  WrapperCard
} from './styled'

import { IconEdit, IconDelete } from '../../../assets'

import {
  getGlobalStyle,
  numberFormat
} from '../../../utils'

import { type ProductFood } from '../../pages/GenerateSales/types'
import { Icon } from '../../atoms'
import { PercentBadge } from '../../molecules'

import styles from './styles.module.css'
import { getProductAvailabilityInfo } from './helpers'
import { useProductAvailability } from './Context/ProductAvailabilityContext'

interface CardProductsProps {
  isVisible?: boolean
  image?: string | React.ReactNode | null
  food?: ProductFood
  setRef?: React.Ref<HTMLDivElement> | null
  isEdit?: boolean
  showDiscount?: boolean
  showAvailability?: boolean
  loading?: boolean
  onClick?: () => void
  redirect?: () => void
  handleDelete?: (food?: ProductFood) => void
}

export const CardProductsComponent: React.FC<CardProductsProps> = ({
  isVisible = false,
  image = null,
  food = {
    ProDescription: '',
    ProDescuento: 0,
    ProImage: '',
    ProPrice: 0,
    pName: '',
    pId: null
  },
  setRef = null,
  isEdit = true,
  showDiscount = true,
  showAvailability = true,
  loading = false,
  onClick = () => {},
  redirect = () => {},
  handleDelete = () => {}
}) => {
  /* =========================================
     CONTEXTO DE DISPONIBILIDAD
  ========================================= */

  const availabilityContext = useProductAvailability()

  const {
    activeAvailabilityId,
    openAvailability: openSharedAvailability,
    closeAvailability: closeSharedAvailability,
    closeAvailabilityExcept,
    toggleAvailability: toggleSharedAvailability
  } = availabilityContext ?? {
    activeAvailabilityId: null,
    openAvailability: undefined,
    closeAvailability: undefined,
    closeAvailabilityExcept: undefined,
    toggleAvailability: undefined
  }

  /*
   * Fallback para uso fuera del Provider.
   */
  const [localAvailabilityOpen, setLocalAvailabilityOpen] =
    React.useState(false)

  /*
   * Identificador estable del componente.
   */
  const generatedId = React.useId()

  const cardId =
    food?.pId !== null &&
    food?.pId !== undefined &&
    String(food.pId).trim() !== ''
      ? `product-${String(food.pId)}`
      : `product-${generatedId}`

  /*
   * Referencias.
   * Mantenemos setRef para no romper los componentes
   * que ya utilizan la referencia original.
   */
  const rootRef = React.useRef<HTMLDivElement>(null)

  const assignRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node

      if (typeof setRef === 'function') {
        setRef(node)
      } else if (setRef !== null && setRef !== undefined) {
        ;(
          setRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node
      }
    },
    [setRef]
  )

  /*
   * Cuando existe Provider, el estado se comparte.
   * Sin Provider, se utiliza el estado local.
   */
  const showAvailabilityDetails = openSharedAvailability
    ? activeAvailabilityId === cardId
    : localAvailabilityOpen

  /* =========================================
     DISPONIBILIDAD DEL PRODUCTO
  ========================================= */

  const availabilityRecords =
    food?.product_availables ??
    food?.getAllAvailableProduct ??
    []

  const availability = React.useMemo(() => {
    return getProductAvailabilityInfo(availabilityRecords)
  }, [availabilityRecords])

  /* =========================================
     IMAGEN
  ========================================= */

  const productImage =
    typeof food?.ProImage === 'string' &&
    food.ProImage.trim() !== ''
      ? food.ProImage
      : '/images/default-banner.png'

  /* =========================================
     ICONOS
  ========================================= */

  const availabilityIcon = availability.isAvailableNow
    ? 'IconSuccess'
    : 'time'

  const availabilityColor = availability.isAvailableNow
    ? getGlobalStyle('--color-feedback-success-light')
    : getGlobalStyle('--color-neutral-gray-dark')

  /* =========================================
     ABRIR DISPONIBILIDAD
  ========================================= */

  const openCurrentAvailability = React.useCallback(() => {
    if (openSharedAvailability) {
      openSharedAvailability(cardId)
      return
    }

    setLocalAvailabilityOpen(true)
  }, [openSharedAvailability, cardId])

  /* =========================================
     CERRAR DISPONIBILIDAD
  ========================================= */

  const closeCurrentAvailability = React.useCallback(() => {
    if (closeSharedAvailability) {
      closeSharedAvailability(cardId)
      return
    }

    setLocalAvailabilityOpen(false)
  }, [closeSharedAvailability, cardId])

  /* =========================================
     ALTERNAR DISPONIBILIDAD
  ========================================= */

  const toggleCurrentAvailability = React.useCallback(() => {
    if (toggleSharedAvailability) {
      toggleSharedAvailability(cardId)
      return
    }

    setLocalAvailabilityOpen(previous => !previous)
  }, [toggleSharedAvailability, cardId])

  /* =========================================
     CERRAR OTRAS TARJETAS
  ========================================= */

  const handleCardPointerEnter = React.useCallback(() => {
    closeAvailabilityExcept?.(cardId)
  }, [closeAvailabilityExcept, cardId])

  /*
   * Al salir de toda la tarjeta, cerramos su panel.
   *
   * No hacemos esto con touch porque los navegadores
   * pueden emitir pointerleave al terminar un toque.
   */
  const handleCardPointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'touch') return

      closeCurrentAvailability()
    },
    [closeCurrentAvailability]
  )

  /*
   * También controlamos la navegación por teclado.
   */
  const handleCardFocus = React.useCallback(() => {
    closeAvailabilityExcept?.(cardId)
  }, [closeAvailabilityExcept, cardId])

  /* =========================================
     CLIC EN EL INDICADOR
  ========================================= */

  const handleToggleAvailability = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    toggleCurrentAvailability()
  }

  /* =========================================
     CERRAR PANEL
  ========================================= */

  const handleCloseAvailability = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    closeCurrentAvailability()
  }

  /* =========================================
     EVENTOS GLOBALES

     - Clic fuera.
     - Escape.
     - Pérdida de foco.
     - Cambio de visibilidad.
  ========================================= */

  React.useEffect(() => {
    if (!showAvailabilityDetails) return

    const handleOutsidePointerDown = (
      event: PointerEvent
    ) => {
      const target = event.target

      if (
        target instanceof Node &&
        rootRef.current?.contains(target)
      ) {
        return
      }

      closeCurrentAvailability()
    }

    const handleOutsideFocus = (event: FocusEvent) => {
      const target = event.target

      if (
        target instanceof Node &&
        rootRef.current?.contains(target)
      ) {
        return
      }

      closeCurrentAvailability()
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      closeCurrentAvailability()
    }

    const handleWindowBlur = () => {
      closeCurrentAvailability()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        closeCurrentAvailability()
      }
    }

    document.addEventListener(
      'pointerdown',
      handleOutsidePointerDown,
      true
    )

    document.addEventListener(
      'focusin',
      handleOutsideFocus,
      true
    )

    document.addEventListener(
      'keydown',
      handleEscape
    )

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    )

    window.addEventListener(
      'blur',
      handleWindowBlur
    )

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsidePointerDown,
        true
      )

      document.removeEventListener(
        'focusin',
        handleOutsideFocus,
        true
      )

      document.removeEventListener(
        'keydown',
        handleEscape
      )

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      )

      window.removeEventListener(
        'blur',
        handleWindowBlur
      )
    }
  }, [
    showAvailabilityDetails,
    closeCurrentAvailability
  ])

  /* =========================================
     LIMPIEZA AL DESMONTAR
  ========================================= */

  React.useEffect(() => {
    return () => {
      /*
       * Solo limpiamos el estado compartido.
       * No actualizamos estado local durante el desmontaje.
       */
      closeSharedAvailability?.(cardId)
    }
  }, [closeSharedAvailability, cardId])

  /*
   * Si el producto deja de mostrar disponibilidad,
   * no debe conservar un panel abierto.
   */
  React.useEffect(() => {
    if (!showAvailability || !isVisible) {
      closeCurrentAvailability()
    }
  }, [
    showAvailability,
    isVisible,
    closeCurrentAvailability
  ])

  /* =========================================
     ACCIONES DEL PRODUCTO
  ========================================= */

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    closeCurrentAvailability()
    redirect()
  }

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    closeCurrentAvailability()
    handleDelete(food)
  }

  /*
   * Clic en la superficie del producto.
   */
  const handleProductClick = () => {
    closeCurrentAvailability()
    onClick()
  }

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div
      ref={assignRootRef}
      className={styles.card_shell}
      data-availability-open={showAvailabilityDetails}
      onPointerEnter={handleCardPointerEnter}
      onPointerLeave={handleCardPointerLeave}
      onFocusCapture={handleCardFocus}
    >
      {/* =====================================
          ACCIONES DEL PRODUCTO
          EDITAR / ELIMINAR
      ====================================== */}

      {isEdit && (
        <div
          className={styles.card_actions}
          aria-label='Acciones del producto'
        >
          <button
            type='button'
            className={styles.card_action}
            onClick={handleEdit}
            aria-label='Editar producto'
            title='Editar producto'
          >
            <IconEdit size={20} />
          </button>

          <button
            type='button'
            className={styles.card_action}
            onClick={handleRemove}
            aria-label='Eliminar producto'
            title='Eliminar producto'
          >
            <IconDelete size={20} />
          </button>
        </div>
      )}

      {/* =====================================
          SUPERFICIE DE LA TARJETA
      ====================================== */}

      <div className={styles.card_surface}>
        <WrapperCard loading={loading ? true : undefined}>
          <CardProductsContent onClick={handleProductClick}>
            <CtnBox>
              {isVisible && (
                <>
                  <h3 className='card__description'>
                    {food?.pName}
                  </h3>

                  {food?.ProDescription?.length > 0 && (
                    <h3 className='card__description'>
                      {food.ProDescription}
                    </h3>
                  )}

                  {/* PRECIO */}

                  <div className={styles['card__price-container']}>
                    <span
                      className={
                        Number(food?.ProPrice) > 0
                          ? 'card__price'
                          : 'card__price free'
                      }
                    >
                      {Number(food?.ProPrice) > 0
                        ? numberFormat(food?.ProPrice)
                        : 'Gratis'}
                    </span>

                    <span className='card__des'>
                      {food?.ProDescuento > 0
                        ? numberFormat(food?.ProDescuento)
                        : null}
                    </span>

                    {showDiscount && food?.ProDescuento > 0 && (
                      <PercentBadge
                        baseValue={food?.ProDescuento}
                        compareValue={food?.ProPrice}
                        precision={0}
                        size='small'
                      />
                    )}
                  </div>
                </>
              )}
            </CtnBox>

            {/* IMAGEN */}

            <CtnBox>
              {image === null && isVisible && (
                <Image
                  alt={
                    food?.ProDescription?.length > 0
                      ? food.ProDescription
                      : 'Producto'
                  }
                  blurDataURL='/images/default-banner.png'
                  fill
                  sizes='(max-width: 768px) 100vw, 300px'
                  src={productImage}
                  style={{
                    objectFit: 'cover'
                  }}
                />
              )}

              {image}
            </CtnBox>
          </CardProductsContent>
        </WrapperCard>
      </div>

      {/* =====================================
          DISPONIBILIDAD
      ====================================== */}

      {showAvailability && isVisible && (
        <div
          className={styles.availability_container}
          data-open={showAvailabilityDetails}
        >
          {/* INDICADOR */}

          <button
            type='button'
            className={styles.availability_badge}
            data-status={availability.status}
            onClick={handleToggleAvailability}
            aria-expanded={showAvailabilityDetails}
            aria-label='Consultar horario de disponibilidad'
            title='Consultar horario de disponibilidad'
          >
            <Icon
              icon={availabilityIcon}
              size={14}
              color={availabilityColor}
            />

            <span className={styles.availability_badge_text}>
              {availability.badgeLabel}
            </span>

            <span className={styles.availability_chevron}>
              <Icon
                icon='IconArrowBottom'
                size={12}
                color={availabilityColor}
              />
            </span>
          </button>

          {/* =====================================
              DETALLE DEL HORARIO
          ====================================== */}

          <div
            className={`${styles.availability_details} ${
              showAvailabilityDetails
                ? styles.availability_details_open
                : ''
            }`}
            role='region'
            aria-label='Información de disponibilidad del producto'
            aria-hidden={!showAvailabilityDetails}
          >
            {/* ENCABEZADO */}

            <div className={styles.availability_details_header}>
              <strong>Horario de disponibilidad</strong>

              <button
                type='button'
                onClick={handleCloseAvailability}
                aria-label='Cerrar horarios'
                className={styles.availability_close}
                tabIndex={showAvailabilityDetails ? 0 : -1}
              >
                <Icon
                  icon='IconClose'
                  size={16}
                  color={getGlobalStyle('--color-neutral-gray-dark')}
                />
              </button>
            </div>

            {/* ESTADO ACTUAL */}

            <div
              className={styles.availability_status}
              data-status={availability.status}
            >
              <Icon
                icon={availabilityIcon}
                size={16}
                color={availabilityColor}
              />

              <span>{availability.message}</span>
            </div>

            {/* HORARIO DE HOY */}

            <div className={styles.availability_today}>
              <div className={styles.availability_section_title}>
                <Icon
                  icon='IconSimpleCalendar'
                  size={15}
                  color={getGlobalStyle('--color-neutral-gray-dark')}
                />

                <strong>Horario de hoy</strong>
              </div>

              <div className={styles.availability_today_hours}>
                {availability.todayHours.map((hour, index) => (
                  <span key={`${hour}-${index}`}>
                    {hour}
                  </span>
                ))}
              </div>
            </div>

            {/* PRÓXIMA APERTURA */}

            {availability.nextOpeningLabel && (
              <div className={styles.availability_next}>
                <Icon
                  icon='time'
                  size={14}
                  color={getGlobalStyle('--color-neutral-gray-dark')}
                />

                <span>
                  Próxima apertura:
                  <strong> {availability.nextOpeningLabel}</strong>
                </span>
              </div>
            )}

            {/* HORARIO SEMANAL */}

            <div className={styles.availability_weekly}>
              <div className={styles.availability_section_title}>
                <Icon
                  icon='IconCalendar'
                  size={15}
                  color={getGlobalStyle('--color-neutral-gray-dark')}
                />

                <strong>Horario semanal</strong>
              </div>

              <div className={styles.availability_days}>
                {availability.weeklySchedule.map(day => (
                  <div
                    key={day.day}
                    className={`${styles.availability_day} ${
                      day.isToday
                        ? styles.availability_day_today
                        : ''
                    }`}
                  >
                    <span className={styles.availability_day_name}>
                      {day.name}

                      {day.isToday && (
                        <small>Hoy</small>
                      )}
                    </span>

                    <span
                      className={
                        day.hasAvailability
                          ? styles.availability_day_hours
                          : styles.availability_day_closed
                      }
                    >
                      {day.summary}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* INFORMACIÓN ADICIONAL */}

            <div className={styles.availability_footer}>
              <Icon
                icon='IconInfo'
                size={12}
                color={getGlobalStyle('--color-neutral-gray-dark')}
              />

              <span>
                Los horarios se muestran según la hora local
                del dispositivo.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const CardProducts = React.memo(CardProductsComponent)
