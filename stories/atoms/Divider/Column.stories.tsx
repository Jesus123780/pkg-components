import React from 'react';
import { Divider, DividerProps } from './index'; // Ajusta la ruta según sea necesario

export default {
  title: 'atoms/Divider',
  component: Divider,
  argTypes: {
    borderTop: { control: 'boolean' },
    borderBottom: { control: 'boolean' },
    margin: { control: 'number' }
  }
};

const Template: React.FC<DividerProps> = (args) => <Divider {...args} />;

export const Default = Template.bind({});
Default({ borderTop: true, borderBottom: true, margin: 10 });
