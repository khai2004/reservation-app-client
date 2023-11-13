import { apiSlice } from './apiSlice';

export const hotelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: ({ type, rating, city, price }) => ({
        url: '/hotels',
        params: {
          type,
          rating,
          city,
          price,
        },
      }),
      providesTags: ['Hotels'],
      keepUnusedDataFor: 5,
    }),
    getSingel: builder.query({
      query: (hotelId) => ({
        url: `hotels/${hotelId}`,
      }),
      invalidatesTags: ['Hotels'],
      keepUnusedDataFor: 5,
    }),
    createHotel: builder.mutation({
      query: (data) => ({
        url: '/hotels',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotels'],
    }),
    updateHotel: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `hotels/${data.id}`,
          method: 'PUT',
          body: data.data,
        };
      },
      invalidatesTags: ['Hotels'],
    }),

    deleteHotel: builder.mutation({
      query: (hotelId) => ({
        url: `hotels/${hotelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hotels'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `hotels/${data.hotelId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotels'],
    }),

    getTopHotels: builder.query({
      query: () => ({
        url: `hotels/top`,
      }),
      keepUnusedDataFor: 5,
    }),

    getRatingHotel: builder.query({
      query: () => ({
        url: '/hotels/rating',
      }),
      keepUnusedDataFor: 5,
    }),
    getTypeHotel: builder.query({
      query: () => ({
        url: '/hotels/type',
      }),
      keepUnusedDataFor: 5,
    }),
    getHotelsRooms: builder.query({
      query: (id) => ({
        url: `/hotels/rooms/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetSingelQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetTopHotelsQuery,
  useGetRatingHotelQuery,
  useGetTypeHotelQuery,
  useGetHotelsRoomsQuery,
} = hotelsApiSlice;
