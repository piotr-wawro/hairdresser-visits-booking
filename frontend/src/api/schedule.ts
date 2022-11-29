import { hvbApi } from "./index.js";

interface GetAllSchedules {
  start: string;
  end: string;
}

export interface GetScheduleResponse {
  id: string;
  start: string;
  end: string;
  forId: string;
}

interface PostSchedule {
  start: string;
  end: string;
  userId: string;
}

interface GetSchedule {
  id: string;
}

interface PatchSchedule {
  id: string;
  start: string;
  end: string;
  userId: string;
}

interface DeleteSchedule {
  id: string;
}

const schedule = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSchedules: build.query<GetScheduleResponse[], GetAllSchedules>({
      query: ({ start, end }) => ({
        url: `/schedule/all`,
        method: "GET",
        params: { start, end },
      }),
    }),
    postSchedule: build.query<void, PostSchedule>({
      query: ({ start, end, userId }) => ({
        url: `/schedule`,
        method: "POST",
        body: { start, end, userId },
      }),
    }),
    getSchedule: build.query<GetScheduleResponse, GetSchedule>({
      query: ({ id }) => ({
        url: `/schedule`,
        method: "GET",
        params: { id },
      }),
    }),
    patchSchedule: build.query<void, PatchSchedule>({
      query: ({ id, start, end, userId }) => ({
        url: `/schedule`,
        method: "PATCH",
        body: { id, start, end, userId },
      }),
    }),
    deleteSchedule: build.query<void, DeleteSchedule>({
      query: ({ id }) => ({
        url: `/schedule`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useLazyGetAllSchedulesQuery,
  useLazyPostScheduleQuery,
  useGetScheduleQuery,
  useLazyPatchScheduleQuery,
  useLazyDeleteScheduleQuery,
} = schedule;
