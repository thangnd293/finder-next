import { ROUTE } from "@/constant/route";
import { MagnifyingGlassIcon, SewingPinIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ActionLink from "./ActionLink";
import UserInfo from "./UserInfo";

export default function SidebarHeader() {
  return (
    <header className="flex h-18 items-center justify-between border-b px-3 py-4 md:h-20">
      <Link className="flex items-center space-x-2" href={ROUTE.PROFILE}>
        <UserInfo />
      </Link>

      <div className="hidden gap-3 md:flex">
        <ActionLink href={ROUTE.EXPLORE}>
          <MagnifyingGlassIcon width={16} height={16} />
        </ActionLink>

        <ActionLink href={ROUTE.DATING_INVITATION}>
          <SewingPinIcon width={16} height={16} />
        </ActionLink>
      </div>
    </header>
  );
}
