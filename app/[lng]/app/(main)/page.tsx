"use client";

import {
  CardAction,
  CardBox,
  Container,
  Header,
  RecommendUserCard,
} from "./components";

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
        }) => (
          <CardBox>
            {(style) => (
              <div className="relative mb-10" style={style}>
                {visibleUsers.map((user, _, arr) => (
                  <RecommendUserCard
                    key={user._id}
                    isFirst={!isFirstRender && user._id === arr[0]._id}
                    isShow={user._id === recommendedUsers[currentIndex]?._id}
                    {...user}
                  />
                ))}

                <CardAction
                  canBack={canBack}
                  onBack={onBack}
                  onLike={onLike}
                  onUnLike={onUnLike}
                />
              </div>
            )}
          </CardBox>
        )}
      </Container>
    </div>
  );
}
