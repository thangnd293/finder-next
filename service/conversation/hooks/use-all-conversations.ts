import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ConversationService } from "../conversation-service";
import { Conversation } from "../type";
import { useCallback } from "react";

const EMPTY_ARRAY: Conversation[] = [];

export const getAllConversationsKey = (hasMessage: boolean) => [
  "conversations",
  hasMessage,
];

export const useAllConversations = (hasMessage: boolean) => {
  const { data, ...others } = useQuery({
    queryKey: getAllConversationsKey(hasMessage),
    queryFn: () => ConversationService.getAllConversations(hasMessage),
  });

  return {
    conversations: data?.results ?? EMPTY_ARRAY,
    ...others,
  };
};

export const useInvalidateAllConversations = () => {
  const queryClient = useQueryClient();
  return useCallback(
    (hasMessage: boolean) => {
      queryClient.invalidateQueries(getAllConversationsKey(hasMessage));
    },
    [queryClient],
  );
};
