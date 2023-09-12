"use client";

import ActionIcon from "@/components/ActionIcon";
import { usePathname } from "@/hooks/use-path-name";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface IActionLinkProps extends ComponentPropsWithoutRef<typeof Link> {}
export default function ActionLink({
  className,
  href,
  children,
  ...others
}: PropsWithChildren<IActionLinkProps>) {
  const pathname = usePathname();

  return (
    <Link className={cn("block w-fit", className)} href={href} {...others}>
      <ActionIcon
        className={cn("rounded-full", {
          "bg-primary-100 text-primary": pathname === href,
        })}
        variant="light"
        size="lg"
      >
        {children}
      </ActionIcon>
    </Link>
  );
}
