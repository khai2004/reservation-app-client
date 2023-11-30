import './sideBar.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetRatingHotelQuery } from '../../slices/hotelsApiSlice';
const SideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (rating) => {
    Number(searchParams.get('rating')) === rating
      ? searchParams.set('rating', '')
      : searchParams.set('rating', rating);
    setSearchParams(searchParams);
  };
  const handleTypeCheckboxChange = (type) => {
    searchParams.get('type') === type
      ? searchParams.set('type', '')
      : searchParams.set('type', type);
    setSearchParams(searchParams);
  };
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const city = urlSearchParams.get('city') || '';

  const {
    data: ratings,
    isLoading,
    error,
    refetch,
  } = useGetRatingHotelQuery(city);

  const type = Object.keys(ratings?.typeNumber || {});

  return (
    <div className='sidebar-box'>
      <h3>Filter by:</h3>

      <div className='sidebar-element'>
        <div>
          <h4> Property rating </h4>
          <p> Includes stars and other ratings</p>
        </div>

        {isLoading ? (
          'Is Loading'
        ) : (
          <div className='checkbox'>
            {Array.from({ length: 5 }, (_, index) => (
              <div className='checkbox-item' key={index + 1}>
                <div className='check'>
                  <input
                    type='checkbox'
                    checked={index + 1 === Number(searchParams.get('rating'))}
                    onChange={() => handleCheckboxChange(index + 1)}
                  />
                  <span>{index + 1} star</span>
                </div>
                <p>{Object.values(ratings?.ratingNumber || {})[index]}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {false ? (
        'Loading'
      ) : (
        <div className='sidebar-element'>
          <h4> Property Type </h4>
          <div className='checkbox'>
            {type?.map((type, index) => (
              <div className='checkbox-item' key={index}>
                <div className='check'>
                  <input
                    type='checkbox'
                    checked={type === searchParams.get('type')}
                    onChange={() => handleTypeCheckboxChange(type)}
                  />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
                <p>{Object.values(ratings?.typeNumber || {})[index]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
