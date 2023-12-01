import React, { useEffect, useState } from 'react';
import './header.scss';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomDate from '../date/RoomDate';
import PeopleSearch from '../peopleSearch/PeopleSearch';
const Header = () => {
  const [city, setCity] = useState('');
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const type = urlSearchParams.get('type') || '';
  const rating = urlSearchParams.get('rating') || '';
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?city=${city}&rating=${rating}&type=${type}`);
  };

  return (
    <div className='header'>
      <div className={`header-container `}>
        <div className='header-list'>
          <div className='header-list-item active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='header-list-item'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className='header-list-item'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className='header-list-item'>
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className='header-list-item'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {pathname === '/' && (
          <div className='text'>
            <h1 className='title'>Find your next stay</h1>
            <p className='content'>
              Search low prices on hotels, homes and much more...
            </p>
          </div>
        )}
        {!(pathname === '/register') && (
          <form onSubmit={handleSearch}>
            <div className='searchBar'>
              <div className='where'>
                <FontAwesomeIcon icon={faBed} />
                <input
                  type='text'
                  placeholder='Where are you going?'
                  className='input'
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className='date-search-bar'>
                <RoomDate state={''} setState={' '} />
              </div>
              <div className='people-search-bar'>
                <PeopleSearch />
              </div>
              <button type='submit' className='search'>
                Search
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Header;
