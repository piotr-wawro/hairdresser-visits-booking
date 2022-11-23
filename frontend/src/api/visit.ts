import { hvbApi } from "./index.js";

interface PostVisit {
  start: string;
  type: string;
  servicedBy: string;
}

const user = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    allVisits: build.query<any, void>({
      query: () => ({
        url: `/visit/all`,
        method: "GET",
      }),
    }),
    postVisit: build.query<any, PostVisit>({
      query: ({ start, type, servicedBy }) => ({
        url: `/visit`,
        method: "POST",
        body: {
          start,
          type,
          servicedBy,
        },
      }),
    }),
  }),
});

export const { useAllVisitsQuery, usePostVisitQuery } = user;
