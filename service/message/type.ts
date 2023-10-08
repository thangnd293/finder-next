import { Image } from "../user";

export enum MessageType {
  Text = "Text",
  Image = "Image",
  Call = "Call",
}

interface CallMessage {
  type: MessageType.Call;
  text: string;
  images?: never;
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

interface MessageSending {
  status: MessageStatus.SENDING;
  seenAt?: never;
}

interface MessageReceived {
  status: MessageStatus.RECEIVED;
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
} & (ImageMessage | TextMessage | CallMessage) &
  (MessageSeen | MessageSent | MessageSending | MessageReceived);

export enum MessageStatus {
  SENDING = "Sending",
  SEEN = "Seen",
  SENT = "Sent",
  RECEIVED = "Received",
}
