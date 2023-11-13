import React, { useState } from 'react';
import './home.scss';
import FeaturedPopular from '../../component/featuredPopular/FeaturedPopular';
import FeaturedTypes from '../../component/featuredTypes/FeaturedTypes';
import FeaturedLove from '../../component/featuredLoves/FeaturedLoves';
import Email from '../../component/email/Email';
import { useGetTopHotelsQuery } from '../../slices/hotelsApiSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, isLoading, error } = useGetTopHotelsQuery();
  const navigate = useNavigate();

  const getSingleHotel = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <div>
      <div className='homeContainer'>
        <div className='textHome'>
          <h1>Trending destinations</h1>
          <p>Most popular choices for travellers from Vietnam</p>
        </div>
        <FeaturedPopular />
        <h1 className='homeTiltles'>Browse by property type</h1>
        <FeaturedTypes />
        <h1 className='homeTiltles'>Homes guests love</h1>
        <FeaturedLove data={data} getSingleHotel={getSingleHotel} />
        <Email />
      </div>
    </div>
  );
};

export default Home;
