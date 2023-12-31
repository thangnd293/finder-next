"use client";

import EmptyView from "@/components/EmptyView";
import Loader from "@/components/Loader";
import { CardBox } from "@/components/UserCard";
import useCallbackDebounce from "@/hooks/use-callback-debounce";
import { useLike, useSkip, useSupperLike } from "@/service/action/hooks";
import { User, useCurrentUser, useRecommendedUsers } from "@/service/user";
import useStore from "@/store";
import { InfiniteData } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ImSad2 } from "react-icons/im";
import { Offer } from "@/service/offer";
import PacketDialog from "@/components/PackageDialog";

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
    isFirstRender: boolean;
    canBack: boolean;
    onBack: () => void;
    onLike: () => void;
    onUnLike: () => void;
    onSuperLike: () => void;
    onReportDone: () => void;
  }) => React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const isBack = useRef(false);
  const isFirstRender = useRef(true);
  const canBack = useRef(false);
  const lastLike = useRef<number | null>(null);
  const [lastIndexSuccess, setLastIndexSuccess] = useState(0);
  const currentIndex = useStore((state) => state.currentIndex);
  const setCurrentIndex = useStore((state) => state.setCurrentIndex);
  const [offer, setOffer] = useState<Offer | null>(null);

  const { data: canRewind } = useCurrentUser({
    select: (user) =>
      user?.featureAccess.find((item) => item.name === "Rewind")?.unlimited,
  });

  const like = useLike({
    onSuccess: () => {
      setLastIndexSuccess(currentIndex);
    },
    onError: () => {
      setCurrentIndex(lastIndexSuccess);
      toast.error("Bạn đã sử dụng hết lượt thích trong ngày", {
        icon: <ImSad2 className="text-red-500" />,
      });
    },
  });
  const supperLike = useSupperLike({
    onSuccess: () => {
      setLastIndexSuccess(currentIndex);
    },
    onError: (error) => {
      setOffer(error.response?.data.data.offering ?? null);
      setCurrentIndex(lastIndexSuccess);
    },
  });
  const skip = useSkip({
    onSuccess: () => setLastIndexSuccess(currentIndex),
  });

  const {
    data: { pages: pages = EMPTY_USERS } = EMPTY_OBJECT,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useRecommendedUsers();

  const recommendedUsers = useMemo(
    () => [...new Map(pages.map((item) => [item["_id"], item])).values()],
    [pages],
  );

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    if (currentIndex >= recommendedUsers.length - 5) {
      fetchNextPage();
    }
  }, [
    currentIndex,
    recommendedUsers,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const handleNextIndex = () => {
    setCurrentIndex(currentIndex + 1);
    isBack.current = false;
  };

  const handleLike = useCallbackDebounce(() => {
    const userId = recommendedUsers[currentIndex]?._id;

    if (!userId) return;
    like.mutate(userId);
    handleNextIndex();
    canBack.current = false;
    lastLike.current = currentIndex;
  }, 800);

  const handleSuperLike = useCallbackDebounce(() => {
    const userId = recommendedUsers[currentIndex]?._id;

    if (!userId) return;
    supperLike.mutate(userId);
    handleNextIndex();
    canBack.current = false;
    lastLike.current = currentIndex;
  }, 800);

  const handleUnLike = useCallbackDebounce(() => {
    const userId = recommendedUsers[currentIndex]?._id;

    if (!userId) return;
    skip.mutate(userId);
    handleNextIndex();

    if (canRewind) canBack.current = true;
  }, 800);

  const handleBack = useCallbackDebounce(() => {
    setCurrentIndex(currentIndex > 1 ? currentIndex - 1 : 0);
    isBack.current = true;

    if (lastIndexSuccess === currentIndex - 2) {
      canBack.current = false;
    }
  }, 800);

  const handleReportDone = useCallback(() => {
    handleNextIndex();
    canBack.current = false;
  }, []);

  let visibleUsers =
    recommendedUsers.slice(
      currentIndex > 0 && currentIndex < recommendedUsers.length ?
        currentIndex - 1
      : currentIndex,
      currentIndex + 2,
    ) ?? [];

  if (isBack.current) {
    visibleUsers = visibleUsers.reverse();
  }

  if (isFetching && currentIndex === recommendedUsers.length)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  if (isError) {
    return (
      <CardBox>
        {(style) => (
          <div
            className="flex flex-col items-center justify-center space-y-1 rounded-3xl bg-primary-50"
            style={style}
          >
            <Image width={140} height={140} src="/images/oops.png" alt="" />
            <p className="font-medium text-secondary-foreground">
              Hệ thống đang gặp lỗi. Vui lòng thử lại sau
            </p>
          </div>
        )}
      </CardBox>
    );
  }

  if (!isFetching && !visibleUsers.length) {
    return <EmptyView message="Hết rùi :(" />;
  }

  return (
    <>
      {children({
        recommendedUsers,
        visibleUsers,
        currentIndex,
        canBack: canBack.current,
        isFirstRender: isFirstRender.current,
        onBack: handleBack,
        onLike: handleLike,
        onUnLike: handleUnLike,
        onSuperLike: handleSuperLike,
        onReportDone: handleReportDone,
      })}
      {offer && <PacketDialog onClose={() => setOffer(null)} {...offer} />}
    </>
  );
};
