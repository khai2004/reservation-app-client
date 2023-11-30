import {
  useDeleteHotelMutation,
  useGetHotelsQuery,
} from '../../../slices/hotelsApiSlice';
import './manageHotel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageHotel = () => {
  const [render, setRender] = useState(0);
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetHotelsQuery('');

  const [deleteHotel, { isLoading: loadingDelete }] = useDeleteHotelMutation();

  const handleDeleteHotel = async (id) => {
    try {
      await deleteHotel(id);
      setRender((prev) => prev + 1);
      toast.success('Delete success!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='manage-hotel-box'>
      <div className='list-hotel'>
        <div className='single-hotel-header'>
          <h2 className='hotel-name'>Hotel title</h2>
          <h2 className='created'>Date created</h2>
          <h2 className='hotel-id'>Rooms</h2>
          <h2 className='edit-colum'>
            <span>Edit</span> Delete
          </h2>
        </div>
        {data?.hotels?.map((hotel) => (
          <>
            <hr style={{ height: '3px', width: '100%', marginLeft: '-1px' }} />
            <div className='single-hotel' key={`${hotel._id}-${render}`}>
              <div className='hotel-name'>{hotel.title}</div>

              <div className='created'>
                {new Date(hotel.createdAt).toLocaleString()}
              </div>
              <div className='hotel-id'>
                <p style={{ width: '30%' }}>
                  {hotel.rooms.length}{' '}
                  {hotel.rooms.length > 1 ? 'Rooms' : 'Room'}
                </p>
                <button
                  className='edit-btn'
                  onClick={() => {
                    navigate(`/adminmanagement/roomlist/${hotel._id}`);
                  }}
                >
                  Check rooms
                </button>
              </div>
              <div className='edit-colum'>
                <button
                  className='edit-btn edit-admin-btn'
                  onClick={() =>
                    navigate(`/adminmanagement/hoteledit/${hotel?._id}`)
                  }
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className='edit-btn delete-btn'
                  onClick={() => {
                    handleDeleteHotel(hotel._id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ManageHotel;
