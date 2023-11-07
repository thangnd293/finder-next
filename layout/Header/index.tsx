import { ROUTE } from "@/constant/route";
import Link from "next/link";
import ScheduleNotification from "./ScheduleNotification";
import UserInfo from "./UserInfo";

export default function SidebarHeader() {
  return (
    <header className="flex h-18 items-center justify-between border-b px-3 py-4 md:h-20">
      <Link className="flex items-center space-x-2" href={ROUTE.PROFILE}>
        <UserInfo />
      </Link>

      <div className="hidden gap-3 md:flex">
        <ScheduleNotification />
      </div>
    </header>
  );
}
