"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Progress from "@/components/Progress";
import { cn } from "@/lib/utils";
import { TagType } from "@/service/tag";
import { useMemo, useState } from "react";
import DietarySetting from "./DietarySetting";
import DrinkSetting from "./DrinkSetting";
import EducationSetting from "./EducationSetting";
import ExerciseSetting from "./ExerciseSetting";
import HeightSetting from "./HeightSetting";
import KidsSetting from "./KidsSetting";
import LoveSetting from "./LoveSetting";
import PersonalitySetting from "./PersonalitySetting";
import PetsSetting from "./PetsSetting";
import ReligionSetting from "./ReligionSetting";
import SmokeSetting from "./SmokeSetting";
import ZodiacSetting from "./ZodiacSetting";
import { useCurrentUser } from "@/service/user";
import { BasicSettingStep } from "@/utils/tag";

interface BasicSettingDialogProps {
  step: BasicSettingStep | null;
  onClose: () => void;
}

export interface StepSettingProps {
  currentValue: string;
  onNextStep: () => void;
}
export const BasicSettingDialog = ({
  step,
  onClose,
}: BasicSettingDialogProps) => {
  const { data } = useCurrentUser({
    select: (user) => ({
      tags: user.tags,
      height: user.height,
    }),
  });

  const tags = data?.tags;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const notFillTagTypes = useMemo(() => {
    const tagTypes = Object.values(TagType);
    return tagTypes.filter((type) => !tags?.find((tag) => tag.type === type));
  }, [tags]);

  if (!step) return null;

  const notFillValue: BasicSettingStep[] = [];

  if (!data?.height) notFillValue.push("height");

  const emptyStep: BasicSettingStep[] = Array.from(
    new Set([step, ...notFillValue, ...notFillTagTypes]),
  );

  const handleClose = () => {
    setCurrentStepIndex(0);
    onClose();
    setShowConfirmDialog(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex === emptyStep.length - 1) {
      handleClose();
      return;
    }

    setCurrentStepIndex((prev) => prev + 1);
  };

  const Content = steps[emptyStep[currentStepIndex]];

  const currentValue =
    tags?.find((tag) => tag.type === emptyStep[currentStepIndex])?._id || "";

  return (
    <Modal className="p-6" onOpenChange={() => setShowConfirmDialog(true)}>
      <ConfirmAlert
        isShow={showConfirmDialog}
        onClose={handleClose}
        onContinue={() => setShowConfirmDialog(false)}
      />

      <div
        className={cn({
          hidden: showConfirmDialog,
          block: !showConfirmDialog,
        })}
      >
        <Progress
          className="mx-auto h-1 w-48"
          value={((currentStepIndex + 1) / (emptyStep.length + 1)) * 100}
        />
        {<Content currentValue={currentValue} onNextStep={handleNextStep} />}
      </div>
    </Modal>
  );
};

const steps: Record<
  BasicSettingStep,
  (props: StepSettingProps) => React.JSX.Element
> = {
  height: HeightSetting,
  [TagType.DO_EXERCISE]: ExerciseSetting,
  [TagType.EDUCATION]: EducationSetting,
  [TagType.DRINK]: DrinkSetting,
  [TagType.SMOKE_QUESTION]: SmokeSetting,
  [TagType.KIDS]: KidsSetting,
  [TagType.ZODIAC]: ZodiacSetting,
  [TagType.RELIGION]: ReligionSetting,
  [TagType.DIETARY_PREFERENCE]: DietarySetting,
  [TagType.LOVE_QUESTION]: LoveSetting,
  [TagType.PERSONALITY_TYPE]: PersonalitySetting,
  [TagType.PETS]: PetsSetting,
};

interface ConfirmAlertProps {
  isShow: boolean;
  onClose: () => void;
  onContinue: () => void;
}
const ConfirmAlert = ({ isShow, onClose, onContinue }: ConfirmAlertProps) => {
  return (
    <div
      className={cn("space-y-4 text-center", {
        hidden: !isShow,
        block: isShow,
      })}
    >
      <h1 className="text-xl font-semibold">Bạn chưa hoàn tất thông tin</h1>
      <p>
        Bạn muốn biết những điều này về người khác và họ cũng muốn biết về bạn!
        Điền đầy đủ thông tin cơ bản của bạn sẽ giúp bạn nhận được nhiều kết quả
        phù hợp hơn và nhiều câu trả lời hơn
      </p>

      <div className="space-x-6">
        <Button variant="ghost" onClick={onClose}>
          Để sau
        </Button>
        <Button onClick={onContinue}>Tiếp tục</Button>
      </div>
    </div>
  );
};
