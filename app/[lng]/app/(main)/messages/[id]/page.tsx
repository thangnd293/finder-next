"use client";

import { useState } from "react";
import ChatRoomBody from "./components/ChatRoomBody";
import ChatRoomFooter from "./components/ChatRoomFooter";
import ChatRoomHeader from "./components/ChatRoomHeader";
import MessageList from "./components/MessageList";
import ProfileSidebar from "./components/ProfileSidebar";

export default function ChatPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [isOpenSidebar, setOpenSidebar] = useState(false);

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
