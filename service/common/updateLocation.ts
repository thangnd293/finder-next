import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { IError } from "@/types/http";

type TLocation = {
  lat: number;
  long: number;
};
const updateLocation = async (location: TLocation) => {
  const { data } = await axiosInstance.patch(
    "/users/update_location",
    location,
  );

  return data;
};

export const useUpdateLocation = (
  config: UseMutationOptions<any, AxiosError<IError>, TLocation, unknown> = {},
) => {
  return useMutation(updateLocation, config);
};
