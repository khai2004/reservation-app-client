import React, { useState } from 'react';

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './orderList.scss';
import { toast } from 'react-toastify';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from '../../../slices/orderApiSlice';
const OrderList = () => {
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: deleteOrderLoading }] =
    useDeleteOrderMutation();
  const { data, isLoading, error } = useGetAllOrdersQuery();
  const handleUpdate = async (e, confirm, id) => {
    e.preventDefault();
    const data = { id: id, confirm: !confirm };
    try {
      const res = await updateOrder(data).unwrap();
      console.log(res);
    } catch (error) {
      toast.error('Something went wrong. Try again!');
    }
  };
  const handleDeleteOrder = async (e, id) => {
    e.preventDefault();
    try {
      await deleteOrder(id);
      toast.success('Delete success 🎉!');
    } catch (error) {
      toast.error('Something went wrong.Try again!');
    }
  };
  return (
    <div>
      <div className='manage-order-box'>
        <div className='admin-list-order'>
          <div className='single-order-header'>
            <h2 className='order-hotel'>Hotel</h2>
            <h2 className='order-room'>Room</h2>
            <h2 className='order-name'>User</h2>
            <h2 className='order-created-at'>Dates</h2>
            <h2 className='order-status'>Status</h2>
            <h2 className='order-amount'>Amount</h2>
            <h2 className='edit-colum-order'> </h2>
          </div>

          {data?.map((order) => (
            <>
              <hr
                style={{ height: '3px', width: '100%', marginLeft: '-1px' }}
              />
              <div className='single-order' key={order._id}>
                <div className='order-hotel'>{order?.hotel?.title}</div>
                <div className='order-list-room'>
                  {order?.roomReserve.map((room) => (
                    <p>{room.roomNumber}</p>
                  ))}
                </div>
                <div className='order-admin-name'>
                  <p>{order?.user?.username}</p>
                  <p>{order?.user?.email}</p>
                </div>

                <div className='order-created-at'>
                  <p>
                    {order.dateNumber.length}{' '}
                    {order.dateNumber.length > 1 ? 'days' : 'day'}
                  </p>
                  <p>
                    {new Date(order.dateNumber[0] * 1000).toLocaleDateString()}{' '}
                    -{' '}
                    {new Date(
                      order.dateNumber[order.dateNumber.length - 1] * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className='order-status'>
                  <button
                    className={`
                    edit-admin-confirmed
                    ${order.confirm ? 'edit-confirmed' : 'edit-unconformed'}`}
                    onClick={(e) => handleUpdate(e, order?.confirm, order?._id)}
                  >
                    {order.confirm ? 'Confirmed' : 'Unconformed'}
                  </button>
                </div>
                <div className='order-admin-amount'>
                  <p>$ {order?.totalPrice}</p>
                </div>

                <div className='edit-colum-order'>
                  <button
                    className='edit-btn delete-btn'
                    onClick={(e) => handleDeleteOrder(e, order?._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
