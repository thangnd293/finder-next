import { SeenMessagePayload } from "@/lib/socket";
import {
  Conversation,
  getAllConversationsKey,
  useInvalidateAllConversations,
} from "@/service/conversation";
import { Message, MessageStatus, getAllMessagesKey } from "@/service/message";
import { List } from "@/types/http";
import { updateMessageStatusToSeen } from "@/utils/message";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useAllConversationStore from "./use-all-conversations-store";

const useMessageStore = () => {
  const queryClient = useQueryClient();
  const { updateLastMessageOfConversation, changeToHasMessageConversation } =
    useAllConversationStore();
  const invalidateAllConversations = useInvalidateAllConversations();

  const addMessage = useCallback(
    (message: Message, onFirstMessageSent?: () => void) => {
      const noMessageConversations = queryClient.getQueryData<
        List<Conversation>
      >(getAllConversationsKey(false));

      const hasMessageConversations = queryClient.getQueryData<
        List<Conversation>
      >(getAllConversationsKey(true));

      const isNewConversation =
        !noMessageConversations?.results.some(
          (c) => c._id === message.conversation,
        ) &&
        !hasMessageConversations?.results.some(
          (c) => c._id === message.conversation,
        );

      if (isNewConversation) {
        invalidateAllConversations(true);
        return;
      }

      const isNewMessage = !!noMessageConversations?.results.find(
        (matched) => matched._id === message.conversation,
      );

      if (isNewMessage) {
        changeToHasMessageConversation(message);
        onFirstMessageSent?.();
      } else updateLastMessageOfConversation(message);

      queryClient.setQueryData<List<Message>>(
        getAllMessagesKey(message.conversation),
        (oldStore) => {
          if (!oldStore) return;

          return {
            ...oldStore,
            results: [...oldStore.results, message],
          };
        },
      );
    },
    [queryClient, invalidateAllConversations],
  );

  const upsertMessage = useCallback(
    (message: Message) => {
      queryClient.setQueryData<List<Message>>(
        getAllMessagesKey(message.conversation),
        (oldStore) => {
          if (!oldStore) return;

          const messageExistsIndex = oldStore.results.findLastIndex(
            (oldMessage) => oldMessage.uuid === message.uuid,
          );
          const newStore = { ...oldStore };

          if (messageExistsIndex === -1) {
            newStore.results.push(message);
            return newStore;
          } else {
            newStore.results[messageExistsIndex] = message;
          }

          if (messageExistsIndex === newStore.results.length - 1)
            updateLastMessageOfConversation(message);
          return newStore;
        },
      );
    },
    [queryClient],
  );

  const markMessagesSeen = useCallback(
    (data: SeenMessagePayload) => {
      queryClient.setQueryData<List<Message>>(
        getAllMessagesKey(data.conversation),
        (oldStore) => {
          if (!oldStore) return;

          const newResults = updateMessageStatusToSeen(
            oldStore.results,
            data.sender,
            data.messageID,
            data.seenAt,
          );

          return {
            ...oldStore,
            results: newResults,
          };
        },
      );

      queryClient.setQueryData<List<Conversation>>(
        getAllConversationsKey(true),
        (oldStore) => {
          if (!oldStore) return;

          const conversationIndex = oldStore.results.findIndex(
            (conversation) => conversation._id === data.conversation,
          );

          if (conversationIndex === -1) return oldStore;

          const newResults = [...oldStore.results];

          newResults[conversationIndex].lastMessage.status = MessageStatus.SEEN;
          newResults[conversationIndex].lastMessage.seenAt = data.seenAt;

          return {
            ...oldStore,
            results: newResults,
          };
        },
      );
    },
    [queryClient],
  );

  return { addMessage, upsertMessage, markMessagesSeen };
};

export default useMessageStore;
