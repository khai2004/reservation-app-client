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
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingelQuery } from '../../slices/hotelsApiSlice';
import { useSelector } from 'react-redux';
import Reserve from '../../component/reserve/Reserve';
import Room from '../../component/room/Room';
import Loader from '../../component/loader/Loader';
import {
  useGetRoomQuery,
  useUpdateRoomAvailabilityMutation,
} from '../../slices/roomApiSlice';
import { DateRange } from 'react-date-range';

const SingleHotel = () => {
  const [seletedPhoto, setSeletedPhoto] = useState(0);
  const [openSlide, setOpenSlide] = useState(false);
  const [reserve, setReserve] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [roomUpdate, setRoomUpdate] = useState([]);
  const [dateClick, setDateClick] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingelQuery(id);
  const {
    data: roomData,
    isLoading: roomLoading,
    error: roomError,
  } = useGetRoomQuery(roomId);

  const { userInfo } = useSelector((state) => state.auth);
  const handleReserve = () => {
    if (!userInfo) {
      navigate('/login');
    }
  };
  const lastPhoto = data?.photo.length - 1;

  const handleOpenSlide = (picture) => {
    setOpenSlide(true);
    setSeletedPhoto(picture);
  };

  const handleSelectRoom = (id) => {
    roomUpdate.includes(id)
      ? setRoomUpdate((prev) => prev.filter((room) => room !== id))
      : setRoomUpdate((prev) => [...prev, id]);
  };

  const getAllDate = (startDate, endDate) => {
    const end = new Date(endDate);
    const date = new Date(startDate.getTime());
    const dateInRange = [];
    while (date.getDay() <= end.getDay()) {
      dateInRange.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dateInRange;
  };
  const allDateReservation = getAllDate(state[0]?.startDate, state[0]?.endDate);

  const checkUnavailableRoom = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDateReservation.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  //UPDATE ROOM RESERVATION
  const [updateRoomAvailability, { isLoading: upDateLoading }] =
    useUpdateRoomAvailabilityMutation();

  const handleReserveRoom = async () => {
    try {
      await Promise.all(
        roomUpdate.map((select) => {
          const updateRoomAvailabilityData = {
            allDateReservation: allDateReservation,
            id: select,
          };
          const res = updateRoomAvailability(updateRoomAvailabilityData);
          console.log(res.data);
          return res.data;
        })
      );
    } catch (error) {
      toast.error('Something went wrong, try again!');
    }
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
              <button className='right-title'>
                Reserve your apartment stay
              </button>
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
                    className='button'
                    onClick={() =>
                      setSeletedPhoto((prev) =>
                        prev === 0 ? (prev = lastPhoto) : prev - 1
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faCaretLeft} />
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
                          marginLeft: '700px',

                          transform: `translateX(-${seletedPhoto * 70}px)`,
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
                    className='button'
                    onClick={() =>
                      setSeletedPhoto((prev) =>
                        prev === lastPhoto ? (prev = 0) : prev + 1
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faCaretRight} />
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
                    onClick={handleReserve}
                  >
                    Reserve
                  </a>
                  <div className='favorate'>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />
                    </span>
                    Save the property
                  </div>
                </div>
              </div>
            </div>
            <div className='room' id='reserve'>
              <Room id={id} setReserve={setReserve} setRoomId={setRoomId} />
            </div>

            {reserve && (
              <div className='room-reserve'>
                <div className='room-reserve-box'>
                  <div className='turn-off'>
                    <p onClick={() => setReserve((prev) => (prev = false))}>
                      &#10006;{' '}
                    </p>
                  </div>
                  <button
                    className='date-pick'
                    onClick={() => setDateClick((pre) => !pre)}
                  >
                    {dateClick ? 'Close date' : ' Choose date'}
                  </button>
                  {dateClick && (
                    <div className='room-date'>
                      <div className='calendar'>
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setState([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                        />
                      </div>
                    </div>
                  )}
                  <h3>Total Rooms: {roomData?.roomNumbers?.length}</h3>
                  <h4>Title: {roomData?.title}</h4>
                  <p>{roomData?.desc}</p>

                  <div className='header-reserve'>
                    <div className='note'>
                      <div className='available-room'>
                        <p>Avalaible room</p>
                        <div className='note-box-uncheck '></div>
                      </div>
                      <div className='available-room'>
                        <p> Unavailable room</p>

                        <input
                          type='checkbox'
                          disabled={true}
                          className='note-box'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='body-reserve'>
                    <div className='choose-room'>
                      {roomData?.roomNumbers?.map((data) => (
                        <div className='check-room' key={data?._id}>
                          <p>{data.number}</p>
                          <input
                            type='checkbox'
                            onClick={() => handleSelectRoom(data?._id)}
                            disabled={!checkUnavailableRoom(data)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleReserveRoom}>Reserve</button>
                </div>
              </div>
            )}
            <div className='review'></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleHotel;
