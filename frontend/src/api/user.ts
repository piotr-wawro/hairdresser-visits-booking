import { hvbApi } from "./index.js";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const user = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query<Profile, void>({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
    }),
  }),
});

export const { useUserProfileQuery } = user;
