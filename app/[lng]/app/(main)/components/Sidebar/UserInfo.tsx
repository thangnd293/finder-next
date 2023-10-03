"use client";

import Avatar from "@/components/Avatar";
import { useCurrentUser } from "@/service/user";
import React from "react";

const UserInfo = () => {
  const { data } = useCurrentUser({
    select: (user) => ({
      name: user.name,
      avatar: user.images[0],
    }),
  });

  return (
    <>
      <Avatar fallback="DT" src={data?.avatar?.url} />
      <p className="hidden font-medium md:block">{data?.name}</p>
    </>
  );
};

export default UserInfo;
