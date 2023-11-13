import React, { useState } from 'react';
import './listHotels.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import SingleHotel from '../singelHotel/SingleHotel';
import { useLocation, useParams } from 'react-router-dom';
import { useGetHotelsQuery } from '../../slices/hotelsApiSlice';
const ListHotels = ({ setPrice, data, isLoading }) => {
  const [option, setOption] = useState(false);
  const [optionChoice, setOptionChoice] = useState('Our top picks');
  const handlePrice = (price, optionChoice) => {
    setPrice(price);
    setOptionChoice(optionChoice);
    setOption(false);
  };

  return (
    <>
      {isLoading ? (
        'Loading'
      ) : (
        <>
          {data?.hotels.length === 0 ? (
            <div className='list-container'>Đéo có dữ liệu</div>
          ) : (
            <div className='list-container'>
              <h2 className='result'>
                <span>Da nang: 1457</span>properties found
              </h2>
              <div
                className='choose'
                onClick={() => setOption((prev) => !prev)}
              >
                <div>
                  <span>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </span>
                </div>
                Sort by: {optionChoice}
                <span>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </div>
              {option && (
                <div className='sort-list'>
                  <div className='slist'>
                    <div
                      className='item'
                      onClick={() =>
                        setOptionChoice((prev) => (prev = 'Our top picks'))
                      }
                    >
                      Our top picks
                    </div>

                    <div
                      className='item'
                      onClick={() => handlePrice(-1, 'Price (high to low)')}
                    >
                      Price (high to low)
                    </div>
                    <div
                      className='item'
                      onClick={() => handlePrice(1, 'Price (low to high)')}
                    >
                      Price (low to high)
                    </div>
                  </div>
                </div>
              )}
              <div className='list'>
                {data?.hotels?.map((hotel) => (
                  <SingleHotel hotel={hotel} key={hotel._id} />
                ))}
              </div>
            </div>
          )}{' '}
        </>
      )}
    </>
  );
};

export default ListHotels;
