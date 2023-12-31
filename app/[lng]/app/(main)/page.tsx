"use client";

import { CardBox, UserCard } from "@/components/UserCard";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import MobileMessagePage from "./MobileMessagePage";
import { CardAction, Container, Header } from "./components";
import BlockAndReport from "./components/BlockAndReport";

export default function HomePage() {
  const searchParams = useSearchParams();
  const isMobileView = useIsMobile();
  const [key, setKey] = useState(0);

  const tab = searchParams?.get("tab");

  if (tab === "message" && isMobileView) return <MobileMessagePage />;

  const onReload = () => {
    setKey((key) => key + 1);
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      <Header onReload={onReload} />
      <Container key={key}>
        {({
          canBack,
          isFirstRender,
          currentIndex,
          recommendedUsers,
          visibleUsers,
          onBack,
          onLike,
          onUnLike,
          onReportDone,
          onSuperLike,
        }) => (
          <CardBox>
            {(style) => {
              const currentUser = recommendedUsers[currentIndex];
              return (
                <div className="relative mb-10" style={style}>
                  {visibleUsers.map((user, _, arr) => (
                    <UserCard
                      key={user._id}
                      isFirst={!isFirstRender && user._id === arr[0]._id}
                      isShow={user._id === currentUser?._id}
                      user={user}
                      canBack={canBack}
                      onBack={onBack}
                      onLike={onLike}
                      onUnLike={onUnLike}
                      onReportDone={onReportDone}
                      onSuperLike={onSuperLike}
                    />
                  ))}
                  {!isMobileView && (
                    <>
                      <CardAction
                        canBack={canBack}
                        onBack={onBack}
                        onLike={onLike}
                        onUnLike={onUnLike}
                        onSuperLike={onSuperLike}
                      />
                      <BlockAndReport
                        key={currentIndex}
                        className="absolute -bottom-6 left-3 z-50"
                        target={currentUser}
                        onReportDone={onReportDone}
                      />
                    </>
                  )}
                </div>
              );
            }}
          </CardBox>
        )}
      </Container>
    </div>
  );
}
