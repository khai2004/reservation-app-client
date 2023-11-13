import React from 'react';
import PropTypes from 'prop-types';
import './profile.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className='profile'>
      <img
        className='profile__image'
        src={
          userInfo?.data?.image ||
          'https://tse4.mm.bing.net/th?id=OIP.YAJlHz4zchNP5zIfsajE9AHaFr&pid=Api&P=0&h=220'
        }
        alt={userInfo?.data?.username}
      />
      <div className='profile__info'>
        <h2 className='profile__username'>{userInfo?.data?.username}</h2>
        <p className='profile__email'>{userInfo?.data?.email}</p>
        <p className='profile__phone'>{userInfo.data?.phone}</p>
      </div>
      <Link to='/admin/hotelform'>
        <button>create hotel</button>
      </Link>
      <Link to='/admin/managehotel'>
        <button>List hotels</button>
      </Link>
    </div>
  );
};

export default Profile;
