import { useQuery } from "@tanstack/react-query";
import { MatchRequestService } from "..";

export const getMatchRequestCountKey = () => ["matchRequests", "count"];

export const useMatchRequestCount = () => {
  const { data, ...others } = useQuery({
    queryKey: getMatchRequestCountKey(),
    queryFn: () => MatchRequestService.getMatchRequestCount(),
  });

  return {
    data: data?.data,
    ...others,
  };
};

