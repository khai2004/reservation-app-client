import React from 'react';

import './user.scss';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../slices/userApiSlice';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const User = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [userDelete, { error: userError }] = useDeleteUserMutation();
  console.log(data);

  const handleDelete = async (userId) => {
    try {
      await userDelete(userId).unwrap();
      refetch();
      toast.success('Delete success!');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong. Try again!');
    }
  };

  return (
    <div>
      <div className='manage-user-box'>
        <div className='admin-list-user'>
          <div className='single-user-header'>
            <h2 className='user-name'>User name</h2>
            <h2 className='user-phone'>Phone number</h2>
            <h2 className='user-admin-email'>Email</h2>
            <h2 className='user-created-at'>Date created</h2>
            <h2 className='edit-colum-user'> </h2>
          </div>

          {data?.user?.map((user) => (
            <>
              <hr
                style={{ height: '3px', width: '100%', marginLeft: '-1px' }}
              />
              <div className='single-user' key={user._id}>
                <div className='user-name'>
                  <div className='user-image'>
                    <img
                      src={
                        user.image ||
                        'https://cdn-icons-png.flaticon.com/128/149/149071.png'
                      }
                      alt=''
                    />
                  </div>
                  {user.username}
                </div>
                <div className='user-phone'>{user.phone}</div>
                <div className='user-admin-email'>{user.email}</div>
                <div className='user-created-at'>
                  {new Date(user.createdAt).toLocaleString()}
                </div>

                <div className='edit-colum-user'>
                  <button
                    className='edit-btn delete-btn'
                    onClick={() => handleDelete(user._id)}
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

export default User;
