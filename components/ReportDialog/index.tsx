import { useState } from "react";

import ActionIcon from "@/components/ActionIcon";
import Modal from "@/components/Modal";
import Progress from "@/components/Progress";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { cn } from "@/lib/utils";
import { useCreateReport } from "@/service/report";
import { User } from "@/service/user";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Alert from "./Alert";
import ChooseUser from "./ChooseUser";
import Confirm from "./Confirm";
import Detail from "./Detail";
import Reason from "./Reason";
import { useCldUpload } from "@/lib/cloudinary";
import { CloseButton } from "../Modal/ModalHeader";

interface ReportDialogProps {
  target?: User;
  visible: boolean;
  onClose: () => void;
  onReportDone?: () => void;
}

const ReportDialog = ({
  target,
  visible,
  onClose,
  onReportDone,
}: ReportDialogProps) => {
  const reportFormResolver = useYupValidationResolver(reportForm);
  const submitReport = useCreateReport();
  const [isProcessing, setIsProcessing] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      target: target || null,
      reason: "",
      description: "",
      images: [],
    },
    resolver: reportFormResolver,
  });
  const cldUpload = useCldUpload();

  const { handleSubmit, reset } = methods;

  const startStep = target ? ReportStep.Reason : ReportStep.ChooseUser;
  const [currentStep, setCurrentStep] = useState(startStep);

  const Step = Steps[currentStep];
  const isFirstStep = currentStep === startStep;
  const isLastStep = currentStep === Object.keys(ReportStep).length / 2 - 1;

  const handlePrev = () => {
    if (isFirstStep) return;

    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmit = async ({ target, images, ...rest }: FormValues) => {
    setIsProcessing(true);
    const uploadImages = await Promise.all(
      images.map((file) => cldUpload.mutateAsync(file)),
    );

    const _images = uploadImages.map((image) => ({
      url: image.url,
    }));

    submitReport.mutate(
      {
        reportedUser: target!._id,
        ...rest,
        images: _images,
      },
      {
        onSuccess: onReportDone,
        onSettled: handleClose,
      },
    );
  };
  const totalStep = Object.keys(ReportStep).length / 2 - startStep;
  const percent = ((currentStep + 1 - startStep) / totalStep) * 100;

  const handleClose = () => {
    onClose();
    reset();
    setCurrentStep(startStep);
    setIsProcessing(false);
  };

  return (
    <Modal
      open={visible}
      onOpenChange={handleClose}
      closeOnClickOutside={currentStep === startStep}
    >
      <Modal.Body className="relative p-6">
        <FormProvider {...methods}>
          <form
            className="flex w-full flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ActionIcon
              className={cn("absolute left-5 top-2.5", {
                hidden: isFirstStep,
              })}
              disabled={isProcessing || isFirstStep}
              variant="ghost"
              onClick={handlePrev}
            >
              <ArrowLeftIcon width={16} height={16} />
            </ActionIcon>

            <Progress className="mx-auto h-1 w-1/2" value={percent} />

            <Step
              isSubmitting={isProcessing}
              onNext={isLastStep ? undefined : handleNext}
              onPrev={handlePrev}
            />
          </form>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
};

export default ReportDialog;

export enum ReportStep {
  ChooseUser = 0,
  Alert = 1,
  Reason = 2,
  Detail = 3,
  Confirm = 4,
}

export interface StepProps {
  isSubmitting?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}
const Steps: Record<ReportStep, (props: StepProps) => JSX.Element> = {
  [ReportStep.ChooseUser]: ChooseUser,
  [ReportStep.Alert]: Alert,
  [ReportStep.Reason]: Reason,
  [ReportStep.Detail]: Detail,
  [ReportStep.Confirm]: Confirm,
};

export interface FormValues {
  target: User | null;
  reason: string;
  description: string;
  images: File[];
}

const reportForm = yup.object({
  reason: yup.string().required("Vui lòng chọn lý do"),
  description: yup.string().min(5, "Vui lòng nhập ít nhất 5 ký tự"),
  images: yup.array().max(5, "Chọn tối đa 5 ảnh"),
});
