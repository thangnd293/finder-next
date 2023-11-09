import { uniqueArray } from "@/utils/helper";
import { CSSProperties, useMemo } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import ScrollArea from "../ScrollArea";
import PreviewImage from "./PreviewImage";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps
  extends Omit<DropzoneOptions, "accept" | "onDrop"> {
  images: File[];
  message?: string;
  error?: string;
  onImagesChange: (files: File[]) => void;
}
const ImageDropzone = ({
  images,
  onImagesChange,
  message,
  error,
  ...others
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop: handleDrop,
      ...others,
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  function handleDrop(files: File[]) {
    onImagesChange(uniqueArray([...images, ...files], "name"));
  }

  const onRemove = (file: File) => {
    onImagesChange(images.filter((image) => image.name !== file.name));
  };

  return (
    <div className="w-full space-y-2">
      <div
        className={cn(error && "!border-red-400")}
        {...getRootProps({ style })}
      >
        <input {...getInputProps()} />
        <p className="text-center text-sm">
          {message
            ? message
            : "Kéo 'n' thả một số file vào đây hoặc click để chọn file"}
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <ScrollArea className="max-h-40 w-full">
        <div className="flex w-full flex-col gap-2">
          {images.map((image) => (
            <PreviewImage
              key={image.name}
              file={image}
              onRemove={onRemove.bind(null, image)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ImageDropzone;

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 6,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};
