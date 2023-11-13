import React from 'react';
import './pageNotFound.scss';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className='not-found'>
      <div className='not-found-content'>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to='/' className='link'>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
