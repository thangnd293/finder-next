import { flatData } from "@/utils/helper";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FilterScheduleArgs, ScheduleService } from "../schedule-service";
import { Schedule } from "../type";

export const useSchedules = (args: Omit<FilterScheduleArgs, "page">) => {
  return useInfiniteQuery({
    queryKey: ["schedule", "get", "all", args],
    queryFn: ({ pageParam = 1 }) =>
      ScheduleService.getSchedules({
        ...args,
        page: pageParam.toString(),
      }),
    getNextPageParam: ({ pagination: { nextPage } }) => {
      return nextPage;
    },
    select: flatData<Schedule>,
  });
};
