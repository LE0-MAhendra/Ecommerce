import { useRetrieveUserQuery } from "@/redux/features/Auth/authApiSlice";

export const useUserData = () => {
  const userDataQuery = useRetrieveUserQuery();
  return userDataQuery.data;
};
