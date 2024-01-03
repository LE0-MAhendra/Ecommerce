import axios from "axios";
import { useApiHeaders } from "../../components/hooks/useApiheaders";
import { MyBaseURl } from "@/constants/constants";
export const useApi = () => {
  const headers = useApiHeaders();
  return axios.create({
    baseURL: MyBaseURl,
    headers,
  });
};
