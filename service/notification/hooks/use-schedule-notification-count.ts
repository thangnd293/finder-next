import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../notification-service";
import { useCallback } from "react";

export const useScheduleNotificationCount = () => {
  return useQuery({
    queryKey: ["schedule", "notifications", "count"],
    queryFn: NotificationService.getScheduleNotificationCount,
  });
};

export const useInvalidateScheduleNotificationCount = () => {
  const queryClient = useQueryClient();
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(["schedule", "notifications", "count"]);
  }, []);

  return invalidate;
};
