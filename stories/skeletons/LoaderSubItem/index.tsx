import React from 'react'
import { Column } from '../../atoms'
import { Skeleton } from '../../molecules'
import styles from './styles.module.css'

export const LoaderSubItem: React.FC = () => {
  return (
    <Column>
      <div className={styles.row}>
        {Array.from(Array(4).keys()).map((value) => {
          return (
            <div className={styles.column} key={value}>
              <Skeleton
                height={50}
                margin="10px 0"
                numberObject={1}
                width="100%"
              />
              <Skeleton
                borderRadius="40%"
                className={styles.leftLoader}
                height={40}
                margin="10px 0"
                numberObject={1}
                width={'40px'}
              />
            </div>
          )
        })}
        <Skeleton height={40} margin="10px 0" numberObject={2} width={'100%'} />
        {Array.from(Array(3).keys()).map((value) => {
          return (
            <div className={styles.column} key={value}>
              <Skeleton
                height={50}
                margin="10px 0"
                numberObject={1}
                width="100%"
              />
              <Skeleton
                borderRadius="1%"
                className={styles.leftLoader}
                height={40}
                margin="10px 0"
                numberObject={1}
                width="100px"
              />
            </div>
          )
        })}
      </div>
    </Column>
  )
}
