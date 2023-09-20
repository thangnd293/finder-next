import ActionIcon from "@/components/ActionIcon";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BsCardImage } from "react-icons/bs";
interface AddImageButtonProps {
  onOpenFilePicker: () => void;
}
const AddImageButton = ({ onOpenFilePicker }: AddImageButtonProps) => {
  const { register } = useFormContext();

  return (
    <ActionIcon
      className="rounded-full"
      type="button"
      title="Đính kèm ảnh"
      variant="light"
      onClick={onOpenFilePicker}
    >
      <BsCardImage />
      <VisuallyHidden>
        <input
          id="imageFiles"
          type="file"
          multiple
          accept=".png, .jpg, .jpeg"
          onClick={(e) => (e.currentTarget.value = "")}
          {...register("imageFiles")}
        />
      </VisuallyHidden>
    </ActionIcon>
  );
};

export default AddImageButton;
