import { Cloudinary } from "@cloudinary/url-gen";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const cld = new Cloudinary({ cloud: { cloudName: "finder-next" } });

const cldUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  return data;
};

export const useCldUpload = (
  config: UseMutationOptions<any, unknown, File, unknown> = {},
) => {
  return useMutation(cldUpload, config);
};
