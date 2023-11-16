"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useCurrentUser, useUpdateProfile } from "@/service/user";
import { useForm } from "react-hook-form";
import { WorkFormValues } from "./WorkSetting";
import { useRef } from "react";

interface WorkSettingDialogProps {
  isOpen: boolean;
  isEmpty?: boolean;
  close: () => void;
}
const WorkSettingDialog = ({
  isOpen,
  isEmpty,
  close,
}: WorkSettingDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { data } = useCurrentUser({
    select: (user) => ({
      company: user.company,
      jobs: user.jobs,
    }),
  });

  const updateProfile = useUpdateProfile({
    onMutate: handleClose,
  });

  const { handleSubmit, register, reset } = useForm<WorkFormValues>({
    defaultValues: {
      title: data?.jobs?.[0],
      company: data?.company,
    },
  });

  const action = isEmpty ? "Thêm" : "Sửa";

  const onSubmit = ({ title, company }: WorkFormValues) => {
    updateProfile.mutate(
      {
        company: company,
        jobs: [title],
      },
      {
        onSuccess: () => {
          reset({
            company,
            title,
          });
        },
      },
    );
  };

  function handleClose() {
    close();
    reset();
  }

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <Modal.Header withCloseButton onOpenChange={handleClose}>
        {action} công việc
      </Modal.Header>
      <Modal.Body className="space-y-2 p-6">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Chức danh"
            {...register("title", {
              setValueAs: (value) => value?.trim(),
            })}
          />
          <Input
            label="Công ty"
            {...register("company", {
              setValueAs: (value) => value?.trim(),
            })}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="ghost" onClick={handleClose}>
          Hủy
        </Button>
        <Button onClick={() => formRef.current?.requestSubmit()}>
          {action}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkSettingDialog;
