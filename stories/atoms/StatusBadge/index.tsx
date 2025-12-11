// File: src/components/StatusBadge/StatusBadge.tsx
import React from 'react'
import styles from './styles.module.css'

/**
 * Backend OrderStatus shape (from your GraphQL / API).
 */
export interface OrderStatusType {
  idStatus?: string
  name: string
  description?: string
  color?: string
  backgroundColor?: string
  priority?: number
  state?: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Supported status keys.
 */
export type StatusKey = 'approved' | 'awaiting' | 'rejected' | string

/**
 * Metadata for each status key.
 */
export interface StatusMeta {
  label: string
  dotColor: string
  labelColor: string
}

/** Default preset metadata */
export const DEFAULT_STATUS_META: Record<string, StatusMeta> = {
  approved: { label: 'Approved', dotColor: '#22c55e', labelColor: '#15803d' },
  awaiting: { label: 'Awaiting Approval', dotColor: '#fbbf24', labelColor: '#b45309' },
  rejected: { label: 'Rejected', dotColor: '#ef4444', labelColor: '#b91c1c' },
}

/**
 * Props for the StatusBadge component.
 */
export interface StatusBadgeProps {
  /** Component id (optional if statusOrder.idStatus is provided) */
  id?: string
  /** Status key (legacy path) */
  status?: StatusKey
  /** Custom label (overrides meta.label) */
  label?: string
  /** Override metadata (legacy path) */
  statusMeta?: Record<string, StatusMeta>
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Error callback */
  onInvalid?: (reason: string) => void
  /** New: status object coming from backend */
  statusOrder?: OrderStatusType | null
}

/** Size map */
const SIZE_MAP = {
  sm: { dot: 6, font: 11, height: 20 },
  md: { dot: 8, font: 13, height: 40 },
  lg: { dot: 10, font: 15, height: 60 },
}

/**
 * StatusBadge - Small badge with a colored dot + text.
 *
 * Supports two input shapes:
 * 1) legacy: (id, status, statusMeta)  -> uses DEFAULT_STATUS_META merge
 * 2) backend: (statusOrder)            -> uses statusOrder.color / backgroundColor / name
 *
 * @example
 * <StatusBadge id="1" status="approved" />
 * <StatusBadge statusOrder={order.statusOrder} />
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  id,
  status,
  label,
  statusMeta = {},
  size = 'md',
  onInvalid,
  statusOrder = null,
}) => {
  // Ensure there is some source of status info
  if (!status && !statusOrder) {
    onInvalid?.('missing-status-and-statusOrder')
    return <span className={styles.invalid}>Invalid</span>
  }

  // Determine an effective id (prefer provided id, then statusOrder.idStatus, fallback to safe key)
  const effectiveId = id ?? statusOrder?.idStatus ?? `status-${Math.random().toString(36).slice(2, 9)}`
  if (!id && !statusOrder?.idStatus) {
    // keep backward-compatible behavior but do not block rendering when statusOrder exists
    onInvalid?.('missing-id')
  }

  const sizeCfg = SIZE_MAP[size] ?? SIZE_MAP.md

  // If we have a backend statusOrder, prefer its data
  if (statusOrder) {
    const text = label ?? statusOrder.name ?? String(statusOrder.idStatus ?? 'Unknown')
    const dotColor = statusOrder.color ?? '#9ca3af'
    const labelColor = statusOrder.color ?? '#374151' // use color for text for contrast; can be overridden by CSS
    const bg = statusOrder.backgroundColor ?? 'transparent'

    return (
      <div
        className={styles.container}
        data-testid={`status-${effectiveId}`}
        // allow background from backend (optional)
        style={{
          backgroundColor: bg,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 5,
          height: sizeCfg.height,
          width: 'fit-content',

        }}
      >
        <span
          className={styles.dot}
          style={{
            backgroundColor: dotColor,
            width: sizeCfg.dot,
            minWidth: sizeCfg.dot,
            maxWidth: sizeCfg.dot,
            height: sizeCfg.dot,
            maxHeight: sizeCfg.dot,
            minHeight: sizeCfg.dot
          }}
          aria-hidden
        />
        <span className={styles.label} style={{ color: labelColor, fontSize: sizeCfg.font }}>
          {text}
        </span>
      </div>
    )
  }

  // Legacy path: use status + statusMeta + DEFAULT_STATUS_META
  const merged = { ...DEFAULT_STATUS_META, ...statusMeta }
  const meta = merged[status as string] ?? {
    label: label ?? String(status),
    dotColor: '#9ca3af',
    labelColor: '#6b7280',
  }

  return (
    <div className={styles.container} data-testid={`status-${effectiveId}`} style={{ height: sizeCfg.height }}>
      <span
        className={styles.dot}
        style={{ backgroundColor: meta.dotColor, width: sizeCfg.dot, height: sizeCfg.dot }}
        aria-hidden
      />
      <span className={styles.label} style={{ color: meta.labelColor, fontSize: sizeCfg.font }}>
        {label ?? meta.label}
      </span>
    </div>
  )
}
