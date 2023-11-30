import React, { useState } from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
import { logout } from '../../slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ login }) => {
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

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
            <div>
              <div className='user'>
                {userInfo.isAdmin && (
                  <div
                    className='admin-nav-element'
                    onClick={() => navigate('/adminmanagement')}
                  >
                    <FontAwesomeIcon icon={faSuitcase} />
                    <p>Admin management</p>
                  </div>
                )}
                <img
                  src={
                    userInfo?.image?.url ||
                    'https://cdn-icons-png.flaticon.com/128/149/149071.png'
                  }
                  alt={userInfo?.username}
                />
                <p className='user-nav'>{userInfo?.username}</p>
                <button onClick={handleLogOut}>Sign out</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
