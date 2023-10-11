"use client";

import { useState } from "react";
import { BsFlag } from "react-icons/bs";
import { User } from "@/service/user";
import ReportDialog from "@/components/ReportDialog";

interface BlockAndReportProps {
  target?: User;
  onReportDone?: () => void;
}
const BlockAndReport = ({ target, onReportDone }: BlockAndReportProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="absolute -bottom-6 left-3 z-50 flex items-center gap-1 text-xs font-medium text-muted-foreground"
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
