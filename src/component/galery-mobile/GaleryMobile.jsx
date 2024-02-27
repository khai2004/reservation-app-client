import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './galeryMobile.scss';

const GaleryMobile = ({ setSeletedPhoto, lastPhoto, data, seletedPhoto }) => {
  return (
    <div className='galery-content'>
      <div className='btn-galery'>
        <button
          className='button-galery'
          onClick={() =>
            setSeletedPhoto((prev) =>
              prev === 0 ? (prev = lastPhoto) : prev - 1
            )
          }
        >
          <FontAwesomeIcon icon={faCaretLeft} className='button-galery-icon' />
        </button>
        <button
          className='button-galery'
          onClick={() =>
            setSeletedPhoto((prev) =>
              prev === lastPhoto ? (prev = 0) : prev + 1
            )
          }
        >
          <FontAwesomeIcon icon={faCaretRight} className='button-galery-icon' />
        </button>
      </div>

      <div className='image-box'>
        <img src={data?.photo[seletedPhoto]?.url} alt={data?.title} />
      </div>
    </div>
  );
};

export default GaleryMobile;
