import { Conversation, getAllConversationsKey } from "@/service/conversation";
import { Message } from "@/service/message";
import { List } from "@/types/http";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useAllConversationStore = () => {
  const queryClient = useQueryClient();

  const updateLastMessageOfConversation = useCallback(
    (message: Message) => {
      queryClient.setQueryData<List<Conversation>>(
        getAllConversationsKey(true),
        (oldStore) => {
          if (!oldStore) return;

          let newResults = [...oldStore.results];

          const conversationIndex = newResults.findIndex(
            (conversation) => conversation._id === message.conversation,
          );

          if (conversationIndex === -1) return oldStore;

          const conversation = newResults[conversationIndex];
          conversation.lastMessage = message;

          newResults = [
            ...newResults.splice(conversationIndex, 1),
            ...newResults,
          ];

          return {
            ...oldStore,
            results: newResults,
          };
        },
      );
    },
    [queryClient],
  );

  const changeToHasMessageConversation = useCallback(
    (message: Message) => {
      const noMessageConversation = queryClient
        .getQueryData<List<Conversation>>(getAllConversationsKey(false))
        ?.results.find((matched) => matched._id === message.conversation);

      if (!noMessageConversation) return;

      const newConversation: Conversation = {
        ...noMessageConversation,
        lastMessage: message,
      };

      queryClient.setQueryData<List<Conversation>>(
        getAllConversationsKey(false),
        (oldStore) => {
          if (!oldStore) return;

          return {
            ...oldStore,
            results: oldStore.results.filter(
              (conversation) => conversation._id !== message.conversation,
            ),
          };
        },
      );

      queryClient.setQueryData<List<Conversation>>(
        getAllConversationsKey(true),
        (oldStore) => {
          if (!oldStore) return;

          return {
            ...oldStore,
            results: [newConversation, ...oldStore.results],
          };
        },
      );
    },
    [queryClient],
  );

  return { updateLastMessageOfConversation, changeToHasMessageConversation };
};

export default useAllConversationStore;
