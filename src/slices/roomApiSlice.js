import { apiSlice } from './apiSlice';

export const hotelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: (id) => ({
        url: `/hotels/rooms/${id}`,
      }),
      providesTags: ['Rooms'],
      keepUnusedDataFor: 5,
    }),
    getRoom: builder.query({
      query: (id) => ({
        url: `/rooms/room/${id}`,
      }),
      providesTags: ['Rooms'],
      keepUnusedDataFor: 5,
    }),

    updateRoom: builder.mutation({
      query: (data) => ({
        url: `/rooms/room/${data.id}`,
        method: 'PUT',
        body: data.formData,
      }),
      invalidatesTags: ['Rooms'],
    }),
    updateRoomAvailability: builder.mutation({
      query: (data) => ({
        url: `/rooms/availability/${data.id}`,
        method: 'PUT',
        body: data.allDateReservation,
      }),
      invalidatesTags: ['Rooms'],
    }),
    createRooms: builder.mutation({
      query: (data) => ({
        url: `/rooms/${data.hotelid}`,
        method: 'POST',
        body: data.formData,
      }),
      invalidatesTags: ['Rooms'],
    }),

    deleteRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/room/${data.roomId}/${data.hotelid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms'],
    }),
  }),
});

export const {
  useGetRoomQuery,
  useUpdateRoomMutation,
  useGetRoomsQuery,
  useCreateRoomsMutation,
  useDeleteRoomMutation,
  useUpdateRoomAvailabilityMutation,
} = hotelsApiSlice;
