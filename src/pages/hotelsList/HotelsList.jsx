import React, { useEffect, useState } from 'react';
import './hotelsList.scss';
import SideBar from '../../component/sideBar/SideBar';
import ListHotels from '../../component/listHoltels/ListHotels';
import { useGetHotelsQuery } from '../../slices/hotelsApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const HotelsList = () => {
  const [price, setPrice] = useState(1);

  const navigate = useNavigate();

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const type = urlSearchParams.get('type') || '';
  const rating = urlSearchParams.get('rating') || '';
  const city = urlSearchParams.get('city') || '';
  useEffect(() => {
    navigate(`/hotels?city=${city}&rating=${rating}&type=${type}`);
  }, [city, rating, type, navigate]);
  const filter = {
    type,
    rating,
    city,
    price,
  };

  const { data, isLoading, error } = useGetHotelsQuery(filter);

  return (
    <div className='hotels-list'>
      <div className='hotels-list__container'>
        <SideBar filter={filter} />

        <ListHotels setPrice={setPrice} isLoading={isLoading} data={data} />
      </div>
    </div>
  );
};

export default HotelsList;
