require("dotenv").config({ path: "../.env.local" });
import axios from "axios";
import { useApiHeaders } from "../../components/hooks/useApiheaders";
export const useApi = () => {
  const headers = useApiHeaders();
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    headers,
  });
};
