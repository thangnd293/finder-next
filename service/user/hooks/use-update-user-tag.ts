import { Error } from "@/types/http";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUserTagPayload, UserService, type User } from "..";
import { getCurrentUserKey } from "./use-current-user";

export const useUpdateUserTag = (
  config: UseMutationOptions<
    User,
    AxiosError<Error>,
    UpdateUserTagPayload,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(UserService.updateUserTag, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getCurrentUserKey());
      config.onSuccess?.(data, variables, context);
    },
  });
};
