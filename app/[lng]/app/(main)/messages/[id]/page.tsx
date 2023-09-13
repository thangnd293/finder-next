"use client";

import { useState } from "react";
import ChatRoomHeader from "./components/ChatRoomHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import MessageList from "./components/MessageList";
import ChatRoomFooter from "./components/ChatRoomFooter";
import ChatRoomBody from "./components/ChatRoomBody";

export default function ChatPage() {
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
        <ProfileSidebar onCloseSidebar={() => setOpenSidebar(false)} />
      )}
    </>
  );
}
