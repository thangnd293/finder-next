"use client";

import AspectRatio from "@/components/AspectRatio";
import { Skeleton } from "@/components/Skeleton";
import { TabsContent } from "@/components/Tabs";
import { useAllConversations } from "@/service/conversation";
import MatchedCard from "./MatchedCard";
import { randomNumber } from "@/utils/helper";
import Image from "next/image";

export default function MatchedTab() {
  const { conversations, isLoading } = useAllConversations(false);

  return (
    <TabsContent className="h-full" value="matched">
      {!isLoading && conversations.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center p-4">
          <Image width={128} height={128} src={"/images/love.png"} alt={""} />
          <p className="text-secondary-foreground">
            Tích cực lướt để gặp đúng người
          </p>
        </div>
      )}

      <div className="grid max-h-full w-full grid-cols-3 items-start justify-start gap-2 overflow-auto p-4">
        {isLoading &&
          Array.from({ length: randomNumber(3, 6) }).map((_, i) => (
            <AspectRatio key={i} ratio={7 / 9}>
              <Skeleton className="h-full w-full rounded-md" />
            </AspectRatio>
          ))}

        {!isLoading &&
          conversations.length > 0 &&
          conversations.map((conversation) => (
            <MatchedCard key={conversation._id} {...conversation} />
          ))}
      </div>
    </TabsContent>
  );
}
