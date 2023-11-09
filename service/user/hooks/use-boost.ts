import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { UserService } from "../user-service";
import { useInvalidateCurrentUser } from "./use-current-user";
import { AxiosError } from "axios";
import { Offer } from "@/service/offer";

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
    mutationFn: UserService.boost,
    ...config,
    onSuccess: (...args) => {
      invalidateCurrentUser();
      config.onSuccess?.(...args);
    },
  });
};
