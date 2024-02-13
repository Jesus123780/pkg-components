import React from 'react'
import { Skeleton } from '../../../molecules'
import styles from './skeletonUserProfile.module.css'

export const SkeletonProfile = () => {
  return (
    <div className={styles['skeleton_container']}>
        <Skeleton height={200}  numberObject={4} margin={'15px 0'} />
        <div className={styles['skeleton_container_circle']}>
            <Skeleton height={50} width='130px' borderRadius={'5px'} numberObject={1} margin={'15px 0'} />
        </div>
    </div>
  )
}
