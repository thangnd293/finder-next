import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Conversation, ConversationService } from "..";
import { useCurrentUserID } from "@/service/user";

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

export const useInvalidateConversationByID = () => {
  const queryClient = useQueryClient();

  return (conversationID: string) => {
    queryClient.invalidateQueries(getConversationKey(conversationID));
  };
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

export const useSafeModeStatus = (conversationID: string) => {
  const { currentUserID } = useCurrentUserID();
  const { data, isError, isLoading } = useConversationByID(conversationID, {
    select: (conversation) =>
      !!currentUserID && conversation.enableSafeMode.includes(currentUserID),
  });
  return {
    isEnableSafeMode: data,
    isError,
    isLoading,
  };
};
