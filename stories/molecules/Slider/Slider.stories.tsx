import React from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import { Carousel } from './index'

export default {
  title: 'molecules/Carousel',
  component: Carousel
} as Meta<typeof Carousel>

type Story = StoryObj<typeof Carousel>

export const MainCarousel: Story = (args: any) => (
  <Carousel {...args}>
    <div style={{ height: '200px' }}>Slide 1</div>
    <div style={{ height: '200px' }}>Slide 2</div>
    <div style={{ height: '200px' }}>Slide 3</div>
  </Carousel>
)

MainCarousel.args = {}

export const WithNavigation: Story = (args: any) => (
  <Carousel {...args} navigation>
    <div style={{ height: '200px' }}>Slide 1</div>
    <div style={{ height: '200px' }}>Slide 2</div>
    <div style={{ height: '200px' }}>Slide 3</div>
  </Carousel>
)

WithNavigation.args = {}

export const WithPagination: Story = (args: any) => (
  <Carousel {...args} pagination>
    <div style={{ height: '200px' }}>Slide 1</div>
    <div style={{ height: '200px' }}>Slide 2</div>
    <div style={{ height: '200px' }}>Slide 3</div>
  </Carousel>
)

WithPagination.args = {}

export const WithScrollbar: Story = (args: any) => (
  <Carousel {...args} scrollbar>
    <div style={{ height: '200px' }}>Slide 1</div>
    <div style={{ height: '200px' }}>Slide 2</div>
    <div style={{ height: '200px' }}>Slide 3</div>
  </Carousel>
)

WithScrollbar.args = {}
