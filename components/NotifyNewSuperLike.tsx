"use client";

import { socket } from "@/lib/socket";
import { User } from "@/service/user";
import { useEffect, useState } from "react";
import Button from "./Button";
import CustomImage from "./CustomImage";
import Modal from "./Modal";
import { useInvalidateAllConversations } from "@/service/conversation";

const NotifyNewSuperLike = () => {
  const [newLiked, setNewLiked] = useState<User | null>(null);
  const invalidateConversations = useInvalidateAllConversations();

  useEffect(() => {
    if (!socket.connected) return;

    socket.on("newSuperLike", (newLiked) => {
      console.log("newSuperLike", newLiked);

      setNewLiked(newLiked);
      invalidateConversations(false);
    });

    return () => {
      socket.off("newSuperLike");
    };
  }, [socket.connected]);

  if (!newLiked) return null;
  return (
    <NotificationDialog newLiked={newLiked} onClose={() => setNewLiked(null)} />
  );
};

export default NotifyNewSuperLike;

interface NotificationDialogProps {
  newLiked: User;
  onClose: () => void;
}

const NotificationDialog = ({ newLiked, onClose }: NotificationDialogProps) => {
  return (
    <Modal className="justify-center gap-4 p-6" onOpenChange={onClose}>
      <h3 className="text-center text-xl font-bold text-primary">
        {newLiked.name} đã siêu thích bạn
      </h3>

      <CustomImage
        className="mx-auto rounded-full border-2 drop-shadow-sm"
        image={newLiked?.images[0]}
        alt=""
        width={90}
        height={90}
      />
      <Button className="rounded-full" size="sm" onClick={onClose}>
        Xem ngay
      </Button>
    </Modal>
  );
};
