import React from 'react';
import './featuredPopular.scss';
import { useLocation, useNavigate } from 'react-router-dom';
const FeaturedPopular = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const type = urlSearchParams.get('type') || '';
  const rating = urlSearchParams.get('rating') || '';
  const navigate = useNavigate();

  const handleClick = (city) => {
    console.log(city);
    navigate(`/hotels?city=${city}&rating=${rating}&type=${type}`);
  };
  return (
    <div className='featured'>
      <div className='featured__element'>
        <div className='featured__child'>
          <div
            className='featured__child--element'
            onClick={() => handleClick('Ha Noi')}
          >
            <h2>Hanoi</h2>
            <img
              src='https://cf.bstatic.com/xdata/images/city/600x600/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o='
              alt=''
            />
          </div>
          <div
            className='featured__child--element'
            onClick={() => handleClick('Da Lat')}
          >
            <h2>Da Lat</h2>
            <img
              src='https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o='
              alt=''
            />
          </div>
        </div>
        <div className='featured__child1'>
          <div
            className='featured__child--element'
            onClick={() => handleClick('Nha Trang')}
          >
            <h2>Nha Trang</h2>
            <img
              src='https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o='
              alt=''
            />
          </div>
          <div
            className='featured__child--element'
            onClick={() => handleClick('Qui Nhon')}
          >
            <h2>Qui Nhon</h2>
            <img
              src='https://cf.bstatic.com/xdata/images/city/600x600/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o='
              alt=''
            />
          </div>
          <div
            className='featured__child--element'
            onClick={() => handleClick('Da Nang')}
          >
            <h2>Da Nang</h2>
            <img
              src='https://cf.bstatic.com/xdata/images/city/600x600/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o='
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPopular;
