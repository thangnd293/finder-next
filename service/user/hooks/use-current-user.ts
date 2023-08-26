import { useQuery } from "@tanstack/react-query";
import { UserService } from "..";

export const getCurrentUserKey = () => ["user", "current"];
export const useCurrentUser = () => {
  const { data, ...rest } = useQuery(
    getCurrentUserKey(),
    UserService.getCurrentUser,
  );

  return {
    currentUser: data,
    ...rest,
  };
};
