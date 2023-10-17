import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AlertContent } from './AlertContent';

export const AlertBox = ({ err }) => {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (err) {
      const timeOut = setTimeout(() => setClosed(true), (err.duration || 7000) / 2);
      return () => {
        clearTimeout(timeOut);
        setClosed(false);
      };
    }
  }, [err]);

  return (
    <div onClick={() => setClosed(true)}>
      <AlertContent err={err} closed={closed} />
    </div>
  );
};

AlertBox.propTypes = {
  err: PropTypes.shape({
    color: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.string,
  }),
};
