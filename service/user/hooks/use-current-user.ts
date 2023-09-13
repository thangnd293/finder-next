import { useQuery } from "@tanstack/react-query";
import { User, UserService } from "..";
import { useCallback } from "react";

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

export const useCurrentUserID = () => {
  const { data, ...rest } = useQuery({
    queryKey: getCurrentUserKey(),
    queryFn: UserService.getCurrentUser,
    select: useCallback((data: User) => data?._id, []),
  });

  return {
    currentUserID: data,
    ...rest,
  };
};
