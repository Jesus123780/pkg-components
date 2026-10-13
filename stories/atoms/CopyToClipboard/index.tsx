import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { Icon } from '../Icon'
import { getGlobalStyle } from '../../../helpers'
import styles from './CopyToClipboard.module.css'
import { Text } from '../Text'

type CopyStatus = 'idle' | 'success' | 'error'

export interface CopyToClipboardProps {
  text: string
  label?: string
  copiedMessage?: string
  showText?: boolean
  errorMessage?: string
  onCopySuccess?: () => void
  onCopyError?: (error: Error) => void
}

const COPY_FEEDBACK_DURATION = 2000

const getError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }

  if (typeof error === 'string') {
    return new Error(error)
  }

  return new Error('Failed to copy text to clipboard')
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  label = '',
  showText = true,
  copiedMessage = '',
  errorMessage = 'No se pudo copiar',
  onCopySuccess,
  onCopyError
}) => {
  const [status, setStatus] = useState<CopyStatus>('idle')

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyingRef = useRef(false)

  const clearFeedbackTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const resetStatus = useCallback(() => {
    clearFeedbackTimeout()

    timeoutRef.current = setTimeout(() => {
      setStatus('idle')
      timeoutRef.current = null
    }, COPY_FEEDBACK_DURATION)
  }, [clearFeedbackTimeout])

  const copyWithFallback = useCallback((value: string): boolean => {
    if (
      !document?.body
    ) {
      return false
    }

    const textarea = document.createElement('textarea')
    const activeElement = document.activeElement

    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.setAttribute('aria-hidden', 'true')

    textarea.style.position = 'fixed'
    textarea.style.top = '0'
    textarea.style.left = '-9999px'
    textarea.style.opacity = '0'
    textarea.style.pointerEvents = 'none'

    document.body.appendChild(textarea)

    try {
      textarea.focus()
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length)

      return document.execCommand('copy')
    } finally {
      document.body.removeChild(textarea)

      if (activeElement instanceof HTMLElement) {
        activeElement.focus()
      }
    }
  }, [])

  const handleCopy = useCallback(async () => {
    if (copyingRef.current) {
      return
    }

    if (
      typeof text !== 'string' ||
      text.length === 0
    ) {
      const error = new Error(
        'There is no text available to copy'
      )

      setStatus('error')
      resetStatus()
      onCopyError?.(error)

      return
    }

    copyingRef.current = true

    try {
      let copiedSuccessfully = false

      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        await navigator.clipboard.writeText(text)
        copiedSuccessfully = true
      } else {
        copiedSuccessfully = copyWithFallback(text)
      }

      if (!copiedSuccessfully) {
        throw new Error(
          'The clipboard operation was not successful'
        )
      }

      setStatus('success')
      resetStatus()
      onCopySuccess?.()
    } catch (error) {
      const normalizedError = getError(error)

      setStatus('error')
      resetStatus()
      onCopyError?.(normalizedError)
    } finally {
      copyingRef.current = false
    }
  }, [
    text,
    copyWithFallback,
    resetStatus,
    onCopySuccess,
    onCopyError
  ])

  useEffect(() => {
    return () => {
      clearFeedbackTimeout()
    }
  }, [clearFeedbackTimeout])

  const buttonLabel =
    status === 'success'
      ? copiedMessage
      : status === 'error'
        ? errorMessage
        : label

  const buttonIcon =
    status === 'success'
      ? 'IconSuccess'
      : status === 'error'
        ? 'IconError'
        : 'IconCopy'

  const iconColor = getGlobalStyle(status === 'success'
    ? '--color-icons-white'
    : '--color-icons-black'
  )

  return (
    <div
      className={styles.container}
      data-status={status}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {showText && (
        <div
          className={styles.textWrapper}
          title={text}
        >
          <Text className={styles.text}>
            {text}
          </Text>
        </div>
      )}

      <button
        type="button"
        className={styles.button}
        data-status={status}
        onClick={(event) => {
          event.stopPropagation()
          void handleCopy()
        }}
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        <span className={styles.icon}>
          <Icon
            icon={buttonIcon}
            size={18}
            color={iconColor}
          />
        </span>

        <span className={styles.buttonLabel}>
          {buttonLabel}
        </span>
      </button>

      <span
        className={styles.srOnly}
        aria-live="polite"
        aria-atomic="true"
      >
        {status === 'success'
          ? copiedMessage
          : status === 'error'
            ? errorMessage
            : ''}
      </span>
    </div>
  )
}
