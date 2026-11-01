'use client'

/**
 * SearchBar.tsx
 * Clean, typed SearchBar component using CSS Modules.
 *
 * - No styled-components, everything styled via `styles.module.css`.
 * - Handlers are validated and called safely.
 * - Exposes small, predictable API: handleChange receives (value, event),
 *   handleSubmit receives (value, event).
 *
 * JSDoc is in English.
 */

import React, { useState } from 'react'
import styles from './styles.module.css'
import { PColor } from '../../../assets/colors'
import { IconSearch } from '../../../assets/icons'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

/**
 * Props for SearchBar component
 */
export interface SearchBarProps {
  backgroundColor?: string
  placeholder?: string
  width?: string
  padding?: string
  border?: string
  margin?: string
  /**
   * Called on every input change. Receives (value, event).
   */
  handleChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Called on submit (Enter or form submit). Receives (value, event).
   */
  handleSubmit?: (value: string, event?: React.FormEvent<HTMLFormElement>) => void
  /**
   * Optional maxLength for the input
   */
  maxLength?: number
}

/**
 * SearchBar - small, focused search input for forms and toolbars.
 * @param props SearchBarProps
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  backgroundColor = '',
  placeholder = 'Search...',
  width = '100%',
  padding = '0px 30px 0',
  border = '',
  margin = '0',
  handleChange = () => { },
  handleSubmit = () => { },
  maxLength
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const safeCallChange = (value: string, event?: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // call user provided handler but avoid throwing
      handleChange && handleChange(value, event)
    } catch (err) {
      // swallow errors to avoid crashing the UI; log for devs
      // eslint-disable-next-line no-console
      console.error('SearchBar: handleChange threw an error', err)
    }
  }

  const safeCallSubmit = (value: string, event?: React.FormEvent<HTMLFormElement>) => {
    try {
      handleSubmit && handleSubmit(value, event)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('SearchBar: handleSubmit threw an error', err)
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(event?.target?.value ?? '')
    setSearchQuery(value)
    safeCallChange(value, event)
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    safeCallSubmit(searchQuery, event)
  }

  // Inline style uses CSS variables so module.css can remain static
  const containerStyle: React.CSSProperties = {
    width,
    margin,
    padding,
    // expose values as CSS variables used by module.css (fallbacks exist)
    // padding duplicated to root to preserve original behavior
    // backgroundColor and border are applied via CSS variables so styles.module.css can use them
    // values are sanitized by casting to string
    // Note: keep inline minimal; visual theming should rely on tokens/variables in the app root.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ['--sb-bg' as any]: backgroundColor || undefined,
    // @ts-ignore
    ['--sb-border' as any]: border || undefined
    // @ts-ignore
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className={styles['search-bar__form']}
      role="search"
      style={containerStyle}
      aria-label="search form"
    >
      <div
        className={styles['search-bar__container']}
        // keep a small inline style for backwards compatibility (padding passed also as CSS var)
        style={{}}
      >
        <span className={styles['search-icon']} aria-hidden="true">
          <Icon
            icon='IconSearch'
            color={getGlobalStyle('--color-icons-primary')}
            size={20}
          />
        </span>

        <input
          className={styles['search-input']}
          onChange={onInputChange}
          placeholder={String(placeholder ?? '')}
          type="text"
          value={searchQuery}
          aria-label={String(placeholder ?? 'search')}
          maxLength={maxLength}
          autoComplete="off"
        />
      </div>
    </form>
  )
}

