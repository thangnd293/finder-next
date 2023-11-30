import { flatData } from "@/utils/helper";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { User, UserService } from "..";

export const getRecommendedUserKey = () => ["users", "recommended"];

export const useRecommendedUsers = () => {
  return useInfiniteQuery({
    queryKey: getRecommendedUserKey(),
    queryFn: ({ pageParam = 1 }) =>
      UserService.getRecommendedUsers(pageParam, 10),
    getNextPageParam: ({ pagination: { currentPage, totalPage } }) => {
      if (currentPage < totalPage) {
        return 1;
      }

      return null;
    },
    select: flatData<User>,
    cacheTime: 0,
    staleTime: 0,
  });
};

export const useInvalidateRecommendedUsers = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(getRecommendedUserKey());
  }, [queryClient]);
};
