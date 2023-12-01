import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/api`,
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Orders', 'Hotel', 'User', 'Room'],
  endpoints: (builder) => ({}),
});
