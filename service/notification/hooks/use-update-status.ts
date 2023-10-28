import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  NotificationService,
  UpdateStatusPayload,
  useInvalidateNotificationCount,
} from "..";

export const useUpdateStatus = (
  config: UseMutationOptions<any, unknown, UpdateStatusPayload, unknown> = {},
) => {
  const invalidateNotificationCount = useInvalidateNotificationCount();

  return useMutation({
    mutationFn: NotificationService.updateStatus,
    ...config,
    onSuccess: (...args) => {
      config?.onSuccess?.(...args);
      invalidateNotificationCount();
    },
  });
};
