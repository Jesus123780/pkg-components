import React from 'react';
import { Meta } from '@storybook/react';
import { CreditApplicationData } from './index'; // Asegúrate de tener la ruta correcta

export default {
  title: 'pages/CreditApplicationData',
  component: CreditApplicationData,
} as Meta;

const Template: any = (args: any) => <CreditApplicationData {...args} />;

export const CreditApplicationDataView = Template.bind({});
