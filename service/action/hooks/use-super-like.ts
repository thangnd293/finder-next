import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ActionService } from "..";
import { useInvalidateCurrentUser } from "@/service/user";

export const useSupperLike = (
  config: UseMutationOptions<any, unknown, string, unknown> = {},
) => {
  const invalidateCurrentUser = useInvalidateCurrentUser();

  return useMutation({
    mutationFn: ActionService.superLike,
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      invalidateCurrentUser();
    },
  });
};
