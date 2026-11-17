'use client'

import React, { useEffect, useRef } from 'react'
import styles from './AsideSales.module.css'
import { Icon } from '../../atoms'

interface CheckoutDisclosureProps {
  title: string
  summary?: string
  required?: boolean
  completed?: boolean
  defaultOpen?: boolean
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

/** Keep drafts mounted; preserve manual disclosure choices. */
export function CheckoutDisclosure({
  title,
  summary,
  required = false,
  completed = false,
  defaultOpen = false,
  children,
  onOpenChange
}: CheckoutDisclosureProps) {
  const ref = useRef<HTMLDetailsElement>(null)
  const automatic = useRef(false)
  const initialized = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!initialized.current) {
      initialized.current = true
      if (defaultOpen) element.open = true
    }
    if (required && !element.open) {
      automatic.current = true
      element.open = true
    } else if (!required && automatic.current) {
      automatic.current = false
      element.open = false
    }
  }, [required, defaultOpen])

  return (
    <details ref={ref} className={styles.section} data-required={required} data-completed={completed}
      onToggle={event => onOpenChange?.(event.currentTarget.open)}>
      <summary className={styles.sectionHeader} onClick={() => { automatic.current = false }}>
        <span className={styles.sectionTitle}>
          {title}
          {required && <span className={styles.requiredDot} aria-label='Requiere atención' />}
        </span>
        <span className={styles.sectionMeta}>
          {completed && !required && <span className={styles.completedIcon} aria-hidden='true'><Icon icon='IconMiniCheck' size={15} /></span>}
          <small title={summary}>{summary}</small>
        </span>
        <span aria-hidden='true' className={styles.chevron} />
      </summary>
      <div className={styles.sectionBody}>{children}</div>
    </details>
  )
}
