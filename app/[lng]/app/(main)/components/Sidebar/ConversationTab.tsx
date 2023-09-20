"use client";

import { TabsContent } from "@/components/Tabs";
import { useAllConversations } from "@/service/conversation";
import React from "react";
import Conversation from "./Conversation";
import { Skeleton } from "@/components/Skeleton";
import { randomNumber } from "@/utils/helper";
import Image from "next/image";
import ScrollArea from "@/components/ScrollArea";

export const MessageTab = () => {
  const { conversations, isLoading } = useAllConversations(true);
  const isEmpty = !isLoading && conversations.length === 0;
  return (
    <TabsContent className="flex-1 overflow-hidden" value="message">
      {isEmpty && (
        <div className="flex h-full w-full flex-col items-center justify-center p-4">
          <Image
            width={128}
            height={128}
            src={"/images/love.png"}
            alt={""}
            priority
          />
          <p className="text-secondary-foreground">
            Tích cực lướt để gặp đúng người
          </p>
        </div>
      )}

      {!isEmpty && (
        <ScrollArea className="h-full">
          <div className="flex-1 overflow-auto py-4">
            {isLoading &&
              Array.from({ length: randomNumber(4, 7) }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2.5 rounded-md px-6 py-3"
                >
                  <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />

                  <div className="h-fit w-full space-y-1">
                    <Skeleton
                      className="h-4 flex-shrink-0 rounded-sm"
                      style={{
                        width: `${randomNumber(30, 70)}%`,
                      }}
                    />
                    <Skeleton
                      className="h-3 flex-shrink-0 rounded-sm"
                      style={{
                        width: `${randomNumber(30, 80)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

            {!isLoading &&
              conversations.map((conversation) => (
                <Conversation key={conversation._id} {...conversation} />
              ))}
          </div>
        </ScrollArea>
      )}
    </TabsContent>
  );
};

export default MessageTab;
