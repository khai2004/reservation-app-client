import React, { useState } from 'react';

import './adminSidebar.scss';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminSidebar = ({ setSelect, adminButton }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className='admin-sidebar-container'>
      <div className='user'>
        <img
          src={
            userInfo?.data?.image ||
            'https://cdn-icons-png.flaticon.com/128/149/149071.png'
          }
          alt={userInfo?.data?.username}
        />
        <p>{userInfo?.data?.username}</p>
      </div>
      <div className='admin-side-btn'>
        {adminButton.map((room) => (
          <Link to={room.link} className='link'>
            <div
              className='admin-sidbar-box'
              onClick={() => setSelect(room.name)}
            >
              {room.icon}
              {room.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
