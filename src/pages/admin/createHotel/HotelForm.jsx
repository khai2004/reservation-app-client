// HotelForm.jsx
import React, { useEffect, useState } from 'react';
import './hotelForm.scss';
import { useCreateHotelMutation } from '../../../slices/hotelsApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../../component/submitButton/SubmitButton';

const HotelForm = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    type: 'hotel',
    country: '',
    city: '',
    address: '',
    photo: [],
    distance: '',
    rating: 1,
    cheapestPrice: 0,
    featured: '',
    rooms: [],
  });

  let data = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const [createHotel, isLoading] = useCreateHotelMutation();

  const handleFilesChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const cloudName = 'dmhed672d';
      const uploadPreset = 'reservation';

      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          const { url, public_id } = await response.json();
          const data = { url, public_id };
          return data;
        } catch (error) {
          console.error('Error uploading file:', error);
          return null;
        }
      });

      try {
        const urls = await Promise.all(uploadPromises);

        return urls;
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    } else {
      console.error('No files selected for upload.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const upload = await handleUpload();
      data = { ...data, photo: upload };
      const res = await createHotel(data).unwrap();
      toast.success('Create success!🎉');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong. Try again!');
    }
  };

  return (
    <form className='hotel-form' onSubmit={submitHandler}>
      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Title:</label>
        <input
          className='hotel-form__input'
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Description:</label>
        <textarea
          className='hotel-form__input'
          type='text'
          name='desc'
          value={formData.desc}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Type:</label>
        <select
          className='hotel-form__select'
          name='type'
          value={formData.type}
          onChange={handleChange}
        >
          <option value='hotel'>Hotel</option>
          <option value='apartment'>Apartment</option>
          <option value='resort'>Resort</option>
          <option value='villas'>Villas</option>
          <option value='cabins'>Cabins</option>
        </select>
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Country:</label>
        <input
          className='hotel-form__input'
          type='text'
          name='country'
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>City:</label>
        <input
          className='hotel-form__input'
          type='text'
          name='city'
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Address:</label>
        <input
          className='hotel-form__input'
          type='text'
          name='address'
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label' htmlFor='photo'>
          Photo:
        </label>
        <input
          type='file'
          id='photo'
          name='photo'
          accept='image/png, image/jpeg'
          multiple
          onChange={handleFilesChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Distance:</label>
        <input
          className='hotel-form__input'
          type='text'
          name='distance'
          value={formData.distance}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Rating:</label>
        <input
          className='hotel-form__input'
          type='number'
          name='rating'
          value={formData.rating}
          onChange={handleChange}
          min='1'
          max='5'
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Cheapest Price:</label>
        <input
          className='hotel-form__input'
          type='number'
          name='cheapestPrice'
          value={formData.cheapestPrice}
          onChange={handleChange}
        />
      </div>

      <div className='hotel-form__row'>
        <label className='hotel-form__label'>Featured:</label>
        <input
          className='hotel-form__input'
          type='text'
          name='featured'
          value={formData.featured}
          onChange={handleChange}
        />
      </div>

      <SubmitButton text='Create hotel' />
    </form>
  );
};

export default HotelForm;
