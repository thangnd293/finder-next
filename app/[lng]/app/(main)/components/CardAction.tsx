"use client";

import ActionIcon from "@/components/ActionIcon";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5";

interface CardActionProps {
  canBack: boolean;
  onBack: () => void;
  onLike: () => void;
  onUnLike: () => void;
}
export const CardAction = ({
  canBack,
  onBack,
  onLike,
  onUnLike,
}: CardActionProps) => {
  console.log("canBack", canBack, onLike, onUnLike);

  return (
    <div className="absolute bottom-0 z-50 flex w-full translate-y-10 items-center justify-center gap-6">
      {canBack && (
        <ActionIcon
          className="rounded-full border-yellow-300 text-yellow-500 hover:border-yellow-500"
          size="lg"
          onClick={onBack}
        >
          <IoPlayBack />
        </ActionIcon>
      )}
      <ActionIcon
        className="h-20 w-20 rounded-full bg-white"
        onClick={onUnLike}
      >
        <BsXLg size={28} />
      </ActionIcon>

      <ActionIcon className="h-11 w-11 rounded-full bg-primary text-yellow-100">
        <FaStar size={20} />
      </ActionIcon>

      <ActionIcon
        className="h-20 w-20 rounded-full bg-white text-primary"
        onClick={onLike}
      >
        <BsCheckLg size={32} />
      </ActionIcon>
    </div>
  );
};
