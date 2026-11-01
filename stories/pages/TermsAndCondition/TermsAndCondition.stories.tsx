import React from 'react'
import { Meta } from '@storybook/react'
import { TermsAndCondition } from './index'

export default {
  title: 'pages/TermsAndCondition',
  component: TermsAndCondition,
} as Meta;

const Template: any = (args: any) => <TermsAndCondition {...args} />;

export const TermsAndConditionView = Template.bind({});
