import { Image } from "../user";

export enum MessageType {
  Text = "Text",
  Image = "Image",
}

interface ImageMessage {
  type: MessageType.Image;
  images: Image[];
  text?: never;
}

interface TextMessage {
  type: MessageType.Text;
  text: string;
  images?: never;
}

interface MessageSeen {
  seenAt: string;
  status: MessageStatus.SEEN;
}

interface MessageSent {
  status: MessageStatus.SENT;
  seenAt?: never;
}

interface MessageSending {
  status: MessageStatus.SENDING;
  seenAt?: never;
}

export type Message = {
  _id: string;
  sender: string;
  receiver: string;
  conversation: string;
  createdAt: string;
  updatedAt: string;
  uuid?: string;
} & (ImageMessage | TextMessage) &
  (MessageSeen | MessageSent | MessageSending);

export enum MessageStatus {
  SENDING = "Sending",
  SEEN = "Seen",
  SENT = "Sent",
}
