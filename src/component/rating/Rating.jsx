import React from 'react';

const Rating = ({ hotel }) => {
  return (
    <div style={{ fontSize: '1.6rem' }}>
      {' '}
      {hotel.rating >= 1 && hotel.rating < 2
        ? 'Bad'
        : hotel.rating >= 2 && hotel.rating < 3
        ? 'Not good'
        : hotel.rating >= 3 && hotel.rating < 4
        ? 'Good'
        : hotel.rating >= 4 && hotel.rating < 5
        ? 'Great'
        : hotel.rating === 5
        ? 'Excelent'
        : ''}
    </div>
  );
};

export default Rating;
