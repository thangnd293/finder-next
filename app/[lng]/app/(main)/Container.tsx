"use client";

import useClickOneInTime from "@/hooks/useClickOneInTime";
import { useLike, useSkip } from "@/service/action/hooks";
import { User, useRecommendedUsers } from "@/service/user";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const EMPTY_USERS: User[] = [];
const EMPTY_OBJECT: InfiniteData<User> = {
  pages: EMPTY_USERS,
  pageParams: [],
};

interface ContainerProps {
  children: (props: {
    recommendedUsers: User[];
    visibleUsers: User[];
    currentIndex: number;
    canBack: boolean;
    onBack: () => void;
    onLike: () => void;
    onUnLike: () => void;
  }) => React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const isBack = useRef(false);
  const canBack = useRef(false);
  const lastLike = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const like = useLike();
  const skip = useSkip();

  const {
    data: { pages: recommendedUsers = EMPTY_USERS } = EMPTY_OBJECT,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useRecommendedUsers();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    if (currentIndex >= recommendedUsers.length - 3) {
      fetchNextPage();
    }
  }, [currentIndex, recommendedUsers, hasNextPage, isFetchingNextPage]);

  const handleNextIndex = () => {
    setCurrentIndex((prev) => prev + 1);
    isBack.current = false;
  };

  const handleLike = useClickOneInTime(() => {
    console.log("like", recommendedUsers[currentIndex]?.name);

    const userId = recommendedUsers[currentIndex]?._id;

    if (!userId) return;
    like.mutate(userId);
    handleNextIndex();
    canBack.current = false;
    lastLike.current = currentIndex;
  }, 800);

  const handleUnLike = useClickOneInTime(() => {
    console.log("unlike", recommendedUsers[currentIndex]?.name);
    const userId = recommendedUsers[currentIndex]?._id;

    if (!userId) return;
    skip.mutate(userId);
    handleNextIndex();
    canBack.current = true;
  }, 800);

  const handleBack = useClickOneInTime(() => {
    console.log("back", recommendedUsers[currentIndex]?.name);

    setCurrentIndex((prev) => (prev > 1 ? prev - 1 : 0));
    isBack.current = true;

    if (lastLike.current === currentIndex - 2) {
      canBack.current = false;
    }
  }, 800);

  let visibleUsers =
    recommendedUsers.slice(
      currentIndex > 0 && currentIndex < recommendedUsers.length
        ? currentIndex - 1
        : currentIndex,
      currentIndex + 2,
    ) ?? [];

  if (isBack.current) {
    visibleUsers = visibleUsers.reverse();
  }

  if (isFetching && currentIndex === recommendedUsers.length)
    return <div>Loading...</div>;

  if (isError) {
    return <div>Error...</div>;
  }

  if (!isFetching && !visibleUsers.length) {
    return <div>Het roi</div>;
  }

  return (
    <>
      {children({
        recommendedUsers,
        visibleUsers,
        currentIndex,
        canBack: canBack.current,
        onBack: handleBack,
        onLike: handleLike,
        onUnLike: handleUnLike,
      })}
    </>
  );
};

export default Container;
