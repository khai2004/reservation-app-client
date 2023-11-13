import React from 'react';
import './singleHotel.scss';
import { useNavigate } from 'react-router-dom';

const SingleHotel = ({ hotel }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className='searchItem' onClick={() => handleClick(hotel?._id)}>
      <img src={hotel.photo[0]} alt={hotel.title} className='siImg' />
      <div className='siDesc'>
        <h1 className='siTitle'>{hotel.title} </h1>
        <span className='siDistance'>{hotel.distance} </span>
        <span className='siTaxiOp'>Free airport taxi</span>
        <span className='siSubtitle'>
          Studio Apartment with Air conditioning
        </span>
        <span className='siFeatures'>
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className='siCancelOp'>Free cancellation </span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className='siDetailTexts'>
          <span className='siPrice'>${hotel.cheapestPrice}</span>
          <span className='siTaxOp'>Includes taxes and fees</span>
          <button className='siCheckButton'>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
