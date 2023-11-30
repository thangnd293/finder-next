import { ROUTE } from "@/constant/route";
import Link from "next/link";
import Notifications from "./Notifications";
import UserInfo from "./UserInfo";
import ModeToggle from "@/components/ModeToggle";

export default function SidebarHeader() {
  return (
    <header className="flex h-18 items-center justify-between border-b px-3 py-4 md:h-20">
      <Link className="flex items-center space-x-2" href={ROUTE.PROFILE}>
        <UserInfo />
      </Link>

      <div className="hidden gap-3 md:flex">
        <ModeToggle variant="light" className="h-9 w-9 rounded-full" />
        <Notifications />
      </div>
    </header>
  );
}
