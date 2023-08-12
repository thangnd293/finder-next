import { useQuery } from "@tanstack/react-query";
import { UserService } from "./user-service";

export const useCurrentUser = () => {
  const { data, ...rest } = useQuery(
    ["user", "current"],
    UserService.getCurrentUser,
  );

  return {
    userInfo: data,
    ...rest,
  };
};
