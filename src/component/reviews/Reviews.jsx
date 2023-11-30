import React, { useState } from 'react';
import Review from '../review/Review';
import './reviews.scss';
import { useCreateReviewMutation } from '../../slices/hotelsApiSlice';
import { toast } from 'react-toastify';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '../submitButton/SubmitButton';
const Reviews = ({ hotelId, data }) => {
  const [createReview, isLoadingClick] = useCreateReviewMutation();
  const [ratingClick, setRating] = useState(0);
  const [hover, setHover] = useState();
  const [reviewSlide, setReviewSlide] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target[0].value;
    const rating = ratingClick + 1;

    try {
      await createReview({ hotelId, comment, rating }).unwrap();
      toast.success('Create review success!🎉');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Something went wrong. Try again!');
    }
  };

  return (
    <div className='reviews'>
      <h2>Reviews: {data.reviews.length}</h2>
      <div className='review-slide'>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className='left-review slide-review'
          onClick={() => setReviewSlide((pre) => (pre > 0 ? pre - 1 : 0))}
        />
        <div className='guest-review'>
          {data.reviews.slice(reviewSlide, reviewSlide + 3).map((review) => (
            <div className='single-review '>
              <Review key={review._id} review={review} />
            </div>
          ))}
        </div>
        <FontAwesomeIcon
          icon={faChevronRight}
          className='right-review slide-review'
          onClick={() =>
            setReviewSlide((pre) =>
              data.reviews.length > pre + 1 ? pre + 1 : pre
            )
          }
        />
      </div>

      <div className='add'>
        <h3>Add a review</h3>
        <form action='' className='addForm' onSubmit={handleSubmit}>
          <div className='rating'>
            {Array.from({ length: 5 }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`rating-start ${
                  index <= hover || index <= ratingClick ? 'rating-hover' : ''
                } `}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover()}
              />
            ))}
          </div>
          <input
            type='text'
            maxLength={200}
            placeholder='write your opinion (max length: 200)'
            required
          />

          <div className='submit-review'>
            <SubmitButton text='Submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
