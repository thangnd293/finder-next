import { v4 as uuidv4 } from "uuid";

import { Message, MessageStatus, MessageType } from "@/service/message";
import { Image } from "@/service/user";

export const updateMessageStatusToSeen = (
  messages: Message[],
  sender: string,
  messageIDJustSeen: string,
  seenAt: string,
) => {
  const _messages = [...messages];

  const lastMessageSeenIndex = _messages.findLastIndex(
    (message) =>
      message.status === MessageStatus.SEEN && message.sender !== sender,
  );

  const messageJustSeenIndex = _messages.findLastIndex(
    (message) => message._id === messageIDJustSeen,
  );

  if (lastMessageSeenIndex === -1 || messageJustSeenIndex === -1)
    return messages;

  for (let i = lastMessageSeenIndex + 1; i <= messageJustSeenIndex; i++) {
    if (_messages[i].sender === sender) {
      _messages[i].status = MessageStatus.SEEN;
      _messages[i].seenAt = seenAt;
    }
  }

  return _messages;
};

type CreateTempleMessageArgs = {
  sender: string;
  conversation: string;
  receiver: string;
} & (
  | {
      type: MessageType.Text;
      text: string;
      imageUrls?: never;
    }
  | {
      type: MessageType.Image;
      text?: never;
      imageUrls: Image[];
    }
);

export const createTempleMessage = ({
  sender,
  receiver,
  conversation,
  type,
  text,
  imageUrls,
}: CreateTempleMessageArgs): Message => {
  const id = uuidv4();

  const common = {
    _id: id,
    uuid: id,
    status: MessageStatus.SENDING,
    sender,
    receiver,
    conversation,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as const;

  if (type === MessageType.Text) {
    return {
      ...common,
      type,
      text,
    };
  }

  return {
    ...common,
    type,
    images: imageUrls,
  };
};
