"use client";

import Button from "@/components/Button";
import UploadImages from "@/components/UploadImages";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import {
  Image,
  UpdateProfilePayload,
  useCurrentUser,
  useUpdateProfile,
} from "@/service/user";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

interface FormValues {
  images: Image[];
}

const validateForm = Yup.object({
  images: Yup.array().min(3, "Vui lòng chọn ít nhất 3 ảnh"),
});

const PhotoSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: images } = useCurrentUser({
    select: (user) => user.images,
  });

  const formResolver = useYupValidationResolver(validateForm);

  const updateProfile = useUpdateProfile();

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      images,
    },
    resolver: formResolver,
  });

  const onSubmitForm = (values: FormValues) => {
    const isChangeAvatar = values.images[0]?.url !== images?.[0]?.url;

    let payload: UpdateProfilePayload = {
      ...values,
    };

    if (isChangeAvatar) payload.blurAvatar = values.images[0].url;

    updateProfile.mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center"
      ref={formRef}
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <UploadImages
            className="w-full gap-1"
            maxImages={9}
            error={error?.message}
            value={value}
            onChange={onChange}
          />
        )}
      />
      {isDirty && (
        <Button
          className="mt-2"
          type="submit"
          size="sm"
          loading={updateProfile.isLoading}
        >
          Lưu
        </Button>
      )}
    </form>
  );
};

export default PhotoSection;
