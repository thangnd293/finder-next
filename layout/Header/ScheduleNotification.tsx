"use client";

import ActionIcon from "@/components/ActionIcon";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import ScrollArea from "@/components/ScrollArea";
import { ROUTE } from "@/constant/route";
import { cn } from "@/lib/utils";
import {
  Notification,
  NotificationStatus,
  useUpdateStatus,
} from "@/service/notification";
import { useReceiveNotifications } from "@/service/notification/hooks/use-receive-notifications";
import {
  useInvalidateScheduleNotifications,
  useScheduleNotification,
} from "@/service/notification/hooks/use-schedule-notification";
import { useScheduleNotificationCount } from "@/service/notification/hooks/use-schedule-notification-count";
import { useActionSchedule } from "@/service/schedule";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";

const ScheduleNotification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const { data } = useScheduleNotificationCount();

  const count = data?.data.totalCount ?? 0;

  const displayCount = count > 9 ? "9+" : count;

  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useScheduleNotification();
  const receiveNotifications = useReceiveNotifications();

  const onViewAll = () => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? []),
    );

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${ROUTE.DATING_INVITATION}${query}`);
    setIsOpenPopover(false);
  };

  const onReceive = () => {
    if (count === 0) return;

    receiveNotifications.mutate();
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <ActionIcon
          className="relative rounded-full"
          variant="light"
          size="lg"
          onClick={onReceive}
        >
          <FaRegEnvelope size={18} />
          {count > 0 && (
            <div className="absolute -right-1.5 -top-1.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-red-500 text-sm text-white">
              {displayCount}
            </div>
          )}
        </ActionIcon>
      </PopoverTrigger>
      <PopoverContent className="w-80 !p-0">
        <h2 className="flex items-center justify-between border-b px-4 py-3 text-lg font-semibold">
          <span>Thông báo{count > 0 && ` (${count})`}</span>
          <Button variant="link" size="sm" onClick={onViewAll}>
            Lời mời của bạn
          </Button>
        </h2>
        <div className="py-1.5">
          {!!notifications?.pages?.length ? (
            <ScrollArea className="max-h-[calc(100vh-150px)] w-full px-2">
              {notifications.pages.map((schedule) => (
                <ScheduleItem key={schedule._id} {...schedule} />
              ))}
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-3">
              <Image width={80} height={80} src="/images/empty.png" alt="" />
              <p className="text-center font-medium text-secondary-foreground">
                Hiện không có lời mời
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ScheduleNotification;

interface ScheduleItemProps extends Notification {}

const ScheduleItem = ({
  _id,
  sender,
  type,
  createdAt,
  status,
  schedule,
}: ScheduleItemProps) => {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams?.toString());
  params.set("id", schedule._id);

  const [scheduleStatus, setScheduleStatus] = useState<
    "idle" | "accepted" | "rejected"
  >("idle");
  const acceptSchedule = useActionSchedule("accept");
  const declineSchedule = useActionSchedule("decline");
  const updateStatus = useUpdateStatus();
  const invalidateScheduleNotifications = useInvalidateScheduleNotifications();

  const onAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    acceptSchedule.mutate(schedule._id);
    setScheduleStatus("accepted");
  };

  const onReject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    declineSchedule.mutate(schedule._id);
    setScheduleStatus("rejected");
  };

  const onClick = () => {
    if (status === NotificationStatus.Seen) return;

    updateStatus.mutate(
      {
        id: _id,
        notification: {
          status: NotificationStatus.Seen,
        },
      },
      {
        onSuccess: invalidateScheduleNotifications,
      },
    );
  };

  return (
    <Link
      href={{
        pathname: ROUTE.DATING_INVITATION,
        query: params.toString(),
      }}
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
        {type === "Invite schedule dating" && scheduleStatus === "idle" && (
          <div className="mt-2 flex justify-end gap-2">
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

        {type === "Invite schedule dating" && scheduleStatus !== "idle" && (
          <div className="mt-2 text-[13px] text-secondary-foreground">
            {scheduleStatus === "accepted" && "Đã chấp nhận lời mời"}
            {scheduleStatus === "rejected" && "Đã từ chối lời mời"}
          </div>
        )}
      </div>
      {status !== NotificationStatus.Seen && (
        <div className="absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
      )}
    </Link>
  );
};

const message: Record<string, string> = {
  "Accept schedule dating": "đã chấp nhận lời mời hẹn hò của bạn",
  "Decline schedule dating": "đã từ chối lời mời hẹn hò của bạn",
  "Cancel schedule dating": "đã hủy lời mời hẹn hò của bạn",
  "Invite schedule dating": "đã gửi lời mời hẹn hò cho bạn",
};
