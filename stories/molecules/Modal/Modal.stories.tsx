import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AwesomeModal, AwesomeModalProps } from './index';

export default {
  title: 'molecules/Modal',
  component: AwesomeModal,
} as Meta;

const Template: Story<AwesomeModalProps> = (args) => <AwesomeModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Initial AwesomeModal',
  show: true, // Make sure to include the 'show' prop here
};

export const ModalMedium = Template.bind({});
ModalMedium.args = {
  children: 'Medium AwesomeModal',
  size: 'medium',
  show: true,
};

export const ModalLarge = Template.bind({});
ModalLarge.args = {
  children: 'Large AwesomeModal',
  size: 'large',
  show: true,
};

export const ModalSmall = Template.bind({});
ModalSmall.args = {
  children: 'Small AwesomeModal',
  size: 'small',
  show: true,
};

export const ModalCamera = Template.bind({});
ModalCamera.args = {
  children: '',
  show: true,
  padding: '0',
  title: 'Acerca tu cédula de identidad a la pantalla para ser escaneada',
  iconSize: 48,
  header: true,
  height: '642px',
  customHeight: 'calc(642px - 200px)',
  footer: true,
  size: '961px',
  headerColor: 'var(--color-primary-green2)',
  iconColor: 'var(--color-icons-white)',
  justifyButtons: 'end',
};
