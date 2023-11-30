"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";

import ActionIcon from "@/components/ActionIcon";
import { cn } from "@/lib/utils";

interface ModeToggleProps
  extends React.ComponentPropsWithoutRef<typeof ActionIcon> {}
const ModeToggle = ({ className, ...others }: ModeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const onToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ActionIcon
      className={cn("h-11 w-11", className)}
      {...others}
      onClick={onToggle}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </ActionIcon>
  );
};

export default ModeToggle;
