import { flatData } from "@/utils/helper";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { FilterScheduleArgs, ScheduleService } from "../schedule-service";
import { Schedule } from "../type";
import { useCallback } from "react";

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

export const useInvalidateSchedules = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(["schedule", "get", "all"]);
  }, [queryClient]);
};
