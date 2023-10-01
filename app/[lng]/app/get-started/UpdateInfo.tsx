import Button from "@/components/Button";
import DateSelect from "@/components/DateSelect";
import Input from "@/components/Input";
import ProvinceSelect from "@/components/ProvinceSelect";
import RadioGroup from "@/components/RadioGroup";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import {
  UpdateProfilePayload,
  useCurrentUser,
  useUpdateProfile,
} from "@/service/user";
import { Gender, User } from "@/service/user";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

type FormValues = Pick<User, "name" | "gender" | "birthDate"> & {
  province: string;
};

const validateForm = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên của bạn"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  province: Yup.string().required("Vui lòng chọn tỉnh thành"),
  birthDate: Yup.string().required("Vui lòng chọn ngày sinh"),
});

interface UpdateInfoProps {
  currentStep: number;
  isLastStep?: boolean;
  onNext: () => void;
}
const genderData = [
  {
    label: "Nam",
    value: Gender.Male,
  },
  {
    label: "Nữ",
    value: Gender.Female,
  },
];

export default function UpdateInfo({
  isLastStep,
  currentStep,
  onNext,
}: UpdateInfoProps) {
  const formResolver = useYupValidationResolver(validateForm);
  const { data: currentUser } = useCurrentUser();
  const updateProfile = useUpdateProfile();

  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty, errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: currentUser?.name || "",
      gender: currentUser?.gender || Gender.Male,
      province: currentUser?.homeTown?.province || "",
      birthDate: currentUser?.birthDate || "",
    },
    resolver: formResolver,
  });

  const onSubmit = ({ province, ...others }: FormValues) => {
    if (isDirty) {
      const payload: UpdateProfilePayload = {
        ...others,
        homeTown: {
          province,
        },
        stepStarted: currentStep + 1,
      };

      updateProfile.mutate(payload);
    }

    onNext();
  };

  return (
    <form
      className="flex max-w-sm flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-2xl font-bold">
        Cập nhật thông tin cá nhân
      </h3>
      <p className="text-center text-sm text-secondary-foreground">
        Những người phù hợp với bạn sẽ thấy thông tin của bạn
      </p>
      <div className="flex w-full flex-col gap-3">
        <Input
          label="Tên"
          placeholder="Ex: John Doe"
          {...register("name")}
          error={errors.name?.message}
        />

        <Controller
          name="birthDate"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <DateSelect label="Ngày sinh" value={value} onChange={onChange} />
          )}
        />

        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              label="Giới tính"
              data={genderData}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

      <Controller
        name="province"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <ProvinceSelect
            className="w-full"
            label="Quê quán"
            value={value}
            error={error?.message}
            onChange={onChange}
          />
        )}
      />

      <Button className="w-fit" type="submit">
        {isLastStep ? "Hoàn tất" : "Tiếp tục"}
      </Button>
    </form>
  );
}
