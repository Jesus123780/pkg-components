import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';

interface ActiveLinkProps {
  activeClassName: string;
  children: ReactElement;
  href: string;
  asPath?: string;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  activeClassName = '',
  asPath,
  ...props
}) => {
  const child = React.Children.only(children) as React.ReactElement;
  const childClassName = child.props.className || '';
  const className =
    asPath === props.href ? `${childClassName} ${activeClassName}`.trim() : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  asPath: PropTypes.string,
};
