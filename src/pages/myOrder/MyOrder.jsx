import React from 'react';
import './myOrder.scss';
import {
  useDeleteOrderMutation,
  useGetSingelOrderQuery,
  useUpdateOrderMutation,
} from '../../slices/orderApiSlice';
import { faCircleCheck, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const MyOrder = () => {
  const { id } = useParams();
  const {
    data: order,
    isLoading: orderLoading,
    refetch,
    error: orderError,
  } = useGetSingelOrderQuery(id);
  const navigate = useNavigate();
  const [deleteOrder, { isLoading: deleteOrderLoading }] =
    useDeleteOrderMutation();

  const handleCancle = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteOrder(id).unwrap();
      toast.success('Cancle success!');
      navigate('/profile');
    } catch (error) {
      toast.error(error?.data.message || 'Something went wrong. Try again!');
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  console.log(order);

  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const handleUpdate = async () => {
    const data = { id: id, confirm: !order?.confirm };
    try {
      const res = await updateOrder(data).unwrap();
      toast.success(
        res.isAdmin ? 'Comfirmed success🎉!' : 'Unconfirmed success!'
      );
      refetch();
    } catch (error) {
      toast.error(error?.data || 'Something went wrong. Try again!');
    }
  };
  return (
    <div className='orderplace'>
      <div>
        {userInfo?.isAdmin && (
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            {' '}
            <button className='confirm' onClick={handleUpdate}>
              {order?.confirm ? 'Unconfirm' : 'Confirm'}
            </button>
          </div>
        )}
        <div className='order-box'>
          <div className='order-hotel-info'>
            <div className='order-hotel-list'>
              <h3>{order?.hotel.title}</h3>
              <p className='hotel-title'>{order?.hotel.address}</p>
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
                  {order?.dateNumber?.length}{' '}
                  {order?.dateNumber?.length > 1 ? 'days' : 'day'}
                </h4>
              </div>
              <hr />
              <div className='order-room'>
                <h3>You selected</h3>
                <div className='room-title'>
                  <h4>
                    {order?.roomReserve?.length}{' '}
                    {order?.roomReserve?.length > 1 ? 'rooms' : 'room'}:
                  </h4>
                </div>

                <div className='room-detail'>
                  {order?.roomDetail?.map((room, index) => (
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
                  {order?.roomReserve?.map((number, index) => (
                    <h4 key={index}> {number.roomNumber}</h4>
                  ))}
                </div>

                <div className='room-people'>
                  <p>Total Room Price:</p>
                  <h4>${order?.roomsPrice}</h4>
                </div>
              </div>
            </div>

            <div className='order-hotel-price'>
              <h3>Your price summary</h3>
              <div className='order-total'>
                <h2>Total:</h2>
                <div className='order-total-price'>
                  <h2>${order?.totalPrice}</h2>
                  <p>Includes taxes and charges In property currency: € 110</p>
                </div>
              </div>
              <div className='tax'>
                <h4>Price information</h4>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faMoneyCheck} />
                  </span>
                  Includes ${order?.taxPrice} in taxes and charges 10 % VAT $
                  {order?.taxPrice}
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
                <p style={{ fontSize: '16px' }}>${order?.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className='order-info'>
            <div className='order-user-info'>
              <h2>Here is details of your order</h2>
              <div className='order-name'>
                <div className='order-user-info-title'>Username</div>
                <div className='order-desc'>{order?.user?.username}</div>
              </div>
              <hr />
              <div className='order-name'>
                <div className='order-user-info-title'>Email address</div>
                <div className='order-desc'>{order?.user.email}</div>
              </div>
              <hr />
              <h3>Your address</h3>

              <div className='order-name'>
                <div className='order-user-info-title'> Address</div>
                <div className='order-desc'>{order?.user.address}</div>
              </div>
              <hr />

              <div className='order-name'>
                <div className='order-user-info-title'> Zip/Post Code</div>
                <div className='order-desc'>{order?.user.zip}</div>
              </div>
              <hr />

              <div className='order-name'>
                <div className='order-user-info-title'> Country/region</div>
                <div className='order-desc'>{order?.user.country}</div>
              </div>
              <hr />

              <div className='order-name'>
                <div className='order-user-info-title'>
                  {' '}
                  Telephone (mobile number preferred)
                </div>
                <div className='order-desc'>{order?.user.phone}</div>
              </div>
              <hr />
            </div>
            <div className='order-user-info'>
              <h2>Good to know:</h2>

              <p className='good-to-know'>
                <span>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{ color: 'green' }}
                  />
                </span>
                Stay flexible: You can cancel for free before 17 November 2023,
                so lock in this great price today.
              </p>
            </div>
            <div className='order-user-info'>
              <h2>Your special requests</h2>
              <p>
                Special requests cannot be guaranteed – but the property will do
                its best to meet your needs. You can always make a special
                request after your booking is complete!
              </p>
              <h4>This is your request. (optional)</h4>
              <p>
                {order?.request?.length
                  ? order?.request
                  : 'You did not request anything!'}
              </p>
            </div>
            <div className='order-button-sumit'>
              <div className='order-button-sumit-cancle'>
                If you want to change somthing, feel free to cancle and try to
                reserve new ones.
              </div>
              <button onClick={handleCancle}>Cancle</button>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default MyOrder;
