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
import { DateRange } from 'react-date-range';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Link } from 'react-router-dom';
const Header = () => {
  const [date, setDate] = useState(false);
  const [people, setPeople] = useState(false);
  const [adults, setAdults] = useState(0);
  const [childrens, setChildrens] = useState(0);
  const [rooms, setRoom] = useState(0);
  const [city, setCity] = useState('');
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const type = urlSearchParams.get('type') || '';
  const rating = urlSearchParams.get('rating') || '';
  const navigate = useNavigate();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const { pathname } = useLocation();

  const handleDate = () => {
    setDate((date) => !date);
    setPeople((prev) => (prev = false));
  };

  const handlePeople = () => {
    setPeople((prev) => !prev);

    setDate((date) => (date = false));
  };

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
              <div className='date' onClick={handleDate}>
                <FontAwesomeIcon icon={faCalendarDays} />
                <div className='setDate'>
                  <div>{state[0]?.startDate?.toDateString()}</div>
                  <div>—</div>
                  <div>
                    {state[0]?.endDate === null
                      ? 'DD/MM/YYYY'
                      : state[0]?.endDate?.toDateString()}
                  </div>
                </div>
              </div>
              {date && (
                <div className='calendar'>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </div>
              )}
              <div className='people' onClick={handlePeople}>
                <FontAwesomeIcon icon={faPerson} />
                <div className='setPeople'>
                  <p>
                    <span>{adults}</span> {adults > 1 ? 'adults' : 'adult'}
                  </p>
                  <p>
                    <span>{childrens}</span>{' '}
                    {childrens > 1 ? 'childrens' : 'children'}
                  </p>
                  <p>
                    <span>{rooms}</span> {rooms > 1 ? 'rooms' : 'room'}
                  </p>
                </div>
              </div>

              {people && (
                <div className='options'>
                  <div className='options__option'>
                    <div className='options__element'>
                      <p options__label>{adults > 1 ? 'adults' : 'adult'}</p>
                      <div className='options__counter'>
                        <span
                          className={`options__operator ${
                            adults === 0 ? 'disabled' : ''
                          }`}
                          onClick={() =>
                            adults > 0 && setAdults((pre) => pre - 1)
                          }
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
                      <p options__label>
                        {childrens > 1 ? 'childrens' : 'children'}
                      </p>
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
                      <p options__label>{rooms > 1 ? 'rooms' : 'room'}</p>
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
                  <button
                    className='options__button'
                    onClick={() => setPeople(false)}
                  >
                    Done
                  </button>
                </div>
              )}
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
