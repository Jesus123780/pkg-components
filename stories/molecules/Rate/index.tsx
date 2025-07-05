'use client'

import React, { useMemo, useState } from 'react'
import { IconRate } from '../../../assets/icons'
import { ContentIcon } from './styled'

interface RateProps {
  count: number
  rating: number
  color: {
    filled: string
    unfilled: string
  }
  size: string
  noHover?: boolean
  onRating?: (rating: number) => void
}

export const Rate: React.FC<RateProps> = ({
  count,
  rating,
  color,
  size,
  noHover = false,
  onRating = () => {}
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0)

  const getColor = (index: number): string => {
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
          .map((_, i) => i + 1)
          .map((idx) => (
            <div
              key={idx}
              onClick={() => (onRating ? onRating(idx) : {})}
              onMouseEnter={() => (onRating ? !noHover && setHoverRating(idx) : {})}
              onMouseLeave={() => (onRating ? setHoverRating(0) : {})}
            >
              <IconRate color={getColor(idx)} size={size} />
            </div>
          ))}
      </ContentIcon>
    )
  }, [count, getColor, size, onRating, noHover])

  return <div>{starRating}</div>
}

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: '#ffbc00',
    unfilled: '#DCDCDC'
  }
}
