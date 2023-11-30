import React from 'react';
import './adminHome.scss';
import {
  faHotel,
  faList,
  faMoneyBill1,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetHotelsQuery } from '../../../slices/hotelsApiSlice';
import { useGetUsersQuery } from '../../../slices/userApiSlice';
import { useGetAllOrdersQuery } from '../../../slices/orderApiSlice';
const AdminHome = () => {
  const { data, isLoading, error } = useGetHotelsQuery('');
  const {
    data: orderData,
    isLoading: orderLoading,
    error: errorLoading,
  } = useGetAllOrdersQuery('');
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch,
  } = useGetUsersQuery();

  console.log();
  const home = [
    {
      name: 'Hotels',
      icon: <FontAwesomeIcon icon={faHotel} />,
      value: data?.hotels?.length,
    },
    {
      name: 'Order',
      icon: <FontAwesomeIcon icon={faList} />,
      value: orderData?.length,
    },
    {
      name: 'Revenue',
      icon: <FontAwesomeIcon icon={faMoneyBill1} />,
      value: orderData?.reduce((acc, price) => acc + price?.totalPrice, 0),
    },
    {
      name: 'Users',
      icon: <FontAwesomeIcon icon={faUser} />,
      value: userData?.user?.length,
    },
  ];
  return (
    <div>
      <div className='admin-brief'>
        {home.map((element, index) => (
          <div className='admin-home-header'>
            <div className='admin-home-header-card'>
              <h3>{element.name}</h3>
              <div className='icon-admin'>{element.icon}</div>
            </div>
            <div className='admin-home-body-card'>
              {index === 2 ? '$ ' : ''}
              {element?.value}
            </div>
          </div>
        ))}
      </div>
      <div className='admin-home-body'></div>
    </div>
  );
};

export default AdminHome;
