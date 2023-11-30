import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AllNotificationQueryParams,
  NotificationService,
} from "../notification-service";
import { Notification } from "../type";

const EMPTY_ARRAY: Notification[] = [];

export const getAllNotificationKey = ({
  types,
  status,
}: AllNotificationQueryParams = {}) => [
  "notifications",
  "all",
  ...(types ?? []),
  status,
];

export const useAllNotifications = (query: AllNotificationQueryParams = {}) => {
  const { data, ...others } = useQuery({
    queryKey: getAllNotificationKey(query),
    queryFn: () => NotificationService.getAllNotifications(query),
  });

  return {
    notifications: data?.results ?? EMPTY_ARRAY,
    ...others,
  };
};

export const useInvalidateAllNotifications = () => {
  const queryClient = useQueryClient();
  return (query: AllNotificationQueryParams = {}) => {
    queryClient.invalidateQueries(getAllNotificationKey(query));
  };
};
