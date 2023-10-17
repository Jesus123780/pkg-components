import React from 'react';
import { ActiveLink } from './index';

export default {
  title: 'atoms/ActiveLink',
  component: ActiveLink,
};

const Template = (args) => (
  <ActiveLink {...args}>
    <a className="custom-link">Link</a>
  </ActiveLink>
);

export const Active = Template.bind({});
Active.args = {
  href: '/some-path',
  activeClassName: 'active',
};

export const NotActive = Template.bind({});
NotActive.args = {
  href: '/another-path',
  activeClassName: 'active',
};
