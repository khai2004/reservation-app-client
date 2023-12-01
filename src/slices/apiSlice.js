import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constanst';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Orders', 'Hotel', 'User', 'Room'],
  endpoints: (builder) => ({}),
});
