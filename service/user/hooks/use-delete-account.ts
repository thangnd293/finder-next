import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { UserService } from "../user-service";

export const useDeleteAccount = (
  config: UseMutationOptions<any, unknown, void, unknown> = {},
) => {
  return useMutation({
    mutationFn: UserService.deleteAccount,
    ...config,
  });
};
