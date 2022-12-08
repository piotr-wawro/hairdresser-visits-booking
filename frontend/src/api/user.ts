import { hvbApi } from "./index.js";

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface PatchProfileProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface GetUserVisitData {
  start: string;
  end: string;
}

interface GetUserVisitDataResponse {
  id: string;
  start: string;
  end: string;
  servicedBy: { firstName: string; lastName: string };
}

interface PostUserVisitData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface PostUserVisitInfo {
  start: string;
  type: string;
  servicedBy: string;
}

interface PatchUserVisitInfo {
  id: string;
  start: string;
  type: string;
  servicedBy: string;
}

interface DeleteUserVisit {
  id: string;
}

const user = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    logIn: build.query<void, { email: string }>({
      query: ({ email }) => ({
        url: `/log-in`,
        method: "GET",
        params: { email },
      }),
    }),
    userProfile: build.query<Profile, void>({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    patchUserProfile: build.query<void, PatchProfileProps>({
      query: ({ firstName, lastName, phoneNumber }) => ({
        url: `/user/profile`,
        method: "PATCH",
        body: { firstName, lastName, phoneNumber },
      }),
    }),
    getUserVisit: build.query<GetUserVisitDataResponse[], GetUserVisitData>({
      query: ({ start, end }) => ({
        url: `/user/visit`,
        method: "GET",
        params: { start, end },
      }),
    }),
    postUserVisitData: build.query<void, PostUserVisitData>({
      query: ({ firstName, lastName, email, phoneNumber }) => ({
        url: `/user`,
        method: "POST",
        body: { firstName, lastName, email, phoneNumber },
      }),
    }),
    postUserVisitInfo: build.query<void, PostUserVisitInfo>({
      query: ({ start, type, servicedBy }) => ({
        url: `/user/visit`,
        method: "POST",
        body: { start, type, servicedBy },
      }),
    }),
    patchUserVisitInfo: build.query<void, PatchUserVisitInfo>({
      query: ({ id, start, type, servicedBy }) => ({
        url: `/user/visit`,
        method: "PATCH",
        body: { id, start, type, servicedBy },
      }),
    }),
    deleteUserVisit: build.query<void, DeleteUserVisit>({
      query: ({ id }) => ({
        url: `/user/visit`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useLazyLogInQuery,
  useUserProfileQuery,
  useLazyPatchUserProfileQuery,
  useGetUserVisitQuery,
  useLazyPostUserVisitDataQuery,
  useLazyPostUserVisitInfoQuery,
  useLazyPatchUserVisitInfoQuery,
  useLazyDeleteUserVisitQuery,
} = user;
