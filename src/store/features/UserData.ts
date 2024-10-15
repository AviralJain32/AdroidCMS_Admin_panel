import { IUser } from '@/model/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const UserApiSlice = createApi({
  reducerPath: 'userapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['conference'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => `/get-all-users`,
      transformResponse: (response: ApiResponse<IUser[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      },
      providesTags: ['conference'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useGetAllUsersQuery, 
} = UserApiSlice;
