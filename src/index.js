import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import HotelsList from './pages/hotelsList/HotelsList';
import SingleHotel from './pages/singleHotel/SingleHotel';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { Provider } from 'react-redux';
import store from './store.js';
import PageNotFound from './pages/pageNotFound/PageNotFound.jsx';
import AdminRoute from './component/adminRoute/AdminRoute.jsx';
import ProtectRoute from './component/protectRoute/ProtectRoute.jsx';
import Profile from './pages/profile/Profile.jsx';
import HotelForm from './pages/admin/createHotel/HotelForm.jsx';
import CreateRoom from './pages/admin/createRoom/CreateRoom.jsx';
import ManageHotel from './pages/admin/manageHotel/ManageHotel.jsx';
import EditHotel from './pages/admin/editHotel/EditHotel.jsx';
import EditRoom from './pages/admin/editroom/EditRoom.jsx';
import ListRoom from './pages/admin/listRoom/ListRoom.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/hotels',
        element: <HotelsList />,
      },
      {
        path: '/hotels/:id',
        element: <SingleHotel />,
      },
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '',
        element: <ProtectRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: '/error',
        element: <PageNotFound />,
      },
      {
        path: '',
        element: <AdminRoute />,
        children: [
          {
            path: '/admin/hotelform',
            element: <HotelForm />,
          },
          {
            path: '/admin/createroom/:id',
            element: <CreateRoom />,
          },

          {
            path: '/admin/managehotel',
            element: <ManageHotel />,
          },
          {
            path: '/admin/edithotel/:id',
            element: <EditHotel />,
          },
          {
            path: '/admin/listroom/:id',
            element: <ListRoom />,
          },
          {
            path: '/admin/editroom/:id',
            element: <EditRoom />,
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
