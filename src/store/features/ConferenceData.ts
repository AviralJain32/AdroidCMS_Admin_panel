//userData.ts

// import { IUser } from '@/model/User';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface ApiResponse<T> {
//     success: boolean;
//     message: string;
//     data: T;
// }

// export const UserApiSlice = createApi({
//   reducerPath: 'userapi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
//   tagTypes: ['conference'],
//   endpoints: (builder) => ({
//     // getAllUsers: builder.query<IUser[], void>({
//     //   query: () => `/get-all-users`,
//     //   transformResponse: (response: ApiResponse<IUser[]>) => {
//     //     if (response.success) {
//     //       return response.data;
//     //     } else {
//     //       throw new Error(response.message);
//     //     }
//     //   },
//     //   providesTags: ['conference'],
//     // }),
//   }),
// });

// // Export hooks for usage in functional components
// export const { 
//   // useGetAllUsersQuery, 
// } = UserApiSlice;


import { IConference } from '@/model/ConferenceSchema';
import { IPaper } from '@/model/PaperModel';
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
  conferenceStatus: "accepted" | "submitted" | "rejected" | "review"
};
export const ConferenceApiSlice = createApi({
  reducerPath: 'conferenceapi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['conference'],
  endpoints: (builder) => ({
    // getAllConferences: builder.query<IConference[], void>({
    //   query: () => `/get-all-conferences`,
    //   transformResponse: (response: ApiResponse<IConference[]>) => {
    //     if (response.success) {
    //       return response.data;
    //     } else {
    //       throw new Error(response.message);
    //     }
    //   },
    // }),
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
    getConferenceSubmittedPaperByConferenceID: builder.query<IPaper[], string>({
      query: (confId) => `/conferences/get-conference-submitted-papers-by-conference-id?confId=${confId}`,
      transformResponse: (response: ApiResponse<IPaper[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message);
        }
      },
    }),
  }),
});

export const { 
  // useGetAllConferencesQuery, 
  useGetConferenceByConferenceIDQuery,
  useGetConferenceSubmittedPaperByConferenceIDQuery
} = ConferenceApiSlice;
