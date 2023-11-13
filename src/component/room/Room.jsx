import React from 'react';
import './room.scss';
import { useGetHotelsRoomsQuery } from '../../slices/hotelsApiSlice';
const Room = ({ id, setReserve, setRoomId }) => {
  const { data, isLoading, error } = useGetHotelsRoomsQuery(id);

  const handleReserveRoom = (id) => {
    setReserve((prev) => (prev = true));
    setRoomId(id);
  };

  return (
    <>
      {!isLoading && (
        <table className='roomTable'>
          <thead className='element'>
            <tr>
              <th>Title</th>
              <th>Describes</th>
              <th>Number of guests</th>
              <th>Price</th>
              <th>Checking</th>
            </tr>
          </thead>
          <tbody className='element'>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td>{item.maxPeople}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => handleReserveRoom(item._id)}>
                    Reserve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Room;
