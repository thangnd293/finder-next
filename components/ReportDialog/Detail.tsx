import { useFormContext } from "react-hook-form";
import { FormValues, StepProps } from ".";
import Container from "./Container";

import Textarea from "@/components/Textarea";

interface DetailProps extends StepProps {}

const Detail = ({ onNext }: DetailProps) => {
  const {
    control,
    formState: { isValid },
  } = useFormContext<FormValues>();

  return (
    <Container
      title="Bạn có thể chia sẻ thêm chi tiết với chúng tôi được không?"
      isDisabled={!isValid}
      onNext={onNext}
    >
      <div className="w-full space-y-2">
        <h3 className="w-full text-left font-semibold">Thêm nhận xét</h3>
        <Textarea
          className={`scroll-hidden w-full resize-none rounded-md border-2 outline-none`}
          placeholder="Vui lòng cung cấp thêm thông tin chi tiết về điều bạn báo cáo."
          spellCheck="false"
          rows={5}
          {...control.register("description")}
        />
        <p className="w-full text-left text-sm">Số ký tự tối thiểu: 5</p>
      </div>
    </Container>
  );
};

export default Detail;
