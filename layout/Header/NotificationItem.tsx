"use client";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  Notification,
  NotificationStatus,
  NotificationType,
  ScheduleDatingNotification,
  useSeenNotification,
} from "@/service/notification";
import { useActionSchedule } from "@/service/schedule";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";

interface NotificationItemProps extends Notification {
  redirectUrl: string;
  onClose?: () => void;
}
const NotificationItem = ({
  _id,
  sender,
  type,
  createdAt,
  status,
  redirectUrl,
  children,
  onClose,
}: PropsWithChildren<NotificationItemProps>) => {
  const seenNotification = useSeenNotification();

  const onClick = () => {
    onClose?.();

    if (status === NotificationStatus.Seen) return;

    seenNotification.mutate(_id);
  };

  return (
    <Link
      href={redirectUrl}
      className="relative flex cursor-pointer gap-2.5 rounded-md px-4 py-1.5 hover:bg-background-50 [&~&]:mt-2"
      onClick={onClick}
    >
      <Avatar className="flex-shrink-0" src={sender.images[0]?.url} />
      <div>
        <p
          className={cn("text-sm opacity-70", {
            "opacity-100": status !== NotificationStatus.Seen,
          })}
        >
          <span className="font-semibold">{sender.name}</span> {message[type]}
        </p>
        <p
          className={cn("text-[13px] text-secondary-foreground", {
            "text-primary": status !== NotificationStatus.Seen,
          })}
        >
          {createdAt.fromNow()}
        </p>
        {children}
      </div>
      {status !== NotificationStatus.Seen && (
        <div className="absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
      )}
    </Link>
  );
};

export default NotificationItem;

export const ScheduleDatingNotificationItem = ({
  schedule,
  type,
}: ScheduleDatingNotification) => {
  const [scheduleStatus, setScheduleStatus] = useState<
    "idle" | "accepted" | "rejected"
  >("idle");
  const acceptSchedule = useActionSchedule("accept");
  const declineSchedule = useActionSchedule("decline");

  const onAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    acceptSchedule.mutate(schedule);
    setScheduleStatus("accepted");
  };

  const onReject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    declineSchedule.mutate(schedule);
    setScheduleStatus("rejected");
  };

  return (
    <>
      {type === NotificationType.InviteScheduleDating &&
        scheduleStatus === "idle" && (
          <div
            className="mt-2 flex justify-end gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              loading={declineSchedule.isLoading}
              variant="ghost"
              size="sm"
              onClick={onReject}
            >
              Từ chối
            </Button>
            <Button
              loading={acceptSchedule.isLoading}
              size="sm"
              onClick={onAccept}
            >
              Chấp nhận
            </Button>
          </div>
        )}

      {type === NotificationType.InviteScheduleDating &&
        scheduleStatus !== "idle" && (
          <div className="mt-2 text-[13px] text-secondary-foreground">
            {scheduleStatus === "accepted" && "Đã chấp nhận lời mời"}
            {scheduleStatus === "rejected" && "Đã từ chối lời mời"}
          </div>
        )}
    </>
  );
};

const message: Record<Partial<NotificationType>, string> = {
  [NotificationType.AcceptScheduleDating]:
    "đã chấp nhận lời mời hẹn hò của bạn",
  [NotificationType.DeclineScheduleDating]: "đã từ chối lời mời hẹn hò của bạn",
  [NotificationType.CancelScheduleDating]: "đã hủy lời mời hẹn hò của bạn",
  [NotificationType.InviteScheduleDating]: "đã gửi lời mời hẹn hò cho bạn",
  [NotificationType.PositiveReview]: "có cảm nhận tích cực về bạn",
  [NotificationType.System]: "",
  [NotificationType.Message]: "",
  [NotificationType.Promotion]: "",
  [NotificationType.Like]: "đã thích bạn",
  [NotificationType.SuperLike]: "đã siêu thích bạn",
  [NotificationType.Matched]: "",
  [NotificationType.ScheduleDating]: "",
};
