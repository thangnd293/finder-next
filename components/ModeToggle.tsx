"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import ActionIcon from "@/components/ActionIcon";
import { cn } from "@/lib/utils";

interface ModeToggleProps
  extends React.ComponentPropsWithoutRef<typeof ActionIcon> {}
const ModeToggle = ({ className, ...others }: ModeToggleProps) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ActionIcon className={cn("h-11 w-11", className)} {...others}>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </ActionIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="space-x-2"
          onClick={() => setTheme("light")}
        >
          <SunIcon /> <span>Sáng</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="space-x-2"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon /> <span>Tối</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
