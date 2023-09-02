import { useCallback } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { User, UserService } from "..";
import { List } from "@/types/http";

export const getRecommendedUserKey = () => ["users", "recommended"];

export const useRecommendedUsers = () => {
  const flatData = useCallback(
    (data: InfiniteData<List<User>>) => ({
      pages: data.pages.flatMap((group) => group.results),
      pageParams: data.pageParams,
    }),
    [],
  );

  return useInfiniteQuery({
    queryKey: getRecommendedUserKey(),
    queryFn: ({ pageParam = 1 }) =>
      UserService.getRecommendedUsers(pageParam, 5),
    getNextPageParam: ({ pagination: { currentPage, totalPage } }) => {
      if (currentPage < totalPage) {
        return currentPage + 1;
      }

      return null;
    },
    select: flatData,
  });
};
