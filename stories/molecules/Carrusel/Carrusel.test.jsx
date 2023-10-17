import React from 'react';
import { render } from '@testing-library/react';
import { Carrusel3D } from './Carrusel3d'; // Asegúrate de importar el story correctamente

describe('Carrusel3D', () => {
  it('renders correctly', () => {
    const { container } = render(<Carrusel3D />);
    expect(container).toMatchSnapshot();
  });
});
