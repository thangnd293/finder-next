import { useQuery } from "@tanstack/react-query";
import { MatchRequest, MatchRequestService } from "..";

const EMPTY_ARRAY: MatchRequest[] = [];

export const getMatchRequestKey = () => ["matchRequests", status];

export const useMatchRequests = () => {
  const { data, ...others } = useQuery({
    queryKey: getMatchRequestKey(),
    queryFn: () => MatchRequestService.getMatchRequests(),
  });

  return {
    matchRequests: data?.results ?? EMPTY_ARRAY,
    ...others,
  };
};
