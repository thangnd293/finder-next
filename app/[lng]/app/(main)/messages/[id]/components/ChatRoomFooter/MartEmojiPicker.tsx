import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface MartEmojiPickerProps {
  onEmojiSelect: (emoji: any) => void;
}
const MartEmojiPicker = ({ onEmojiSelect }: MartEmojiPickerProps) => {
  return (
    <Picker
      data={data}
      previewPosition="none"
      skinTonePosition="none"
      onEmojiSelect={onEmojiSelect}
      autoFocus
    />
  );
};

export default MartEmojiPicker;
