"use client";

import ActionIcon from "@/components/ActionIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import ReportDialog from "@/components/ReportDialog";
import { User } from "@/service/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsThreeDotsVertical, BsFlag, BsXLg } from "react-icons/bs";

interface UserActionsProps {
  user?: User;
}
const UserActions = ({ user }: UserActionsProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleReportDone = () => {
    // TODO: handle report done
    router.replace("/app");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ActionIcon variant="ghost">
            <BsThreeDotsVertical />
            <span className="sr-only">More action</span>
          </ActionIcon>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-1.5" onClick={() => setIsOpen(true)}>
            <BsFlag /> Báo báo
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-1.5">
            <BsXLg /> Hủy ghép đôi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {user && (
        <ReportDialog
          target={user}
          visible={isOpen}
          onClose={() => setIsOpen(false)}
          onReportDone={handleReportDone}
        />
      )}
    </>
  );
};

export default UserActions;
