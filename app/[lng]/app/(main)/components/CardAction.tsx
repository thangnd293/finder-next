"use client";

import ActionIcon from "@/components/ActionIcon";
import BoostButton from "@/components/BoostButton";
import { cn } from "@/lib/utils";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5";

interface CardActionProps {
  canBack: boolean;
  onBack: () => void;
  onLike: () => void;
  onUnLike: () => void;
  onSuperLike: () => void;
}
export const CardAction = ({
  canBack,
  onBack,
  onLike,
  onUnLike,
  onSuperLike,
}: CardActionProps) => {
  return (
    <div className="absolute bottom-0 z-50 flex w-full translate-y-10 items-center justify-center gap-6">
      <ActionIcon
        className={cn(
          "h-14 w-14 rounded-full border-yellow-300 bg-background text-yellow-500 hover:border-yellow-500",
          {
            "border-gray-300 text-gray-300": !canBack,
          },
        )}
        disabled={!canBack}
        onClick={onBack}
      >
        <IoPlayBack size={20} />
      </ActionIcon>
      <ActionIcon
        className="h-20 w-20 rounded-full bg-background"
        onClick={onUnLike}
      >
        <BsXLg size={28} />
      </ActionIcon>

      <ActionIcon
        className="h-11 w-11 rounded-full bg-primary text-yellow-100"
        onClick={onSuperLike}
      >
        <FaStar size={20} />
      </ActionIcon>

      <ActionIcon
        className="h-20 w-20 rounded-full bg-background text-primary"
        onClick={onLike}
      >
        <BsCheckLg size={32} />
      </ActionIcon>

      <BoostButton />
    </div>
  );
};
