import { Conversation } from "@/service/conversation";
import { Message } from "@/service/message";
import { User } from "@/service/user";
import { getCookie } from "@/utils/cookie";
import { Socket, io } from "socket.io-client";

const accessToken = getCookie("accessToken");

export interface SeenMessagePayload {
  conversation: string;
  seenAt: string;
  messageID: string;
  sender: string;
  receiver: string;
}

export interface NewMatchedNotification {
  conversation: Conversation;
  notificationId: string;
}

interface ServerToClientEvents {
  newMessage: (message: Message) => void;
  sentMessage: (message: Message) => void;
  seenMessage: (payload: SeenMessagePayload) => void;
  newMatched: (payload: NewMatchedNotification) => void;
  newMatchRequest: (user: User) => void;
  receivedMessage: (message: Message) => void;
}

interface ClientToServerEvents {
  verifyFirstConnection: () => void;
  seenMessage: (
    payload: SeenMessagePayload,
    cb: (data: SeenMessagePayload) => void,
  ) => void;
  sendMessage: (message: Message) => void;
  receivedMessage: (message: Message) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
  {
    autoConnect: false,
    auth: {
      token: accessToken,
    },
  },
);
