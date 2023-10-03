"use client";
import CustomImage from "@/components/CustomImage";
import { useUnlinkInstagram } from "@/service/helper";
import { useCurrentUser, useInvalidateCurrentUser } from "@/service/user";
import { BsCheckCircleFill, BsCircle, BsInstagram } from "react-icons/bs";

export const LinkAccountInstagram = () => {
  const { data: insImages } = useCurrentUser({
    select: (user) => user.insImages,
  });

  const invalidateCurrentUser = useInvalidateCurrentUser();
  const unlinkInstagram = useUnlinkInstagram({
    onSuccess: invalidateCurrentUser,
  });

  const handleLinkInstagram = () => {
    if (!window) return console.log("window is not defined");

    window.open(
      `${window.location.origin}/link-account?provider=instagram`,
      "instagram-link-account",
      "width=600,height=600",
    );
  };

  const handleUnlinkInstagram = () => {
    unlinkInstagram.mutate();
  };

  return (
    <div className="space-y-3">
      <button
        className="flex w-full items-center justify-between rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2 font-semibold text-white hover:brightness-90"
        onClick={insImages ? handleUnlinkInstagram : handleLinkInstagram}
      >
        <span className="flex items-center gap-2">
          <BsInstagram size={24} />
          {insImages
            ? "Đã liên kết tài khoản Instagram"
            : "Liên kết tài khoản Instagram"}
        </span>
        {insImages ? <BsCheckCircleFill size={24} /> : <BsCircle size={24} />}
      </button>

      <div className="grid grid-cols-3 gap-1">
        {insImages
          ? insImages.map((image, i) => (
              <div
                key={i}
                className="min-w-40 relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl border bg-background p-2"
              >
                <CustomImage
                  image={image}
                  className="pointer-events-none select-none rounded-lg object-cover"
                  alt={""}
                  width={138}
                  height={138}
                />
              </div>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-40 relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl border bg-background p-2"
                onClick={handleLinkInstagram}
              >
                <div className="pointer-events-none flex h-full w-full items-center justify-center rounded-lg bg-background-100">
                  <div className="absolute flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary">
                    <div className="relative h-[64%] w-[64%] before:absolute before:left-[50%] before:top-[50%] before:h-[4px] before:w-[64%] before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded before:bg-white after:absolute after:left-[50%] after:top-[50%] after:h-[64%] after:w-[4px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded after:bg-white" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!insImages && (
        <p className="px-6 text-xs font-medium text-muted-foreground">
          Kết nối Instagram của bạn sẽ thêm các bài đăng mới nhất vào hồ sơ của
          bạn. Tên người dùng của bạn sẽ không hiển thị.
        </p>
      )}
    </div>
  );
};
