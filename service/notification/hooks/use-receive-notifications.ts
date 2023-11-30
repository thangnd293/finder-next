import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  FilterReceiveNotificationParams,
  NotificationService,
  useInvalidateNotifications,
} from "..";

export const useReceiveNotifications = (
  config: UseMutationOptions<
    any,
    unknown,
    FilterReceiveNotificationParams,
    unknown
  > = {},
) => {
  const invalidateScheduleNotificationCount = useInvalidateNotifications();

  return useMutation({
    mutationFn: NotificationService.receiveNotifications,
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      invalidateScheduleNotificationCount();
    },
  });
};
