import { flatData } from "@/utils/helper";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  NotificationQueryParams,
  NotificationService,
} from "../notification-service";
import { Notification, NotificationType } from "../type";

export const getNotificationKey = ({ types }: NotificationQueryParams = {}) => [
  "notifications",
  ...(types ?? []),
];

export const useNotifications = (types?: NotificationType[]) => {
  return useInfiniteQuery({
    queryKey: getNotificationKey({ types }),
    queryFn: ({ pageParam = 1 }) =>
      NotificationService.getNotifications({
        types,
        page: pageParam,
      }),
    getNextPageParam: ({ pagination: { nextPage } }) => {
      return nextPage;
    },
    select: flatData<Notification>,
    refetchOnMount: true,
  });
};

export const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();
  return useCallback(
    (types?: NotificationType[]) => {
      queryClient.invalidateQueries(getNotificationKey({ types }));
    },
    [queryClient],
  );
};
