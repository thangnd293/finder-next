import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ActionService } from "..";

export const useLike = (config: UseMutationOptions<any, unknown, string, unknown> ={}) => {
  return useMutation({
    mutationFn: (id: string) => ActionService.like(id),
    ...config
  });
};
