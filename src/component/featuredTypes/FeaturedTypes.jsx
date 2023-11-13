import React, { useEffect, useState } from 'react';

import './featuredTypes.scss';
import { useLocation, useNavigate } from 'react-router-dom';
const FeaturedTypes = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const city = urlSearchParams.get('city') || '';
  const rating = urlSearchParams.get('rating') || '';
  const navigate = useNavigate();

  const handleClick = (type) => {
    console.log(type);
    navigate(`/hotels?city=${city}&rating=${rating}&type=${type}`);
  };
  return (
    <div className='typeBox'>
      <div className='type'>
        <div className='element' onClick={() => handleClick('hotel')}>
          <img
            src='https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />

          <h3>Hotels</h3>
        </div>
        <div className='element' onClick={() => handleClick('apartment')}>
          <img
            src='https://images.pexels.com/photos/2968141/pexels-photo-2968141.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />
          <h3>Apartment</h3>
        </div>
        <div className='element' onClick={() => handleClick('resort')}>
          <img
            src='https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />
          <h3>Resort </h3>
        </div>
        <div className='element' onClick={() => handleClick('villas')}>
          <img
            src='https://images.pexels.com/photos/1488327/pexels-photo-1488327.png?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />
          <h3>Villas</h3>
        </div>
        <div className='element' onClick={() => handleClick('cabins')}>
          <img
            src='https://images.pexels.com/photos/1493202/pexels-photo-1493202.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt=''
          />
          <h3>Villas</h3>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTypes;
