import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Offer } from "@/service/offer";
import { ActionService } from "../action-service";
import { useInvalidateCurrentUser } from "@/service/user";

export const useBoost = (
  config: UseMutationOptions<
    any,
    AxiosError<{
      data: {
        offering: Offer;
      };
    }>,
    void,
    unknown
  > = {},
) => {
  const invalidateCurrentUser = useInvalidateCurrentUser();

  return useMutation({
    mutationFn: ActionService.boost,
    ...config,
    onSuccess: (...args) => {
      invalidateCurrentUser();
      config.onSuccess?.(...args);
    },
  });
};
