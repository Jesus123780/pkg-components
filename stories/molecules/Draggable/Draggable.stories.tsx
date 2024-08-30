import React from 'react'
import { DraggableComponent } from './index'

export default {
  title: 'molecules/DraggableComponent',
  component: DraggableComponent
}

export const Default = () => {
  return (
    <DraggableComponent>
      <div data-testid='DraggableComponent-element' style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}>
        DraggableComponent Element
      </div>
    </DraggableComponent>
  )
}
