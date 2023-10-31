"use client";

import ActionIcon from "@/components/ActionIcon";
import { ROUTE } from "@/constant/route";
import { useRouter } from "next/navigation";
import { BsXLg } from "react-icons/bs";
import { RiMailSendFill } from "react-icons/ri";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b px-4">
      <p className="flex items-center gap-1 text-xl font-semibold ">
        <RiMailSendFill className="text-green-600" />
        Lời mời
      </p>
      <ActionIcon
        className="rounded-full"
        onClick={() => router.push(ROUTE.HOME)}
      >
        <BsXLg />
      </ActionIcon>
    </header>
  );
};

export default Header;
