import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:9000/api',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Hotel', 'User', 'Room'],
  endpoints: (builder) => ({}),
});
