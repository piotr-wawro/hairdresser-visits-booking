import { hvbApi } from "./index.js";

const user = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    allEmployees: build.query<any, void>({
      query: () => ({
        url: `/employee/all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllEmployeesQuery } = user;
