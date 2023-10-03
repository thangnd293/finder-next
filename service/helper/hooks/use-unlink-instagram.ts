import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { HelperService } from "..";
import { AxiosResponse } from "axios";

export const useUnlinkInstagram = (
  config: UseMutationOptions<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  > = {},
) => {
  return useMutation({
    mutationFn: HelperService.unlinkInstagramAccount,
    ...config,
  });
};
