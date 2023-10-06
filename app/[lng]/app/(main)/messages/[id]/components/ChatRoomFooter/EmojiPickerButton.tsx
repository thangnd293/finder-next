import ActionIcon from "@/components/ActionIcon";
import Spinner from "@/components/Spinner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import dynamic from "next/dynamic";
import React from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { UseFormSetValue } from "react-hook-form";
import { FormData } from ".";

const MartEmojiPicker = dynamic(() => import("./MartEmojiPicker"), {
  loading: () => (
    <div className="p-2">
      <Spinner />
    </div>
  ),
  ssr: false,
});

interface EmojiPickerButtonProps {
  messageInputRef: React.RefObject<HTMLTextAreaElement>;
  setValue: UseFormSetValue<FormData>;
}
const EmojiPickerButton = ({
  messageInputRef,
  setValue,
}: EmojiPickerButtonProps) => {
  const handleEmojiSelect = (emoji: any) => {
    const textareaEl = messageInputRef.current;

    if (!textareaEl) return;

    const cursor = textareaEl.selectionStart;
    const { value } = textareaEl;
    textareaEl.value =
      value.slice(0, cursor) + emoji.native + value.slice(cursor);
    textareaEl.selectionStart = textareaEl.selectionEnd =
      cursor + emoji.native.length;

    setValue("text", textareaEl.value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ActionIcon
          className="rounded-full"
          title="Chọn biểu tượng cảm xúc"
          type="button"
          variant="subtle"
        >
          <BsFillEmojiSmileFill />
        </ActionIcon>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-none p-0" align="end">
        <MartEmojiPicker onEmojiSelect={handleEmojiSelect} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPickerButton;
