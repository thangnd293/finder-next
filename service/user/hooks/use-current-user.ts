import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User, UserService } from "..";

export const getCurrentUserKey = () => ["user", "current"];

export const useCurrentUser = <TData = User>(
  options?: UseQueryOptions<User, AxiosError, TData>,
) => {
  return useQuery({
    queryKey: getCurrentUserKey(),
    queryFn: UserService.getCurrentUser,
    ...options,
  });
};

export const useCurrentUserID = () => {
  const { data } = useCurrentUser({
    select: (user) => user._id,
  });
  return {
    currentUserID: data,
  };
};

export const useInvalidateCurrentUser = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(getCurrentUserKey());
  };
};
