import React, { type FC, useRef, useEffect } from 'react'

import utils from './utils'
import { Disk } from './Disk'

const { getArrayOfNumber } = utils

interface Props {
  number: number
  size: string
}

function getSize (fontSize: string): [string, string] {
  if (!fontSize) {
    throw new Error('Missing param: [fontSize]')
  }
  const [size] = fontSize.match(/^[0-9]*/)
  const [unit] = fontSize.match(/(em|rem|px)$/)
  if (!size || !['em', 'rem', 'px'].includes(unit)) {
    throw new Error('Invalid fontSize value was given')
  }
  return [size, unit]
}

export const CounterAnimation: FC<Props> = ({ number, size }) => {
  const { numbers } = getArrayOfNumber(number)
  const prevNumbersRef = useRef(null)

  const [fontSize, unit] = getSize(size)

  useEffect(() => {
    prevNumbersRef.current = numbers
  }, [numbers])

  const isTotalIncreasing =
    prevNumbersRef.current !== null
      ? parseInt(prevNumbersRef.current.join(''), 10) < number
      : number > 0

  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center',
        height: `${fontSize}${unit}`,
        overflow: 'hidden'
      }}
    >
      {numbers.map((number, i) => {
        const num = parseInt(number, 10)
        const prevNumString = prevNumbersRef.current
          ? prevNumbersRef.current[i]
            ? prevNumbersRef.current[i]
            : '0'
          : '0'
        const prevNum = parseInt(prevNumString, 10)
        const isSomethingZero = num === 0 || prevNum === 0
        return (
          <Disk
            // 10 -> 9 -> 8 has a problem because of key
            key={
              prevNum !== num
                ? `${number}-${i}`
                : `${number}-${i}-${Math.random()}`
            }
            delay={500 + i * 100}
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

CounterAnimation.displayName = 'Counter'
