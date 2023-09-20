import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ActionService } from "..";

export const useSkip = (
  config: UseMutationOptions<any, unknown, string, unknown> = {},
) => {
  return useMutation({
    mutationFn: (id: string) => ActionService.skip(id),
    ...config,
  });
};
