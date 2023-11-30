import React, { useState } from 'react';
import './room.scss';
import { useGetHotelsRoomsQuery } from '../../slices/hotelsApiSlice';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchRoom from '../searchRoom/SearchRoom';
import { useDispatch, useSelector } from 'react-redux';
import { setReserveOrder } from '../../slices/ReserveSlice';
import { useGetRoomQuery } from '../../slices/roomApiSlice';
import { useNavigate } from 'react-router-dom';
const Room = ({ id, hotelData }) => {
  const [roomUpdate, setRoomUpdate] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetHotelsRoomsQuery(id);

  // console.log(roomUpdate);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dateNumber, maxPeople } = useSelector((state) => state.room);
  const checkUnavailableRoom = (roomNumber) => {
    const isFound = roomNumber.unavailableDates?.some((date) =>
      dateNumber?.includes(date)
    );
    return !isFound;
  };

  const handleSelectRoom1 = (
    id,
    numberSelect,
    roomIdCheck,
    title,
    maxPeople,
    price
  ) => {
    setRoomUpdate((prev) => {
      const existingRoom = prev.find((room) => room.roomId === roomIdCheck);

      if (!existingRoom) {
        return [
          ...prev,
          {
            roomId: roomIdCheck,
            title: title,
            maxPeople: maxPeople,
            price: price,
            roomData: [{ numberId: id, roomNumber: numberSelect }],
          },
        ];
      } else {
        const existingRoomData = existingRoom.roomData.find(
          (room) => room.numberId === id
        );

        if (!existingRoomData) {
          return prev.map((room) =>
            room.roomId === roomIdCheck
              ? {
                  ...room,
                  roomData: [
                    ...room.roomData,
                    { numberId: id, roomNumber: numberSelect },
                  ],
                }
              : room
          );
        } else {
          const updatedRoomData = existingRoom.roomData.filter(
            (room) => room.numberId !== id
          );
          return prev.map((room) =>
            room.roomId === roomIdCheck
              ? { ...room, roomData: updatedRoomData }
              : room
          );
        }
      }
    });
    setRoomUpdate((prev) =>
      prev
        .filter((room) => room.roomData.length > 0)
        .map((room) => ({
          ...room,
          qty: room.roomData.length,
        }))
    );
  };

  const handleOrderData = (e) => {
    e.preventDefault();
    const roomReserve = roomUpdate.reduce(
      (accumulator, currentRoom) => [...accumulator, ...currentRoom.roomData],
      []
    );

    const roomDetail = roomUpdate.map((room) => ({
      roomId: room.roomId,
      title: room.title,
      maxPeople: room.maxPeople,
      price: room.price,
      qty: room.qty,
    }));
    const hotelTitle = hotelData?.title;
    const hotelAddress = hotelData?.address;
    console.log(roomReserve.length);
    if (dateNumber.length === 0 || roomReserve.length === 0) {
      alert(
        'To see available rooms and prices please enter your check-in and check-out dates.'
      );
      console.log(roomReserve);
    } else {
      dispatch(
        setReserveOrder({
          hotelId: id,
          hotelTitle: hotelTitle,
          roomDetail: roomDetail,
          roomReserve: roomReserve,
          dateNumber: dateNumber,
          hotelAddress: hotelAddress,
        })
      );
      navigate('/placeorder');
    }
  };

  return (
    <>
      {!isLoading && (
        <div>
          <div className='search-room-component'>
            <SearchRoom />
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Accomadation type</th>
                <th style={{ width: '20%' }}>Number of guests</th>
                <th style={{ width: '10%' }}>Price</th>
                <th style={{ width: '35%' }}>List rooms</th>
                <th style={{ width: '15%' }}>Checking</th>
              </tr>
            </thead>
            <tbody>
              {data?.filter((room) => room.maxPeople >= maxPeople).length > 0 &&
                data
                  ?.filter((room) => room.maxPeople >= maxPeople)
                  .map((item, index) => (
                    <tr key={item._id}>
                      <td style={{ width: '20%' }}>
                        <div className='title-table'>
                          <h3>{item.title}</h3>
                          <p>{item.desc}</p>
                        </div>
                      </td>
                      <td style={{ width: '20%' }}>
                        <div className='number-guest-table'>
                          <div>
                            {Array.from(
                              { length: item.maxPeople },
                              (_, index) => (
                                <FontAwesomeIcon icon={faUser} />
                              )
                            )}
                          </div>
                          <h3>x{item.maxPeople}</h3>
                        </div>
                      </td>
                      <td style={{ width: '10%' }}>
                        <h3 className='price-table'>${item.price}</h3>
                      </td>

                      <td style={{ width: '35%' }}>
                        <div className='body-reserve'>
                          <div className='choose-room'>
                            {item?.roomNumbers?.map((roomdata) => (
                              <div className='check-room' key={roomdata._id}>
                                <input
                                  type='checkbox'
                                  disabled={!checkUnavailableRoom(roomdata)}
                                  onClick={() =>
                                    handleSelectRoom1(
                                      roomdata._id,
                                      roomdata.number,
                                      item._id,
                                      item.title,
                                      item.maxPeople,
                                      item.price
                                    )
                                  }
                                />
                                <p>{roomdata.number}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td
                        style={{
                          width: '15%',
                          border: 'none',
                        }}
                      >
                        {index === 0 && (
                          <button
                            className='checking-table'
                            onClick={handleOrderData}
                          >
                            Reserve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {data?.filter((room) => room.maxPeople >= maxPeople).length === 0 && (
            <h3 className='fail-to-check'>
              There is no room that meet your requirement😢!Please, you cound
              check 2 room or come to check later!
            </h3>
          )}
        </div>
      )}
    </>
  );
};

export default Room;
