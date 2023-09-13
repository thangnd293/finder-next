"use client";

import ActionIcon from "@/components/ActionIcon";
import useMessageStore from "@/hooks/use-message-store";
import { useCldUpload } from "@/lib/cloudinary";
import { socket } from "@/lib/socket";
import { useReceiver } from "@/service/conversation";
import { Message, MessageType } from "@/service/message";
import { useCurrentUser } from "@/service/user";
import { createTempleMessage } from "@/utils/message";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsFillSendFill, BsMicFill } from "react-icons/bs";
import { HiGif } from "react-icons/hi2";
import AddImageButton from "./AddImageButton";
import InputImageMessage from "./InputImageMessage";
import InputTextMessage from "./InputTextMessage";
import EmojiPickerButton from "./EmojiPickerButton";

type FormData = {
  text: string;
  imageFiles: File[];
};

const ChatRoomFooter = () => {
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const { id } = useParams() as {
    id: string;
  };

  const { addMessage, upsertMessage } = useMessageStore();

  const { currentUser } = useCurrentUser();
  const { receiver } = useReceiver(id);

  const cldUpload = useCldUpload();

  const methods = useForm<FormData>({
    defaultValues: {
      text: "",
      imageFiles: [],
    },
  });

  const { handleSubmit, setValue } = methods;

  const handleOpenFilePicker = () => {
    document?.getElementById("imageFiles")?.click();
  };

  const sendTextMessage = (
    text: string,
    sender: string,
    receiver: string,
    conversation: string,
  ) => {
    const message = createTempleMessage({
      text,
      type: MessageType.Text,
      sender,
      receiver,
      conversation,
    });

    addMessage(message);

    socket.emit("sendMessage", message, (newMessage: Message) => {
      upsertMessage(newMessage);
    });

    setValue("text", "");
  };

  const sendImageMessage = async (
    imageFiles: File[],
    sender: string,
    receiver: string,
    conversation: string,
  ) => {
    const imageFileArray = Array.from(imageFiles);
    const images = imageFileArray.map((file) => ({
      url: URL.createObjectURL(file),
    }));

    const fakeMessage = createTempleMessage({
      imageUrls: images,
      type: MessageType.Image,
      sender,
      receiver,
      conversation,
    });

    addMessage(fakeMessage);

    setValue("imageFiles", []);

    const uploadImages = await Promise.all(
      imageFileArray.map((file) => cldUpload.mutateAsync(file)),
    );

    images.forEach((image) => URL.revokeObjectURL(image.url));

    const message = {
      ...fakeMessage,
      imageUrls: uploadImages.map((image) => ({ url: image.url })),
    };

    socket.emit("sendMessage", message, (newMessage: Message) => {
      upsertMessage(newMessage);
    });
  };

  const onSubmit = async (data: FormData) => {
    if (!currentUser || !receiver) return;

    const { imageFiles, text } = data;

    if (text.trim()) {
      sendTextMessage(text, currentUser._id, receiver._id, id);
    }

    if (imageFiles.length > 0) {
      sendImageMessage(imageFiles, currentUser._id, receiver._id, id);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex items-end border-t"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-4 px-7 py-6">
          <ActionIcon
            className="rounded-full"
            type="button"
            title="Gửi file âm thanh"
            variant="light"
          >
            <BsMicFill />
          </ActionIcon>

          <AddImageButton onOpenFilePicker={handleOpenFilePicker} />

          <ActionIcon
            className="rounded-full"
            type="button"
            title="Chọn file gif"
            variant="light"
          >
            <HiGif />
          </ActionIcon>
        </div>

        <div className="flex flex-1 items-end space-x-3 overflow-visible py-6 pr-7">
          <div className="flex flex-1 flex-col overflow-auto rounded-sm bg-background-100 px-3.5 py-2 text-sm">
            <InputImageMessage onOpenFilePicker={handleOpenFilePicker} />
            <InputTextMessage ref={messageInputRef} />
          </div>

          <EmojiPickerButton messageInputRef={messageInputRef} />

          <ActionIcon
            className="rounded-full"
            title="Gửi tin nhắn"
            variant="subtle"
            type="submit"
          >
            <BsFillSendFill />
          </ActionIcon>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChatRoomFooter;
