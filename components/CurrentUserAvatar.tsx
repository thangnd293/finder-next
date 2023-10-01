"use client";

import { useCurrentUser } from "@/service/user";
import React from "react";
import Avatar from "./Avatar";

interface CurrentUserAvatarProps
  extends Omit<React.ComponentProps<typeof Avatar>, "src"> {}

const CurrentUserAvatar = (props: CurrentUserAvatarProps) => {
  const { data: avatar } = useCurrentUser({
    select: (user) => user.images?.[0]?.url,
  });

  return <Avatar fallback="DT" src={avatar} {...props} />;
};

export default CurrentUserAvatar;
