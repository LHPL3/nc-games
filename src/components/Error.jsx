import React from 'react';

const Error = ({ errorMessage }) => {
  let err = '';
  if (errorMessage) {
    err = `${errorMessage.status}: ${errorMessage.data.msg}`;
  } else {
    err = '404: Resource not found';
  }

  return (
    <div className="errorcontainer">
      <span className="errormessage">{err}</span>
    </div>
  );
};

export default Error;
