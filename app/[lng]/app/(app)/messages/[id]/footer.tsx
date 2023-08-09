"use client";

import ActionIcon from "@/components/action-icon";
import MessageTextInput from "@/components/message-text-input";
import Tooltip from "@/components/tooltip";
import { getEmoji } from "@/utils/cdnEmoji";
import createEmojiPlugin, { defaultTheme } from "@draft-js-plugins/emoji";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChangeEvent, useRef, useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import {
  BsCardImage,
  BsFillEmojiSmileFill,
  BsFillSendFill,
  BsMicFill,
} from "react-icons/bs";
import { HiGif } from "react-icons/hi2";
import PreviewImage from "./preview-image";
import { v4 as uuidv4 } from "uuid";
import { IFile } from "@/types/common";

const emojiPlugin = createEmojiPlugin({
  theme: {
    ...defaultTheme,
    emojiSelect: "relative",
    emojiSelectButton:
      "inline-flex items-center justify-center flex-shrink-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:!translate-y-px bg-transparent hover:bg-primary-100 hover:text-primary w-8 h-8 rounded-full",
    emojiSelectButtonPressed:
      "inline-flex items-center justify-center flex-shrink-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:!translate-y-px bg-transparent hover:bg-primary-100 hover:text-primary w-8 h-8 rounded-full",
    emojiSelectPopover:
      "bg-white absolute z-50 bottom-full right-0 pt-3 w-[340px] rounded-lg drop-shadow border-none",
    emojiSelectPopoverGroups: "w-[340px] h-[280px]",
    emojiSelectPopoverNav: "w-full flex justify-center border-t",
    emojiSelectPopoverNavEntry:
      "flex w-full h-full items-center justify-center",
    emojiSelectPopoverNavEntryActive:
      "flex w-full h-full items-center justify-center text-primary",
  },
  selectButtonContent: <BsFillEmojiSmileFill />,
  useNativeArt: false,
  emojiImage: ({ unicode }) => {
    const src = getEmoji(unicode);

    return (
      <span
        className="inline-block h-5 w-5 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
        }}
      />
    );
  },

  emojiInlineText: (props) => {
    const { decoratedText, children } = props;
    const src = getEmoji(decoratedText);
    return (
      <span
        className="inline-block h-4 w-4 bg-cover bg-center text-transparent"
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        {children}
      </span>
    );
  },
});

const { EmojiSelect } = emojiPlugin;

export default function MessageFooter() {
  const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  console.log("selectedFiles", selectedFiles);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: IFile[] = Array.from(e.target.files ?? []).map((f) =>
      Object.assign(f, { id: uuidv4() }),
    );

    console.log("files", files);

    if (files.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemove = (file: IFile) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  return (
    <div className="flex items-end border-t">
      <div className="flex items-center gap-4 px-7 py-6">
        <ActionIcon
          className="rounded-full"
          title="Gửi file âm thanh"
          variant="light"
        >
          <BsMicFill />
        </ActionIcon>
        <ActionIcon
          className="rounded-full"
          title="Đính kèm ảnh"
          variant="light"
          onClick={handleOpenFilePicker}
        >
          <BsCardImage />
          <VisuallyHidden>
            <input
              type="file"
              multiple
              accept=".png, .jpg, .jpeg"
              ref={inputRef}
              onChange={handleFilesChange}
              onClick={(e) => (e.currentTarget.value = "")}
            />
          </VisuallyHidden>
        </ActionIcon>
        <ActionIcon
          className="rounded-full"
          title="Chọn file gif"
          variant="light"
        >
          <HiGif />
        </ActionIcon>
      </div>

      <div className="flex flex-1 items-end space-x-3 overflow-hidden py-6 pr-7">
        <div className="flex flex-1 flex-col overflow-auto rounded-sm bg-background-100 px-3.5 py-2 text-sm">
          {selectedFiles.length > 0 && (
            <div className="flex space-x-3 py-3">
              <ActionIcon
                className="h-12 w-12 !text-foreground hover:bg-background-200"
                variant="light"
                onClick={handleOpenFilePicker}
              >
                <BiSolidAddToQueue size={24} />
              </ActionIcon>
              {selectedFiles.map((file) => (
                <PreviewImage
                  key={file.id}
                  file={file}
                  onRemove={() => handleRemove(file)}
                />
              ))}
            </div>
          )}
          <MessageTextInput emojiPlugin={emojiPlugin} />
        </div>

        <Tooltip label="Chọn biểu tượng cảm xúc">
          <span>
            <EmojiSelect />
          </span>
        </Tooltip>

        <ActionIcon
          className="rounded-full"
          title="Gửi tin nhắn"
          variant="subtle"
        >
          <BsFillSendFill />
        </ActionIcon>
      </div>
    </div>
  );
}
