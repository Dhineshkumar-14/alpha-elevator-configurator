import { api } from "./api";

interface LoginRequest {
  phoneNumber: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  phoneNumber: string;
  role: string;
}

interface LoginResponse {
  message: string;
  user: User;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
