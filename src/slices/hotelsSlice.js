import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotels: localStorage.getItem('hotels')
    ? JSON.parse(localStorage.getItem('hotels'))
    : {
        pageSize: {},
        pageNumber: {},
        type: {},
        price: {},
        rating: {},
        city: {},
      },
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotelUrl: (state, action) => {
      state.hotels = action.payload;
      localStorage.setItem('hotels', JSON.stringify(action.payload));
    },
  },
});

export const { setHotelUrl } = hotelSlice.actions; //dispatch .setCredential
export default hotelSlice.reducer;
