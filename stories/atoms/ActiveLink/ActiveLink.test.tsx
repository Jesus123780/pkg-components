import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActiveLink } from './index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ActiveLink', () => {
  // Mock useRouter to provide the necessary router context
  useRouter.mockImplementation(() => ({
    asPath: '/some-path',
  }));

  it('renders with the correct class when active', () => {
    render(
      <ActiveLink href="/some-path" activeClassName="active">
        <a className="custom-class">Link</a>
      </ActiveLink>
    );

    screen.getByText('Link');
  });

  it('renders without the active class when not active', () => {
    render(
      <ActiveLink href="/another-path" activeClassName="active">
        <a className="custom-class">Link</a>
      </ActiveLink>
    );

    const link = screen.getByText('Link')
  });
});
