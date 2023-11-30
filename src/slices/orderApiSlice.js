import { apiSlice } from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return { url: '/orders', method: 'POST', body: data };
      },
      invalidatesTags: ['Orders'],
    }),
    getOrders: builder.query({
      query: () => ({
        url: '/orders',
      }),
      providesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),
    getSingelOrder: builder.query({
      query: (orderId) => ({
        url: `orders/${orderId}`,
      }),
      invalidatesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query: (data) => {
        console.log(data.confirm);
        return {
          url: `orders/${data.id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['Orders'],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: '/orders/admin/getall',
      }),
      providesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `hotels/${data.hotelId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotels'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetSingelOrderQuery,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = orderApiSlice;
