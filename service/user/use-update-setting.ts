import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UpdateSettingPayload, User, UserService } from "./userService";
import { AxiosError } from "axios";
import { Error } from "@/types/http";
import { getCurrentUserKey } from "./use-current-user";

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
