import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { NotificationService, NotificationStatus } from "..";

export const useSeenNotification = (
  config: UseMutationOptions<any, unknown, string, unknown> = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      NotificationService.updateStatus({
        id,
        status: NotificationStatus.Seen,
      }),
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
