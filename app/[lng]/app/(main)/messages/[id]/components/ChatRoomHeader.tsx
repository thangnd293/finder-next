"use client";

import ActionIcon from "@/components/ActionIcon";
import Avatar from "@/components/Avatar";
import { Skeleton } from "@/components/Skeleton";
import { useConversationByID } from "@/service/conversation";
import { useParams, useRouter } from "next/navigation";
import { BsXLg } from "react-icons/bs";
import { HiMiniVideoCamera } from "react-icons/hi2";
import UserActions from "./UserActions";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

interface ChatRoomHeaderProps {
  onOpenSidebar: () => void;
}
const ChatRoomHeader = ({ onOpenSidebar }: ChatRoomHeaderProps) => {
  const router = useRouter();
  const { id } = useParams() as {
    id: string;
  };
  const { data: conversation, isLoading } = useConversationByID(id);
  const user = conversation?.user;

  return (
    <div className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <button className="space-x-2" onClick={onOpenSidebar}>
          <Avatar src={user?.images[0]?.url} />
          <span className="font-medium">{user?.name}</span>
        </button>

        <span className="hidden h-1.5 w-1.5 rounded-full bg-background-200 md:inline-block" />

        <span className="hidden text-sm text-secondary-foreground md:block">
          Ghép đôi vào ngày {conversation?.createdAt.prettyDate()}
        </span>
      </div>

      {conversation?.type !== "Super like" && (
        <div className="flex items-center space-x-1">
          {isLoading ?
            Array.from({
              length: 2,
            }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))
          : <>
              <ActionIcon
                onClick={async () => {
                  try {
                    const { data } = await axiosInstance.get<
                      | { success: true; data: true }
                      | { success: false; message: string }
                    >("/socket/available-users", {
                      params: {
                        roomId: id,
                      },
                    });

                    if (!data.success) {
                      toast.error(data.message);
                      return;
                    }

                    window.open(
                      `/app/room/${id}`,
                      "_blank",
                      "width=800,height=600",
                    );
                  } catch (error) {
                    toast.error("Có lỗi xảy ra");
                  }
                }}
                variant="ghost"
              >
                <HiMiniVideoCamera size={18} />
              </ActionIcon>

              <UserActions user={user} conversation={id} />
            </>
          }

          <ActionIcon variant="ghost" onClick={() => router.push("/app")}>
            <BsXLg />
          </ActionIcon>
        </div>
      )}
    </div>
  );
};

export default ChatRoomHeader;
