'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './NavigationButtons.module.css'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
export const NavigationButtons: React.FC = () => {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState<boolean>(false)

  useEffect(() => {
    const updateNavState = (): void => {
      setCanGoBack(window.history.length > 1)
    }

    updateNavState()

    window.addEventListener('popstate', updateNavState)
    return () => window.removeEventListener('popstate', updateNavState)
  }, [])

  const handleBack = (): void => {
    router.back()
  }

  const handleForward = (): void => {
    window.history.forward()
  }

  return (
        <div className={styles.container}>
            <button
                onClick={handleBack}
                disabled={!canGoBack}
                className={`${styles.button} ${!canGoBack ? styles.disabled : ''}`}
            >
                <Icon icon='IconArrowLeft' size={15} color={getGlobalStyle('--color-icons-primary')} />
            </button>
            <button
                onClick={handleForward}
                className={styles.button}
            >
                <Icon icon='IconArrowRight' size={30} color={getGlobalStyle('--color-icons-primary')} />
            </button>
        </div>
  )
}
