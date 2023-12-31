"use client";

import { socket } from "@/lib/socket";

import { useInvalidateAllConversations } from "@/service/conversation";
import { useInvalidateMatchRequest } from "@/service/matchRequest";
import {
  NewMatchedNotification,
  Notification,
  NotificationType,
  useSeenNotification,
} from "@/service/notification";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Button";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import congratulations from "./congratulations.json";
import { useInvalidateSchedules } from "@/service/schedule";

const Lottie = dynamic(() => import("lottie-react"));

const NotifyNewMatched = () => {
  const [newMatched, setNewMatched] = useState<NewMatchedNotification | null>(
    null,
  );
  const seenNotification = useSeenNotification();
  const invalidateMatchRequest = useInvalidateMatchRequest();
  const invalidateConversations = useInvalidateAllConversations();
  const invaladateSchedules = useInvalidateSchedules();

  useEffect(() => {
    if (!socket.connected) return;

    const handleNewNotification = (notification: Notification) => {
      if (
        notification.type === NotificationType.AcceptScheduleDating ||
        notification.type === NotificationType.DeclineScheduleDating ||
        notification.type === NotificationType.CancelScheduleDating ||
        notification.type === NotificationType.InviteScheduleDating
      ) {
        invaladateSchedules();
      }

      if (notification.type !== NotificationType.Matched) return;
      invalidateMatchRequest();
      invalidateConversations(false);
      setNewMatched(notification as NewMatchedNotification);
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [socket.connected]);

  const handleClose = () => {
    setNewMatched(null);
  };

  const handleClick = () => {
    if (!newMatched) return;
    seenNotification.mutate(newMatched._id);

    handleClose();
  };

  if (!newMatched) return null;

  return (
    <Modal
      className="justify-center overflow-y-auto overflow-x-hidden p-6 md:justify-start"
      onOpenChange={handleClose}
    >
      <div className="flex w-full flex-col gap-5 text-center">
        <p className="text-4xl font-medium text-primary">BOOM!</p>

        <div className="mx-auto flex w-3/4">
          <div className="relative aspect-square flex-1 translate-x-3.5 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <CustomImage
              className="object-cover object-center"
              image={newMatched.sender?.images[0]}
              alt=""
              fill
            />
          </div>

          <div className="relative aspect-square flex-1 -translate-x-3.5 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <CustomImage
              className="object-cover object-center"
              image={newMatched.receiver?.images[0]}
              alt=""
              fill
            />
          </div>
        </div>

        <p className="text-secondary-foreground">
          Bạn đã ghép đôi thành công với{" "}
          <span className="font-bold text-foreground">
            {newMatched?.sender?.name}
          </span>
          ! Hãy bắt đầu cuộc trò chuyện nào!
        </p>

        <div className="space-y-2">
          <Link
            href={`/app/messages/${newMatched?.conversation?._id}?tab=message`}
          >
            <Button
              className="mx-auto w-fit rounded-full"
              onClick={handleClick}
            >
              Nhắn tin ngay
            </Button>
          </Link>

          <Button
            className="mx-auto flex w-fit rounded-full"
            variant="ghost"
            onClick={handleClose}
          >
            Tiếp tục lướt
          </Button>
        </div>
      </div>
      <Lottie
        className="pointer-events-none fixed left-0 top-0 z-50 aspect-square h-screen w-full"
        animationData={congratulations}
        loop={false}
      />
    </Modal>
  );
};

export default NotifyNewMatched;
