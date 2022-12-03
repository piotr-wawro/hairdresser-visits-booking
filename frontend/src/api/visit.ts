import { hvbApi } from "./index.js";

interface GetAllVisit {
  start: string;
  end: string;
}

export interface GetVisitResponse {
  id: string;
  start: string;
  end: string;
  bookedById: string;
  servicedById: string;
}

interface PostVisit {
  start: string;
  servicedBy: string;
}

interface GetVisit {
  id: string;
}

interface PatchVisit {
  id: string;
  start: string;
  servicedBy: string;
}

interface DeleteVisit {
  id: string;
}

const visit = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    allVisits: build.query<GetVisitResponse[], GetAllVisit>({
      query: ({ start, end }) => ({
        url: `/visit/all`,
        method: "GET",
        params: { start, end },
      }),
      providesTags: ["Visit"],
    }),
    postVisit: build.mutation<void, PostVisit>({
      query: ({ start, servicedBy }) => ({
        url: `/visit`,
        method: "POST",
        body: { start, servicedBy },
      }),
      invalidatesTags: ["Visit"],
    }),
    getVisit: build.query<GetVisitResponse, GetVisit>({
      query: ({ id }) => ({
        url: `/visit`,
        method: "GET",
        params: { id },
      }),
    }),
    patchVisit: build.query<void, PatchVisit>({
      query: ({ id, start, servicedBy }) => ({
        url: `/visit`,
        method: "PATCH",
        body: { id, start, servicedBy },
      }),
    }),
    deleteVisit: build.mutation<void, DeleteVisit>({
      query: ({ id }) => ({
        url: `/visit`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Visit"],
    }),
  }),
});

export const {
  useLazyAllVisitsQuery,
  usePostVisitMutation,
  useGetVisitQuery,
  useLazyPatchVisitQuery,
  useDeleteVisitMutation,
} = visit;
