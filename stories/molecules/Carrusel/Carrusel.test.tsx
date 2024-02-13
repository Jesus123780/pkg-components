import { render } from '@testing-library/react'
import React from 'react'
import { Carrusel3D } from './Carrusel3d'

describe('Carrusel3D', () => {
  it('renders correctly', () => {
    const { container } = render(<Carrusel3D />)
    expect(container).toMatchSnapshot()
  })
})
