import React, { useState } from 'react';

import './adminSidebar.scss';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminSidebar = ({ setSelect, select, adminButton }) => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return (
    <div className='admin-sidebar-container'>
      <div className='user'>
        <img
          src={
            userInfo?.image ||
            'https://cdn-icons-png.flaticon.com/128/149/149071.png'
          }
          alt={userInfo?.username}
        />
        <p>{userInfo?.username}</p>
      </div>
      <div className='admin-side-btn'>
        {adminButton.map((room) => (
          <Link to={room.link} className='link'>
            <div
              className={`admin-sidbar-box ${
                select === room.name ? 'select-admin' : ''
              } `}
              onClick={() => setSelect(room.name)}
            >
              <span>{room.icon}</span>
              <span> {room.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
