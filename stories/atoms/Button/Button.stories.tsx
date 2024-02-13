import React from 'react';
import { Meta } from '@storybook/react'
import { Button, ButtonProps } from './index'; // Ajusta la ruta según sea necesario

export default {
  title: 'atoms/Button',
  component: Button,
} as Meta<ButtonProps>;

export const Primary: React.FC<ButtonProps> = ({ primary = true, type = 'primary', ...rest }) => (
  <Button primary={primary} type={type} {...rest}>Primary Button</Button>
);

export const Secondary: React.FC<ButtonProps> = ({ primary = false, type = 'secondary', ...rest }) => (
  <Button primary={primary} type={type} {...rest}>Secondary Button</Button>
);

