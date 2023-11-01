import Button from "@/components/Button";
import React from "react";

interface GetStartedStepProps {
  onOpenScheduleEditor: () => void;
  onNextStep: () => void;
}
const GetStartedStep = ({
  onOpenScheduleEditor,
  onNextStep,
}: GetStartedStepProps) => {
  return (
    <div className="flex w-full flex-shrink-0 flex-wrap items-center justify-center gap-2 pt-4">
      <Button
        className="rounded-full"
        variant="outline"
        size="sm"
        onClick={onOpenScheduleEditor}
      >
        Tự tạo lịch hẹn
      </Button>
      <Button
        className="rounded-full"
        variant="outline"
        size="sm"
        onClick={onNextStep}
      >
        Giúp tôi tạo lịch hẹn
      </Button>
    </div>
  );
};

export default GetStartedStep;
