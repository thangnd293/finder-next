import { useQuery } from "@tanstack/react-query";
import { Conversation, ConversationService } from "..";
import { useCallback } from "react";

export const getConversationKey = (conversationID: string) => [
  "conversation",
  conversationID,
];

export const useConversationByID = (conversationID: string) => {
  const { data, ...others } = useQuery({
    queryKey: getConversationKey(conversationID),
    queryFn: () => ConversationService.getConversation(conversationID),
    enabled: !!conversationID,
  });

  return {
    conversation: data,
    ...others,
  };
};

export const useReceiver = (conversationID: string) => {
  const { data, ...others } = useQuery({
    queryKey: getConversationKey(conversationID),
    queryFn: () => ConversationService.getConversation(conversationID),
    select: useCallback((conversation: Conversation) => conversation.user, []),
    enabled: !!conversationID,
  });

  return {
    receiver: data,
    ...others,
  };
};
