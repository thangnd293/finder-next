import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ActionService } from "..";

export const useUnmatch = (
  config: UseMutationOptions<any, unknown, string, unknown> = {},
) => {
  return useMutation({
    mutationFn: ActionService.unmatch,
    ...config,
  });
};
