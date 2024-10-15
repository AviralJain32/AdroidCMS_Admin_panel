import { IConference } from '@/model/ConferenceSchema';
import { IUser } from '@/model/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
// Creating a mapped type that modifies conferenceOrganizer to be a string
type IModifiedConference = Omit<IConference, 'conferenceOrganizer'| 'conferenceStatus' > & {
  conferenceOrganizer: {_id:string,fullname:string};
  conferenceStatus:"outline" | "accepted" | "submitted" | "rejected" | "review" | null | undefined
};
export const ConferenceApiSlice = createApi({
  reducerPath: 'conferenceapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['conference'],
  endpoints: (builder) => ({
    getAllConferences: builder.query<IConference[], void>({
      query: () => `/get-all-conferences`,
      transformResponse: (response: ApiResponse<IConference[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      },
      providesTags: ['conference'],
    }),
    getConferenceByConferenceID: builder.query<IModifiedConference, string>({
      query: (confName) => `/get-conference-by-conference-id?confName=${confName}`,
      transformResponse: (response: ApiResponse<IModifiedConference>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useGetAllConferencesQuery, 
  useGetConferenceByConferenceIDQuery
} = ConferenceApiSlice;