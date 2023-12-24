import { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { myToken } from "../../redux/features/Auth/authSlice";

export function useApiHeaders() {
  const accessToken = useSelector(myToken);

  const headers: AxiosRequestConfig["headers"] = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}
