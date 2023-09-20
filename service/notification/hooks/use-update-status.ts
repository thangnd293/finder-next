import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { NotificationService, UpdateStatusPayload } from "..";

export const useUpdateStatus = (
  config: UseMutationOptions<any, unknown, UpdateStatusPayload, unknown> = {},
) => {
  return useMutation({
    mutationFn: NotificationService.updateStatus,
    ...config,
  });
};
