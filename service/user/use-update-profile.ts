import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { User, UserService } from "./userService";
import { AxiosError } from "axios";
import { Error } from "@/types/http";
import { getCurrentUserKey } from "./use-current-user";

export const useUpdateProfile = (
  config: UseMutationOptions<
    User,
    AxiosError<Error>,
    Partial<User>,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(UserService.updateProfile, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getCurrentUserKey());
      config.onSuccess?.(data, variables, context);
    },
  });
};
