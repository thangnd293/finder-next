"use client";

import React, { HTMLAttributes, useEffect, useState } from "react";
import ActionIcon from "./ActionIcon";
import { TiFlash } from "react-icons/ti";
import { useBoost, useCurrentUser } from "@/service/user";
import CircleProgress from "./CircleProgress";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Offer } from "@/service/offer";
import PacketDialog from "./PackageDialog";

const BoostButton = ({
  className,
  ...others
}: HTMLAttributes<HTMLButtonElement>) => {
  const [leftPercent, setLeftPercent] = useState(0);
  const [offer, setOffer] = useState<Offer | null>();
  const { data } = useCurrentUser({
    select: (user) => ({
      boostsSession: user.boostsSession,
    }),
  });

  const boost = useBoost({
    onError(error) {
      setOffer(error.response?.data.data.offering ?? null);
    },
  });

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

      setLeftPercent(Math.round(leftPercent));
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  const isBoosting = leftPercent > 0;

  const onBoost = () => {
    if (isBoosting) return;
    boost.mutate();
  };

  return (
    <>
      <ActionIcon
        className={cn(
          "relative h-14 w-14 rounded-full border-violet-400 bg-background text-violet-600 hover:border-violet-600",
          className,
        )}
        onClick={onBoost}
        {...others}
      >
        {isBoosting ? <span>{leftPercent}%</span> : <TiFlash size={20} />}
        {isBoosting && (
          <CircleProgress
            className="absolute -left-0.5 -top-0.5"
            percentage={leftPercent ?? 0}
            size={58}
            strokeWidth={2}
            place="top"
            color="#7c3aed"
          />
        )}
      </ActionIcon>
      {offer && <PacketDialog {...offer} onClose={() => setOffer(null)} />}
    </>
  );
};

export default BoostButton;
