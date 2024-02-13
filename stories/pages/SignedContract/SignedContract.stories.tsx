import React from 'react';
import { Meta } from '@storybook/react';
import { SignedContract } from './index'; // Asegúrate de tener la ruta correcta

export default {
  title: 'pages/SignedContract',
  component: SignedContract,
} as Meta;

const Template: any = (args: any) => <SignedContract {...args} />;

export const HomeView = Template.bind({});
