import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import('./reserve.scss');
const Reserve = () => {
  return (
    <div className='reservBox'>
      <div className='reserve'>
        <div className='rContainer'>
          <FontAwesomeIcon icon={faCircleXmark} className='rClose' />
          <span>Select your rooms:</span>

          <div className='rItem'>
            <div className='rItemInfo'>
              <div className='rTitle'></div>
              <div className='rDesc'></div>
              <div className='rMax'>
                Max people: <b></b>
              </div>
              <div className='rPrice'></div>
            </div>
            <div className='rSelectRooms'>
              <div className='room'>
                <label></label>
                <input type='checkbox' />
              </div>
            </div>
          </div>
          <button className='rButton'>Reserve Now!</button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
