import ActionIcon from "@/components/ActionIcon";
import React from "react";
import { useFormContext } from "react-hook-form";
import { BiSolidAddToQueue } from "react-icons/bi";
import PreviewImage from "./PreviewImage";

interface InputImageMessageProps {
  onOpenFilePicker: () => void;
}
const InputImageMessage = ({ onOpenFilePicker }: InputImageMessageProps) => {
  const { watch, setValue } = useFormContext();
  const selectedFiles: File[] = Array.from(watch("imageFiles"));

  const handleRemove = (file: File) => {
    setValue(
      "imageFiles",
      selectedFiles.filter((f) => f.name !== file.name),
    );
  };

  return (
    <>
      {selectedFiles.length > 0 && (
        <div className="flex space-x-3 py-3">
          <ActionIcon
            className="h-12 w-12 !text-foreground hover:bg-background-200"
            variant="light"
            onClick={onOpenFilePicker}
          >
            <BiSolidAddToQueue size={24} />
          </ActionIcon>
          {selectedFiles.map((file) => (
            <PreviewImage
              key={file.name}
              file={file}
              onRemove={() => handleRemove(file)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default InputImageMessage;
