import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export const FloatMenu = () => {
  const useMouseAPI = () => {
    const [xPos, setXPos] = useState(0)
    const [yPos, setYPos] = useState(0)
    const [clickTs, setClickTs] = useState(0)

    const handlePositionChange = ({ screenX, screenY }) => {
      setXPos(screenX)
      setYPos(screenY)
    }
    const handleClick = () => {
      return setClickTs(new Date())
    }

    useEffect(() => {
      document.addEventListener('mousemove', handlePositionChange)
      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('mousemove', handlePositionChange)
        document.removeEventListener('click', handleClick)
      }
    }, [])

    return { xPos, yPos, clickTs }
  }
  const [mouseLocation, setMouseLocation] = useState({ xPos: 0, yPos: 0 })
  const { xPos, yPos, clickTs } = useMouseAPI()
  const prevClickTs = useRef(0)
  useEffect(() => {
    if (prevClickTs.current < clickTs) {
      setMouseLocation({ xPos, yPos })
      prevClickTs.current = clickTs
    }
  }, [xPos, yPos, clickTs])
  return (
    <div style={{ position: 'relative' }}>
      <h2>
        {clickTs ? (
          <div>
            <p>x-pos: {mouseLocation.xPos}</p>
            <p>y-pos: {mouseLocation.yPos}</p>
          </div>
        ) : (
          <p>Click anywhere to start</p>
        )}
      </h2>
      <div>{!!clickTs && <ChildWrapper style={{ left: `${mouseLocation.xPos}%`, top: `${mouseLocation.yPos}%` }}>Hola</ChildWrapper>}</div>
    </div>
  )
}
const ChildWrapper = styled.div`
  position: absolute;
  background-color: red;
  width: 300px;
  height: 300px;
`
