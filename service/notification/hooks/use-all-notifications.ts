import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../notification-service";
import { NotificationType } from "../type";

const EMPTY_ARRAY: any[] = [];

export const getAllNotificationKey = (type: NotificationType) => [
  "notifications",
  "all",
  type,
];

export const useAllNotifications = (type: NotificationType) => {
  const { data, ...others } = useQuery({
    queryKey: getAllNotificationKey(type),
    queryFn: () => NotificationService.getAllNotifications(type),
  });

  return {
    notifications: data ?? EMPTY_ARRAY,
    ...others,
  };
};

export const useInvalidateAllNotifications = () => {
  const queryClient = useQueryClient();
  return (type: NotificationType) => {
    queryClient.invalidateQueries(getAllNotificationKey(type));
  };
};
