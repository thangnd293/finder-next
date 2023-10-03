"use client";

import ActionIcon from "@/components/ActionIcon";
import { usePathname } from "@/hooks/use-path-name";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface ActionLinkProps extends ComponentPropsWithoutRef<typeof Link> {}

const ActionLink = ({
  className,
  href,
  children,
  ...others
}: PropsWithChildren<ActionLinkProps>) => {
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
};

export default ActionLink;
