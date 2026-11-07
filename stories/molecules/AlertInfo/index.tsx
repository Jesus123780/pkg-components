import React from 'react'

import { IconInfo } from '../../../assets/icons'
import { getGlobalStyle } from '../../../utils'
import { Text } from '../../atoms'
import styles from './styles.module.css'

export type AlertInfoSize = 'sm' | 'md' | 'lg'

export interface AlertInfoProps {
  /** Tipo de alerta */
  type: 'warning' | 'error' | 'info'

  /** Mensaje principal */
  message: string

  /** Tamaño visual */
  size?: AlertInfoSize

  /** Título opcional */
  title?: string

  /** Permite reemplazar el icono predeterminado */
  icon?: React.ReactNode

  /** Permite ocultar el icono */
  showIcon?: boolean

  /** Clase CSS adicional */
  className?: string

  /** Callback para cerrar la alerta */
  onClose?: () => void

  /** Texto accesible para el botón de cierre */
  closeLabel?: string

  /** Permite personalizar el rol de accesibilidad */
  role?: 'alert' | 'status'
}

export const AlertInfo: React.FC<AlertInfoProps> = ({
  type,
  message,
  size = 'md',
  title,
  icon,
  showIcon = true,
  className,
  onClose,
  closeLabel = 'Cerrar alerta',
  role
}) => {
  const colors: Record<AlertInfoProps['type'], string> = {
    warning: getGlobalStyle('--color-campaigns-yellow'),
    error: getGlobalStyle('--color-primary-red'),
    info: getGlobalStyle('--color-secondary-blue')
  }

  const iconSizes: Record<AlertInfoSize, number> = {
    sm: 18,
    md: 25,
    lg: 30
  }

  const color = colors[type]

  const alertClassName = [
    styles.alert,
    styles[type],
    styles[size],
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={alertClassName}
      style={{ '--alert-color': color } as React.CSSProperties}
      role={role ?? (type === 'info' ? 'status' : 'alert')}
      aria-atomic='true'
    >
      {showIcon && (
        <span className={styles.icon} aria-hidden='true'>
          {icon ?? <IconInfo color={color} size={iconSizes[size]} />}
        </span>
      )}

      <div className={styles.content}>
        {title && (
          <Text className={styles.title} color='default'>
            {title}
          </Text>
        )}

        <Text className={styles.message} color='default'>
          {message}
        </Text>
      </div>

      {onClose && (
        <button
          type='button'
          className={styles.close}
          onClick={onClose}
          aria-label={closeLabel}
        >
          ×
        </button>
      )}
    </div>
  )
}