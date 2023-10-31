import Logo from "@/components/Logo";
import React from "react";

export const Header = () => {
  return (
    <header className="flex h-12 w-full flex-shrink-0 items-center justify-center md:h-20">
      <Logo />
    </header>
  );
};
