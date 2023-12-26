import { Message } from "@/service/message";
import { Notification } from "@/service/notification";
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
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "",
  {
    autoConnect: false,
    auth: {
      token: accessToken,
    },
  },
);
