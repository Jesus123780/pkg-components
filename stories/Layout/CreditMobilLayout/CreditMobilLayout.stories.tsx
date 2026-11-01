import React from 'react';
import { Meta } from '@storybook/react';
import { CreditMobilLayout } from './index';

export default {
  title: 'layout/CreditMobilLayout',
  component: CreditMobilLayout,
} as Meta;

const Template = (args: any) => <CreditMobilLayout {...args} >
  Children
</CreditMobilLayout>;

export const Default = Template.bind({})