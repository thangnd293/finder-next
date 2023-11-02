"use client";

import ScrollArea from "@/components/ScrollArea";
import {
  useInvalidateMatchRequest,
  useMatchRequests,
} from "@/service/matchRequest";
import MatchRequestCard from "./components/MatchRequestCard";
import { useLike, useSkip } from "@/service/action/hooks";
import Header from "./components/Header";
import { Skeleton } from "@/components/Skeleton";
import AspectRatio from "@/components/AspectRatio";
import { randomNumber } from "@/utils/helper";
import Image from "next/image";

export default function HomePage() {
  const { matchRequests, isLoading } = useMatchRequests();
  const invalidateMatchRequest = useInvalidateMatchRequest();

  const isEmpty = !isLoading && matchRequests.length === 0;

  const like = useLike({
    onSuccess: invalidateMatchRequest,
  });
  const skip = useSkip({
    onSuccess: invalidateMatchRequest,
  });

  const handleLike = (id: string) => {
    like.mutate(id);
  };

  const handleSkip = (id: string) => {
    skip.mutate(id);
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <Header />

      {isEmpty && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <Image src={"/images/empty.png"} width={128} height={128} alt={""} />
          <p className="px-6 text-center text-secondary-foreground">
            Hãy chuẩn bị một profile thật xịn xò để tăng khả năng tương tác
          </p>
        </div>
      )}

      {!isEmpty && (
        <ScrollArea>
          <div className="grid grid-cols-2 gap-4 p-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-7">
            {isLoading &&
              Array.from({ length: randomNumber(6, 12) }).map((_, i) => (
                <AspectRatio key={i} ratio={7 / 9}>
                  <Skeleton className="h-full w-full rounded-md" />
                </AspectRatio>
              ))}

            {!isLoading &&
              matchRequests.map((matchRequest) => (
                <MatchRequestCard
                  key={matchRequest._id}
                  {...matchRequest}
                  onLike={handleLike}
                  onSkip={handleSkip}
                />
              ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
