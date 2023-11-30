import React from 'react';
import './singleHotel.scss';
import { useNavigate } from 'react-router-dom';
import Rating from '../rating/Rating';

const SingleHotel = ({ hotel }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/hotels/${id}`);
  };
  console.log(hotel);
  return (
    <div className='searchItem' onClick={() => handleClick(hotel?._id)}>
      <img src={hotel.photo[0].url} alt={hotel.title} className='siImg' />
      <div className='siDesc'>
        <h1 className='siTitle'>{hotel.title} </h1>
        <span className='siDistance'>{hotel.distance} m from centre</span>
        <span className='siTaxiOp'>Free airport taxi</span>

        <span className='siCancelOp'>Free cancellation </span>
        <span className='siCancelOpSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <span>
            <Rating hotel={hotel} />
          </span>
          <p>{hotel.rating}</p>
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
