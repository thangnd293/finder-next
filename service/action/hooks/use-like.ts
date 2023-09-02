import { useMutation } from "@tanstack/react-query";
import { ActionService } from "..";

export const useLike = () => {
  return useMutation({
    mutationFn: (id: string) => ActionService.like(id),
  });
};
