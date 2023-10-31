import { useQuery } from "@tanstack/react-query";
import { ScheduleService } from "../schedule-service";

export const useScheduleDetail = (id: string) => {
  return useQuery({
    queryKey: ["get", "schedule detail", id],
    queryFn: () => ScheduleService.getSchedulesDetail(id),
    enabled: !!id,
  });
};
