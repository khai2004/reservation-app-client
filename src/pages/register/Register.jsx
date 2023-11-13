import React, { useState } from 'react';
import './register.scss';
import { useRegisterMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredential } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = { username, email, phone, password };
  console.log(data);
  const [registerApi, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerApi(data);
      dispatch(setCredential({ ...res }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='register-form'>
      <h2 className='register-form__title'>Register</h2>
      <form onSubmit={handleSubmit} className='register-form__form'>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setName(e.target.value)}
          placeholder='Username'
          className='register-form__form__input'
        />
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='register-form__form__input'
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
          placeholder='Password'
          className='register-form__form__input'
        />

        <input
          type='tel'
          name='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Phone Number'
          className='register-form__form__input'
        />
        <button type='submit' className='register-form__form__submit-button'>
          Register
        </button>
        <button
          className='login-form__form-group__register'
          onClick={() => navigate('/login')}
        >
          Login if you have account
        </button>
      </form>
    </div>
  );
};

export default Register;
