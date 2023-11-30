import React from 'react';

import './submitButton.scss';
const SubmitButton = ({ text }) => {
  return (
    <button className='button-submit' type='submit'>
      {text}
    </button>
  );
};

export default SubmitButton;
