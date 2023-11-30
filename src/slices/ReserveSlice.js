import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('room')
  ? JSON.parse(localStorage.getItem('room'))
  : {
      hotelId: {},
      hotelTitle: {},
      roomDetail: [],
      roomReserve: [],
      dateNumber: [],
      hotelAddress: {},
      maxPeople: 0,
    };

const reserveSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setReserveOrder: (state, action) => {
      const {
        hotelId,
        hotelTitle,
        roomDetail,
        roomReserve,
        dateNumber,
        hotelAddress,
        maxPeople,
      } = action.payload;
      if (hotelId !== undefined) state.hotelId = hotelId;
      if (hotelTitle !== undefined) state.hotelTitle = hotelTitle;
      if (roomDetail !== undefined) state.roomDetail = roomDetail;
      if (roomReserve !== undefined) state.roomReserve = roomReserve;
      if (dateNumber !== undefined) state.dateNumber = dateNumber;
      if (hotelAddress !== undefined) state.hotelAddress = hotelAddress;
      if (maxPeople !== undefined) state.maxPeople = maxPeople;

      const priceMaxPeopleValues = state.roomDetail.map(
        (item) => item.price * item.maxPeople
      );
      const totalPriceMaxPeople = priceMaxPeopleValues.reduce(
        (total, value) => total + value,
        0
      );

      state.roomsPrice = state.dateNumber?.length * totalPriceMaxPeople;

      state.taxPrice = Number(0.1 * state.roomsPrice.toFixed(2));
      state.totalPrice = Number(
        (Number(state.roomsPrice) + Number(state.taxPrice)).toFixed(2)
      );
      localStorage.setItem('room', JSON.stringify(state));
    },
  },
});

export const { setReserveOrder } = reserveSlice.actions; //dispatch .setCredential
export default reserveSlice.reducer;
