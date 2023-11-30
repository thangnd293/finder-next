import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../notification-service";
import { NotificationType } from "..";

export const getNotificationCountKey = (types?: NotificationType[]) => [
  "notifications",
  "count",
  ...(types ?? []),
];

export const useNotificationCount = (types?: NotificationType[]) => {
  const { data, ...others } = useQuery({
    queryKey: getNotificationCountKey(),
    queryFn: () => NotificationService.getNotificationCount(types),
  });
  return {
    count: data?.data.totalNewNotification ?? 0,
    totalCount: data?.data.totalCount ?? 0,
    ...others,
  };
};

export const useInvalidateNotificationCount = () => {
  const queryClient = useQueryClient();
  return (types?: NotificationType[]) => {
    queryClient.invalidateQueries(getNotificationCountKey(types));
  };
};
