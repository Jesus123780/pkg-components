import PropTypes from 'prop-types'
import React from 'react'
import styles from './Pagination.module.css'

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
export const Pagination = ({
  currentPage,
  items,
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

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ).isRequired,
  handleOnClick: PropTypes.func.isRequired,
  isVisableButtonLeft: PropTypes.bool.isRequired,
  isVisableButtonRight: PropTypes.bool.isRequired,
  isVisableButtons: PropTypes.bool.isRequired,
  handlePrevPage: PropTypes.func,
  handleNextPage: PropTypes.func
}
