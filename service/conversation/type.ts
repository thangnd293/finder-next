import { Message } from "../message";
import { User } from "../user";

export interface Conversation {
  _id: string;
  user: User;
  lastMessage: Message;
  members: User[];
  createdAt: string;
  type: string;
  enableSafeMode: string[];
}

export interface ChangeSafeModePayload {
  enable: boolean;
  conversation: string;
}
