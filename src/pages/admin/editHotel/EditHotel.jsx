// HotelForm.jsx
import React, { useEffect, useRef, useState } from 'react';
import './editHotel.scss';
import {
  useGetHotelsQuery,
  useGetSingelQuery,
  useUpdateHotelMutation,
} from '../../../slices/hotelsApiSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditHotel = () => {
  const [files, setFiles] = useState([]);
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

  const navigate = useNavigate();
  const { id } = useParams();

  const [updateHotel, { isLoading: hotelUpdateLoding }] =
    useUpdateHotelMutation();
  const { data: hotelData, isLoading, error } = useGetSingelQuery(id);

  useEffect(() => {
    if (hotelData) {
      const { _id, ...data1 } = hotelData;

      setFormData(data1);
    }
  }, [hotelData]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

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
      let { photo: tempPhoto, ...tempData } = hotelData;
      let temp = tempPhoto;
      try {
        const upload = await handleUpload();
        if (upload.length > 0) {
          temp = tempPhoto.concat(upload);
        }
      } catch (error) {
        console.log(error);
      }
      data.photo = temp;
      let updateData = { data, id };
      console.log(updateData);
      await updateHotel(updateData);

      // navigate('/admin/managehotel');
      toast.success('Create success!🎉');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Update fail!');
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
        <input
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

      <div className='hotel-form__row'>
        <button
          onClick={() => {
            navigate(`/admin/listroom/${id}`);
          }}
        >
          View rooms list and modify
        </button>
      </div>

      <button className='hotel-form__submit-btn' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default EditHotel;
