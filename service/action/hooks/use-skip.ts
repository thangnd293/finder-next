import { useMutation } from "@tanstack/react-query";
import { ActionService } from "..";

export const useSkip = () => {
  return useMutation({
    mutationFn: (id: string) => ActionService.skip(id),
  });
};
