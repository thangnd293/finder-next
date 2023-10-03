import { useQuery } from "@tanstack/react-query";
import { Tag, TagService, TagType } from "..";

const EMPTY_TAGS: Tag[] = [];

export const useTagsByType = (type: TagType) => {
  const { data, ...others } = useQuery({
    queryKey: ["tags", type],
    queryFn: () => TagService.getTagsByType(type),
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return {
    tags: data?.results ?? EMPTY_TAGS,
    ...others,
  };
};
