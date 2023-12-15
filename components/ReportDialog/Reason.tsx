import { useFormContext } from "react-hook-form";
import { FormValues, StepProps } from ".";
import Container from "./Container";
import { cn } from "@/lib/utils";

interface ReasonProps extends StepProps {}

const Reason = ({ onNext }: ReasonProps) => {
  const { watch, setValue } = useFormContext<FormValues>();

  const reasonSelected = watch("reason");
  const target = watch("target");

  const handleChooseReason = (reason: string) => {
    setValue("reason", reason);
  };

  return (
    <Container
      title="Lý do báo cáo của bạn là gì?"
      isDisabled={!reasonSelected}
      onNext={onNext}
    >
      <ul className="w-full list-none space-y-1">
        {REASONS.map((reason) => (
          <li key={reason.id}>
            <button
              type="button"
              className={cn(
                "text-text-secondary block w-full rounded-md p-3 text-left font-medium hover:bg-background-100",
                {
                  "cursor-auto bg-background-100":
                    !reasonSelected && reason.isTitle,
                  "bg-none": reasonSelected && reason.isTitle,
                  "bg-background-100 text-base font-semibold":
                    reason.content === reasonSelected,
                },
              )}
              onClick={() => {
                !reason.isTitle && handleChooseReason(reason.content);
              }}
            >
              {reason.content}
            </button>
          </li>
        ))}
      </ul>

      <p className="py-1 text-center text-sm">
        Chúng tôi sẽ không cho{" "}
        <span className="font-medium">{target?.name}</span> biết rằng bạn đã báo
        cáo họ
      </p>
    </Container>
  );
};

export default Reason;

const REASONS = [
  {
    id: 1,
    content: "Vui lòng chọn một lý do",
    isTitle: true,
  },
  {
    id: 2,
    content: "Đây là hồ sơ giả mạo",
    isTitle: false,
  },
  {
    id: 3,
    content: "Có ảnh khỏa thân hoặc nội dung khiêu dâm",
    isTitle: false,
  },
  {
    id: 4,
    content: "Có người đang chào bán thứ gì đó",
    isTitle: false,
  },
  {
    id: 5,
    content: "Hành vi lạm dụng hoặc đe dọa",
    isTitle: false,
  },
  {
    id: 6,
    content: "Đã xảy ra tổn hại thể chất trực tiếp",
    isTitle: false,
  },
];
