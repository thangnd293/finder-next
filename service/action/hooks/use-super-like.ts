import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ActionService } from "..";
import { useInvalidateCurrentUser } from "@/service/user";
import { AxiosError } from "axios";
import { Offer } from "@/service/offer";

export const useSupperLike = (
  config: UseMutationOptions<
    any,
    AxiosError<{
      data: {
        offering: Offer;
      };
    }>,
    string,
    unknown
  > = {},
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
