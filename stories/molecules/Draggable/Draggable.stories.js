import React from 'react'
import { Draggable } from './index'

export default {
  title: 'molecules/Draggable',
  component: Draggable
}

export const Default = () => {
  return (
    <Draggable>
      <div data-testid='draggable-element' style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}>
        Draggable Element
      </div>
    </Draggable>
  )
}
