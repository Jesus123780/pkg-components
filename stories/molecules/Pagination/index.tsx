
'use client'

import { useState } from 'react'
import type { ChangeEvent, FC, KeyboardEvent } from 'react'
import styles from './Pagination.module.css'
import { Button, Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import { Skeleton } from '../Skeleton'

type PaginationSize = 'sm' | 'md' | 'lg' | 'xl'

interface PaginationProps {
  currentPage: number
  isVisableButtonLeft: boolean
  isVisableButtonRight: boolean
  isVisableButtons: boolean
  items: Array<number | string>
  size?: PaginationSize
  loading?: boolean
  skeletonCount?: number
  handleNextPage?: () => void
  handleOnClick: (pageNumber: number) => void
  handlePrevPage?: () => void
}

const ICON_SIZE: Record<PaginationSize, number> = {
  sm: 14,
  md: 20,
  lg: 24,
  xl: 28
}

const SKELETON_SIZE: Record<PaginationSize, number> = {
  sm: 28,
  md: 36,
  lg: 42,
  xl: 48
}

/**
 * Validates pagination items.
 *
 * @param items - Page numbers and separator labels.
 * @returns Whether all items are valid.
 */
const isValidItems = (items: Array<number | string>): boolean =>
  Array.isArray(items) &&
  items.every((item) =>
    typeof item === 'string'
      ? item.trim().length > 0
      : Number.isSafeInteger(item) && item >= 1
  )

/**
 * Pagination component with responsive layouts and skeleton loading.
 *
 * @param props - Pagination configuration.
 * @returns Pagination UI or null when no pages exist.
 */
export const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  items = [],
  size = 'md',
  loading = false,
  skeletonCount = 7,
  handleOnClick,
  isVisableButtonLeft,
  isVisableButtonRight,
  isVisableButtons,
  handlePrevPage,
  handleNextPage
}) => {
  const [pageNumber, setPageNumber] = useState('')
  const [inputError, setInputError] = useState('')

  const safeSize = ICON_SIZE[size] ? size : 'md'
  const sizeClass = styles[`size-${safeSize}`] ?? styles['size-md']

  /**
   * Handles page input changes.
   *
   * @param event - Input change event.
   */
  const handlePageInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPageNumber(event.target.value)
    setInputError('')
  }

  /**
   * Navigates to the entered page after validation.
   */
  const handleGoToPage = (): void => {
    const parsedPage = Number(pageNumber)

    if (
      pageNumber.trim() === '' ||
      !Number.isSafeInteger(parsedPage) ||
      parsedPage < 1 ||
      parsedPage > items.length
    ) {
      setInputError(`Ingresa un número entre 1 y ${items.length}.`)
      return
    }

    handleOnClick(parsedPage)
    setPageNumber('')
    setInputError('')
  }

  /**
   * Handles Enter key submission.
   *
   * @param event - Keyboard event.
   */
  const handlePageInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleGoToPage()
    }
  }

  // Loading state
  if (loading) {
    const safeSkeletonCount =
      Number.isSafeInteger(skeletonCount) && skeletonCount > 0
        ? Math.min(skeletonCount, 12)
        : 7

    return (
      <div
        className={`${styles.paginationContainer} ${styles.skeletonContainer} ${sizeClass}`}
        aria-busy='true'
        aria-label='Cargando paginación'
      >
        <Skeleton
          height={SKELETON_SIZE[safeSize]}
          width={SKELETON_SIZE[safeSize]}
          margin='0'
          borderRadius='999px'
          numberObject={safeSkeletonCount}
          className={styles.skeletonItem}
        />
      </div>
    )
  }

  if (!Array.isArray(items) || items.length === 0) {
    return null
  }

  const validPage =
    Number.isSafeInteger(currentPage) &&
    currentPage >= 1 &&
    currentPage <= items.length

  if (!isValidItems(items) || !validPage) {
    return (
      <p className={styles.validationMessage} role='alert'>
        No se pudo mostrar la paginación porque los datos de página no son válidos.
      </p>
    )
  }

  const visibleItems = items.slice(
    Math.max(0, currentPage - 4),
    Math.min(items.length, currentPage + 3)
  )

  const showFirstPage = currentPage > 4
  const showLeadingEllipsis = currentPage > 5
  const showTrailingEllipsis = currentPage < items.length - 4
  const showLastPage = currentPage < items.length - 3

  return (
    <nav
      className={`${styles.paginationContainer} ${sizeClass}`}
      aria-label='Paginación'
    >
      {isVisableButtons && isVisableButtonLeft && (
        <button
          type='button'
          onClick={handlePrevPage}
          className={`${styles.button} ${styles.navigationButton}`}
          aria-label='Página anterior'
          disabled={!handlePrevPage || currentPage <= 1}
        >
          <Icon
            icon='IconArrowLeft'
            size={ICON_SIZE[safeSize]}
            color={getGlobalStyle('--color-icons-primary')}
            style={{ cursor: 'default' }}
          />
        </button>
      )}

      {showFirstPage && (
        <button
          type='button'
          className={styles.button}
          onClick={() => handleOnClick(1)}
          aria-label='Página 1'
        >
          1
        </button>
      )}

      {showLeadingEllipsis && (
        <span className={`${styles.button} ${styles.ellipsis}`} aria-hidden='true'>
          …
        </span>
      )}

      {visibleItems.map((item, index) => {
        if (typeof item !== 'number') {
          return (
            <span
              className={`${styles.button} ${styles.ellipsis}`}
              key={`ellipsis-${index}`}
              aria-hidden='true'
            >
              …
            </span>
          )
        }

        const isActive = item === currentPage

        return (
          <button
            type='button'
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            key={`${item}-${index}`}
            onClick={() => handleOnClick(item)}
            aria-label={`Página ${item}`}
            aria-current={isActive ? 'page' : undefined}
            disabled={isActive}
          >
            {item}
          </button>
        )
      })}

      {showTrailingEllipsis && (
        <span className={`${styles.button} ${styles.ellipsis}`} aria-hidden='true'>
          …
        </span>
      )}

      {showLastPage && (
        <button
          type='button'
          className={styles.button}
          onClick={() => handleOnClick(items.length)}
          aria-label={`Página ${items.length}`}
        >
          {items.length}
        </button>
      )}

      {isVisableButtons && isVisableButtonRight && (
        <button
          type='button'
          onClick={handleNextPage}
          className={`${styles.button} ${styles.navigationButton}`}
          aria-label='Página siguiente'
          disabled={!handleNextPage || currentPage >= items.length}
        >
          <Icon
            icon='IconArrowRight'
            size={ICON_SIZE[safeSize]}
            color={getGlobalStyle('--color-icons-primary')}
            style={{ cursor: 'default' }}
          />
        </button>
      )}

      {items.length >= 10 && (
        <div className={styles.pageInputContainer}>
          <div className={styles.pageInputControl}>
            <input
              type='number'
              inputMode='numeric'
              value={pageNumber}
              onChange={handlePageInputChange}
              onKeyDown={handlePageInputKeyDown}
              className={`${styles.pageInput} ${inputError ? styles.pageInputInvalid : ''}`}
              placeholder='Ir a página'
              aria-label='Ir a una página específica'
              aria-invalid={Boolean(inputError)}
              min={1}
              max={items.length}
              step={1}
            />

            {pageNumber.length > 0 && (
              <Button
                type='button'
                primary
                onClick={handleGoToPage}
                className={styles.goButton}
                aria-label='Ir a la página indicada'
              >
                Ir
              </Button>
            )}
          </div>

          {inputError && (
            <span className={styles.inputError} role='alert'>
              {inputError}
            </span>
          )}
        </div>
      )}
    </nav>
  )
}
