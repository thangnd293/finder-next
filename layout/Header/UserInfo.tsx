"use client";

import Avatar from "@/components/Avatar";
import CircleProgress from "@/components/CircleProgress";
import { useCurrentUser } from "@/service/user";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";

const UserInfo = () => {
  const { data } = useCurrentUser({
    select: (user) => ({
      name: user.name,
      avatar: user.images[0],
      boostsSession: user.boostsSession,
    }),
  });

  const [leftPercent, setLeftPercent] = useState(0);

  useEffect(() => {
    if (!data) return;

    const {
      boostsSession: { expiredDate, refreshInterval },
    } = data;

    const timer = setInterval(() => {
      const timeLeft = dayjs(expiredDate).diff(dayjs(), "second");

      const leftPercent = (timeLeft / (refreshInterval * 60)) * 100;

      if (leftPercent <= 0) {
        clearInterval(timer);
        return;
      }

      setLeftPercent(leftPercent);
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  if (!data) return null;

  const { avatar, name } = data;

  const isBoosting = leftPercent > 0;

  const Wrapper = isBoosting ? "div" : Fragment;

  const props = isBoosting ? { className: "relative" } : {};

  return (
    <>
      <Wrapper {...props}>
        <Avatar fallback={name} src={avatar?.url} />
        {isBoosting && (
          <CircleProgress
            className="absolute -left-1 -top-1"
            percentage={leftPercent ?? 0}
            size={56}
            strokeWidth={3}
            place="top"
          />
        )}
      </Wrapper>
      <p className="hidden font-medium md:block">{name}</p>
    </>
  );
};

export default UserInfo;
