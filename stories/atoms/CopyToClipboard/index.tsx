import React, { useState } from 'react'
import { Icon } from '../Icon'
import { getGlobalStyle } from '../../../helpers'
import styles from './CopyToClipboard.module.css'

export type CopyToClipboardProps = {
  text: string
  label?: string
  copiedMessage?: string
  errorMessage?: string
  onCopySuccess?: () => void
  onCopyError?: (err: Error) => void
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  label = 'Copy',
  copiedMessage = 'Copied!',
  errorMessage = 'Failed to copy',
  onCopySuccess,
  onCopyError,
}) => {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback para navegadores sin navigator.clipboard
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px' // Oculto
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied('success')
      onCopySuccess?.()
    } catch (error) {
      setCopied('error')
      onCopyError?.(error as Error)
      console.error('Error copying to clipboard:', error)
    } finally {
      setTimeout(() => setCopied(null), 2000)
    }
  }
  return (
    <div className={styles.container}>
      <pre className={styles.text}>{text}</pre>
      <button className={styles.button} onClick={handleCopy} aria-label="Copy to clipboard">
        <Icon
          icon="IconCopy"
          size={20}
          color={getGlobalStyle('--color-icons-white')}
        />
        {copied === 'success'
          ? copiedMessage
          : copied === 'error'
            ? errorMessage
            : label
        }
      </button>
    </div>
  )
}
