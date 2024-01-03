"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuth, setLoading, logout } from "@/redux/features/Auth/authSlice";
import { useVerifyMutation } from "@/redux/features/Auth/authApiSlice";
import { useApi } from "@/redux/services/axios";

export default function useVerify() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [verify] = useVerifyMutation();
  const API = useApi();
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
      dispatch(setLoading(false));
      return; // Return early if tokens are missing
    }
    // Make the POST request with proper data
    const res = API.post("/api/jwt/verify/", { token: accessToken });
  }, [dispatch, verify]);
}
