import { Socket } from "socket.io-client";

import { socket } from "@/lib/socket";
import SimplePeer from "simple-peer";
import { Image } from "@/service/user";

export type CheckRoomMessage = {
  roomId: string;
};

export type CheckRoomMessageResponse =
  | {
      status: false;
    }
  | { status: true; offer: SimplePeer.SignalData };

export type OfferMessage = {
  roomId: string;
  offer: SimplePeer.SignalData;
};

export type OfferMessageResponse = {
  roomId: string;
  onwner: {
    name: string;
    image: Image;
  };
};

export type AnswerMessage = {
  roomId: string;
  offer: SimplePeer.SignalData;
};

export type AnswerMessageResponse = {
  offer: SimplePeer.SignalData;
};

interface ClientToServerEvents {
  checkRoom: (payload: CheckRoomMessage) => void;
  offer: (payload: OfferMessage) => void;
  answer: (payload: AnswerMessage) => void;
  reject: (remoteId: string) => void;
  hangup: () => void;
  verifyFirstConnection: () => void;
}

interface ServerToClientEvents {
  checkRoom: (payload: CheckRoomMessageResponse) => void;
  offer: (payload: OfferMessageResponse) => void;
  answer: (payload: AnswerMessageResponse) => void;
  reject: () => void;
  hangup: () => void;
  verifyFirstConnection: () => void;
}
export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>;
export const socketInstance = (): ISocket => socket;
