"use client";

import CurrentUserAvatar from "@/components/CurrentUserAvatar";
import React from "react";
import CircleProgress from "./CircleProgress";
import { useCurrentUser } from "@/service/user";

const MobileProfileAvatar = () => {
  const { data: totalFinishProfile } = useCurrentUser({
    select: (user) => user.totalFinishProfile,
  });

  return (
    <div className="relative mt-10">
      <CurrentUserAvatar className="border-8 border-white" size="3xl" />

      <CircleProgress
        className="absolute left-0 top-0 "
        percentage={totalFinishProfile ?? 0}
        size={128}
        strokeWidth={4}
      />
    </div>
  );
};

export default MobileProfileAvatar;
