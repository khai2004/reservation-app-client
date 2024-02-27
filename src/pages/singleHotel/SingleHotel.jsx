import React, { useState } from 'react';
import './singleHotel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import {
  faCaretLeft,
  faCaretRight,
  faHeart,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetSingelQuery } from '../../slices/hotelsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Room from '../../component/room/Room';
import Loader from '../../component/loader/Loader';
import Reviews from '../../component/reviews/Reviews';
import GaleryMobile from '../../component/galery-mobile/GaleryMobile';

const SingleHotel = () => {
  const [seletedPhoto, setSeletedPhoto] = useState(0);
  const [openSlide, setOpenSlide] = useState(false);
  const [reserve, setReserve] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingelQuery(id);

  const { userInfo } = useSelector((state) => state.auth);
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const reserveSection = document.getElementById('reserve');
    if (reserveSection) {
      reserveSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      console.error("Element with ID 'reserve' not found.");
    }
  };

  const lastPhoto = data?.photo.length - 1;

  const handleOpenSlide = (picture) => {
    setOpenSlide(true);
    setSeletedPhoto(picture);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        navigate('/error')
      ) : (
        <div className='single-hotel'>
          <div className='single-box'>
            <div className='title'>
              <div className='left-title'>
                <h3>{data?.title}</h3>
                <p className='location'>
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  {data?.address}
                </p>
              </div>
              <a
                href='#reserve'
                onClick={handleSmoothScroll}
                className='right-title'
              >
                Reserve your apartment stay
              </a>
            </div>
            <div className='galery-mobile'>
              <GaleryMobile
                setSeletedPhoto={setSeletedPhoto}
                lastPhoto={lastPhoto}
                data={data}
                seletedPhoto={seletedPhoto}
              />
            </div>
            <div className='galery'>
              <img
                src={data?.photo[0]?.url}
                alt=''
                className='galery1'
                onClick={() => handleOpenSlide(0)}
              />
              <img
                src={data?.photo[1]?.url}
                alt=''
                className='galery2'
                onClick={() => handleOpenSlide(1)}
              />

              <div className='galery3'>
                <div className='image_3'>
                  <img
                    src={data?.photo[2]?.url}
                    alt=''
                    onClick={() => handleOpenSlide(2)}
                  />
                </div>

                <div className='image_4'>
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('${data?.photo[3]?.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    className='backgroud-image'
                    onClick={() => handleOpenSlide(3)}
                  >
                    <p>See More</p>
                  </div>
                </div>
              </div>
            </div>
            {openSlide && (
              <div className='galery-full'>
                {openSlide && (
                  <div className='turn-off' onClick={() => setOpenSlide(false)}>
                    x
                  </div>
                )}
                <div className='galery-content'>
                  <button
                    className='button-galery'
                    onClick={() =>
                      setSeletedPhoto((prev) =>
                        prev === 0 ? (prev = lastPhoto) : prev - 1
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretLeft}
                      className='button-galery-icon'
                    />
                  </button>
                  <div className='image-box'>
                    <div className={`single-image `}>
                      <img
                        src={data?.photo[seletedPhoto]?.url}
                        alt={data?.title}
                      />
                    </div>

                    <div className='text-slide'>
                      {seletedPhoto + 1}/{lastPhoto + 1}-{data.title}
                    </div>

                    <div className='slide-box'>
                      <div
                        className='slide'
                        style={{
                          transform: `translateX(-${seletedPhoto * 140}px)`,
                        }}
                      >
                        {data?.photo?.map((photo, index) => (
                          <img
                            src={photo?.url}
                            alt={data.title}
                            key={index}
                            className={`image ${
                              index === seletedPhoto ? 'active' : ''
                            }`}
                            onClick={() => setSeletedPhoto(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    className='button-galery'
                    onClick={() =>
                      setSeletedPhoto((prev) =>
                        prev === lastPhoto ? (prev = 0) : prev + 1
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretRight}
                      className='button-galery-icon'
                    />
                  </button>
                </div>
              </div>
            )}

            <div className='desc'>
              <div className='left-desc'>
                <p>{data?.desc}</p>
              </div>
              <div className='right-desc'>
                <div className='reserve'>
                  <h4>Property highlights</h4>
                  <p className='location'>
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    Top location: Highly rated by recent guests {data?.rating}
                  </p>
                  <h4>Breakfast info</h4>
                  <p>Asian, Breakfast to go</p>
                  <a
                    href='#reserve'
                    className='button link'
                    onClick={handleSmoothScroll}
                  >
                    Reserve
                  </a>
                </div>
              </div>
            </div>
            <div className='room' id='reserve'>
              <Room
                id={id}
                setReserve={setReserve}
                setRoomId={setRoomId}
                hotelData={data}
              />
            </div>
            <div className='single-hotel-review'>
              <Reviews hotelId={id} data={data} />
            </div>

            <div className='review'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleHotel;
