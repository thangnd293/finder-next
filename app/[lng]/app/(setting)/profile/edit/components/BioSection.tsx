"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import { useCurrentUser, useUpdateProfile } from "@/service/user";
import { useForm } from "react-hook-form";

interface FormValues {
  bio: string;
}
const BioSection = () => {
  const { data } = useCurrentUser({
    select: (user) => user.bio,
  });

  const updateProfile = useUpdateProfile();

  const {
    handleSubmit,
    formState: { isDirty },
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      bio: data,
    },
  });

  const onSubmit = ({ bio }: FormValues) => {
    updateProfile.mutate(
      {
        bio: bio.trim(),
      },
      {
        onSuccess: ({ bio }) =>
          reset({
            bio,
          }),
      },
    );
  };

  return (
    <AccordionItem value="bio">
      <AccordionTrigger>Mô tả</AccordionTrigger>
      <AccordionContent>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            className="resize-none rounded-2xl bg-background"
            placeholder="Mô tả bản thân"
            {...register("bio")}
          />
          <div className="ml-auto w-fit">
            <Button
              size="sm"
              type="submit"
              disabled={!isDirty}
              loading={updateProfile.isLoading}
            >
              Lưu
            </Button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BioSection;
