import React from 'react';
import './featuredLoves.scss';
import Rating from '../rating/Rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const FeaturedLove = ({ data, getSingleHotel }) => {
  console.log(data);
  return (
    <div className='homeBox'>
      <div className='home-guest'>
        {data?.map((love) => (
          <div
            className='card'
            key={love._id}
            onClick={() => getSingleHotel(love._id)}
          >
            <div className='image-guest'>
              <img src={love?.photo[0]?.url} alt={love.title} />
            </div>
            <div className='detail'>
              <div className='desc'>
                <h4>{love.title}</h4>
                <p className='love-address'>{love.address}</p>
                <div className='review-love'>
                  <div className='point'>{love.rating}</div>
                  <div>
                    <p>
                      <Rating hotel={love} />
                    </p>
                    <p>{love.reviews.length} reviews</p>
                  </div>
                </div>
              </div>
              <div className='price'>
                <p>Starting from</p>
                <span>$ {love.cheapestPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLove;
