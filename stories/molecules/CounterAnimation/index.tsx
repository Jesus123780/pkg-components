import React, { type FC, useRef, useEffect } from 'react'

import utils from './utils'
import { Disk } from './Disk'

const { getArrayOfNumber } = utils

interface Props {
  number: number
  size: string
  numberformat?: boolean
}

function getSize(fontSize: string): [string, 'px' | 'em' | 'rem'] {
  if (fontSize === '') {
    throw new Error('Missing param: [fontSize]')
  }
  const [size] = fontSize.match(/^[0-9]*/)
  const [unit] = fontSize.match(/(em|rem|px)$/)
  if (!size || !['em', 'rem', 'px'].includes(unit)) {
    throw new Error('Invalid fontSize value was given')
  }
  return [size, unit]
}

export const MemoCounterAnimation: FC<Props> = ({
  number,
  numberformat = true,
  size
}) => {
  const { numbers } = getArrayOfNumber({ number, numberformat })
  const prevNumbersRef = useRef<string[] | null>(null)

  const [fontSize, unit] = getSize(size)

  useEffect(() => {
    prevNumbersRef.current = numbers
  }, [numbers])

  const isTotalIncreasing =
    prevNumbersRef.current !== null
      ? parseInt(prevNumbersRef.current.join(''), 10) < number
      : number > 0

  const prevNumbersCeros = number.toString().length > 1
    ? '0'.repeat(number.toString().length - 1) + '0'
    : '0'

  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: `${fontSize}${unit}`,
        overflow: 'hidden',
        width: 'min-content'
      }}
    >
      {numbers.map((number, i) => {
        const num = parseInt(number, 10)
        const prevNumString = prevNumbersRef.current?.[i] ?? '0'
        const prevNum = parseInt(prevNumString, 10)
        const isSomethingZero = num === 0 || prevNum === 0
        const withSeparator = number === ',' || number === '.'

        return withSeparator
          ? (
            <span
              key={`${number}-${i}`}
              style={{
                fontSize: `${fontSize}${unit}`,
                height: `${fontSize}${unit}`,
                lineHeight: '0.9',
                width: 'min-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {number}
            </span>
          )

          : (
            <Disk
              initialValue={Number(prevNumbersCeros)}
              key={
                prevNum !== num
                  ? `${number}-${i}`
                  : `${number}-${i}-${Math.random()}`
              }
              delay={200 + i * 100}
              size={fontSize}
              unit={unit}
              number={number}
              prevNumber={prevNumString}
              isIncreasing={isSomethingZero ? isTotalIncreasing : prevNum < num}
              level={prevNum - num >= 2}
            />
          )
      })}
    </div>
  )
}

MemoCounterAnimation.displayName = 'Counter'

export const CounterAnimation = React.memo(MemoCounterAnimation, (prevProps, nextProps) => {
  return prevProps.number === nextProps.number
})
