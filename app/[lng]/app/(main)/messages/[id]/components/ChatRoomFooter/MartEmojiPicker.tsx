import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";

interface MartEmojiPickerProps {
  onEmojiSelect: (emoji: any) => void;
}
const MartEmojiPicker = ({ onEmojiSelect }: MartEmojiPickerProps) => {
  const { theme } = useTheme();

  return (
    <Picker
      data={data}
      previewPosition="none"
      skinTonePosition="none"
      onEmojiSelect={onEmojiSelect}
      autoFocus
      theme={theme}
    />
  );
};

export default MartEmojiPicker;
