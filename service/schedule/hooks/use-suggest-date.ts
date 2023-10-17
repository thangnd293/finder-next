import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ScheduleService, SuggestDatePayload } from "../schedule-service";

export const useSuggestDate = (
  config: UseMutationOptions<any, unknown, SuggestDatePayload, unknown> = {},
) => {
  return useMutation({
    mutationFn: ScheduleService.suggestDate,
    ...config,
  });
};
