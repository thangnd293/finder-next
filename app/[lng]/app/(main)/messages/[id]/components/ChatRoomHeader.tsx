"use client";

import ActionIcon from "@/components/ActionIcon";
import Avatar from "@/components/Avatar";
import { useConversationByID } from "@/service/conversation";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { BsThreeDotsVertical, BsXLg } from "react-icons/bs";

interface ChatRoomHeaderProps {
  onOpenSidebar: () => void;
}
const ChatRoomHeader = ({ onOpenSidebar }: ChatRoomHeaderProps) => {
  const router = useRouter();
  const { id } = useParams() as {
    id: string;
  };
  const { conversation } = useConversationByID(id);

  return (
    <div className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <button className="space-x-2" onClick={onOpenSidebar}>
          <Avatar src={conversation?.user.images[0]?.url} />
          <span className="font-medium">{conversation?.user.name}</span>
        </button>

        <span className="inline-block h-1.5 w-1.5 rounded-full bg-background-200" />

        <span className="text-sm text-secondary-foreground">
          Ghép đôi vào ngày {conversation?.createdAt.prettyDate()}
        </span>
      </div>

      <div className="space-x-1">
        <ActionIcon variant="ghost">
          <BsThreeDotsVertical />
        </ActionIcon>
        <ActionIcon variant="ghost" onClick={() => router.push("/app")}>
          <BsXLg />
        </ActionIcon>
      </div>
    </div>
  );
};

export default ChatRoomHeader;