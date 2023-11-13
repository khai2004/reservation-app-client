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
  console.log(data);

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
    <div>
      <div className='manage-box'>
        <div className='box'>
          <div className='header'>Hotel</div>
          <div className='list-hotel'>
            {data?.hotels?.map((hotel) => (
              <div className='single-hotel' key={`${hotel._id}-${render}`}>
                <div className='hotel-id'>{hotel._id}</div>
                <div className='hotel-name'>{hotel.title}</div>
                <div className='created'>
                  {new Date(hotel.createdAt).toUTCString()}
                </div>
                <div
                  className='edit'
                  onClick={() => navigate(`/admin/edithotel/${hotel?._id}`)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div
                  className='delete'
                  onClick={() => {
                    handleDeleteHotel(hotel._id);
                  }}
                >
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

export default ManageHotel;
