import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

export const hvbApi = createApi({
  reducerPath: "HVBApi",
  tagTypes: ["Employee"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001",
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
  tagTypes: ["User"],
});
