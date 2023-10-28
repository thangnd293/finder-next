import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { HelperService, PayPackagePayload } from "..";
import { AxiosResponse } from "axios";

export const usePayPackage = (
  config: UseMutationOptions<
    AxiosResponse<any, any>,
    unknown,
    PayPackagePayload,
    unknown
  > = {},
) => {
  return useMutation({
    mutationFn: HelperService.payPackage,
    ...config,
  });
};
