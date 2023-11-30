import React, { useEffect, useState } from 'react';
import './hotelsList.scss';
import SideBar from '../../component/sideBar/SideBar';
import ListHotels from '../../component/listHoltels/ListHotels';

const HotelsList = () => {
  return (
    <div className='hotels-list'>
      <div className='hotels-list__container'>
        <SideBar />

        <ListHotels />
      </div>
    </div>
  );
};

export default HotelsList;
