"use client";

import Button from "@/components/Button";
import Label from "@/components/Label";
import RadioGroup from "@/components/RadioGroup";
import Slider from "@/components/Slider";
import {
  LookingFor,
  useCurrentUser,
  useInvalidateRecommendedUsers,
  useUpdateSetting,
} from "@/service/user";
import useStore from "@/store";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "./Checkbox";

interface FormValues {
  lookingFor: LookingFor;
  age: number[];
  distance: number;
  onlyShowAgeThisRange: boolean;
  onlyShowDistanceThisRange: boolean;
}

interface FilterFormProps {
  onSubmitDone?: () => void;
}
const FilterForm = ({ onSubmitDone }: FilterFormProps) => {
  const { data: discovery } = useCurrentUser({
    select: (user) => user.setting.discovery,
  });
  const invalidateRecommendedUsers = useInvalidateRecommendedUsers();
  const setCurrentIndex = useStore((state) => state.setCurrentIndex);
  const updateSetting = useUpdateSetting();

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      ...discovery,
      lookingFor: discovery?.lookingFor ?? LookingFor.All,
      age: [discovery?.minAge, discovery?.maxAge],
    },
  });

  const rangeAge = watch("age");
  const distance = watch("distance");

  const onSubmit = ({ lookingFor, age, ...others }: FormValues) => {
    updateSetting.mutate(
      {
        discovery: {
          ...discovery,
          ...others,
          minAge: age[0],
          maxAge: age[1],
          lookingFor,
        },
      },
      {
        onSuccess: () => {
          reset({
            lookingFor,
            age,
            ...others,
          });
          invalidateRecommendedUsers();
          setCurrentIndex(0);
        },
        onSettled: onSubmitDone,
      },
    );
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="lookingFor"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            className="w-full space-y-1.5"
            label="Giới tính bạn quan tâm"
            data={genderDate}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <div className="space-y-1.5">
        <Label>Tuổi</Label>
        <div className="space-y-6 rounded-2xl border border-primary-300 p-6 text-sm">
          <p>
            Từ {rangeAge[0]} đến {rangeAge[1]}
          </p>

          <Controller
            name="age"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Slider
                value={value}
                onValueChange={onChange}
                max={78}
                min={18}
                step={1}
              />
            )}
          />

          <Controller
            name="onlyShowAgeThisRange"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label="Chỉ hiển thị trong độ tuổi này"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Khoảng cách</Label>
        <div className="space-y-6 rounded-2xl border border-primary-300 p-6 text-sm">
          <p>{distance} km</p>

          <Controller
            name="distance"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Slider
                value={[value]}
                onValueChange={(value) => onChange(value[0])}
                step={1}
              />
            )}
          />

          <Controller
            name="onlyShowDistanceThisRange"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label="Chỉ hiển thị trong khoảng cách này"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="!mt-3 ml-auto w-fit">
        <Button
          type="submit"
          size="sm"
          disabled={!isDirty}
          loading={updateSetting.isLoading}
        >
          Lưu
        </Button>
      </div>
    </form>
  );
};

const genderDate = [
  {
    label: "Nam",
    value: LookingFor.Male,
  },
  {
    label: "Nữ ",
    value: LookingFor.Female,
  },
  {
    label: "Mọi người",
    value: LookingFor.All,
  },
];

export default FilterForm;
