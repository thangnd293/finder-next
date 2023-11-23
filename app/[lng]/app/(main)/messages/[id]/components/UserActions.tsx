"use client";

import ActionIcon from "@/components/ActionIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import ReportDialog from "@/components/ReportDialog";
import { useSafeModeStatus } from "@/service/conversation";
import { User } from "@/service/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import {
  BsEnvelopePlus,
  BsFlag,
  BsThreeDotsVertical,
  BsXLg,
} from "react-icons/bs";
import SafeModeDialog from "./SafeModeDialog";
import ScheduleDialog from "./ScheduleDialog";
import ConfirmUnmatchDialog from "./ConfirmUnmatchDialog";

interface UserActionsProps {
  user?: User;
  conversation: string;
}
const UserActions = ({ user, conversation }: UserActionsProps) => {
  const router = useRouter();

  const { isEnableSafeMode } = useSafeModeStatus(conversation);

  const [isOpenReportDialog, setIsOpenReportDialog] = useState(false);
  const [isOpenScheduleDialog, setIsOpenScheduleDialog] = useState(false);
  const [isOpenSafeModeDialog, setIsOpenSafeModeDialog] = useState(false);
  const [isOpenUnmatchDialog, setIsOpenUnmatchDialog] = useState(false);

  const handleReportDone = () => {
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

          <DropdownMenuItem
            className="gap-1.5"
            onClick={() => setIsOpenSafeModeDialog(true)}
          >
            <AiOutlineSafety /> {isEnableSafeMode ? "Tắt" : "Mở"} chế độ an toàn
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-1.5"
            onClick={() => setIsOpenUnmatchDialog(true)}
          >
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

      <SafeModeDialog
        conversation={conversation}
        isEnableSafeMode={isEnableSafeMode}
        isOpen={isOpenSafeModeDialog}
        onClose={() => setIsOpenSafeModeDialog(false)}
      />
      {user && (
        <ConfirmUnmatchDialog
          conversation={conversation}
          user={user}
          isOpen={isOpenUnmatchDialog}
          onClose={() => setIsOpenUnmatchDialog(false)}
        />
      )}
    </>
  );
};

export default UserActions;
