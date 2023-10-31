import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { CreateSchedulePayload, ScheduleService } from "../schedule-service";

export const useCreateSchedule = (
  config: UseMutationOptions<any, unknown, CreateSchedulePayload, unknown> = {},
) =>
  useMutation(
    (payload: CreateSchedulePayload) => ScheduleService.createSchedule(payload),
    config,
  );
