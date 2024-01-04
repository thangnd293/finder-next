"use client";

import { Skeleton } from "@/components/Skeleton";
import { useAllConversations } from "@/service/conversation";
import { useMatchRequestCount } from "@/service/matchRequest";
import { NotificationStatus, NotificationType } from "@/service/notification";
import { useAllNotifications } from "@/service/notification/hooks/use-all-notifications";
import Image from "next/image";
import { Header } from "./components";
import Conversation from "./components/Sidebar/Conversation";
import MatchRequestCard from "./components/Sidebar/MatchRequestCard";
import MatchedCard from "./components/Sidebar/MatchedCard";
import ScrollArea from "@/components/ScrollArea";

const MobileMessagePage = () => {
  const { conversations: allNewMatch, isLoading: allNewMatchLoading } =
    useAllConversations(false);
  const { conversations: allChat, isLoading: allChatLoading } =
    useAllConversations(true);
  const { data, isLoading: matchRequestLoading } = useMatchRequestCount();
  const { notifications } = useAllNotifications({
    status: NotificationStatus.NotSeen,
    types: [NotificationType.Matched],
  });
  const isEmpty = !allChatLoading && allChat.length === 0;

  const isLoading = allNewMatchLoading || allChatLoading || matchRequestLoading;

  return (
    <div className="flex h-full flex-1 flex-col">
      <Header />

      {isLoading && (
        <>
          <div>
            <Skeleton className="mx-3 my-2 h-4.5 w-1/2" />
            {
              <div className="flex w-full flex-row flex-nowrap gap-2 overflow-x-auto px-6 py-3">
                {Array.from({
                  length: 3,
                }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="aspect-[5/7] w-24 flex-shrink-0"
                  />
                ))}
              </div>
            }
          </div>
          <div>
            <Skeleton className="mx-3 my-2 h-4.5 w-1/2" />
            {
              <div>
                {Array.from({
                  length: 3,
                }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2.5 rounded-md py-3 pl-6 pr-12"
                  >
                    <Skeleton className="block h-12 w-12 flex-shrink-0 rounded-full" />
                    <Skeleton className="mx-3 my-2 h-4.5 w-1/2" />
                  </div>
                ))}
              </div>
            }
          </div>
        </>
      )}
      {!isLoading && (
        <>
          {allNewMatch.length > 0 && (
            <div>
              <h2 className="px-3 py-2 font-semibold">Ghép đôi mới</h2>
              <ScrollArea orientation="horizontal">
                <div className="flex w-full flex-row flex-nowrap gap-2 px-6 py-3">
                  {data && data.totalCount > 0 && (
                    <MatchRequestCard
                      className="w-24 flex-shrink-0"
                      {...data}
                    />
                  )}

                  {allNewMatch.map((conversation) => {
                    const notification = notifications?.find(
                      (matched: any) =>
                        matched.conversation === conversation._id &&
                        matched.status !== NotificationStatus.Seen,
                    );
                    return (
                      <MatchedCard
                        key={conversation._id}
                        className="w-24 flex-shrink-0"
                        notificationId={notification?._id}
                        isNew={!!notification}
                        {...conversation}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className="flex flex-1 flex-col overflow-hidden">
            {isEmpty && (
              <div className="flex h-full w-full flex-col items-center justify-center p-4">
                <Image
                  width={128}
                  height={128}
                  src={"/images/love.png"}
                  alt={""}
                  priority
                />
                {allNewMatch.length > 0 ?
                  <>
                    <p className="text-lg font-medium">Gửi lời chào</p>
                    <p className="px-14 text-center text-secondary-foreground">
                      Bấm vào tương hợp mới trên đây để gửi tin nhắn
                    </p>
                  </>
                : <p className="px-14 text-center text-secondary-foreground">
                    Tích cực lướt để gặp đúng người
                  </p>
                }
              </div>
            )}
            {!isEmpty && (
              <>
                <h2 className="px-3 py-2 font-semibold">Tin nhắn</h2>

                <div className="flex-1 overflow-y-auto">
                  {allChat.map((chat) => (
                    <Conversation key={chat._id} {...chat} />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMessagePage;
