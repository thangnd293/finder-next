"use client";

import { useState } from "react";
import ChatRoomBody from "./components/ChatRoomBody";
import ChatRoomFooter from "./components/ChatRoomFooter";
import ChatRoomHeader from "./components/ChatRoomHeader";
import MessageList from "./components/MessageList";
import ProfileSidebar from "./components/ProfileSidebar";
import { useConversationByID } from "@/service/conversation";
import ErrorView from "@/components/ErrorView";

export default function ChatPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const { isError } = useConversationByID(id);

  if (isError) return <ErrorView message="Đoạn chat không hợp lệ" />;

  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <ChatRoomHeader onOpenSidebar={() => setOpenSidebar(true)} />

        <ChatRoomBody>
          <MessageList />
        </ChatRoomBody>

        <ChatRoomFooter />
      </div>

      {isOpenSidebar && (
        <ProfileSidebar
          conversation={id}
          onCloseSidebar={() => setOpenSidebar(false)}
        />
      )}
    </>
  );
}
