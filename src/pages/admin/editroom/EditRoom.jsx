// RoomForm.jsx
import React, { useEffect, useState } from 'react';
import './editRoom.scss';
import { useParams } from 'react-router-dom';
import {
  useCreateRoomsMutation,
  useGetRoomQuery,
  useUpdateRoomMutation,
} from '../../../slices/roomApiSlice';
import { toast } from 'react-toastify';

const EditRoom = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    maxPeople: 1,
    desc: '',
    roomNumbers: [],
  });

  const { id } = useParams();

  const {
    data: roomData,
    isLoading: roomDataLoading,
    error: roomDataError,
  } = useGetRoomQuery(id);

  useEffect(() => {
    if (roomData) {
      const { _id, ...room } = roomData;
      setFormData(room);
    }
  }, [roomData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoomsChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      roomNumbers: e.target.value
        .split(',')
        .map((room) => ({ number: room.trim(), unavailableDates: '' })),
    }));
  };

  const [updateRoom, { isLoading: loadingUpdateRoom }] =
    useUpdateRoomMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataUpdate = { id: id, formData: formData };
    try {
      const res = await updateRoom(dataUpdate);
      console.log(res);
      toast.success('Create room success!🎉');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <form className='room-form-edit' onSubmit={handleSubmit}>
      <div className='room-form__row-edit'>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className='room-form__row-edit'>
        <label htmlFor='price'>Price:</label>
        <input
          type='number'
          id='price'
          name='price'
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className='room-form__row-edit'>
        <label htmlFor='maxPeople'>Max People:</label>
        <input
          type='number'
          id='maxPeople'
          name='maxPeople'
          value={formData.maxPeople}
          onChange={handleChange}
          required
        />
      </div>
      <div className='room-form__row-edit'>
        <label htmlFor='desc'>Description:</label>
        <textarea
          id='desc'
          name='desc'
          value={formData.desc}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className='room-form__row-edit'>
        <div className='room-numbers'>
          <label>Rooms</label>
          <textarea
            value={formData.roomNumbers.map((room) => room.number)}
            onChange={(e) => handleRoomsChange(e)}
            placeholder='give comma between room numbers.'
          />
        </div>
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default EditRoom;
