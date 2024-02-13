import React from 'react'
import styles from './CreditMobilLayout.module.css'
import { Icon } from '../../atoms'

interface CreditMobilLayoutProps {
    children: React.ReactNode
}

export const CreditMobilLayout = ({
    children
}: CreditMobilLayoutProps) => {
  return (
    <div className={styles['layout_credit']}>
        <aside className={styles['aside']} >
          <Icon size={50} icon="logo" />
          <Icon size={140} icon="IconStrokeLogo" />
        </aside>
        <section>
            {children}
        </section>
    </div>
  )
}
