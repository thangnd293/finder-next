import { useQuery } from "@tanstack/react-query";
import { UserService } from "./userService";

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
