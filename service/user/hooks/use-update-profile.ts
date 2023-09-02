import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Error } from "@/types/http";
import { getCurrentUserKey } from "./use-current-user";
import { UpdateProfilePayload, UserService } from "..";
import { type User } from "..";

export const useUpdateProfile = (
  config: UseMutationOptions<
    User,
    AxiosError<Error>,
    UpdateProfilePayload,
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
