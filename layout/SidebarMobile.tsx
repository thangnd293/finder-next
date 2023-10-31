"use client";

import { ROUTE } from "@/constant/route";
import { cn } from "@/lib/utils";
import { useMatchRequestCount } from "@/service/matchRequest";
import { NavItem } from "@/types/common";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BiSolidUser } from "react-icons/bi";
import { BsChatFill, BsFillHeartFill, BsHouseFill } from "react-icons/bs";

interface SidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {}
const SidebarMobile = ({ className }: SidebarMobileProps) => {
  const { data } = useMatchRequestCount();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const path = `${pathname}${
    searchParams ? "?" + searchParams.toString() : ""
  }`;

  const matchRequestCount = data?.totalCount ?? 0;

  const navList: NavItem[] = [
    {
      href: ROUTE.PROFILE,
      label: "Profile",
      Icon: BiSolidUser,
    },
    {
      href: ROUTE.HOME,
      label: "Home",
      Icon: BsHouseFill,
    },
    {
      href: ROUTE.LIKED_YOU,
      label: "Like you",
      Icon: BsFillHeartFill,
      notificationCount: matchRequestCount,
    },
    {
      href: `${ROUTE.HOME}?tab=message`,
      label: "Chat",
      Icon: BsChatFill,
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
