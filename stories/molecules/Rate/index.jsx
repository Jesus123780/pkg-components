import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { IconRate } from '../../../assets/icons'
import { ContentIcon } from './styled'

/**
 * Displays a rating component with interactive stars.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.count - The total number of stars to display.
 * @param {number} props.rating - The current rating value.
 * @param {Object} props.color - The color configuration for filled and unfilled stars.
 * @param {string} props.color.filled - The color of filled stars.
 * @param {string} props.color.unfilled - The color of unfilled stars.
 * @param {string} props.size - The size of the stars.
 * @param {boolean} props.noHover - Disables hover effect on stars.
 * @param {Function} props.onRating - Callback function when a star is clicked.
 * @returns {JSX.Element} Rating component.
 */
export const Rate = ({ count, rating, color, size, noHover, onRating = () => {} }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const getColor = (index) => {
    if (hoverRating >= index || (!hoverRating && rating >= index)) {
      return color?.filled
    }

    return color.unfilled
  }

  const starRating = useMemo(() => {
    return (
      <ContentIcon>
        {Array(count)
          .fill(0)
          .map((_, i) => {
            return i + 1
          })
          .map((idx) => {
            return (
              <div
                icon='star'
                key={idx}
                onClick={() => {
                  return onRating ? onRating(idx) : {}
                }}
                onMouseEnter={() => {
                  return onRating ? !noHover && setHoverRating(idx) : {}
                }}
                onMouseLeave={() => {
                  return onRating ? setHoverRating(0) : {}
                }}
              >
                <IconRate color={getColor(idx)} size={size} />
              </div>
            )
          })}
      </ContentIcon>
    )
  }, [count, getColor, size, onRating, noHover])

  return <div>{starRating}</div>
}

Rate.propTypes = {
  color: PropTypes.shape({
    filled: PropTypes.string,
    unfilled: PropTypes.string
  }),
  count: PropTypes.number,
  filled: PropTypes.string,
  noHover: PropTypes.any,
  onRating: PropTypes.func,
  rating: PropTypes.number,
  size: PropTypes.any,
  unfilled: PropTypes.string
}

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: '#ffbc00',
    unfilled: '#DCDCDC'
  }
}
