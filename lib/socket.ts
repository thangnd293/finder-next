import { Conversation } from "@/service/conversation";
import { Message } from "@/service/message";
import { Notification } from "@/service/notification";
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

interface ServerToClientEvents {
  newMessage: (message: Message) => void;
  sentMessage: (message: Message) => void;
  seenMessage: (payload: SeenMessagePayload) => void;
  receivedMessage: (message: Message) => void;
  newNotification: (notification: Notification) => void;
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
  "https://finder.sohe.in",
  {
    autoConnect: false,
    auth: {
      token: accessToken,
    },
  },
);
