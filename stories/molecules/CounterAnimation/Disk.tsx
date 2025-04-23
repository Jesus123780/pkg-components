import React, { type FC, memo, useEffect, useRef, useState } from 'react'

interface DiskProps {
  delay: number
  number: string
  prevNumber: string
  isIncreasing: boolean
  level: boolean
  size: number
  unit: 'px' | 'em' | 'rem'
}

const getDiskNumbers = (
  from: number,
  to: number,
  isIncreasing: boolean,
  level: boolean
): number[] => {
  const range: number[] = []
  if (isIncreasing) {
    for (let i = from; i <= to; i++) {
      range.push(i % 10)
    }
  } else {
    for (let i = from; i >= to; i--) {
      range.push(i % 10)
    }
  }

  return level ? [to % 10] : range
}

let firstLoad = true

const MemoDisk: FC<DiskProps> = ({
  delay,
  size,
  unit,
  prevNumber,
  number,
  isIncreasing,
  level
}) => {
  const value = parseInt(number, 10)
  const prevValue = parseInt(prevNumber, 10)

  const [offsetY, setOffsetY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    firstLoad = false

    const diskValues = getDiskNumbers(prevValue, value, isIncreasing, Boolean(level))
    const finalOffset = -size * (diskValues.length - 1)

    let start: number | null = null
    const duration = 400 // ms

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp
      const elapsed = timestamp - start

      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      const currentOffset = eased * finalOffset

      setOffsetY(currentOffset)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, prevValue, size])

  const diskValues = getDiskNumbers(prevValue, value, isIncreasing, Boolean(level))

  return (
    <div
      style={{
        overflow: 'hidden',
        height: `${size}${unit}`,
        width: `${size * 0.8}${unit}`,
        display: 'inline-block'
      }}
    >
      <div
        ref={ref}
        style={{
          transform: `translateY(${offsetY}${unit})`,
          transition: 'transform 0.4s ease-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {diskValues.map((d, i) => (
          <span
            key={`${d}-${i}`}
            style={{
              fontSize: `${size}${unit}`,
              lineHeight: 1,
              height: `${size}${unit}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

const easeOutCubic = (t: number): number => --t * t * t + 1

export const Disk = memo(MemoDisk)
