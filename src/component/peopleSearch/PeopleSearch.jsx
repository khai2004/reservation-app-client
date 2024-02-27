import React, { useEffect, useRef, useState } from 'react';

import './peopleSearch.scss';
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setReserveOrder } from '../../slices/ReserveSlice';

const PeopleSearch = () => {
  const [people, setPeople] = useState(false);
  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);
  const [rooms, setRoom] = useState(0);
  const dispatch = useDispatch();

  const handlePeople = () => {
    setPeople((prev) => !prev);
  };

  useEffect(() => {
    const maxPeople = adults + childrens;
    dispatch(
      setReserveOrder({
        maxPeople: maxPeople,
      })
    );
  }, [adults, childrens, dispatch]);

  return (
    <div className='people-component'>
      <div className='people' onClick={handlePeople}>
        <FontAwesomeIcon icon={faPerson} style={{ fontSize: '2rem' }} />
        <div className='setPeople'>
          <p>
            <span>{adults}</span> {adults > 1 ? 'Adults' : 'Adult'}
          </p>
          <p>
            <span>{childrens}</span> {childrens > 1 ? 'Childrens' : 'Children'}
          </p>
          <p>
            <span>{rooms}</span> {rooms > 1 ? 'Rooms' : 'Room'}
          </p>
        </div>
      </div>

      {people && (
        <div className='options'>
          <div className='options__option'>
            <div className='options__element'>
              <p options__label>{adults > 1 ? 'Adults' : 'Adult'}</p>
              <div className='options__counter'>
                <span
                  className={`options__operator ${
                    adults === 0 ? 'disabled' : ''
                  }`}
                  onClick={() => adults > 0 && setAdults((pre) => pre - 1)}
                >
                  -
                </span>
                {adults}
                <span
                  className='options__operator'
                  onClick={() => setAdults((pre) => pre + 1)}
                >
                  +
                </span>
              </div>
            </div>
            <div className='options__element'>
              <p options__label>{childrens > 1 ? 'Childrens' : 'Children'}</p>
              <div className='options__counter'>
                <span
                  className={`options__operator ${
                    childrens === 0 ? 'disabled' : ''
                  }`}
                  onClick={() =>
                    childrens > 0 && setChildrens((pre) => pre - 1)
                  }
                >
                  -
                </span>
                {childrens}
                <span
                  className='options__operator'
                  onClick={() => setChildrens((pre) => pre + 1)}
                >
                  +
                </span>
              </div>
            </div>
            <div className='options__element'>
              <p options__label>{rooms > 1 ? 'Rooms' : 'Room'}</p>
              <div className='options__counter'>
                <span
                  className={`options__operator ${
                    rooms === 0 ? 'disabled' : ''
                  }`}
                  onClick={() => rooms && setRoom((pre) => pre - 1)}
                >
                  -
                </span>
                {rooms}
                <span
                  className='options__operator'
                  onClick={() => setRoom((pre) => pre + 1)}
                >
                  +
                </span>
              </div>
            </div>
          </div>
          <button className='options__button' onClick={() => setPeople(false)}>
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default PeopleSearch;
