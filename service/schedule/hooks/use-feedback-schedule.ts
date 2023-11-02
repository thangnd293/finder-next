import { useMutation } from "@tanstack/react-query";
import { ScheduleService } from "../schedule-service";

export const useFeedbackSchedule = () => {
  return useMutation({
    mutationFn: ScheduleService.feedbackSchedule,
  });
};
