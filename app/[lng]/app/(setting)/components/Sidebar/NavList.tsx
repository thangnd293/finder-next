"use client";

import Tooltip from "@/components/Tooltip";
import { ROUTE } from "@/constant/route";
import { useIsMobile } from "@/hooks/use-is-mobile";
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

import Verified, { verifyAction } from "../../verified/verified";


const NavList = () => {
  const pathname = usePathname();

  const isMobileView = useIsMobile();

  return (
    <>
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
      <Verified />
    </>
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
      verifyAction.setOpen(true);
    },
    label: "Xác thực tài khoản",
    Icon: BsFillPersonFill,
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
