import React, { type FC, memo, useEffect, useRef, useState } from 'react'

interface DiskProps {
  delay: number
  number: string
  prevNumber: string
  isIncreasing: boolean
  level: boolean
  size: string
  initialValue: number
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

  // Asegurarse de siempre incluir el último número para mostrarlo claramente al final
  range.push(to % 10)

  return level ? [to % 10] : range
}

const MemoDisk: FC<DiskProps> = ({
  delay,
  size,
  unit,
  prevNumber,
  initialValue,
  number,
  isIncreasing,
  level
}) => {
  const [value, setValue] = useState(initialValue)
  const prevValue = parseInt(prevNumber, 10)

  const [offsetY, setOffsetY] = useState(0)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }
    setValue(parseInt(number, 10))
    const diskValues = getDiskNumbers(prevValue, value, isIncreasing, Boolean(level))
    const finalOffset = -size * (diskValues.length - 1)

    let start: number | null = null
    const duration = delay // ms

    const animate = (timestamp: number): void => {
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
  }, [value, prevValue, size, delay, isFirstLoad])

  const diskValues = getDiskNumbers(prevValue, value, isIncreasing, Boolean(level))

  return (
    <div
      style={{
        overflow: 'hidden',
        height: `${size}${unit}`,
        width: `${Number(size) * 0.6}${unit}`,
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
          width: 'min-content',
          alignItems: 'center'
        }}
      >
        {diskValues.map((d, i) => {
          return (
            <span
              key={`${d}-${i}`}
              style={{
                fontSize: `${size}${unit}`,
                height: `${size}${unit}`,
                lineHeight: '0.9',
                width: 'min-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {d}
            </span>
          )
        })}
      </div>
    </div>
  )
}

const easeOutCubic = (t: number): number => --t * t * t + 1

export const Disk = memo(MemoDisk, (prevProps, nextProps) => {
  return (
    prevProps.number === nextProps.number
  )
})
