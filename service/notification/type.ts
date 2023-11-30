import { Conversation } from "../conversation";
import { User } from "../user";

export enum NotificationType {
  System = "System",
  Message = "Message",
  Promotion = "Promotion",
  Like = "Like",
  SuperLike = "Super like",
  Matched = "Matched",
  ScheduleDating = "Schedule dating",
  InviteScheduleDating = "Invite schedule dating",
  CancelScheduleDating = "Cancel schedule dating",
  AcceptScheduleDating = "Accept schedule dating",
  DeclineScheduleDating = "Decline schedule dating",
  PositiveReview = "Positive review",
}

export enum NotificationStatus {
  Seen = "Seen",
  NotSeen = "Not seen",
  Received = "Received",
  NotReceived = "Not received",
}

export interface Notification {
  _id: string;
  type: NotificationType;
  status: NotificationStatus;
  receiver: User;
  sender: User;
  createdAt: string;
  description: string;
}

export interface ScheduleDatingNotification extends Notification {
  schedule: string;
}

export interface NewMatchedNotification extends Notification {
  conversation: Conversation;
}

export interface MatchedNotification extends Notification {
  conversation: string;
}
