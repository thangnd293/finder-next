"use client";

import ActionIcon from "@/components/ActionIcon";
import { useMatchRequestCount } from "@/service/matchRequest";
import { useRouter } from "next/navigation";
import { BsXLg } from "react-icons/bs";

const Header = () => {
  const router = useRouter();

  const { data } = useMatchRequestCount();

  return (
    <header className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b px-4">
      <p className="text-xl font-semibold">
        {data?.totalCount ?? 0} Lượt thích
      </p>
      <ActionIcon className="rounded-full" onClick={() => router.push("/app")}>
        <BsXLg />
      </ActionIcon>
    </header>
  );
};

export default Header;
