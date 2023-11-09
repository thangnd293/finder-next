import Image from "next/image";
import { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import ActionIcon from "../ActionIcon";

interface PreviewImageProps {
  file: File;
  onRemove?: () => void;
}

const PreviewImage = ({ file, onRemove }: PreviewImageProps) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    const _src = URL.createObjectURL(file);

    setSrc(_src);

    return () => {
      URL.revokeObjectURL(_src);
    };
  }, [file]);

  if (!src) return null;

  return (
    <div className="flex w-full items-center gap-3 rounded-md bg-background-50 p-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm">
        <Image
          className="block h-full w-full object-cover object-center"
          src={src}
          alt={file.name}
          width={48}
          height={48}
        />
      </div>

      <div className="w-full overflow-hidden">
        <p className="truncate text-sm font-semibold">{file.name}</p>
        <p className="text-[13px] text-secondary-foreground">
          {file.size / 1000} kb
        </p>
      </div>

      <ActionIcon
        className="ml-auto"
        type="button"
        size="sm"
        variant="ghost"
        onClick={onRemove}
      >
        <BsXLg size={12} />
      </ActionIcon>
    </div>
  );
};

export default PreviewImage;
