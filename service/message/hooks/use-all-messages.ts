import { useQuery } from "@tanstack/react-query";
import { Message, MessageService } from "..";

const EMPTY_ARRAY: Message[] = [];

export const getAllMessagesKey = (conversationID: string) => [
  conversationID,
  "all",
  "messages",
];
export const useAllMessages = (conversationID: string) => {
  const { data, ...others } = useQuery({
    queryKey: getAllMessagesKey(conversationID),
    queryFn: () => MessageService.getAllMessages(conversationID),
    enabled: !!conversationID,
  });

  return {
    messages: data?.results ?? EMPTY_ARRAY,
    ...others,
  };
};
