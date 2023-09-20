"use client";

import AspectRatio from "@/components/AspectRatio";
import { Skeleton } from "@/components/Skeleton";
import { TabsContent } from "@/components/Tabs";
import { useAllConversations } from "@/service/conversation";
import MatchedCard from "./MatchedCard";
import { randomNumber } from "@/utils/helper";
import Image from "next/image";
import ScrollArea from "@/components/ScrollArea";
import { useAllNotifications } from "@/service/notification/hooks";
import {
  NotificationStatus,
  NotificationType,
} from "@/service/notification/type";
import MatchRequestCard from "./MatchRequestCard";
import { useMatchRequestCount } from "@/service/matchRequest";

export default function MatchedTab() {
  const { conversations, isLoading: conversationsLoading } =
    useAllConversations(false);
  const { notifications, isLoading: notificationsLoading } =
    useAllNotifications(NotificationType.Matched);
  const { data, isLoading: matchRequestLoading } = useMatchRequestCount();

  const isLoading = conversationsLoading || notificationsLoading;
  const isEmpty =
    !isLoading &&
    !matchRequestLoading &&
    conversations.length === 0 &&
    data?.totalCount === 0;

  return (
    <TabsContent className="flex-1 overflow-hidden" value="matched">
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
          <div className="grid w-full grid-cols-3 items-start justify-start gap-3 overflow-auto p-4">
            {data && data.totalCount > 0 && <MatchRequestCard {...data} />}

            {isLoading &&
              Array.from({ length: randomNumber(3, 6) }).map((_, i) => (
                <AspectRatio key={i} ratio={7 / 9}>
                  <Skeleton className="h-full w-full rounded-md" />
                </AspectRatio>
              ))}

            {!isLoading &&
              conversations.map((conversation) => {
                const notification = notifications?.matched?.find(
                  (matched: any) =>
                    matched.conversation === conversation._id &&
                    matched.status !== NotificationStatus.Seen,
                );
                return (
                  <MatchedCard
                    key={conversation._id}
                    notificationId={notification?._id}
                    isNew={!!notification}
                    {...conversation}
                  />
                );
              })}
          </div>
        </ScrollArea>
      )}
    </TabsContent>
  );
}
