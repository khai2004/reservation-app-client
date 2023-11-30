import React, { useState } from 'react';
import './login.scss';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredential } from '../../slices/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = { email, password };
  const navigate = useNavigate();
  const [loginApi, isLoading] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(login).unwrap();
      console.log(res);
      dispatch(setCredential(res));
      navigate('/');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong. Try again!');
    }
  };
  return (
    <div className='login-form'>
      <h2 className='login-form__title'>Login</h2>
      <form className='login-form__form' onSubmit={handleLogin}>
        <div className='login-form__form-group'>
          <label className='login-form__form-group__label' htmlFor='email'>
            Email
          </label>
          <input
            className='login-form__form-group__input'
            type='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='login-form__form-group'>
          <label className='login-form__form-group__label' htmlFor='password'>
            Password
          </label>
          <input
            className='login-form__form-group__input'
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className='login-form__form-group__button' type='submit'>
          Login
        </button>
        <button
          className='login-form__form-group__register'
          onClick={() => navigate('/register')}
        >
          Register if you do not have account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
