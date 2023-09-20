export enum NotificationType {
  System = "System",
  Message = "Message",
  Promotion = "Promotion",
  Like = "Like",
  Matched = "Matched",
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
  sender: string;
  conversation: string;
}
