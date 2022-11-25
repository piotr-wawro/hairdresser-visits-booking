import { hvbApi } from "./index.js";

interface GetAllVisit {
  start: string;
  end: string;
}

interface GetVisitResponse {
  id: string;
  start: string;
  end: string;
  bookedById: string;
  servicedById: string;
}

interface PostVisit {
  start: string;
  type: string;
  servicedBy: string;
}

interface GetVisit {
  id: string;
}

interface PatchVisit {
  id: string;
  start: string;
  type: string;
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
        body: { start, end },
      }),
    }),
    postVisit: build.query<void, PostVisit>({
      query: ({ start, type, servicedBy }) => ({
        url: `/visit`,
        method: "POST",
        body: { start, type, servicedBy },
      }),
    }),
    getVisit: build.query<GetVisitResponse, GetVisit>({
      query: ({ id }) => ({
        url: `/visit`,
        method: "GET",
        body: { id },
      }),
    }),
    patchVisit: build.query<void, PatchVisit>({
      query: ({ id, start, type, servicedBy }) => ({
        url: `/visit`,
        method: "PATCH",
        body: { id, start, type, servicedBy },
      }),
    }),
    deleteVisit: build.query<void, DeleteVisit>({
      query: ({ id }) => ({
        url: `/visit`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useAllVisitsQuery,
  useLazyPostVisitQuery,
  useGetVisitQuery,
  useLazyPatchVisitQuery,
  useLazyDeleteVisitQuery,
} = visit;
