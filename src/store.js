import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice.js';
import { apiSlice } from './slices/apiSlice.js';
import reserveSliceReducer from './slices/ReserveSlice.js';
import hotelSliceReducer from './slices/hotelsSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    room: reserveSliceReducer,
    hotel: hotelSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
