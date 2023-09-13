import { useQuery } from "@tanstack/react-query";
import { ConversationService } from "../conversation-service";
import { Conversation } from "../type";

const EMPTY_ARRAY: Conversation[] = [];

export const getAllConversationsKey = (hasMessage: boolean) => ["conversations", hasMessage];
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
