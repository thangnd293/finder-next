"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import ModeRadioGroup from "@/components/ModeRadioGroup";
import { ModeGoal, useCurrentUser, useUpdateSetting } from "@/service/user";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  modeGoal: ModeGoal;
}

const ModeSetting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: discovery } = useCurrentUser({
    select: (user) => user.setting.discovery,
  });

  const updateSetting = useUpdateSetting();

  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      modeGoal: discovery?.modeGoal ?? ModeGoal.Date,
    },
  });

  const onSubmit = (values: FormValues) => {
    updateSetting.mutate(
      {
        discovery: {
          ...discovery,
          ...values,
        },
      },
      {
        onSettled: () => setIsOpen(false),
      },
    );
  };

  return (
    <>
      <Button
        className="w-full justify-between rounded-full"
        variant="social"
        onClick={() => setIsOpen(true)}
      >
        Chọn chế độ
        <div className="flex items-center gap-2 text-muted-foreground">
          {discovery?.modeGoal}
          <ChevronRightIcon />
        </div>
      </Button>

      <Modal open={isOpen || updateSetting.isLoading} onOpenChange={setIsOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4 text-center text-xl font-semibold">
            Chọn chế độ
          </h1>

          <Controller
            name="modeGoal"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <ModeRadioGroup
                className="space-y-1.5"
                label="Bạn đang tìm kiếm gì"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <div className="mx-auto w-fit">
            <Button
              className="mt-6 rounded-full"
              type="submit"
              loading={updateSetting.isLoading}
            >
              Tiếp tục với {watch("modeGoal")}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModeSetting;
