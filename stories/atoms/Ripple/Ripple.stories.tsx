import React from 'react';
import type { Meta, StoryObj } from '@storybook/react'; 
import { RippleButtonProps, RippleButton } from './index';

const meta: Meta<RippleButtonProps> = {
  component: RippleButton,
  title: 'atoms/RippleButton',
  argTypes: {
    label: { control: 'text' },
    loading: { control: 'boolean' },
    style: { control: 'object' },
    family: { control: 'text' },
    border: { control: 'text' },
    height: { control: 'text' },
    disabled: { control: 'boolean' },
    standard: { control: 'boolean' },
    active: { control: 'text' },
    type: { control: 'text' },
    widthButton: { control: 'text' },
    bgColor: { control: 'text' },
    color: { control: 'text' },
    margin: { control: 'text' },
    padding: { control: 'text' },
    radius: { control: 'text' },
  }
};

export default meta;

type Story = StoryObj<typeof RippleButton>;

export const Example: Story = (args = {}) => <RippleButton {...args as RippleButtonProps} />
Example.args = {
  onClick: () => {
    console.log('Button clicked!');
  },
  loading: false,
  style: {},
  family: 'PFont-Light',
  disabled: false,
  standard: false,
  active: '',
  type: 'button',
  widthButton: '100%',
  bgColor: '',
  color: '',
  margin: '',
  padding: '',
  radius: '',
  children: <span>Click Me</span>
};

export const disableExample: Story = (args = {}) => <RippleButton {...args as RippleButtonProps} />
disableExample.args = {
  onClick: () => {
    console.log('Button clicked!');
  },
  loading: false,
  style: {},
  family: 'PFont-Light',
  disabled: true,
  standard: false,
  active: '',
  type: 'button',
  widthButton: '100%',
  bgColor: '',
  color: '',
  margin: '',
  padding: '',
  radius: '',
  children: <span>Click Me</span>
};

export const loadingExample: Story = (args = {}) => <RippleButton {...args as RippleButtonProps} />
loadingExample.args = {
  onClick: () => {
    alert('Button clicked!');
  },
  loading: true,
  style: {},
  family: 'PFont-Light',
  disabled: false,
  standard: false,
  active: '',
  type: 'button',
  widthButton: '100%',
  bgColor: '',
  color: '',
  margin: '',
  padding: '',
  radius: '',
  children: <span>Click Me</span>
};