import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { UserService } from "../user-service";
import { useInvalidateCurrentUser } from "./use-current-user";

export const useBoost = (
  config: UseMutationOptions<any, unknown, void, unknown> = {},
) => {
  const invalidateCurrentUser = useInvalidateCurrentUser();

  return useMutation({
    mutationFn: UserService.boost,
    ...config,
    onSuccess: (...args) => {
      invalidateCurrentUser();
      config.onSuccess?.(...args);
    },
  });
};
