"use client";

import Avatar from "@/components/Avatar";
import { MagnifyingGlassIcon, SewingPinIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ActionLink from "./action-link";
import { useCurrentUser } from "@/service/user";

export default function SidebarHeader() {
  const { currentUser } = useCurrentUser();

  return (
    <header className="flex h-20 items-center justify-between border-b px-3 py-4">
      <Link className="flex items-center space-x-2" href="/app/settings">
        <Avatar fallback="DT" src={currentUser?.images[0]?.url} />
        <p className="font-medium">{currentUser?.name}</p>
      </Link>

      <div className="flex gap-3">
        <ActionLink href="/app/explore">
          <MagnifyingGlassIcon width={16} height={16} />
        </ActionLink>

        <ActionLink href="/app/dating">
          <SewingPinIcon width={16} height={16} />
        </ActionLink>
      </div>
    </header>
  );
}
