
'use client'

import { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import styles from './Pagination.module.css'
import { Button, Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

type PaginationSize = 'sm' | 'md' | 'lg' | 'xl'

interface PaginationProps {
  currentPage: number
  isVisableButtonLeft: boolean
  isVisableButtonRight: boolean
  isVisableButtons: boolean
  items: Array<number | string>
  size?: PaginationSize
  handleNextPage?: () => void
  handleOnClick: (pageNumber: number) => void
  handlePrevPage?: () => void
}

/**
 * Pagination component with configurable sizes.
 *
 * @param {PaginationProps} props - Component properties.
 * @returns {JSX.Element | null} Pagination component.
 */
export const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  items = [],
  size = 'md',
  handleOnClick,
  isVisableButtonLeft,
  isVisableButtonRight,
  isVisableButtons,
  handlePrevPage,
  handleNextPage
}) => {
  const [pageNumber, setPageNumber] = useState('')

  const isValidItems = Array.isArray(items) &&
    items.every(item =>
      typeof item === 'string' ||
      (Number.isInteger(item) && item >= 1)
    )

  const isValidPage = Number.isInteger(currentPage) &&
    currentPage >= 1 &&
    currentPage <= items.length

  if (!isValidItems || !isValidPage) {
    return <p>Invalid numbers provided</p>
  }

  if (items.length === 0) return null

  const sizeClass = styles[`size-${size}`] ?? styles['size-md']

  /**
   * Handles changes to the page input.
   *
   * @param {ChangeEvent<HTMLInputElement>} event - Input change event.
   * @returns {void}
   */
  const handlePageInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPageNumber(event.target.value)
  }

  /**
   * Navigates to the entered page when the value is valid.
   *
   * @returns {void}
   */
  const handleGoToPage = (): void => {
    const parsedPage = Number(pageNumber)

    if (
      pageNumber.trim() !== '' &&
      Number.isInteger(parsedPage) &&
      parsedPage >= 1 &&
      parsedPage <= items.length
    ) {
      handleOnClick(parsedPage)
    }

    setPageNumber('')
  }

  const visibleItems = items.slice(
    Math.max(0, currentPage - 4),
    Math.min(items.length, currentPage + 3)
  )

  return (
    <div className={`${styles.paginationContainer} ${sizeClass}`}>
      {isVisableButtons && isVisableButtonLeft && (
        <button
          type='button'
          onClick={handlePrevPage}
          className={`${styles.button} ${styles.prevButton}`}
          aria-label='Previous Page'
          disabled={!handlePrevPage}
        >
          <Icon
            icon='IconArrowLeft'
            size={size === 'sm' ? 14 : size === 'md' ? 20 : size === 'lg' ? 24 : 28}
            color={getGlobalStyle('--color-icons-primary')}
          />
        </button>
      )}

      {currentPage > 4 && (
        <button
          type='button'
          className={styles.button}
          onClick={() => handleOnClick(1)}
          aria-label='Page 1'
        >
          1
        </button>
      )}

      {currentPage > 5 && (
        <button
          type='button'
          className={styles.button}
          disabled
          aria-label='Skipped pages'
        >
          ...
        </button>
      )}

      {visibleItems.map((item, index) => {
        if (typeof item !== 'number') {
          return (
            <button
              type='button'
              className={styles.button}
              key={`ellipsis-${index}`}
              disabled
              aria-label='Skipped pages'
            >
              ...
            </button>
          )
        }

        const isActive = item === currentPage

        return (
          <button
            type='button'
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            key={item}
            onClick={() => handleOnClick(item)}
            aria-label={`Page ${item}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item}
          </button>
        )
      })}

      {currentPage < items.length - 4 && (
        <button
          type='button'
          className={styles.button}
          disabled
          aria-label='Skipped pages'
        >
          ...
        </button>
      )}

      {currentPage < items.length - 3 && (
        <button
          type='button'
          className={styles.button}
          onClick={() => handleOnClick(items.length)}
          aria-label={`Page ${items.length}`}
        >
          {items.length}
        </button>
      )}

      {isVisableButtons && isVisableButtonRight && (
        <button
          type='button'
          onClick={handleNextPage}
          className={`${styles.button} ${styles.nextButton}`}
          aria-label='Next Page'
          disabled={!handleNextPage}
        >
          <Icon
            icon='IconArrowRight'
            size={size === 'sm' ? 14 : size === 'md' ? 20 : size === 'lg' ? 24 : 28}
            color={getGlobalStyle('--color-icons-primary')}
          />
        </button>
      )}

      {items.length >= 10 && (
        <div className={styles.pageInputContainer}>
          <input
            type='number'
            value={pageNumber}
            onChange={handlePageInputChange}
            onKeyDown={event => {
              if (event.key === 'Enter') handleGoToPage()
            }}
            className={styles.pageInput}
            placeholder='Ir a la página'
            aria-label='Go to page number'
            min={1}
            max={items.length}
          />

          {pageNumber.length > 0 && (
            <Button
              primary
              onClick={handleGoToPage}
              className={styles.goButton}
              aria-label='Go to page'
            >
              Ir
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
