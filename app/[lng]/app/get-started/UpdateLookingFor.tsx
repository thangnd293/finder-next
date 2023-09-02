import Button from "@/components/Button";
import RadioGroup from "@/components/RadioGroup";
import {
  LookingFor,
  ModeGoal,
  useCurrentUser,
  useUpdateSetting,
} from "@/service/user";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import ModeRadioGroup from "./ModeRadioGroup";

interface FormValues {
  modeGoal: ModeGoal;
  lookingFor: LookingFor;
}
interface UpdateLookingForProps {
  currentStep: number;
  isLastStep?: boolean;
  onNext?: () => void;
}

export default function UpdateLookingFor({
  currentStep,
  isLastStep,
}: UpdateLookingForProps) {
  const { currentUser } = useCurrentUser();
  const updateSetting = useUpdateSetting();

  const form = useForm<FormValues>({
    defaultValues: {
      modeGoal: currentUser?.setting.discovery.modeGoal ?? ModeGoal.Date,
      lookingFor: currentUser?.setting.discovery.lookingFor ?? LookingFor.All,
    },
  });

  const onSubmit = (values: FormValues) => {
    updateSetting.mutate(
      {
        discovery: {
          ...currentUser?.setting.discovery,
          ...values,
        },
        stepStarted: currentStep + 1,
      },
      {
        onSuccess: () => {
          redirect("/app");
        },
      },
    );
  };

  return (
    <form
      className="flex max-w-sm flex-col items-center gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-2xl font-bold">
        Bước cuối cùng để bắt đầu
      </h3>

      <Controller
        name="lookingFor"
        control={form.control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            className="w-full"
            label="Giới tính bạn quan tâm"
            data={genderDate}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name="modeGoal"
        control={form.control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <ModeRadioGroup value={value} onChange={onChange} />
        )}
      />

      <Button className="w-fit" type="submit" loading={updateSetting.isLoading}>
        {isLastStep ? "Hoàn tất" : "Tiếp tục"}
      </Button>
    </form>
  );
}

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
