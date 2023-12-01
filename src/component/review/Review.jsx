import React, { useState } from 'react';

import './review.scss';
import {
  faStar,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Review = ({ review }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const handleLike = () => {
    setLike((pre) => !pre);
    setDislike(false);
  };
  const handleDisklike = () => {
    setLike(false);
    setDislike((pre) => !pre);
  };
  return (
    <div className='review'>
      {
        <div className='user'>
          <img
            className='pp'
            src={
              review.image ||
              'https://cdn-icons-png.flaticon.com/128/149/149071.png'
            }
            alt=''
          />
          <div className='info'>
            <span>{review.username}</span>
            <span>{}</span>
          </div>
        </div>
      }
      <div className='stars'>
        {Array(review.rating)
          .fill()
          .map((item, i) => (
            <FontAwesomeIcon icon={faStar} color='#fac815' key={i} />
          ))}
        <span>{review.rating}</span>
      </div>
      <p>{review.comment}</p>
      <div className='helpful'>
        <span>Helpful?</span>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className={like ? 'like' : ''}
          onClick={handleLike}
        />
        <span>Yes</span>
        <FontAwesomeIcon
          icon={faThumbsDown}
          className={dislike ? 'dislike' : ''}
          onClick={handleDisklike}
        />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
