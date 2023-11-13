import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotels: localStorage.getItem('hotels')
    ? JSON.parse(localStorage.getItem('hotels'))
    : null,
};

const authSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.hotels = action.payload;
      localStorage.setItem('hotels', JSON.stringify(action.payload));
    },
  },
});

export const { setCredential, logout } = authSlice.actions; //dispatch .setCredential
export default authSlice.reducer;
