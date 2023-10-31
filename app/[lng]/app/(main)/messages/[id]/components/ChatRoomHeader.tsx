"use client";

import ActionIcon from "@/components/ActionIcon";
import Avatar from "@/components/Avatar";
import { useConversationByID } from "@/service/conversation";
import { useParams, useRouter } from "next/navigation";
import { BsXLg } from "react-icons/bs";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import UserActions from "./UserActions";

interface ChatRoomHeaderProps {
  onOpenSidebar: () => void;
}
const ChatRoomHeader = ({ onOpenSidebar }: ChatRoomHeaderProps) => {
  const router = useRouter();
  const { id } = useParams() as {
    id: string;
  };
  const { data: conversation } = useConversationByID(id);

  const user = conversation?.user;

  return (
    <div className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <button className="space-x-2" onClick={onOpenSidebar}>
          <Avatar src={user?.images[0]?.url} />
          <span className="font-medium">{user?.name}</span>
        </button>

        <span className="inline-block h-1.5 w-1.5 rounded-full bg-background-200" />

        <span className="text-sm text-secondary-foreground">
          Ghép đôi vào ngày {conversation?.createdAt.prettyDate()}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <ActionIcon variant="ghost">
          <IoCall size={18} />
        </ActionIcon>

        <ActionIcon
          onClick={() => {
            window.open(`/app/room/${id}`, "_blank", "width=800,height=600");
          }}
          variant="ghost"
        >
          <HiMiniVideoCamera size={18} />
        </ActionIcon>

        <UserActions user={user} />

        <ActionIcon variant="ghost" onClick={() => router.push("/app")}>
          <BsXLg />
        </ActionIcon>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
