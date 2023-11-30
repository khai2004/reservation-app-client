// Pagination.js
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './paganation.scss';
const Pagination = ({ count }) => {
  const PAGE_SIZE = 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className='pagination'>
      <p className='pagination-text'>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </p>

      <div className='pagination-buttons'>
        <button
          className='pagination-button'
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <span>Previous</span>
        </button>

        <button
          className='pagination-button'
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
