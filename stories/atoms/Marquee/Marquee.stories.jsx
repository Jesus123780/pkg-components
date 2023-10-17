import React from 'react';
import { Marquee } from './index';

export default {
  title: 'atoms/Marquee',
  component: Marquee,
  argTypes: {
    // Define your argTypes here (if any)
  },
};

const Template = (args) => (
  <Marquee {...args}>
    {/* Add your content here */}
    <div>This is some scrolling content.</div>
    <div>It can be anything you want.</div>
  </Marquee>
);

export const Default = Template.bind({});
Default.args = {
  // Set your default arguments here
  play: true,
  pauseOnHover: false,
  pauseOnClick: false,
  direction: 'left',
  speed: 20,
  delay: 0,
  loop: 0,
  gradient: true,
  gradientColor: [255, 255, 255],
  gradientWidth: 200,
};
