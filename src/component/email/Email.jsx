import React from 'react';
import './email.scss';
const Email = () => {
  return (
    <div className='email'>
      <div className='email__text'>
        <p className='email__text--title'>Save time, save money!</p>
        <p>Sign up and we'll send the best deals to you</p>
      </div>

      <div className='email__box'>
        <input
          type='email'
          placeholder='Your email address'
          className='email__box--input'
        />
        <button className='email__box--button'>Subcribed</button>
      </div>
    </div>
  );
};

export default Email;
