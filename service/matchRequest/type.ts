import { User } from "../user";

export interface MatchRequest {
  _id: string;
  sender: User;
  createdAt: string;
  updatedAt: string;
}
