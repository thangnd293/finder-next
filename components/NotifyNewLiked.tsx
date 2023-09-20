"use client";

import { socket } from "@/lib/socket";
import { User } from "@/service/user";
import { useEffect, useState } from "react";
import Button from "./Button";
import CustomImage from "./CustomImage";
import Modal from "./Modal";

const NotifyNewLiked = () => {
  const [newLiked, setNewLiked] = useState<User[]>([]);

  useEffect(() => {
    if (!socket.connected) return;

    socket.on("newMatchRequest", (newLiked) => {
      setNewLiked((prev) => [...prev, newLiked]);
    });

    return () => {
      socket.off("newMatchRequest");
    };
  }, [socket.connected]);

  return (
    <NotificationDialog newLiked={newLiked} onClose={() => setNewLiked([])} />
  );
};

export default NotifyNewLiked;

interface NotificationDialogProps {
  newLiked: User[];
  onClose: () => void;
}

const NotificationDialog = ({ newLiked, onClose }: NotificationDialogProps) => {
  if (!newLiked.length) return null;

  return (
    <Modal
      className="justify-center"
      open={true}
      onOpenChange={onClose}
      withCloseButton={false}
    >
      <h3 className="text-xl font-bold text-primary">
        {newLiked.length > 1
          ? `${newLiked.length} người đã thích bạn`
          : `${newLiked[0].name} đã thích bạn`}
      </h3>

      {newLiked.length > 1 ? (
        <div className="-ml-1/2 flex items-center">
          {newLiked.map((user) => (
            <CustomImage
              key={user._id}
              className="mx-auto rounded-full border-2 drop-shadow-sm"
              image={user.images[0]}
              alt=""
              width={90}
              height={90}
            />
          ))}
        </div>
      ) : (
        <CustomImage
          className="mx-auto rounded-full border-2 drop-shadow-sm"
          image={newLiked[0]?.images[0]}
          alt=""
          width={90}
          height={90}
        />
      )}
      <Button className="rounded-full" size="sm" onClick={onClose}>
        Xem ngay
      </Button>
    </Modal>
  );
};
