import Textarea from "@/components/Textarea";
import { Controller, useFormContext } from "react-hook-form";
import { FormValues, StepProps } from ".";
import ImageDropzone from "../ImageDropzone";
import Container from "./Container";

interface ConfirmProps extends StepProps {}

const Confirm = ({ isSubmitting }: ConfirmProps) => {
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const { target, reason } = getValues();

  return (
    <Container title={`Báo cáo ${target!.name}`} isSubmitting={isSubmitting}>
      <p className="text-center text-sm text-muted-foreground">
        Chúng tôi quan tâm tới bạn và những điều bạn muốn nói. Vì sự an toàn của
        bạn, những điều bạn chia sẻ với chúng tôi ở đây sẽ được bảo mật.
      </p>

      <div className="w-full space-y-2">
        <h3 className="text-center text-lg font-semibold">
          Xem lại báo cáo của bạn
        </h3>
        <h4 className="font-semibold">Lý do báo cáo của tôi:</h4>
        <p className="text-sm">{reason}</p>
        <h4 className="font-semibold">Nhận xét kèm theo:</h4>
        <Textarea
          className={`scroll-hidden rounded-2 resize-none border p-2 text-sm outline-none`}
          placeholder="Vui lòng cung cấp thêm thông tin chi tiết về điều bạn báo cáo."
          spellCheck="false"
          rows={5}
          {...control.register("description")}
          error={errors.description?.message}
        />

        <div>
          <h4 className="font-semibold">Ảnh kèm theo:</h4>

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
      </div>
    </Container>
  );
};

export default Confirm;
