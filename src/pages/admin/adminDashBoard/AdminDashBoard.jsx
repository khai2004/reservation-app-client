import React, { useState } from 'react';
import './adminDashBoard.scss';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../component/admin/adminSidebar/AdminSidebar';
import Navbar from '../../../component/navbar/Navbar';
import {
  faHotel,
  faHouse,
  faList,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AdminDashBoard = () => {
  const [select, setSelect] = useState('account');
  const adminButton = [
    {
      link: '/adminmanagement/home',
      name: 'Home',
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      link: '/adminmanagement/orderlist',
      name: 'Orders',
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      link: '/adminmanagement/hotellist',
      name: 'Hotel',
      icon: <FontAwesomeIcon icon={faHotel} />,
    },
    {
      link: '/adminmanagement/hotelcreate',
      name: 'Create hotel',
      icon: <FontAwesomeIcon icon={faPlus} />,
    },
    {
      link: '/adminmanagement/user',
      name: 'User',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  return (
    <div className='admin-component'>
      <div className='admin-component-box'>
        <AdminSidebar setSelect={setSelect} adminButton={adminButton} />
        <div className='navbar'>
          <Navbar />
        </div>
        <h1>{select}</h1>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
