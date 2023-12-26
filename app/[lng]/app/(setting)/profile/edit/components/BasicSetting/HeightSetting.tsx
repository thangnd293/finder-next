import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Slider from "@/components/Slider";
import { getTagIcon } from "@/utils/tag";
import { Controller, useForm } from "react-hook-form";
import { StepSettingProps } from "./BasicSettingDialog";
import StepSettingLayout from "./StepSettingLayout";
import { useCurrentUser, useUpdateProfile } from "@/service/user";

interface FormValues {
  height: number[];
  isShowHeight: boolean;
}

const HeightSetting = ({ onNextStep }: StepSettingProps) => {
  const updateProfile = useUpdateProfile();
  const { data } = useCurrentUser({
    select: (user) => ({
      height: user.height,
      isShowHeight: user.setting.hiddenProfile.height,
    }),
  });

  const { control, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      height: [data?.height ?? 160],
      isShowHeight: data?.isShowHeight,
    },
  });

  const height = watch("height");

  const onSubmit = ({ height, isShowHeight }: FormValues) => {
    onNextStep();
    updateProfile.mutate({
      heightSetting: {
        value: height[0],
        isShowInFinder: isShowHeight,
      },
    });
  };

  return (
    <StepSettingLayout
      Icon={getTagIcon("height")}
      title={"Chiều cao của bạn là?"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6 rounded-2xl border border-primary-300 p-6">
        <p>{height} cm</p>
        <Controller
          name="height"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Slider
              value={value}
              onValueChange={onChange}
              max={220}
              min={94}
              step={1}
            />
          )}
        />

        <Controller
          name="isShowHeight"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              label="Không hiển thị trên profile"
              checked={value}
              onCheckedChange={onChange}
            />
          )}
        />
      </div>

      <Button className="w-full rounded-full" variant="social" type="submit">
        {height} cm là chiều cao của tôi
      </Button>

      <Button
        className="w-full rounded-full"
        variant="social"
        type="button"
        onClick={onNextStep}
      >
        Bỏ qua
      </Button>
    </StepSettingLayout>
  );
};

export default HeightSetting;
