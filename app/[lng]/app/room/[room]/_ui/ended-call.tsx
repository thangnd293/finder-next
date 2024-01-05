import { useReceiver } from "@/service/conversation";
import NextImage from "next/image";
import { IoCall, IoClose } from "react-icons/io5";
import { RatingGroup } from "@ark-ui/react/rating-group";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/Input";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useCallStatus } from "@/app/[lng]/app/room/[room]/_store/use-call-status";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import { toast } from "react-toastify";

const validateForm = yup.object({
  content: yup.string(),
  rating: yup.number().required("Vui lòng chọn số sao"),
});

type FormValues = yup.InferType<typeof validateForm>;
export default function EndedCall({ room }: { room: string }) {
  const messageId = useCallStatus((s) => s.messageId);
  const { receiver } = useReceiver(room);
  const {
    images: [image],
  } = receiver || { images: [] };
  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    resolver: useYupValidationResolver(validateForm),
  });

  const rating = watch("rating");

  const { mutateAsync, isLoading, data } = useMutation({
    mutationFn: (payload: {
      messageId: string;
      content: string;
      rating: number;
    }) => {
      return axiosInstance
        .post<{ message: string; success: boolean }>(
          "/message/reviews",
          payload,
        )
        .then((res) => res.data);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!messageId) return;
    try {
      await mutateAsync({
        messageId: messageId,
        content: data.content || "",
        rating: data.rating,
      });
    } catch (error) {
      toast.error("Đánh giá thất bại");
    }
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-950 px-10 text-center">
      {data && data.success ? null : (
        <button
          onClick={() => {
            window.close();
          }}
          className="absolute right-2 top-2 flex flex-col items-center gap-2"
        >
          <p className="rounded-full bg-gray-600 p-3">
            <IoClose size={24} />
          </p>
        </button>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="relative grid gap-4">
          <div className="grid items-center justify-items-center gap-5">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-solid border-primary-500">
              <NextImage
                src={image.url}
                alt="avatar"
                blurDataURL={image.blur}
                className=" h-full w-full object-cover"
                fill
                unoptimized
              />
            </div>
            {data && data.success ? null : (
              <p className="text-md font-medium text-gray-100">
                Bạn đánh giá cuộc gọi như thế nào ?
              </p>
            )}
          </div>
          {data && data.success ?
            <div className="grid gap-4">
              <div className="text-lg font-medium text-gray-100">
                Cảm ơn bạn đã đánh giá
              </div>
              <div className="flex w-full justify-evenly">
                <button
                  onClick={() => {
                    //reload
                    window.location.reload();
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="rounded-full bg-green-600 p-3">
                    <IoCall size={24} />
                  </p>
                  <span className="text-[13px] font-medium">Gọi lại</span>
                </button>
                <button
                  onClick={() => {
                    window.close();
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="rounded-full bg-gray-600 p-3">
                    <IoClose size={24} />
                  </p>
                  <span className="text-[13px] font-medium">Đóng</span>
                </button>
              </div>
            </div>
          : <form
              className="grid max-w-[50vw] justify-items-center gap-4"
              onSubmit={onSubmit}
            >
              <Controller
                control={control}
                name="rating"
                render={({ field: { onChange } }) => (
                  <RatingGroup.Root
                    onValueChange={(v) => onChange(v.value)}
                    count={5}
                  >
                    <RatingGroup.Control>
                      {({ items }) => {
                        return (
                          <div className="flex gap-1">
                            {items.map((item) => (
                              <RatingGroup.Item
                                className="outline-none"
                                key={item}
                                index={item}
                              >
                                {({ isHighlighted }) => {
                                  return isHighlighted ?
                                      <FaStar
                                        className="text-primary-400 transition-colors"
                                        size={28}
                                      />
                                    : <FaRegStar
                                        className="text-primary-400 transition-colors"
                                        size={28}
                                      />;
                                }}
                              </RatingGroup.Item>
                            ))}
                          </div>
                        );
                      }}
                    </RatingGroup.Control>
                  </RatingGroup.Root>
                )}
              />

              <Textarea
                className="min-h-[100px] w-full"
                placeholder="Đánh giá của bạn"
                {...register("content")}
              />

              {rating ?
                <Button
                  loading={isLoading}
                  type="submit"
                  className="w-full rounded-md bg-primary py-2 text-white"
                >
                  Gửi đánh giá
                </Button>
              : null}
            </form>
          }
        </div>
      </div>
    </div>
  );
}
