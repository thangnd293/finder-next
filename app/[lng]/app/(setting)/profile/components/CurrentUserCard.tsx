"use client";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { CardBox, UserCard } from "@/components/UserCard";
import { useCurrentUser } from "@/service/user";
import { useRouter } from "next/navigation";
import React from "react";

const CurrentUserCard = () => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useCurrentUser();

  return (
    <CardBox>
      {(style) => (
        <div className="relative" style={style}>
          {isLoading || !currentUser ? (
            <Spinner />
          ) : (
            <>
              <UserCard isShow user={currentUser} />
              <Button
                className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center whitespace-nowrap rounded-full"
                onClick={() => router.push("/app/profile/edit")}
              >
                Sửa thông tin&nbsp;
                <span className="text-sm">
                  ({currentUser.totalFinishProfile}% hoàn thành)
                </span>
              </Button>
            </>
          )}
        </div>
      )}
    </CardBox>
  );
};

export default CurrentUserCard;
