"use client";

import CardAction from "./CardAction";
import CardBox from "./CardBox";
import UserCard from "./UserCard";
import Container from "./Container";

export default function HomePage() {
  return (
    <Container>
      {({
        canBack,
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
                <UserCard
                  key={user._id}
                  isFirst={user._id === arr[0]._id}
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
  );
}
