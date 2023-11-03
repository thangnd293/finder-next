import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UpdateLocationPayload, UserService } from "..";
import { AxiosError } from "axios";
import { Error } from "@/types/http";
import { getCurrentUserKey } from "./use-current-user";
import { type User } from "..";

export const useUpdateLocation = (
  config: UseMutationOptions<
    User,
    AxiosError<Error>,
    UpdateLocationPayload,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(UserService.updateLocation, {
    ...config,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(getCurrentUserKey());
      config.onSuccess?.(data, variables, context);
    },
  });
};
