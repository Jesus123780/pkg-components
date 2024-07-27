import React, { useState } from 'react'
import styles from './Pagination.module.css'
import { Button, Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

interface PaginationProps {
  currentPage: number
  isVisableButtonLeft: boolean
  isVisableButtonRight: boolean
  isVisableButtons: boolean
  items: Array<number | string>
  handleNextPage?: () => void
  handleOnClick: (pageNumber: number) => void
  handlePrevPage?: () => void
}

/**
 * Pagination component
 *
 * @param {PaginationProps} props - Properties passed to the component
 * @returns {JSX.Element} Pagination component
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  items = [],
  handleOnClick,
  isVisableButtonLeft,
  isVisableButtonRight,
  isVisableButtons,
  handlePrevPage,
  handleNextPage
}) => {
  if (items.length === 0) return null
  const [pageNumber, setPageNumber] = useState('')

  if (currentPage < 1 || !Array.isArray(items) || items.some(item => typeof item === 'number' && item < 0)) {
    return <p>Invalid numbers provided</p>
  }

  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim()
    setPageNumber(value)
  }

  const handleGoToPage = () => {
    const pageNumberInt = parseInt(pageNumber, 10)
    if (!isNaN(pageNumberInt) && pageNumberInt >= 1 && pageNumberInt <= items.length) {
      handleOnClick(pageNumberInt)
    }
    setPageNumber('')
  }

  const visibleItems = items.slice(Math.max(0, currentPage - 3), Math.min(items.length, currentPage + 3))
  return (
    <div className={styles.paginationContainer}>
      {isVisableButtons && isVisableButtonLeft && (
        <button onClick={handlePrevPage} className={`${styles.button} ${styles.prevButton}`} aria-label='Previous Page'>
          <Icon icon='IconArrowLeft' size={20} color={getGlobalStyle('--color-icons-primary')} />
        </button>
      )}

      {currentPage > 4 && (
        <button className={styles.button} onClick={() => handleOnClick(1)} aria-label='Page 1'>
          1
        </button>
      )}

      {currentPage > 5 && <button className={styles.button} disabled aria-disabled='true'>
        ...
      </button>}

      {visibleItems.map((item, index) => {
        if (typeof item === 'number') {
          return (
            <button
              className={`${item === currentPage ? styles.active : styles.button}`}
              key={index}
              onClick={() => handleOnClick(item)}
              aria-label={`Page ${item}`}
            >
              {item}
            </button>
          )
        } else {
          return (
            <button className={styles.button} key={index} disabled aria-disabled='true'>
              ...
            </button>
          )
        }
      })}

      {currentPage < items.length - 4 && (
        <button className={styles.button} disabled aria-disabled='true'>
          ...
        </button>
      )}

      {currentPage < items.length - 3 && (
        <button className={styles.button} onClick={() => handleOnClick(items.length)} aria-label={`Page ${items.length}`}>
          {items.length}
        </button>
      )}

      {isVisableButtons && isVisableButtonRight && (
        <button onClick={handleNextPage} className={`${styles.button} ${styles.nextButton}`} aria-label='Next Page'>
          <Icon icon='IconArrowRight' size={20} color={getGlobalStyle('--color-icons-primary')} />
        </button>
      )}

      {items.length >= 10 && <div className={styles.pageInputContainer}>
        <input
          type='number'
          value={pageNumber}
          onChange={handlePageInputChange}
          className={styles.pageInput}
          placeholder='Ir a la pagina'
          min='1'
          max={items.length}
        />
        {(pageNumber.length > 0) && <Button primary onClick={handleGoToPage} className={styles.goButton} aria-label='Go to page'>
          Ir
        </Button>
        }
      </div>}
    </div>
  )
}
