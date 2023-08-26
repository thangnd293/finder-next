import MessageUser from "@/components/message-user";
import { TabsContent } from "@/components/Tabs";
import React from "react";

export default function MessageTab() {
  return (
    <TabsContent className="flex-1 overflow-auto py-3" value="message">
      {Array.from({ length: 10 }).map((_, index) => (
        <MessageUser key={index} />
      ))}
    </TabsContent>
  );
}
