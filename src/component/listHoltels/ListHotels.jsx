import React, { useState } from 'react';
import './listHotels.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import SingleHotel from '../singelHotel/SingleHotel';
import Paganation from '../paganation/Paganation';
import { useSearchParams } from 'react-router-dom';
import { useGetHotelsQuery } from '../../slices/hotelsApiSlice';
const ListHotels = () => {
  const [option, setOption] = useState(false);
  const [optionChoice, setOptionChoice] = useState('Our top picks');

  const [price, setPrice] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get('type') || '';
  const rating = searchParams.get('rating') || '';
  const city = searchParams.get('city') || '';
  const page = searchParams.get('page') || '';
  const pageSize = searchParams.get('pageSize') || '';

  const filter = {
    type,
    rating,
    city,
    price,
    page,
    pageSize,
  };
  const { data, isLoading, error } = useGetHotelsQuery(filter);
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
            <div className='list-container'>
              <h2 className='result'>
                <span>
                  {city ? `${city}:` : ''} {data?.hotels.length}{' '}
                </span>
                properties found
              </h2>
            </div>
          ) : (
            <div className='list-container'>
              <h2 className='result'>
                <span>
                  {city ? `${city}:` : ''} {data?.hotels.length}{' '}
                </span>
                properties found
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
                <Paganation count={data?.hotels?.length} />
              </div>
            </div>
          )}{' '}
        </>
      )}
    </>
  );
};

export default ListHotels;
