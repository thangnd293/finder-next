import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Conversation, ConversationService } from "..";

export const getConversationKey = (conversationID: string) => [
  "conversation",
  conversationID,
];

export const useConversationByID = <TData = Conversation>(
  conversationID: string,
  config: UseQueryOptions<Conversation, unknown, TData, string[]> = {},
) => {
  return useQuery({
    queryKey: getConversationKey(conversationID),
    queryFn: () => ConversationService.getConversation(conversationID),
    enabled: !!conversationID,
    ...config,
  });
};

export const useReceiver = (conversationID: string) => {
  const { data, isError, isLoading } = useConversationByID(conversationID, {
    select: (conversation) => conversation.user,
  });
  return {
    receiver: data,
    isError,
    isLoading,
  };
};
