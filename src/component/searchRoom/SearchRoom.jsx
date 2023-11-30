import React, { useState } from 'react';
import './searchRoom.scss';
import RoomDate from '../date/RoomDate';
import PeopleSearch from '../peopleSearch/PeopleSearch';
import { useDispatch, useSelector } from 'react-redux';
import { setReserveOrder } from '../../slices/ReserveSlice';
const SearchRoom = () => {
  const data = useSelector((state) => state.room);

  const handleSetDate = () => {};
  return (
    <div className='search-room-box'>
      <div className='room-date-box'>
        <RoomDate />
      </div>
      <div className='people-search-box'>
        <PeopleSearch />
      </div>
      <button className='search-bar' onClick={handleSetDate}>
        Apply
      </button>
    </div>
  );
};

export default SearchRoom;
