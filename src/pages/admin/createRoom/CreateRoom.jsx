// RoomForm.jsx
import React, { useEffect, useState } from 'react';
import './createRoom.scss';
import { useParams } from 'react-router-dom';
import { useCreateRoomsMutation } from '../../../slices/roomApiSlice';
import { toast } from 'react-toastify';

const CreateRoom = () => {
  const [rooms, setRooms] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    maxPeople: 1,
    desc: '',
    roomNumbers: [],
  });

  const [createRoom, isLoading] = useCreateRoomsMutation();

  const { id } = useParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { hotelid: id, formData: formData };
    try {
      const res = await createRoom(data);
      console.log(res);
      toast.success('Create room success!🎉');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <form className='room-form' onSubmit={handleSubmit}>
      <label htmlFor='title'>Title:</label>
      <input
        type='text'
        id='title'
        name='title'
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor='price'>Price:</label>
      <input
        type='number'
        id='price'
        name='price'
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor='maxPeople'>Max People:</label>
      <input
        type='number'
        id='maxPeople'
        name='maxPeople'
        value={formData.maxPeople}
        onChange={handleChange}
        required
      />

      <label htmlFor='desc'>Description:</label>
      <textarea
        id='desc'
        name='desc'
        value={formData.desc}
        onChange={handleChange}
        required
      ></textarea>

      <div className='room-numbers'>
        <label>Rooms</label>
        <textarea
          onChange={(e) => handleRoomsChange(e)}
          placeholder='give comma between room numbers.'
        />
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateRoom;
