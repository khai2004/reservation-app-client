import React, { useEffect, useState } from 'react';
import './listRoom.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from '../../../slices/roomApiSlice';
import { toast } from 'react-toastify';
const ListRoom = () => {
  const [render, setRender] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetRoomsQuery(id);
  const [deleteRoom, { isLoading: loadingDelte }] = useDeleteRoomMutation();

  const handleDelete = async (roomId) => {
    const dataDelete = { hotelid: id, roomId: roomId };
    try {
      await deleteRoom(dataDelete);
      setRender((pre) => !pre);
      toast.success('Delete success!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {' '}
      <div className='manage-box'>
        <div className='box'>
          <div className='header'>Hotel</div>
          <div>
            <button
              onClick={() => {
                navigate(`/admin/createroom/${id}`);
              }}
            >
              Create room
            </button>
          </div>
          <div className='list-hotel'>
            {data?.map((room) => (
              <div className='single-hotel' key={room._id}>
                <div className='hotel-id'>{room._id}</div>
                <div className='hotel-name'>{room.title}</div>
                <div className='created'>
                  {new Date(room.createdAt).toUTCString()}
                </div>
                <div
                  className='edit'
                  onClick={() => navigate(`/admin/editroom/${room?._id}`)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div className='delete' onClick={() => handleDelete(room._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
