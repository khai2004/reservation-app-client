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
import AdminRoute from './component/admin/adminRoute/AdminRoute.jsx';
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
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx';
import MyOrder from './pages/myOrder/MyOrder.jsx';
import AdminDashBoard from './pages/admin/adminDashBoard/AdminDashBoard.jsx';
import AdminHome from './pages/admin/adminHome/AdminHome.jsx';
import User from './pages/admin/user/User.jsx';
import PageNotFound from './pages/pageNotFound/PageNotFound.jsx';
import OrderList from './pages/admin/orderList/OrderList.jsx';
import Paganation from './component/paganation/Paganation.jsx';

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
          {
            path: '/myorder/:id',
            element: <MyOrder />,
          },
          {
            path: '/placeorder',
            element: <PlaceOrder />,
          },
        ],
      },
    ],
  },
  {
    path: '',
    element: <AdminRoute />,
    children: [
      {
        path: '/adminmanagement',
        element: <AdminDashBoard />,
        children: [
          {
            path: '/adminmanagement/home',
            element: <AdminHome />,
          },
          {
            path: '/adminmanagement/hotelcreate',
            element: <HotelForm />,
          },
          {
            path: '/adminmanagement/roomcreate/:id',
            element: <CreateRoom />,
          },

          {
            path: '/adminmanagement/hotellist',
            element: <ManageHotel />,
          },
          {
            path: '/adminmanagement/hoteledit/:id',
            element: <EditHotel />,
          },
          {
            path: '/adminmanagement/roomlist/:id',
            element: <ListRoom />,
          },
          {
            path: '/adminmanagement/roomedit/:id',
            element: <EditRoom />,
          },
          {
            path: '/adminmanagement/user',
            element: <User />,
          },
          {
            path: '/adminmanagement/orderlist',
            element: <OrderList />,
          },
        ],
      },
    ],
  },
  {
    path: '/paganation',
    element: <Paganation />,
  },
  {
    path: '*',
    element: <PageNotFound />,
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
