import { Schedule } from "../schedule";
import { User } from "../user";

export enum NotificationType {
  System = "System",
  Message = "Message",
  Promotion = "Promotion",
  Like = "Like",
  Matched = "Matched",
  ScheduleDating = "Invite schedule dating",
  CancelScheduleDating = "Cancel schedule dating",
  AcceptScheduleDating = "Accept schedule dating",
  DeclineScheduleDating = "Decline schedule dating",
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
  receiver: string;
  sender: User;
  schedule: Schedule;
  createdAt: string;
}
