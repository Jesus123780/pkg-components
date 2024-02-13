import React from 'react'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number;
  isVisableButtonLeft: boolean;
  isVisableButtonRight: boolean;
  isVisableButtons: boolean;
  items: Array<number | string>;
  handleNextPage?: () => void;
  handleOnClick: (number: number) => void;
  handlePrevPage?: () => void;
}
/**
 * Pagination component
 *
 * @param {Object} props - Properties passed to the component
 * @param {number} props.currentPage - The current page number
 * @param {Array<number|string>} props.items - Page items
 * @param {Function} props.handleOnClick - Callback function when a page item is clicked
 * @param {boolean} props.isVisableButtonLeft - Whether the left button is visible
 * @param {boolean} props.isVisableButtonRight - Whether the right button is visible
 * @param {boolean} props.isVisableButtons - Whether the left and right buttons are visible
 * @param {Function} [props.handlePrevPage] - Callback function when the previous page button is clicked
 * @param {Function} [props.handleNextPage] - Callback function when the next page button is clicked
 * @returns {JSX.Element} Pagination component
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 0,
  items = [],
  handleOnClick,
  isVisableButtonLeft,
  isVisableButtonRight,
  isVisableButtons,
  handlePrevPage,
  handleNextPage
}) => {
  if (currentPage < 0 || !Array.isArray(items) || items.some(item => {return typeof item === 'number' && item < 0})) {
    return <p>Invalid numbers provided</p>
  }

  return (
    <div className={styles.paginationContainer}>
      {isVisableButtons && isVisableButtonLeft && (
        <button onClick={handlePrevPage}>Prev</button>
      )}

      {items.map((item, index) => {return (
        <button
          className={item === currentPage ? styles.active : ''}
          key={index}
          onClick={() => {
            if (typeof item === 'number') handleOnClick(item)
          }}
        >
          {item}
        </button>
      )})}

      {isVisableButtons && isVisableButtonRight && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  )
}
