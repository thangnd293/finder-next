import { Message } from "@/service/message";
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
}

interface ClientToServerEvents {
  verifyFirstConnection: () => void;
  seenMessage: (
    payload: SeenMessagePayload,
    cb: (data: SeenMessagePayload) => void,
  ) => void;
  sendMessage: (message: Message, cb: (data: Message) => void) => void;
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
