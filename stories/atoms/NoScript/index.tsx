import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

interface NoScriptProps {
  children: React.ReactNode;
}

export const NoScript: React.FC<NoScriptProps> = (props) => {
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(props.children as React.ReactElement)
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

NoScript.propTypes = {
  children: PropTypes.node.isRequired,
};

