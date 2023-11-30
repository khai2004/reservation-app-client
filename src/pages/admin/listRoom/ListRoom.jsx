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
import SubmitButton from '../../../component/submitButton/SubmitButton';
const ListRoom = () => {
  const [render, setRender] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetRoomsQuery(id);
  console.log(data);
  const [deleteRoom, { isLoading: loadingDelte }] = useDeleteRoomMutation();

  const handleDelete = async (roomId) => {
    const dataDelete = { hotelid: id, roomId: roomId };
    try {
      await deleteRoom(dataDelete).unwrap();
      setRender((pre) => !pre);
      toast.success('Delete success!');
    } catch (error) {
      toast.error(error?.data?.message || 'Somethign went wrong. Try again!');
    }
  };
  console.log(id);

  return (
    <div>
      <div className='manage-room-box'>
        <div className='admin-list-room'>
          <div
            className='admin-create-room'
            onClick={() => {
              navigate(`/adminmanagement/roomcreate/${id}`);
            }}
          >
            <SubmitButton text='Create room +' />
          </div>
          <div className='single-room-header'>
            <h2
              className='room-id
'
            >
              Room ID
            </h2>
            <h2
              className='room-name
'
            >
              Room title
            </h2>
            <h2 className='room-admin-price'>Room price</h2>
            <h2 className='room-created-at'>Date created</h2>
            <h2 className='edit-colum-room'> </h2>
          </div>

          {data?.map((room) => (
            <>
              <hr
                style={{ height: '3px', width: '100%', marginLeft: '-1px' }}
              />
              <div className='single-room' key={room._id}>
                <div className='room-id'>{room._id}</div>
                <div className='room-name'>{room.title}</div>
                <div className='room-admin-price'>${room.price}</div>
                <div className='room-created-at'>
                  {new Date(room.createdAt).toLocaleString()}
                </div>

                <div className='edit-colum-room'>
                  <button
                    className='edit-btn'
                    onClick={() => navigate(`/admin/editroom/${room?._id}`)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className='edit-btn delete-btn'
                    onClick={() => handleDelete(room._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListRoom;
