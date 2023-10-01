"use client";

import { UploadPhotoIcon } from "@/assets/icons";
import Button from "@/components/Button";
import UploadImages from "@/components/UploadImages";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { Image, useCurrentUser, useUpdateProfile } from "@/service/user";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

interface FormValues {
  images: Image[];
}

const validateForm = Yup.object({
  images: Yup.array().min(1, "Vui lòng chọn ít nhất 1 ảnh"),
});
interface UploadPhotoProps {
  currentStep: number;
  isLastStep?: boolean;
  onNext: () => void;
}

const UploadPhoto = ({ currentStep, isLastStep, onNext }: UploadPhotoProps) => {
  const { data: images } = useCurrentUser({
    select: (user) => user.images,
  });

  const updateProfile = useUpdateProfile();
  const formResolver = useYupValidationResolver(validateForm);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      images,
    },
    resolver: formResolver,
  });

  const onSubmit = ({ images }: FormValues) => {
    if (isDirty) {
      updateProfile.mutate({
        images,
        stepStarted: currentStep + 1,
        blurAvatar: images[0].url,
      });
    }

    onNext();
  };

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <UploadPhotoIcon height={120} />

      <h3 className="text-center text-2xl font-bold">
        Chọn ảnh cho hồ sơ của bạn
      </h3>
      <p className="text-center text-sm text-secondary-foreground">
        Mọi người sẽ nhận ra bạn dễ dàng hơn nếu bạn có ảnh đại diện.
        <br /> Bạn có thể thay đổi ảnh bất cứ lúc nào.
        <br /> Chọn những tấm hình tuyệt nhất của mình nhé
      </p>

      <Controller
        name="images"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <UploadImages
            maxImages={3}
            error={error?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button className="w-fit" type="submit">
        {isLastStep ? "Hoàn tất" : "Tiếp tục"}
      </Button>
    </form>
  );
};

export default UploadPhoto;
