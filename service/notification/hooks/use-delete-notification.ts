import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { NotificationService } from "../notification-service";
import { AxiosResponse } from "axios";

export const useDeleteNotification = (
  config: UseMutationOptions<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  > = {},
) => {
  return useMutation({
    mutationFn: NotificationService.deleteNotification,
    ...config,
  });
};
