"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setAuth,
  finishInitialLoad,
  logout,
} from "@/redux/features/Auth/authSlice";
import { useVerifyMutation } from "@/redux/features/Auth/authApiSlice";

export default function useVerify() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [verify] = useVerifyMutation();

  useEffect(() => {
    const retrieveTokens = () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("access") || null
          : null;
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh") || null
          : null;
      return { accessToken, refreshToken };
    };

    const { accessToken, refreshToken } = retrieveTokens();

    if (!accessToken || !refreshToken) {
      dispatch(logout());
      dispatch(finishInitialLoad());
    }

    verify(undefined)
      .unwrap()
      .then(() => {
        if (isAuthenticated) {
          dispatch(setAuth({ accessToken, refreshToken }));
        }
        dispatch(logout());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, [dispatch, verify]);
}
