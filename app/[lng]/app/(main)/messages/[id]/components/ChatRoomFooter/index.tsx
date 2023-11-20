"use client";

import ActionIcon from "@/components/ActionIcon";
import useMessageStore from "@/hooks/use-message-store";
import { socket } from "@/lib/socket";
import { useReceiver } from "@/service/conversation";
import { useUploadImage } from "@/service/helper";
import { Message, MessageType } from "@/service/message";
import { useCurrentUser } from "@/service/user";
import { createTempleMessage } from "@/utils/message";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import AddImageButton from "./AddImageButton";
import EmojiPickerButton from "./EmojiPickerButton";
import InputImageMessage from "./InputImageMessage";
import InputTextMessage from "./InputTextMessage";

export type FormData = {
  text: string;
  imageFiles: File[];
};

const ChatRoomFooter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const { id } = useParams() as {
    id: string;
  };

  const { addMessage } = useMessageStore();

  const { data: currentUser } = useCurrentUser();
  const { receiver } = useReceiver(id);

  const uploadImage = useUploadImage();

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

  const handleFirstMessageSent = () => {
    router.replace(`${pathname}?tab=message`);
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

    addMessage(message, handleFirstMessageSent);

    socket.emit("sendMessage", message);

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

    const optimisticMessage = createTempleMessage({
      imageUrls: images,
      type: MessageType.Image,
      sender,
      receiver,
      conversation,
    });

    addMessage(optimisticMessage);

    setValue("imageFiles", []);

    const uploadImages = await Promise.all(
      imageFileArray.map((file) =>
        uploadImage.mutateAsync({
          file: file,
          blur: true,
          nsfw: true,
        }),
      ),
    );

    images.forEach((image) => URL.revokeObjectURL(image.url));

    const message = {
      ...optimisticMessage,
      images: uploadImages,
    } as Message;

    socket.emit("sendMessage", message);
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
        <div className="flex items-center gap-4 px-3.5 py-3 md:px-7 md:py-6">
          <AddImageButton onOpenFilePicker={handleOpenFilePicker} />
        </div>

        <div className="flex flex-1 items-end space-x-1 overflow-hidden py-3 pr-3.5 md:space-x-3 md:py-6 md:pr-7">
          <div className="flex flex-1 flex-col overflow-hidden rounded-sm bg-background-100 px-3.5 py-2 text-sm">
            <InputImageMessage onOpenFilePicker={handleOpenFilePicker} />
            <InputTextMessage ref={messageInputRef} />
          </div>

          <EmojiPickerButton
            messageInputRef={messageInputRef}
            setValue={setValue}
          />

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
