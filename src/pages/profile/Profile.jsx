import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import {
  faCalendarDays,
  faChevronRight,
  faCircleInfo,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import './profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import FeaturedPopular from '../../component/featuredPopular/FeaturedPopular';
import FeaturedTypes from '../../component/featuredTypes/FeaturedTypes';
import { useUpdateUserMutation } from '../../slices/userApiSlice';
import { setCredential } from '../../slices/authSlice';

const Profile = () => {
  const focusName = useRef(null);
  const focusEmail = useRef(null);
  const focusPhone = useRef(null);
  const focusAdress = useRef(null);
  const focusZip = useRef(null);
  const focusCountry = useRef(null);
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
  useEffect(() => {
    edit === 'username' && focusName.current.focus();
    edit === 'email' && focusEmail.current.focus();
    edit === 'phone' && focusPhone.current.focus();
    edit === 'address' && focusAdress.current.focus();
    edit === 'zip' && focusZip.current.focus();
    edit === 'country' && focusCountry.current.focus();
  }, [edit]);
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
          </div>
        </div>

        <div className='profile-header'>
          <div className='profile-nav' onClick={() => setSelect('account')}>
            <h5>Account</h5>
            {select === 'account' && <div className='check'></div>}
          </div>
          <hr style={{ height: '40px' }} />
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
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={edit !== 'username'}
                        ref={focusName}
                        required
                      />
                    </div>
                    <p>
                      This name is what we call you when we make conversation.
                    </p>
                  </div>
                  <div className='profile-edit'>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='edit-icon'
                      onClick={() => handleEdit('username')}
                    />
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
                        required
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={edit !== 'email'}
                        ref={focusEmail}
                      />
                    </div>
                    <p>
                      This is the email address you use to sign in. It’s also
                      where we send your booking confirmations.
                    </p>
                  </div>
                  <div className='profile-edit'>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='edit-icon'
                      onClick={() => handleEdit('email')}
                    />
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
                        required
                        type='number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={edit !== 'phone'}
                        ref={focusPhone}
                      />
                    </div>
                    <p>
                      Add your phone number Properties or attractions you book
                      will use this number if they need to contact you.
                    </p>
                  </div>
                  <div className='profile-edit'>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='edit-icon'
                      onClick={() => handleEdit('phone')}
                    />
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
                        type='text'
                        value={address}
                        placeholder='Enter your address'
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={edit !== 'address'}
                        ref={focusAdress}
                      />
                    </div>
                    <p>Add your address</p>
                  </div>
                  <div className='profile-edit'>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='edit-icon'
                      onClick={() => handleEdit('address')}
                    />
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
                        type='text'
                        value={zip}
                        placeholder='Enter your zip/post'
                        onChange={(e) => setZip(e.target.value)}
                        disabled={edit !== 'zip'}
                        ref={focusZip}
                      />
                    </div>
                    <p>Add your Zip/Post code</p>
                  </div>
                  <div className='profile-edit'>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='edit-icon'
                      onClick={() => handleEdit('zip')}
                    />
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
                        type='text'
                        value={country}
                        placeholder='Enter your Country'
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={edit !== 'country'}
                        ref={focusCountry}
                      />
                    </div>
                    <p>Add your country</p>
                  </div>
                  <div className='profile-edit'>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='edit-icon'
                      onClick={() => handleEdit('country')}
                    />
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

                    <div
                      className={`check-detail-confirm  ${
                        order.confirm
                          ? 'check-detail-confirm-confirm'
                          : 'check-detail-confirm-uncomfirmed'
                      }`}
                    >
                      {order.confirm ? 'Comfirmed' : 'Unconfirmed'}
                    </div>
                    <Link to={`/myorder/${order._id}`} className='link'>
                      <button className='check-detail'>
                        <FontAwesomeIcon icon={faCircleInfo} className='next' />
                        Detail
                      </button>
                    </Link>
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
