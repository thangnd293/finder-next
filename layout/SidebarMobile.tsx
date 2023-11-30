"use client";

import { ROUTE } from "@/constant/route";
import { cn } from "@/lib/utils";
import { useMatchRequestCount } from "@/service/matchRequest";
import { NotificationType, useNotificationCount } from "@/service/notification";
import { NavItem } from "@/types/common";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { AiFillFire } from "react-icons/ai";
import { BiSolidCalendarHeart } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosChatbubbles } from "react-icons/io";
import { PiHeartFill } from "react-icons/pi";

interface SidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {}
const SidebarMobile = ({ className }: SidebarMobileProps) => {
  const { data } = useMatchRequestCount();
  const { count } = useNotificationCount([NotificationType.ScheduleDating]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const path = `${pathname}${
    searchParams ? "?" + searchParams.toString() : ""
  }`;

  const matchRequestCount = data?.totalCount ?? 0;

  const navList: NavItem[] = [
    {
      href: ROUTE.PROFILE,
      label: "Trang cá nhân",
      Icon: BsFillPersonFill,
    },
    {
      href: ROUTE.DATING_INVITATION,
      label: "Lời mời hẹn hò",
      Icon: BiSolidCalendarHeart,
      notificationCount: count,
    },
    {
      href: ROUTE.HOME,
      label: "Trang chủ",
      Icon: AiFillFire,
    },
    {
      href: ROUTE.LIKED_YOU,
      label: "Người thích bạn",
      Icon: PiHeartFill,
      notificationCount: matchRequestCount,
    },
    {
      href: `${ROUTE.HOME}?tab=message`,
      label: "Nhắn tin",
      Icon: IoIosChatbubbles,
    },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 mx-auto flex w-full items-center justify-evenly border-t bg-background",
        className,
      )}
    >
      {navList.map((navItem) => {
        const Icon = navItem.Icon;

        if (!navItem.href) return null;

        return (
          <Link
            key={navItem.href}
            className={cn(
              "flex grow items-center justify-center py-3 text-center font-medium text-muted-foreground hover:bg-background-50 hover:text-foreground",
              {
                "text-foreground": path?.endsWith(navItem.href),
              },
            )}
            href={navItem.href}
          >
            <div className="relative">
              <Icon className="block h-7 w-7" />
              {!!navItem.notificationCount && (
                <span className="absolute -right-4.5 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0.5 text-xs text-white">
                  {navItem.notificationCount}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarMobile;
