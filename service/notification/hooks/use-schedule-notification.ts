import { List } from "@/types/http";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { NotificationService } from "../notification-service";
import { Notification } from "../type";

export const useScheduleNotification = () => {
  const flatData = useCallback(
    (data: InfiniteData<List<Notification>>) => ({
      pages: data.pages.flatMap((group) => group.results),
      pageParams: data.pageParams,
    }),
    [],
  );

  return useInfiniteQuery({
    queryKey: ["schedule", "notifications"],
    queryFn: ({ pageParam = 1 }) =>
      NotificationService.getScheduleNotification(pageParam),
    getNextPageParam: ({ pagination: { currentPage, totalPage } }) => {
      if (currentPage < totalPage) {
        return 1;
      }

      return null;
    },
    select: flatData,
  });
};

export const useInvalidateScheduleNotifications = () => {
  const queryClient = useQueryClient();
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(["schedule", "notifications"]);
  }, []);

  return invalidate;
};
