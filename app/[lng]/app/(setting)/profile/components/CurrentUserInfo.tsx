"use client";

import VerifiedIcon from "@/assets/icons/verified-icon";
import { useCurrentUser } from "@/service/user";
import React from "react";

const CurrentUserInfo = () => {
  const { data } = useCurrentUser({
    select: (user) => ({
      name: user.name,
      age: user.age,
      isVerifiedFace: user.isVerifiedFace,
    }),
  });

  return (
    <div className="flex items-center gap-1">
      <p className="text-lg font-medium">
        {data?.name}, {data?.age}
      </p>
      {data?.isVerifiedFace && <VerifiedIcon size={20} />}
    </div>
  );
};

export default CurrentUserInfo;
