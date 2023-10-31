"use client";

import { useState } from "react";
import { BsFlag } from "react-icons/bs";
import { User } from "@/service/user";
import ReportDialog from "@/components/ReportDialog";
import { cn } from "@/lib/utils";

interface BlockAndReportProps {
  className?: string;
  target?: User;
  onReportDone?: () => void;
}
const BlockAndReport = ({
  className,
  target,
  onReportDone,
}: BlockAndReportProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={cn(
          "flex items-center gap-1 text-xs font-medium text-muted-foreground",
          className,
        )}
        onClick={() => setIsOpen(true)}
      >
        <BsFlag />
        <span>Chặn và báo cáo</span>
      </button>

      <ReportDialog
        target={target}
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        onReportDone={onReportDone}
      />
    </>
  );
};

export default BlockAndReport;
