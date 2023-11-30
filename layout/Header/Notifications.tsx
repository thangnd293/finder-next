"use client";

import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import ScrollArea from "@/components/ScrollArea";
import { ROUTE } from "@/constant/route";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationItem, {
  ScheduleDatingNotificationItem,
} from "./NotificationItem";
import {
  NotificationType,
  useNotificationCount,
  useNotifications,
  ScheduleDatingNotification,
  useInvalidateNotifications,
  Notification,
  NotificationStatus,
  NewMatchedNotification,
} from "@/service/notification";
import { useReceiveNotifications } from "@/service/notification/hooks/use-receive-notifications";
import LoadingView from "@/components/LoadingView";

const Notifications = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const { count } = useNotificationCount(notificationEvents);
  const invalidateNotifications = useInvalidateNotifications();

  const displayCount = count > 9 ? "9+" : count;

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

    receiveNotifications.mutate({
      payload: {
        status: NotificationStatus.Received,
      },
      types: notificationEvents,
      status: NotificationStatus.NotReceived,
    });
  };

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onReceive();
    }
    if (!isOpen) {
      invalidateNotifications(notificationEvents);
    }
    setIsOpenPopover(isOpen);
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <ActionIcon className="relative rounded-full" variant="light" size="lg">
          <FaBell size={18} />
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
        <NotificationList onClose={onOpenChange.bind(null, false)} />
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;

export const notificationEvents = [
  NotificationType.ScheduleDating,
  NotificationType.Like,
  NotificationType.SuperLike,
];

interface NotificationListProps {
  onClose?: () => void;
}
const NotificationList = ({ onClose }: NotificationListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useNotifications(notificationEvents);

  useEffect(() => {
    const target = bottomRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="py-1.5">
      {isLoading && <LoadingView />}
      {!isLoading && !!notifications?.pages?.length && (
        <ScrollArea className="max-h-[calc(100vh-150px)] w-full px-2">
          {notifications.pages.map((notification) => {
            let content: ReactNode = null;

            if ("schedule" in notification) {
              content = (
                <ScheduleDatingNotificationItem
                  {...(notification as ScheduleDatingNotification)}
                />
              );
            }
            return (
              <NotificationItem
                redirectUrl={createRedirectUrl(notification)}
                key={notification._id}
                {...notification}
                onClose={onClose}
              >
                {content}
              </NotificationItem>
            );
          })}
          <div ref={bottomRef} />
        </ScrollArea>
      )}

      {!isLoading && !notifications?.pages?.length && (
        <div className="flex flex-col items-center justify-center gap-2 py-3">
          <Image width={80} height={80} src="/images/empty.png" alt="" />
          <p className="text-center font-medium text-secondary-foreground">
            Hiện không có thông báo mới
          </p>
        </div>
      )}
    </div>
  );
};

const createRedirectUrl = (notification: Notification) => {
  switch (notification.type) {
    case NotificationType.InviteScheduleDating:
    case NotificationType.AcceptScheduleDating:
    case NotificationType.CancelScheduleDating:
    case NotificationType.DeclineScheduleDating:
      return `${ROUTE.DATING_INVITATION}?id=${
        (notification as ScheduleDatingNotification).schedule
      }`;
    case NotificationType.Like:
      return ROUTE.LIKED_YOU;
    case NotificationType.PositiveReview:
      return `${ROUTE.MESSAGES}/${
        (notification as NewMatchedNotification).conversation._id
      }`;
    default:
      return "";
  }
};
