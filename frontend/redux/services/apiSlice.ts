import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../features/Auth/authSlice";
import { Mutex } from "async-mutex";
import { MyBaseURl } from "@/constants/constants";

const mutex = new Mutex();
// const refresh = localStorage.getItem("refresh");
const baseQuery = fetchBaseQuery({
  baseUrl: `${MyBaseURl}/api`,
  credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const refresh = localStorage.getItem("refresh");
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/jwt/refresh/",
            method: "POST",
            body: { refresh: refresh },
          },
          api,
          extraOptions
        );
        if (refreshResult?.data) {
          const access = refreshResult.data;
          api.dispatch(setAuth({ access }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
