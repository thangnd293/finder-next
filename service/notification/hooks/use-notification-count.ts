import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../notification-service";

export const getNotificationCountKey = () => ["notificationCount"];

export const useNotificationCount = () => {
  const { data, ...others } = useQuery({
    queryKey: getNotificationCountKey(),
    queryFn: () => NotificationService.getNotificationCount(),
  });
  return {
    count: data?.data.totalCount ?? 0,
    ...others,
  };
};

export const useInvalidateNotificationCount = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries(getNotificationCountKey());
  };
};
