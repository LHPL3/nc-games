import React from 'react';

const Error = ({ errorMessage }) => {
  let err = '';
  if (errorMessage === 'Resource not found') {
    err = '404: ' + errorMessage;
  } else if (errorMessage === 'Invalid id provided') {
    err = '400: ' + errorMessage;
  } else {
    err = '404: Resource not found';
  }
  return <div>{err}</div>;
};

export default Error;
