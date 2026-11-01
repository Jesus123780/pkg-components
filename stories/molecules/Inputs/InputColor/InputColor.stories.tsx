export * from './index';
import type { Meta, StoryObj } from '@storybook/react';
import { InputColor } from './index';

const meta: Meta<typeof InputColor> = {
    component: InputColor,
    title: 'molecules/InputColor',
    parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj<typeof InputColor> = {
    args: {
        label: 'Select Color',
        value: '#ff0000'
    }
}

export const WithoutLabel: StoryObj<typeof InputColor> = {
    args: {
        value: '#00ff00'
    }
}

export const WithOnChange: StoryObj<typeof InputColor> = {
    args: {
        label: 'Pick a Color',
        onChange: (hex: string) => alert(`Selected color: ${hex}`)
    },
}