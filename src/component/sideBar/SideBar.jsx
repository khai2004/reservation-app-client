import React, { useEffect, useState } from 'react';
import './sideBar.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetRatingHotelQuery,
  useGetTypeHotelQuery,
} from '../../slices/hotelsApiSlice';
const SideBar = ({ filter }) => {
  const [selectedRating, setSelectedRating] = useState('');

  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();

  const { data: ratings, isLoading, error, refetch } = useGetRatingHotelQuery();

  const {
    data: type,
    isLoading: typeLoading,
    error: typeError,
  } = useGetTypeHotelQuery();

  const handleCheckboxChange = (rating) => {
    selectedRating === rating
      ? setSelectedRating('')
      : setSelectedRating(rating);
  };
  const handleTypeCheckboxChange = (type) => {
    selectedType === type ? setSelectedType('') : setSelectedType(type);
  };
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const city = urlSearchParams.get('city') || '';

  useEffect(() => {
    navigate(
      `/hotels?city=${city}&rating=${selectedRating}&type=${selectedType}`
    );
  }, [navigate, selectedRating, selectedType, city]);

  return (
    <div className='sidebar-box'>
      <h3>Filter by:</h3>

      <div className='sidebar-element'>
        <div>
          <h4> Property rating </h4>
          <p> Includes stars and other ratings</p>
        </div>

        {isLoading ? (
          'Is Loading'
        ) : (
          <div className='checkbox'>
            {Array.from({ length: 5 }, (_, index) => (
              <div className='checkbox-item' key={index + 1}>
                <div className='check'>
                  <input
                    type='checkbox'
                    checked={index + 1 === selectedRating}
                    onChange={() => handleCheckboxChange(index + 1)}
                  />
                  <span>{index + 1} star</span>
                </div>
                <p>{ratings[index]}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {typeLoading ? (
        'Loading'
      ) : (
        <div className='sidebar-element'>
          <h4> Property Type </h4>
          <div className='checkbox'>
            {type.map((type) => (
              <div className='checkbox-item' key={type._id}>
                <div className='check'>
                  <input
                    type='checkbox'
                    checked={type._id === selectedType}
                    onChange={() => handleTypeCheckboxChange(type._id)}
                  />
                  <span>
                    {type._id.charAt(0).toUpperCase() + type._id.slice(1)}
                  </span>
                </div>
                <p>{type.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
