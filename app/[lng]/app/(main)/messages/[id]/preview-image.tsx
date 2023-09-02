import ActionIcon from "@/components/ActionIcon";
import { IFile } from "@/types/common";
import Image from "next/image";
import React, { useEffect } from "react";
import { BsXLg } from "react-icons/bs";

interface IPreviewImageProps {
  file: IFile;
  onRemove: () => void;
}

export default function PreviewImage({ file, onRemove }: IPreviewImageProps) {
  const [src, setSrc] = React.useState<string>("");
  useEffect(() => {
    const _src = URL.createObjectURL(file);

    setSrc(_src);

    return () => {
      URL.revokeObjectURL(_src);
    };
  }, [file]);

  if (!src) return null;

  return (
    <div className="relative h-12 w-12 flex-shrink-0">
      <Image
        className="rounded-md object-cover"
        src={src}
        alt={file.name}
        fill
      />

      <ActionIcon
        className="absolute right-0 top-0 !-translate-y-1/3 translate-x-1/3 rounded-full border"
        size="sm"
        variant="filled"
        onClick={onRemove}
      >
        <BsXLg size={12} />
      </ActionIcon>
    </div>
  );
}
