import { MyBaseURl } from "@/constants/constants";
import { UserProps } from "@/types/types";
import axios from "axios";

export const useUserData = async (access: any): Promise<UserProps | null> => {
  try {
    const response = await axios.get<UserProps>(`${MyBaseURl}/api/users/me/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    // Handle error appropriately (e.g., log, throw, etc.)
    throw error;
  }
};
