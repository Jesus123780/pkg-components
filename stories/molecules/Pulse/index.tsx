'use client'

import { Row } from '../../atoms'
import styles from './Pulse.module.css'

export function Pulse({ active }: { readonly active: boolean }) {
  return (
    <Row className={styles.wrapper} justifyContent='center'>
      <div
        className={`${styles.dot} ${
          active ? styles.dotActive : styles.dotInactive
        }`}
      >
        {active && <span className={styles.ping} />}
      </div>

      <span className={styles.label}>
        {active ? 'Conectado' : 'Desconectado'}
      </span>
    </Row>
  )
}
