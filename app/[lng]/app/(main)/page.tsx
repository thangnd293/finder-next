"use client";

import { CardBox, UserCard } from "@/components/UserCard";
import { CardAction, Container, Header } from "./components";
import BlockAndReport from "./components/BlockAndReport";

export default function HomePage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <Header />
      <Container>
        {({
          canBack,
          isFirstRender,
          currentIndex,
          recommendedUsers,
          visibleUsers,
          onBack,
          onLike,
          onUnLike,
          onReportDone
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
                      {...user}
                    />
                  ))}

                  <CardAction
                    canBack={canBack}
                    onBack={onBack}
                    onLike={onLike}
                    onUnLike={onUnLike}
                  />
                  <BlockAndReport key={currentIndex} target={currentUser} onReportDone={onReportDone} />
                </div>
              );
            }}
          </CardBox>
        )}
      </Container>
    </div>
  );
}
