import { useMutation } from "@tanstack/react-query";
import { HelperService } from "..";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: HelperService.uploadImage,
  });
};
