import React, { useState } from 'react';
import './placeOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../../slices/orderApiSlice';
import { faCircleCheck, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUpdateUserMutation } from '../../slices/userApiSlice';
import { setCredential } from '../../slices/authSlice';

const PlaceOrder = () => {
  const order = useSelector((state) => state.room);
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo?.username);
  const [email, setEmail] = useState(userInfo?.email);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [address, setAddress] = useState(userInfo?.address);
  const [zip, setZip] = useState(userInfo?.zip);
  const [country, setCountry] = useState(userInfo?.country);
  const [request, setRequest] = useState('');

  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();

  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const handleSubmitUser = async () => {
    const data = {
      id: userInfo?._id,
      data: {
        username: name,
        email: email,
        phone: phone,
        address: address,
        country: country,
        zip: zip,
      },
    };
    try {
      const res = await updateUser(data).unwrap();
      dispatch(setCredential(res));

      return res;
    } catch (error) {
      toast.error('Update fail!');
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const data = {
      hotel: order.hotelId,
      roomDetail: order.roomDetail,
      roomReserve: order.roomReserve,
      roomsPrice: order.roomsPrice,
      dateNumber: order.dateNumber,
      taxPrice: order.taxPrice,
      totalPrice: order.totalPrice,
      request: request,
    };

    try {
      await handleSubmitUser();
      await createOrder(data).unwrap();
      toast.success('Order success!');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong. Try again!');
    }
  };

  return (
    <form onSubmit={handleOrder} className='orderplace'>
      <div className='order-box'>
        <div className='order-hotel-info'>
          <div className='order-hotel-list'>
            <h3>{order.hotelTitle}</h3>
            <p className='hotel-title'>{order.hotelAddress}</p>
          </div>

          <div className='order-hotel-list'>
            <h3 className='order-hotel-list-title'>Your booking details</h3>
            <div className='order-check-date'>
              <div className='order-checkin'>
                <p>Check-in</p>
                <h4 className='order-date'>
                  {new Date(order?.dateNumber[0]).toLocaleDateString(
                    undefined,
                    {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }
                  )}
                </h4>
              </div>
              <hr />
              <div className='order-checkin'>
                <p>Checkout</p>
                <h4 className='order-date'>
                  {new Date(
                    order?.dateNumber[order?.dateNumber?.length - 1]
                  ).toLocaleDateString(undefined, {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h4>
              </div>
            </div>
            <div className='order-room-total'>
              <p>Total length of stay:</p>
              <h4>
                {order?.dateNumber?.length}
                {order?.dateNumber?.length > 1 ? 'days' : 'day'}
              </h4>
            </div>
            <hr />
            <div className='order-room'>
              <h3>You selected</h3>

              <div className='room-title'>
                <h4>
                  {order.roomReserve.length}{' '}
                  {order.roomReserve.length > 1 ? 'rooms' : 'room'}:
                </h4>
              </div>

              <div className='room-detail'>
                {order.roomDetail.map((room, index) => (
                  <p
                    style={{ fontSize: '14px', fontWeight: '700' }}
                    key={index}
                  >
                    {room.qty} x {room.title}
                  </p>
                ))}
              </div>
              <div className='room-number'>
                <p>Room number: </p>
                {order.roomReserve.map((number, index) => (
                  <h4 key={index}> {number.roomNumber}</h4>
                ))}
              </div>

              <div className='room-people'>
                <p>Total Room Price:</p>
                <h4>${order.roomsPrice}</h4>
              </div>
            </div>
          </div>

          <div className='order-hotel-price'>
            <h3>Your price summary</h3>
            <div className='order-total'>
              <h2>Total:</h2>
              <div className='order-total-price'>
                <p className='total-price'>${order.totalPrice}</p>
                <p>Includes taxes and charges In property currency: € 110</p>
              </div>
            </div>
            <div className='tax'>
              <h4>Price information</h4>
              <p>
                <span>
                  <FontAwesomeIcon icon={faMoneyCheck} />
                </span>
                Includes ${order.taxPrice} in taxes and charges 10 % VAT $
                {order.taxPrice}
              </p>
            </div>
          </div>
          <div className='order-hotel-cancled'>
            <h3>How much will it cost to cancel?</h3>

            <div className='order-hotel-cancled-date'>
              <p style={{ color: 'green' }}>
                Free cancellation before{' '}
                {new Date(order?.dateNumber[0] - 86400000).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}{' '}
                on 17 Nov
              </p>
              <p style={{ fontSize: '16px' }}>${order.totalPrice}</p>
            </div>
          </div>
        </div>
        <div className='order-info'>
          <div className='order-user-info'>
            <h2>Enter your details</h2>
            <div className='order-name'>
              <h5>Username</h5>
              <input
                required
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='order-name'>
              <h5>Email address</h5>
              <input
                required
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <hr />
            <h5>Your address</h5>
            <div className='order-name'>
              <h5>Address</h5>
              <input
                required
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='order-name'>
              <h5>Zip/Post Code</h5>
              <input
                required
                type='number'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className='order-name'>
              <h5>Country/region</h5>
              <input
                required
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className='order-name'>
              <h5>Telephone (mobile number preferred)</h5>
              <input
                required
                type='number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className='order-user-info'>
            <h2>Good to know:</h2>

            <p>
              <span>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ color: 'green' }}
                />
              </span>
              Stay flexible: You can cancel for free before 17 November 2023, so
              lock in this great price today.
            </p>
          </div>
          <div className='order-user-info'>
            <h2>Special requests</h2>
            <p>
              Special requests cannot be guaranteed – but the property will do
              its best to meet your needs. You can always make a special request
              after your booking is complete!
            </p>
            <h4>Please write your requests. (optional)</h4>
            <textarea
              style={{
                maxWidth: '100%',
                minWidth: '100%',
                minHeight: '150px',
                borderRadius: '10px',
              }}
              value={request}
              onChange={(e) => setRequest(e.target.value)}
            />
          </div>
          <div className='order-button-sumit'>
            <button type='submit'>Next: Final details</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
