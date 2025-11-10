import React from 'react'
import styles from '../styles.module.css'
import { Icon, Text } from '../../../atoms'
import { getGlobalStyle } from '../../../../utils'

/** Tipo para cada acción del panel */
export interface CardOption {
  label: string
  icon: string
  onClick?: () => void
  color?: string
  danger?: boolean
}

/** Props principales del panel */
interface CardOptionsPanelProps {
  isOpen: boolean
  actions: CardOption[]
}

/**
 * 📂 CardOptionsPanel (Versión dinámica)
 * 
 * Panel lateral deslizable desde la derecha.
 * Recibe una lista de acciones configurables.
 * 
 * Ejemplo:
 * ```tsx
 * <CardOptionsPanel
 *   isOpen={isOpen}
 *   actions={[
 *     { label: 'Imprimir', icon: 'IconPrinter', onClick: handlePrint },
 *     { label: 'Duplicar', icon: 'IconCopy', onClick: handleDuplicate },
 *     { label: 'Eliminar', icon: 'IconTrash', onClick: handleDelete, danger: true }
 *   ]}
 * />
 * ```
 */
export const CardOptionsPanel: React.FC<CardOptionsPanelProps> = ({
  isOpen,
  actions
}) => {
  return (
    <div className={`${styles.sidePanel} ${isOpen ? styles.sidePanelOpen : ''}`}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`${styles.optionItem} ${action.danger ? styles.danger : ''}`}
        >
          <Text as='span' size='xs'>
            {action.label}
          </Text>
          <Icon
            icon={action.icon}
            size={20}
            color={action.color || (action.danger
              ? getGlobalStyle('--color-danger')
              : getGlobalStyle('--color-icons-black'))}
          />
        </button>
      ))}
    </div>
  )
}
