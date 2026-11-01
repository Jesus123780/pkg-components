'use client'

import React, { useMemo, useState } from 'react'

import { getGlobalStyle } from '../../../helpers'
import { MODAL_SIZES } from '../../molecules/Modal/helpers'
import { AwesomeModal } from '../../organisms/AwesomeModal'

import styles from './pending-orders.module.css'

export type PendingOrderStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export interface PendingOrderListItem {
  id: string
  ticket: string
  status: PendingOrderStatus
  products: Array<{
    pId?: string | null
    pName?: string
    ProQuantity?: number
    ProPrice?: number
  }>
  customer?: {
    name?: string
    document?: string
    phone?: string
  } | null
  reference?: string
  total: number
  createdAt: string
  syncStatus?: 'LOCAL' | 'SYNCED' | 'ERROR'
}

export interface PendingOrdersManagerProps {
  show: boolean
  onHide: () => void
  orders?: PendingOrderListItem[]
  pendingOrdersCount?: number
  totalStoredOrdersCount?: number
  hasCurrentCart?: boolean
  canPersistPendingOrders?: boolean
  onResumePendingOrder?: (orderId: string, replaceCurrent?: boolean) => boolean
  onRemovePendingOrder?: (orderId: string) => boolean
  onUpdatePendingOrder?: (
    orderId: string,
    changes: { reference?: string }
  ) => unknown
  onUpdatePendingStatus?: (
    orderId: string,
    status: PendingOrderStatus
  ) => unknown
  onClearPendingOrders?: () => boolean
  onPersistPendingOrder?: (orderId: string) => Promise<boolean>
  searchPendingOrders?: (query: string) => PendingOrderListItem[]
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number.isFinite(amount) ? amount : 0)
}

const formatTime = (date: string): string => {
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) return 'Fecha no disponible'

  return parsedDate.toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusLabels: Record<PendingOrderStatus, string> = {
  PENDING: 'En espera',
  IN_PROGRESS: 'En curso',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada'
}

/** Displays, searches and manages pending orders in a dedicated modal. */
export const PendingOrdersManager: React.FC<PendingOrdersManagerProps> = ({
  show,
  onHide,
  orders = [],
  pendingOrdersCount = 0,
  totalStoredOrdersCount = 0,
  hasCurrentCart = false,
  canPersistPendingOrders = false,
  onResumePendingOrder = () => false,
  onRemovePendingOrder = () => false,
  onUpdatePendingOrder = () => undefined,
  onUpdatePendingStatus = () => undefined,
  onClearPendingOrders = () => false,
  onPersistPendingOrder = async () => false,
  searchPendingOrders
}) => {
  const [search, setSearch] = useState('')
  const [confirmResumeId, setConfirmResumeId] = useState<string | null>(null)
  const [referenceDrafts, setReferenceDrafts] = useState<Record<string, string>>({})
  const [persistingId, setPersistingId] = useState<string | null>(null)
  const [persistenceMessage, setPersistenceMessage] = useState<string | null>(null)

  const filteredOrders = useMemo(() => {
    if (searchPendingOrders) return searchPendingOrders(search)

    const query = search.trim().toLocaleLowerCase()
    if (!query) return orders

    return orders.filter((order) => {
      const searchable = [
        order.ticket,
        order.reference,
        order.customer?.name,
        order.customer?.document,
        order.customer?.phone,
        ...order.products.map((product) => product.pName)
      ]

      return searchable.some((value) =>
        String(value ?? '').toLocaleLowerCase().includes(query)
      )
    })
  }, [orders, search, searchPendingOrders])

  /** Requests confirmation if resuming would replace an existing cart. */
  const requestResume = (orderId: string): void => {
    setPersistenceMessage(null)

    if (hasCurrentCart) {
      setConfirmResumeId(orderId)
      return
    }

    if (onResumePendingOrder(orderId, false)) onHide()
  }

  /** Saves the optional cashier reference without altering sale products. */
  const saveReference = (order: PendingOrderListItem): void => {
    const reference = (referenceDrafts[order.id] ?? order.reference ?? '').trim()
    const currentReference = (order.reference ?? '').trim()

    if (reference === currentReference) return

    const updated = onUpdatePendingOrder(order.id, { reference })
    setPersistenceMessage(
      updated
        ? `Referencia actualizada para ${order.ticket}.`
        : `No fue posible actualizar la referencia de ${order.ticket}.`
    )
  }

  /** Persists an order through the optional backend adapter. */
  const persistOrder = async (orderId: string): Promise<void> => {
    setPersistingId(orderId)
    setPersistenceMessage(null)

    try {
      const success = await onPersistPendingOrder(orderId)
      setPersistenceMessage(
        success
          ? 'Orden sincronizada con la base de datos.'
          : 'No se pudo sincronizar la orden. Revisa la notificación e inténtalo de nuevo.'
      )
    } catch {
      setPersistenceMessage('No fue posible conectar con la base de datos. Intenta nuevamente.')
    } finally {
      setPersistingId(null)
    }
  }

  const handleClose = (): void => {
    setConfirmResumeId(null)
    setPersistenceMessage(null)
    onHide()
  }

  return (
    <AwesomeModal
      title={`Lista de espera (${pendingOrdersCount} pendientes)`}
      show={show}
      size={MODAL_SIZES.large}
      header
      footer={false}
      customHeight='80vh'
      height='min-content'
      borderRadius={getGlobalStyle('--border-radius-xs')}
      onHide={handleClose}
      zIndex={getGlobalStyle('--z-index-high')}
    >
      <section className={styles.manager} aria-label='Órdenes pendientes'>
        <div className={styles.toolbar}>
          <label className={styles.searchLabel} htmlFor='pending-orders-search'>
            Buscar orden
          </label>
          <input
            id='pending-orders-search'
            className={styles.searchInput}
            type='search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Ticket, cliente, teléfono o producto'
          />
          <button
            type='button'
            className={styles.secondaryButton}
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>

        {persistenceMessage && (
          <p className={styles.feedback} role='status'>
            {persistenceMessage}
          </p>
        )}

        {confirmResumeId && (
          <div className={styles.confirmation} role='alertdialog' aria-live='polite'>
            <div>
              <strong>Ya tienes productos en el carrito.</strong>
              <p>Al retomar esta orden, el carrito actual será reemplazado.</p>
            </div>
            <div className={styles.actions}>
              <button
                type='button'
                className={styles.secondaryButton}
                onClick={() => setConfirmResumeId(null)}
              >
                Seguir con la venta actual
              </button>
              <button
                type='button'
                className={styles.dangerButton}
                onClick={() => {
                  const resumed = onResumePendingOrder(confirmResumeId, true)
                  if (resumed) {
                    setConfirmResumeId(null)
                    onHide()
                  }
                }}
              >
                Reemplazar y retomar
              </button>
            </div>
          </div>
        )}

        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <strong>{search ? 'No encontramos coincidencias' : 'No hay órdenes en espera'}</strong>
            <p>
              {search
                ? 'Prueba con otro ticket, cliente o producto.'
                : 'Cuando envíes una venta a espera, aparecerá aquí para retomarla después.'}
            </p>
          </div>
        ) : (
          <div className={styles.orderList}>
            {filteredOrders.map((order) => {
              const totalUnits = order.products.reduce(
                (total, product) => total + Math.max(0, Number(product.ProQuantity) || 0),
                0
              )
              const referenceValue = referenceDrafts[order.id] ?? order.reference ?? ''

              return (
                <article className={styles.orderCard} key={order.id}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderIdentity}>
                      <strong>{order.ticket}</strong>
                      <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <strong className={styles.total}>{formatCurrency(order.total)}</strong>
                  </div>

                  <div className={styles.orderMeta}>
                    <span>{totalUnits} unidad(es)</span>
                    <span>{formatTime(order.createdAt)}</span>
                    {order.customer?.name && <span>{order.customer.name}</span>}
                    {order.customer?.phone && <span>{order.customer.phone}</span>}
                  </div>

                  <p className={styles.productsPreview}>
                    {order.products
                      .slice(0, 3)
                      .map((product) => `${product.pName ?? 'Producto'} × ${product.ProQuantity ?? 0}`)
                      .join(' · ')}
                    {order.products.length > 3 ? ` · +${order.products.length - 3} producto(s)` : ''}
                  </p>

                  <div className={styles.referenceRow}>
                    <label htmlFor={`reference-${order.id}`}>Referencia</label>
                    <input
                      id={`reference-${order.id}`}
                      className={styles.referenceInput}
                      maxLength={120}
                      value={referenceValue}
                      onChange={(event) => {
                        setReferenceDrafts((current) => ({
                          ...current,
                          [order.id]: event.target.value
                        }))
                      }}
                      placeholder='Ej. Mesa 12 / cliente vuelve'
                    />
                    <button
                      type='button'
                      className={styles.secondaryButton}
                      onClick={() => saveReference(order)}
                    >
                      Guardar
                    </button>
                  </div>

                  {order.syncStatus && (
                    <p className={styles.syncStatus}>
                      {order.syncStatus === 'SYNCED' && 'Sincronizada con base de datos'}
                      {order.syncStatus === 'LOCAL' && 'Guardada en este dispositivo'}
                      {order.syncStatus === 'ERROR' && 'Error de sincronización'}
                    </p>
                  )}

                  <div className={styles.actions}>
                    <button
                      type='button'
                      className={styles.primaryButton}
                      onClick={() => requestResume(order.id)}
                    >
                      Retomar orden
                    </button>
                    {canPersistPendingOrders && (
                      <button
                        type='button'
                        className={styles.secondaryButton}
                        disabled={persistingId === order.id}
                        onClick={() => { void persistOrder(order.id) }}
                      >
                        {persistingId === order.id ? 'Guardando…' : 'Guardar en BD'}
                      </button>
                    )}
                    {(order.status === 'PENDING' || order.status === 'IN_PROGRESS') && (
                      <button
                        type='button'
                        className={styles.secondaryButton}
                        onClick={() => onUpdatePendingStatus(order.id, 'CANCELLED')}
                      >
                        Cancelar orden
                      </button>
                    )}
                    <button
                      type='button'
                      className={styles.dangerButton}
                      onClick={() => {
                        const confirmed = typeof window !== 'undefined' &&
                          window.confirm(`¿Eliminar definitivamente la orden ${order.ticket}?`)
                        if (confirmed) onRemovePendingOrder(order.id)
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <div className={styles.footerActions}>
          <button
            type='button'
            className={styles.dangerButton}
            disabled={totalStoredOrdersCount === 0}
            onClick={() => {
              const confirmed = typeof window !== 'undefined' && window.confirm(
                'Se eliminarán todas las órdenes locales, incluidas las completadas y canceladas. Esta acción no se puede deshacer. ¿Continuar?'
              )
              if (confirmed) onClearPendingOrders()
            }}
          >
            Borrar todas las órdenes locales
          </button>
        </div>
      </section>
    </AwesomeModal>
  )
}
