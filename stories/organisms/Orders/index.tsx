'use client'

import React, {
  useEffect,
  useMemo,
  useState
} from 'react'

import { createPortal } from 'react-dom'

import { IconClose } from '../../../assets'

import style from './Orders.module.css'
import { getGlobalStyle } from '../../../helpers'
import { Text } from '../../atoms'

export interface OrderStatusMetadata {
  idStatus?: string
  name?: string
  description?: string
  backgroundColor?: string
  color?: string
  priority?: number
  state?: number
}

export interface OrderInboxItem {
  id?: string
  idStore?: string
  pCodeRef: string
  createdAt?: string
  pDatCre?: string
  receivedAt?: string
  status?: string
  statusOrder?: OrderStatusMetadata | null
  syncState?: 'loading' | 'synced' | 'error'
  view?: boolean
}

export interface OrdersProps {
  isOpen?: boolean
  deliveryTimeMinutes?: number | null
  orders?: readonly OrderInboxItem[]
  statusTypes?: readonly OrderStatusMetadata[] | null
  handleSetIsOpenOrder?: (value?: boolean) => void
  handleViewOrder?: (pCodeRef: string) => void
  onRefresh?: () => void | Promise<void>
  onRetryOrder?: (pCodeRef: string) => void | Promise<void>
  zIndex?: number
}

const EMPTY_ORDERS: readonly OrderInboxItem[] = []

const ALL_STATUSES = '__all__'

const dateFormatter = new Intl.DateTimeFormat(
  'es-CO',
  {
    dateStyle: 'medium',
    timeStyle: 'short'
  }
)

function formatOrderDate (value?: string): string {
  if (!value) return 'Fecha no disponible'

  // Support backend timestamps such as:
  // 2026-11-16 00:19:09.292 -0500
  const normalized = value.replace(
    /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}(?:\.\d+)?) ([+-]\d{2})(\d{2})$/,
    '$1T$2$3:$4'
  )

  const date = new Date(normalized)

  if (!Number.isFinite(date.getTime())) {
    return 'Fecha no disponible'
  }

  return dateFormatter.format(date)
}

function safeColor (
  value: string | undefined,
  fallback: string
): string {
  return value &&
    /^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(value)
    ? value
    : fallback
}

function getStatusKey (
  order: OrderInboxItem
): string {
  return (
    order.statusOrder?.idStatus ??
    order.statusOrder?.name ??
    order.status ??
    ''
  )
}

const ReceiptIcon = () => (
  <svg
    width='23'
    height='23'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M5 3l3 2 4-2 4 2 3-2v18l-3-2-4 2-4-2-3 2V3Z' />
    <path d='M9 9h6M9 13h6M9 17h3' />
  </svg>
)

const RefreshIcon = () => (
  <svg
    width='19'
    height='19'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.7'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M20 7v5h-5' />
    <path d='M19.5 12a7.5 7.5 0 1 0-2.2 5.3' />
  </svg>
)

interface OrderCardProps {
  order: OrderInboxItem
  isOpen: boolean
  onView?: OrdersProps['handleViewOrder']
  onRetry?: OrdersProps['onRetryOrder']
}

const OrderCard = React.memo(({
  order,
  isOpen,
  onView,
  onRetry
}: OrderCardProps) => {
  const status = order.statusOrder

  const loading = order.syncState === 'loading'
  const failed = order.syncState === 'error'

  const statusLabel =
    loading
      ? 'Sincronizando'
      : failed
        ? 'Sin sincronizar'
        : status?.name ??
          order.status ??
          'Estado no disponible'

  const backgroundColor = safeColor(
    loading || failed
      ? undefined
      : status?.backgroundColor,
    failed ? '#F9D5D5' : '#E0E0E0'
  )

  const color = safeColor(
    loading || failed
      ? undefined
      : status?.color,
    failed ? '#A43535' : '#3F3F3F'
  )

  return (
    <article className={style.order_card}>
      <div className={style.card_header}>
        <div className={style.order_icon}>
          <ReceiptIcon />
        </div>

        <div className={style.order_identity}>
          <span className={style.order_caption}>
            Referencia de orden
          </span>

          <strong className={style.order_reference}>
            #{order.pCodeRef}
          </strong>
        </div>

        <span
          className={style.status_badge}
          style={{
            backgroundColor,
            color
          }}
        >
          {loading && (
            <span
              className={style.spinner}
              aria-hidden='true'
            />
          )}

          {statusLabel}
        </span>
      </div>

      {status?.description && !loading && !failed && (
        <p className={style.order_description}>
          {status.description}
        </p>
      )}

      {failed && (
        <p className={style.error_description}>
          La orden fue recibida, pero no se pudo
          consultar su información.
        </p>
      )}

      <div className={style.card_footer}>
        <time
          className={style.order_date}
          dateTime={order.receivedAt}
        >
          {formatOrderDate(
            order.createdAt ??
            order.pDatCre ??
            order.receivedAt
          )}
        </time>

        <div className={style.card_actions}>
          {failed && onRetry && (
            <button
              type='button'
              className={style.secondary_button}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                void onRetry(order.pCodeRef)
              }}
            >
              Reintentar
            </button>
          )}

          {onView && (
            <button
              type='button'
              className={style.view_button}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => onView(order.pCodeRef)}
            >
              Ver orden

              <span aria-hidden='true'>↗</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
})

OrderCard.displayName = 'RealtimeOrderCard'

export const Orders: React.FC<OrdersProps> = ({
  isOpen = false,
  orders = EMPTY_ORDERS,
  statusTypes,
  handleSetIsOpenOrder,
  handleViewOrder,
  onRefresh,
  onRetryOrder,
  zIndex = getGlobalStyle('--z-index-high')
}) => {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState(ALL_STATUSES)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const availableStatuses = useMemo(() => {
    const catalog = new Map<
    string,
    OrderStatusMetadata
    >()

    for (const status of statusTypes ?? []) {
      const key = status.idStatus ?? status.name

      if (key) catalog.set(key, status)
    }

    for (const order of orders) {
      const status = order.statusOrder
      const key = getStatusKey(order)

      if (key && !catalog.has(key)) {
        catalog.set(
          key,
          status ?? { name: order.status }
        )
      }
    }

    return Array.from(catalog.entries()).sort(
      ([, a], [, b]) =>
        (a.priority ?? Number.MAX_SAFE_INTEGER) -
        (b.priority ?? Number.MAX_SAFE_INTEGER)
    )
  }, [orders, statusTypes])

  const filteredOrders = useMemo(() => {
    if (filter === ALL_STATUSES) {
      return orders
    }

    return orders.filter(
      order => getStatusKey(order) === filter
    )
  }, [orders, filter])

  const synchronizing = orders.filter(
    order => order.syncState === 'loading'
  ).length

  const closePanel = () => {
    handleSetIsOpenOrder?.(false)
  }

  const handleRefresh = async () => {
    if (refreshing || !onRefresh) return

    setRefreshing(true)

    try {
      await onRefresh()
    } catch (error) {
      console.error('[Orders] Refresh failed', error)
    } finally {
      setRefreshing(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <aside
      className={[
        style.wrapper_order,
        isOpen ? style.slideIn : ''
      ].filter(Boolean).join(' ')}
      aria-label='Panel de pedidos y ventas'
      aria-hidden={!isOpen}
      style={{ zIndex }}
      onKeyDown={event => {
        if (event.key === 'Escape' && isOpen) {
          event.stopPropagation()
          closePanel()
        }
      }}
    >
      <header className={style.panel_header}>
        <div className={style.header_content}>
          <div className={style.eyebrow}>
            <span className={style.activity_dot} />
            Actividad reciente
          </div>

          <Text as='h2' className={style.panel_title}>
            Pedidos y ventas
          </Text>

          <p className={style.panel_description}>
            Consulta las órdenes recibidas.
          </p>
        </div>

        <div className={style.header_actions}>
          {onRefresh && (
            <button
              type='button'
              className={[
                style.icon_button,
                refreshing ? style.refreshing : ''
              ].filter(Boolean).join(' ')}
              aria-label='Actualizar órdenes'
              title='Actualizar órdenes'
              disabled={refreshing}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => {
                void handleRefresh()
              }}
            >
              <RefreshIcon />
            </button>
          )}

          <button
            type='button'
            className={style.icon_button}
            aria-label='Cerrar pedidos'
            title='Cerrar pedidos'
            tabIndex={isOpen ? 0 : -1}
            onClick={closePanel}
          >
            <IconClose
              size={22}
              color='currentColor'
            />
          </button>
        </div>
      </header>

      <section className={style.summary}>
        <div className={style.metric}>
          <span>Órdenes recibidas</span>

          <strong aria-live='polite'>
            {orders.length}
          </strong>
        </div>

        <div className={style.metric}>
          <span>Sincronizando</span>

          <strong>{synchronizing}</strong>
        </div>
      </section>

      <div className={style.filters}>
        <label className={style.filter_label}>
          Estado de la orden

          <select
            className={style.filter_select}
            value={filter}
            tabIndex={isOpen ? 0 : -1}
            onChange={event => {
              setFilter(event.target.value)
            }}
          >
            <option value={ALL_STATUSES}>
              Todos los estados
            </option>

            {availableStatuses.map(([key, status]) => (
              <option key={key} value={key}>
                {status.name ?? key}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={style.list_header}>
        <span>Órdenes recientes</span>

        <span className={style.result_count}>
          {filteredOrders.length} registros
        </span>
      </div>

      <div className={style.orders_list}>
        {filteredOrders.length > 0
          ? (
              filteredOrders.map(order => (
            <OrderCard
              key={`${order.idStore ?? ''}:${order.pCodeRef}`}
              order={order}
              isOpen={isOpen}
              onView={handleViewOrder}
              onRetry={onRetryOrder}
            />
              ))
            )
          : (
          <div className={style.empty_state}>
            <div className={style.empty_icon}>
              <ReceiptIcon />
            </div>

            <Text as='h3' align='center'>
              {orders.length === 0
                ? 'Todavía no hay órdenes'
                : 'No hay coincidencias'}
            </Text>

            <Text as='p' align='center'>
              {orders.length === 0
                ? 'Las nuevas órdenes aparecerán aquí automáticamente.'
                : 'Selecciona otro estado para consultar más órdenes.'}
            </Text>

            {filter !== ALL_STATUSES && (
              <button
                type='button'
                className={style.secondary_button}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setFilter(ALL_STATUSES)}
              >
                Ver todas las órdenes
              </button>
            )}
          </div>
            )}
      </div>

      <footer className={style.panel_footer}>
        <ReceiptIcon />
        Actualización automática de órdenes
      </footer>
    </aside>,

    document.body
  )
}
