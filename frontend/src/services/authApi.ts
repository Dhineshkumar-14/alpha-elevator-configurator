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

interface MeResponse {
  user: User;
}

interface LogoutResponse {
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // Get currently authenticated user
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // Logout
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLogoutMutation } = authApi;
