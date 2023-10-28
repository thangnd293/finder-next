import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  NotificationService,
  useInvalidateScheduleNotificationCount,
} from "..";

export const useReceiveNotifications = (
  config: UseMutationOptions<any, unknown, void, unknown> = {},
) => {
  const invalidateScheduleNotificationCount =
    useInvalidateScheduleNotificationCount();

  return useMutation({
    mutationFn: NotificationService.receiveNotifications,
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      invalidateScheduleNotificationCount();
    },
  });
};
