import React from 'react';

const FormErrorMsg = props => {
  return (
    <span style={{ color: 'red', fontSize: '14px' }}>{props.children}</span>
  );
};

export default FormErrorMsg;
