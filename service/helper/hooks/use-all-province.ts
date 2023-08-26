import { useQuery } from "@tanstack/react-query";
import { HelperService, Province } from "..";

const EMPTY_PROVINCE: Province[] = [];

export const useAllProvince = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["province"],
    queryFn: HelperService.getAllProvince,
  });

  return {
    provinces: data ?? EMPTY_PROVINCE,
    ...rest,
  };
};
