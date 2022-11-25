import { hvbApi } from "./index.js";

interface PostEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface GetEmployee {
  id: string;
}

interface PatchEmployee {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface DeleteEmployee {
  id: string;
}

interface EmployeesResponse {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const employee = hvbApi.injectEndpoints({
  endpoints: (build) => ({
    allEmployees: build.query<EmployeesResponse[], void>({
      query: () => ({
        url: `/employee/all`,
        method: "GET",
      }),
    }),
    postEmployee: build.query<void, PostEmployee>({
      query: ({ firstName, lastName, email, phoneNumber }) => ({
        url: `/employee`,
        method: "POST",
        body: { firstName, lastName, email, phoneNumber },
      }),
    }),
    getEmployee: build.query<EmployeesResponse, GetEmployee>({
      query: ({ id }) => ({
        url: `/employee`,
        method: "GET",
        body: { id },
      }),
    }),
    patchEmployee: build.query<void, PatchEmployee>({
      query: ({ id, firstName, lastName, phoneNumber }) => ({
        url: `/employee`,
        method: "PATCH",
        body: { id, firstName, lastName, phoneNumber },
      }),
    }),
    deleteEmployee: build.query<void, DeleteEmployee>({
      query: ({ id }) => ({
        url: `/employee`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useAllEmployeesQuery,
  useLazyPostEmployeeQuery,
  useGetEmployeeQuery,
  useLazyPatchEmployeeQuery,
  useLazyDeleteEmployeeQuery,
} = employee;
