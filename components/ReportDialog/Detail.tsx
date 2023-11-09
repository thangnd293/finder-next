import { Controller, useFormContext } from "react-hook-form";
import { FormValues, StepProps } from ".";
import Container from "./Container";

import Textarea from "@/components/Textarea";
import ImageDropzone from "../ImageDropzone";
import Label from "../Label";

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
        <Textarea
          label="Thêm nhận xét"
          className={`scroll-hidden w-full resize-none rounded-md border-2 outline-none`}
          placeholder="Vui lòng cung cấp thêm thông tin chi tiết về điều bạn báo cáo."
          spellCheck="false"
          rows={5}
          isRequired
          {...control.register("description")}
        />
        <p className="w-full text-left text-sm">Số ký tự tối thiểu: 5</p>
      </div>
      <div className="w-full">
        <Label>Thêm ảnh</Label>
        <Controller
          control={control}
          name="images"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <ImageDropzone
              images={value}
              message="Ảnh kèm theo (tối đa 5 ảnh)"
              error={error?.message}
              onImagesChange={onChange}
            />
          )}
        />
      </div>
    </Container>
  );
};

export default Detail;
