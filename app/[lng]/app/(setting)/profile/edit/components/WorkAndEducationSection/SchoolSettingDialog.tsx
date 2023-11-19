"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useCurrentUser, useUpdateProfile } from "@/service/user";
import { useRef } from "react";
import { useForm } from "react-hook-form";

interface SchoolFormValues {
  school: string;
}
interface SchoolSettingDialogProps {
  isOpen: boolean;
  isEmpty?: boolean;
  close: () => void;
}
const SchoolSettingDialog = ({
  isOpen,
  isEmpty,
  close,
}: SchoolSettingDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { data: school } = useCurrentUser({
    select: (user) => user.school,
  });
  const updateProfile = useUpdateProfile({
    onMutate: handleClose,
  });

  const { handleSubmit, register, reset } = useForm<SchoolFormValues>({
    defaultValues: {
      school,
    },
  });

  const action = isEmpty ? "Thêm" : "Sửa";

  const onSubmit = ({ school }: SchoolFormValues) => {
    updateProfile.mutate(
      {
        school,
      },
      {
        onSuccess: () => {
          reset({
            school,
          });
        },
      },
    );
  };

  function handleClose() {
    close();
  }

  return (
    <Modal open={isOpen} onOpenChange={handleClose}>
      <Modal.Header withCloseButton onOpenChange={handleClose}>
        {action} học vấn
      </Modal.Header>
      <Modal.Body className="space-y-2 p-6">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Học tại"
            {...register("school", {
              setValueAs: (value) => value.trim(),
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

export default SchoolSettingDialog;
