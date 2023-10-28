import { Data } from "@/types/http";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Schedule } from "..";
import { ScheduleAction, ScheduleService } from "../schedule-service";

export const useActionSchedule = (
  action: ScheduleAction,
  config: UseMutationOptions<Data<Schedule>, unknown, string, unknown> = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ScheduleService.actionSchedule({ action, id }),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(["schedule"]);
      config?.onSuccess?.(...args);
    },
  });
};
