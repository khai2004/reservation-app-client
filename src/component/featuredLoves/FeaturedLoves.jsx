import React from 'react';
import './featuredLoves.scss';
const FeaturedLove = ({ data, getSingleHotel }) => {
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
                <p>{love.address}</p>
                <div className='review'>
                  <div className='poitn'>8.7</div>
                  <p>
                    fabulius, <span>32323</span> reviews
                  </p>
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
