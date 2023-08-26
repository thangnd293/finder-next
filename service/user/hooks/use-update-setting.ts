import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UpdateSettingPayload, UserService } from "..";
import { AxiosError } from "axios";
import { Error } from "@/types/http";
import { getCurrentUserKey } from "./use-current-user";
import { type User } from "..";

export const useUpdateSetting = (
  config: UseMutationOptions<
    User,
    AxiosError<Error>,
    UpdateSettingPayload,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation(UserService.updateSetting, {
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(getCurrentUserKey());
      config.onSuccess?.(data, variables, context);
    },
  });
};
