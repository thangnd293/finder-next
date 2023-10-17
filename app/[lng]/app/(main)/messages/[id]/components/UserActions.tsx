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
import { useState } from "react";
import {
  BsEnvelopePlus,
  BsFlag,
  BsThreeDotsVertical,
  BsXLg,
} from "react-icons/bs";
import ScheduleDialog from "./ScheduleDialog";

interface UserActionsProps {
  user?: User;
}
const UserActions = ({ user }: UserActionsProps) => {
  const router = useRouter();

  const [isOpenReportDialog, setIsOpenReportDialog] = useState(false);
  const [isOpenScheduleDialog, setIsOpenScheduleDialog] = useState(false);

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
          <DropdownMenuItem
            className="gap-1.5"
            onClick={() => setIsOpenScheduleDialog(true)}
          >
            <BsEnvelopePlus /> Tạo cuộc hẹn
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-1.5"
            onClick={() => setIsOpenReportDialog(true)}
          >
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
          visible={isOpenReportDialog}
          onClose={() => setIsOpenReportDialog(false)}
          onReportDone={handleReportDone}
        />
      )}

      {isOpenScheduleDialog && (
        <ScheduleDialog
          isOpen={isOpenScheduleDialog}
          onClose={() => setIsOpenScheduleDialog(false)}
        />
      )}
    </>
  );
};

export default UserActions;
