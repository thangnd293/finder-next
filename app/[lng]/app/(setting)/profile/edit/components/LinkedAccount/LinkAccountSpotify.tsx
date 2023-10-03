"use client";

import CustomImage from "@/components/CustomImage";
import { useUnlinkSpotify } from "@/service/helper";
import { useCurrentUser, useInvalidateCurrentUser } from "@/service/user";
import { BsCheckCircleFill, BsCircle, BsSpotify } from "react-icons/bs";

export const LinkAccountSpotify = () => {
  const { data: spotifyInfo } = useCurrentUser({
    select: (user) => user.spotifyInfo,
  });

  const invalidateCurrentUser = useInvalidateCurrentUser();
  const unlinkSpotify = useUnlinkSpotify({
    onSuccess: invalidateCurrentUser,
  });

  const handleLinkSpotify = () => {
    window?.open(
      `${window.location.origin}/link-account?provider=spotify`,
      "spotify-link-account",
      "width=600,height=600",
    );
  };

  const handleUnlinkSpotify = () => {
    unlinkSpotify.mutate();
  };

  return (
    <div className="space-y-3">
      <button
        className="flex w-full items-center justify-between rounded-full bg-gradient-to-r from-green-600 to-green-500 px-6 py-2 font-semibold text-white hover:brightness-90"
        onClick={spotifyInfo ? handleUnlinkSpotify : handleLinkSpotify}
      >
        <span className="flex items-center gap-2">
          <BsSpotify size={24} />
          {spotifyInfo
            ? "Đã liên kết tài khoản Spotify"
            : "Liên kết tài khoản Spotify"}
        </span>
        {spotifyInfo ? <BsCheckCircleFill size={24} /> : <BsCircle size={24} />}
      </button>

      <div className="grid grid-cols-3 gap-1">
        {spotifyInfo
          ? spotifyInfo.map((artist, i) => (
              <div
                key={i}
                className="min-w-40 relative block aspect-square w-full cursor-pointer overflow-hidden rounded-full border bg-background p-2"
              >
                <CustomImage
                  image={artist.image}
                  className="pointer-events-none aspect-square select-none overflow-hidden rounded-full object-cover object-center"
                  alt={artist.artist}
                  width={138}
                  height={138}
                />
              </div>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="min-w-40 relative block aspect-square w-full cursor-pointer overflow-hidden rounded-full border bg-background p-2"
                onClick={handleLinkSpotify}
              >
                <div className="pointer-events-none flex h-full w-full items-center justify-center rounded-full bg-background-100">
                  <div className="absolute flex h-[28px] w-[28px] items-center justify-center rounded-full bg-primary">
                    <div className="relative h-[64%] w-[64%] before:absolute before:left-[50%] before:top-[50%] before:h-[4px] before:w-[64%] before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:bg-white after:absolute after:left-[50%] after:top-[50%] after:h-[64%] after:w-[4px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-white" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!spotifyInfo && (
        <p className="px-6 text-xs font-medium text-muted-foreground">
          Kết nối tài khoản Spotify của bạn để thêm các nghệ sĩ hàng đầu vào hồ
          sơ của bạn. Các nghệ sĩ hàng đầu của bạn sẽ được chọn dựa trên buổi
          phát sóng của bạn trên Spotify.
        </p>
      )}
    </div>
  );
};
