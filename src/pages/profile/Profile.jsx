import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import {
  faCalendarDays,
  faChevronRight,
  faCircleInfo,
  faPenToSquare,
  faSuitcase,
} from '@fortawesome/free-solid-svg-icons';
import './profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import FeaturedPopular from '../../component/featuredPopular/FeaturedPopular';
import FeaturedTypes from '../../component/featuredTypes/FeaturedTypes';
import { useUpdateUserMutation } from '../../slices/userApiSlice';
import { setCredential } from '../../slices/authSlice';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo?.username);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [address, setAddress] = useState(userInfo?.address);
  const [zip, setZip] = useState(userInfo?.zip);
  const [country, setCountry] = useState(userInfo?.ountry);
  const [select, setSelect] = useState('account');
  const [edit, setEdit] = useState('');

  const handleEdit = (change) => {
    setEdit(change);
  };

  const { data, isLoading, error } = useGetOrdersQuery();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e, field, value) => {
    e.preventDefault();
    const data = {
      id: userInfo?._id,
      data: {
        [field]: value,
      },
    };
    try {
      const res = await updateUser(data).unwrap();
      dispatch(setCredential(res));
      toast.success('Update success!');
    } catch (error) {
      toast.error('Update fail!');
    }
  };
  console.log(data);
  const navigate = useNavigate();
  return (
    <div className='profile-box'>
      <div className='profile'>
        <div className='profile-bia'>
          <div className='profile__info'>
            <img
              className='profile__image'
              src={
                userInfo?.image?.url ||
                'https://cdn-icons-png.flaticon.com/128/149/149071.png'
              }
              alt={userInfo?.username}
            />
            <h2 className='profile__username'>{userInfo?.username}</h2>
            <p className='profile__email'>{userInfo?.email}</p>
            {userInfo.isAdmin && (
              <div
                className='admin-nav-element'
                onClick={() => navigate('/adminmanagement')}
              >
                <FontAwesomeIcon icon={faSuitcase} />
                <p>Admin management</p>
              </div>
            )}
          </div>
        </div>

        <div className='profile-header'>
          <div className='profile-nav' onClick={() => setSelect('account')}>
            <h5>Account</h5>
            {select === 'account' && <div className='check'></div>}
          </div>
          <hr />
          <div className='profile-nav' onClick={() => setSelect('history')}>
            <h5>History</h5>
            {select === 'history' && <div className='check'></div>}
          </div>
        </div>

        <div className='about'>
          {select === 'account' && <h1>Account</h1>}
          {select === 'history' && <h1>Booking</h1>}
          {select === 'pay' && <h1>Payment</h1>}
        </div>

        <div className='profil-body'>
          {select === 'account' && (
            <div>
              <div className='profile-info'>
                <form
                  onSubmit={(e) => handleSubmit(e, edit, name)}
                  className='profile-name'
                >
                  <div className='profile-text'>
                    <div className='profile-text-field'>
                      <p className='text-child'>Name</p>
                      <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={edit !== 'username'}
                        required
                      />
                    </div>
                    <p>
                      This name is what we call you when we make conversation.
                    </p>
                  </div>
                  <div className='profile-edit'>
                    <label htmlFor='name'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='edit-icon'
                        onClick={() => handleEdit('username')}
                      />
                    </label>

                    <button type='submit'>Change</button>
                  </div>
                </form>
                <form
                  className='profile-name'
                  onSubmit={(e) => handleSubmit(e, edit, email)}
                >
                  <div className='profile-text'>
                    <div className='profile-text-field'>
                      <p className='text-child'>Email</p>
                      <input
                        id='email'
                        required
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={edit !== 'email'}
                      />
                    </div>
                    <p>
                      This is the email address you use to sign in. It’s also
                      where we send your booking confirmations.
                    </p>
                  </div>
                  <div className='profile-edit'>
                    <label htmlFor='email'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='edit-icon'
                        onClick={() => handleEdit('email')}
                      />
                    </label>
                    <button type='submit'>Change</button>
                  </div>
                </form>
                <form
                  className='profile-name'
                  onSubmit={(e) => handleSubmit(e, edit, phone)}
                >
                  <div className='profile-text'>
                    <div className='profile-text-field'>
                      <p className='text-child'>Phone number</p>
                      <input
                        id='phone'
                        required
                        type='number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={edit !== 'phone'}
                      />
                    </div>
                    <p>
                      Add your phone number Properties or attractions you book
                      will use this number if they need to contact you.
                    </p>
                  </div>
                  <div className='profile-edit'>
                    <label htmlFor='phone'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='edit-icon'
                        onClick={() => handleEdit('phone')}
                      />
                    </label>
                    <button type='submit'>Change</button>
                  </div>
                </form>
                <form
                  className='profile-name'
                  onSubmit={(e) => handleSubmit(e, edit, address)}
                >
                  <div className='profile-text'>
                    <div className='profile-text-field'>
                      <p className='text-child'>Address</p>
                      <input
                        id='address'
                        type='text'
                        value={address}
                        placeholder='Enter your address'
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={edit !== 'address'}
                      />
                    </div>
                    <p>Add your address</p>
                  </div>
                  <div className='profile-edit'>
                    <label htmlFor='address'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='edit-icon'
                        onClick={() => handleEdit('address')}
                      />
                    </label>
                    <button type='submit'>Change</button>
                  </div>
                </form>
                <form
                  className='profile-name'
                  onSubmit={(e) => handleSubmit(e, edit, zip)}
                >
                  <div className='profile-text'>
                    <div className='profile-text-field'>
                      <p className='text-child'>Zip</p>
                      <input
                        id='zip'
                        type='text'
                        value={zip}
                        placeholder='Enter your zip/post'
                        onChange={(e) => setZip(e.target.value)}
                        disabled={edit !== 'zip'}
                      />
                    </div>
                    <p>Add your Zip/Post code</p>
                  </div>
                  <div className='profile-edit'>
                    <label htmlFor='zip'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='edit-icon'
                        onClick={() => handleEdit('zip')}
                      />
                    </label>
                    <button type='submit'>Change</button>
                  </div>
                </form>
                <form
                  className='profile-name'
                  onSubmit={(e) => handleSubmit(e, edit, country)}
                >
                  <div className='profile-text'>
                    <div className='profile-text-field'>
                      <p className='text-child'>Country</p>
                      <input
                        id='country'
                        type='text'
                        value={country}
                        placeholder='Enter your Country'
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={edit !== 'country'}
                      />
                    </div>
                    <p>Add your country</p>
                  </div>
                  <div className='profile-edit'>
                    <label htmlFor='country'>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='edit-icon'
                        onClick={() => handleEdit('country')}
                      />
                    </label>
                    <button type='submit'>Change</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {select === 'history' && (
            <div className='header-history'>
              {data?.length === 0 ? (
                <div className='no-booking'>
                  <h2>
                    There is no booking! Let find hotel that meet your
                    requirement
                  </h2>
                  <FeaturedTypes />
                </div>
              ) : (
                data?.map((order) => (
                  <div className='order-list'>
                    <div className='order-element'>
                      <img src={order?.hotel?.photo[0]?.url} alt='' />
                    </div>
                    <div className='hotel-title'>
                      <p>Hotel title</p>
                      <h5>{order?.hotel?.title}</h5>
                    </div>
                    <div className='check-date'>
                      <div className='check-in'>
                        <p>
                          <span>
                            <FontAwesomeIcon icon={faCalendarDays} />
                          </span>
                          Check-in
                        </p>
                        <h5>
                          {new Date(order?.dateNumber[0])?.toLocaleDateString(
                            undefined,
                            {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </h5>
                      </div>

                      <div className='check-in'>
                        <p>
                          <span>
                            <FontAwesomeIcon icon={faCalendarDays} />
                          </span>
                          Check Out
                        </p>
                        <h5>
                          {new Date(
                            order?.dateNumber[data.length - 1]
                          )?.toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            year: 'numeric',
                            day: 'numeric',
                          })}
                        </h5>
                      </div>
                    </div>
                    <div className='check-room'>
                      <div className='room-no'>
                        <p>
                          Room: <span>{order?.roomReserve.length}</span>
                        </p>
                      </div>
                      <div className='room-no'>
                        <p>Room No.</p>
                        <div className='list-room-no'>
                          {order?.roomReserve.map((rom) => (
                            <h5>{rom.roomNumber}</h5>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='order-detail-his'>
                      <div
                        className={`check-detail-confirm  ${
                          order.confirm
                            ? 'check-detail-confirm-confirm'
                            : 'check-detail-confirm-uncomfirmed'
                        }`}
                      >
                        {order.confirm ? 'Comfirmed' : 'Unconfirmed'}
                      </div>
                      <button className='check-detail'>
                        <Link to={`/myorder/${order._id}`} className='link'>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className='next'
                          />
                          Detail
                        </Link>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
