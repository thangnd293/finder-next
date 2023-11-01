"use client";

import { NewMatchedNotification, socket } from "@/lib/socket";

import { useInvalidateMatchRequest } from "@/service/matchRequest";
import {
  NotificationStatus,
  NotificationType,
  useInvalidateAllNotifications,
  useUpdateStatus,
} from "@/service/notification";
import { useCurrentUserID } from "@/service/user";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Button";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import congratulations from "./congratulations.json";

const Lottie = dynamic(() => import("lottie-react"));

const NotifyNewMatched = () => {
  const [newMatched, setNewMatched] = useState<NewMatchedNotification | null>(
    null,
  );
  const { currentUserID } = useCurrentUserID();
  const updateNotificationStatus = useUpdateStatus();
  const invalidateMatchRequest = useInvalidateMatchRequest();
  const invalidateAllNotifications = useInvalidateAllNotifications();

  const receiver = newMatched?.conversation?.members.find(
    (member) => member._id !== currentUserID,
  );

  useEffect(() => {
    if (!socket.connected) return;

    socket.on("newMatched", (newMatched) => {
      setNewMatched(newMatched);
      invalidateMatchRequest();
      invalidateAllNotifications(NotificationType.Matched);
    });
  }, [socket.connected]);

  const handleClick = () => {
    if (!newMatched) return;
    updateNotificationStatus.mutate({
      id: newMatched.notificationId,
      notification: {
        status: NotificationStatus.Seen,
      },
    });

    setNewMatched(null);
  };

  if (!newMatched) return null;

  return (
    <Modal
      className="justify-center p-6 md:justify-start"
      open={true}
      onOpenChange={() => {
        setNewMatched(null);
      }}
      withCloseButton={false}
    >
      <div className="flex w-full flex-col gap-5 text-center">
        <p className="text-4xl font-medium text-primary">BOOM!</p>

        <div className="mx-auto flex w-3/4">
          <div className="relative aspect-square flex-1 translate-x-3.5 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <CustomImage
              className="object-cover object-center"
              image={newMatched?.conversation?.members[0]?.images[0]}
              alt=""
              fill
            />
          </div>

          <div className="relative aspect-square flex-1 -translate-x-3.5 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <CustomImage
              className="object-cover object-center"
              image={newMatched?.conversation?.members[1].images[0]}
              alt=""
              fill
            />
          </div>
        </div>

        <p className="text-secondary-foreground">
          Bạn đã ghép đôi thành công với{" "}
          <span className="font-bold text-foreground">{receiver?.name}</span>!
          Hãy bắt đầu cuộc trò chuyện nào!
        </p>

        <Link
          href={`/app/messages/${newMatched?.conversation?._id}?tab=message`}
        >
          <Button className="mx-auto w-fit rounded-full" onClick={handleClick}>
            Nhắn tin ngay
          </Button>
        </Link>
      </div>
      <Lottie
        className="pointer-events-none fixed z-[1000] aspect-square h-screen w-full"
        animationData={congratulations}
        loop={false}
      />
    </Modal>
  );
};

export default NotifyNewMatched;
