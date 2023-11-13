import React, { useState } from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import { logout } from '../../slices/authSlice';

const Navbar = ({ login }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handleLogOut = async (e) => {
    try {
      const res = await logoutApi();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout success!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' className='link'>
          <span className='logo'>Booking App</span>
        </Link>
        {!(login === '/login') &&
          (!userInfo ? (
            <div className='navItems'>
              <Link to='/register' className='link'>
                <button className='navButton'>Register</button>
              </Link>
              <Link to='/login' className='link'>
                <button className='navButton'>Login</button>
              </Link>
            </div>
          ) : (
            <div className='user'>
              <img
                src={
                  userInfo?.data?.image ||
                  'https://tse4.mm.bing.net/th?id=OIP.YAJlHz4zchNP5zIfsajE9AHaFr&pid=Api&P=0&h=220'
                }
                alt={userInfo?.data?.username}
                onClick={() => {
                  navigate('/profile');
                }}
              />
              <p
                onClick={() => {
                  navigate('/profile');
                }}
              >
                {userInfo?.data?.username}
              </p>
              <button className='btn' onClick={handleLogOut}>
                Sign out
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
