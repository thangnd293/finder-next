"use client";

import Tooltip from "@/components/Tooltip";
import { ROUTE } from "@/constant/route";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/common";
import { eraseCookie } from "@/utils/cookie";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsBoxArrowInRight,
  BsFillGearFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { useMediaQuery } from "usehooks-ts";

const NavList = () => {
  const pathname = usePathname();

  const isMobileView = useMediaQuery("(max-width: 768px)");

  return (
    <nav className="space-y-3 p-4">
      {navList.map(({ Icon, label, href, action }) => {
        const Component = href ? Link : "button";

        const props = href ? { href } : { onClick: action };

        return (
          <Tooltip label={label} key={label} disabled={!isMobileView}>
            <Component
              className={cn(
                "flex aspect-square w-full items-center justify-center rounded-full p-1.5 text-center font-medium text-secondary-foreground hover:bg-background-50 hover:text-foreground md:block md:aspect-auto md:p-2.5",
                {
                  "text-foreground": href && pathname?.includes(href),
                },
              )}
              {...(props as any)}
            >
              <Icon className="block h-5 w-5 md:hidden" />
              <span className="hidden md:block">{label}</span>
            </Component>
          </Tooltip>
        );
      })}
    </nav>
  );
};

export default NavList;

const navList: NavItem[] = [
  {
    href: ROUTE.PROFILE,
    label: "Thông tin",
    Icon: BsFillPersonFill,
  },
  {
    href: ROUTE.SETTING,
    label: "Cài đặt",
    Icon: BsFillGearFill,
  },
  {
    action: () => {
      eraseCookie("accessToken");
      signOut();
    },
    label: "Đăng xuất",
    Icon: BsBoxArrowInRight,
  },
];
