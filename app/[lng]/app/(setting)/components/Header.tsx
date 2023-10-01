import ActionIcon from "@/components/ActionIcon";
import { ROUTE } from "@/constant/route";
import Link from "next/link";
import React from "react";
import { BsXLg } from "react-icons/bs";

interface HeaderProps {
  title: string;
  backTo?: string;
}
const Header = ({ title, backTo }: HeaderProps) => {
  return (
    <>
      <h1 className="text-center text-lg font-semibold">{title}</h1>
      <Link className="absolute right-4" href={backTo ?? ROUTE.PROFILE}>
        <ActionIcon className="rounded-full">
          <BsXLg />
        </ActionIcon>
      </Link>
    </>
  );
};

export default Header;
