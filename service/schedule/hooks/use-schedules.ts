import { List } from "@/types/http";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { FilterScheduleArgs, ScheduleService } from "../schedule-service";
import { Schedule } from "../type";

export const useSchedules = (args: Omit<FilterScheduleArgs, "page">) => {
  const flatData = useCallback(
    (data: InfiniteData<List<Schedule>>) => ({
      pages: data.pages.flatMap((group) => group.results),
      pageParams: data.pageParams,
    }),
    [],
  );

  return useInfiniteQuery({
    queryKey: ["schedule", "get", "all", args],
    queryFn: ({ pageParam = 1 }) =>
      ScheduleService.getSchedules({
        ...args,
        page: pageParam.toString(),
      }),
    getNextPageParam: ({ pagination: { currentPage, totalPage } }) => {
      if (currentPage < totalPage) {
        return 1;
      }

      return null;
    },
    select: flatData,
  });
};
