"use client";
import { useEffect, useState } from "react";
import {
  MdCallEnd,
  MdOutlineMic,
  MdOutlineMicOff,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";
import { useRoomEvent } from "../_store/use-room";

import { useCurrentUser } from "@/service/user";
import { default as Image, default as NextImage } from "next/image";
import { Rnd } from "react-rnd";
import { useWindowSize } from "usehooks-ts";

export default function CallVideo({
  room,
  data,
}: {
  room: string;
  data: ReturnType<typeof useRoomEvent>;
}) {
  const { data: user } = useCurrentUser();
  const { width, height } = useWindowSize();
  const [state, setState] = useState({
    // vị trí mặc định bên phải dưới
    x: window.innerWidth - window.innerWidth * 0.24 - 24,
    y: window.innerHeight - ((window.innerWidth * 0.24) / 16) * 9 - 24,
    width: 24,
    margin: 50,
  });
  const {
    refLocalVideo,
    refRemoteVideo,
    toggleAudio,
    toggleVideo,
    audioStatus,
    videoStatus,
    hangup,
    isAccept,
    receiver,
  } = data;

  const image = receiver?.images[0];

  useEffect(() => {
    setState((s) => ({
      // vị trí mặc định bên phải dưới
      ...s,
      x:
        window.innerWidth -
        window.innerWidth * (state.width / 100) -
        state.margin,
      y:
        width < 600 ?
          state.margin
        : window.innerHeight -
          ((window.innerWidth * (state.width / 100)) / 16) * 9 -
          state.margin,
      width: width < 600 ? 50 : 24,
      margin: width < 600 ? 12 : 24,
    }));
  }, [width, height, state.width, state.margin]);

  return (
    <div className="relative overflow-hidden bg-gray-950">
      <div className="relative mx-auto aspect-video h-screen max-w-[100vw] ">
        <video
          className="h-full w-full object-contain"
          ref={refRemoteVideo}
          id="remoteVideo"
          autoPlay
          playsInline
        ></video>
        {image && !isAccept ?
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex items-center gap-2">
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
            </div>
          </div>
        : null}
      </div>
      <Rnd
        size={{
          width: `${state.width}vw`,
          height: `${(state.width * 9) / 16}vw`,
        }}
        position={{ x: state.x, y: state.y }}
        className="duration-300 ease-in-out [&.react-draggable-dragging]:duration-0"
        onDragStop={(e, d) => {
          const { x, y } = d;
          const centerScreenX = window.innerWidth / 2;

          if (x > centerScreenX) {
            setState((s) => ({
              ...s,
              x:
                window.innerWidth -
                window.innerWidth * (state.width / 100) -
                state.margin,
              y: y,
            }));
          } else {
            setState((s) => ({ ...s, x: state.margin, y: y }));
          }
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-md">
          {videoStatus ?
            <video
              className="h-full w-full scale-x-[-1] object-contain"
              ref={refLocalVideo}
              id="localVideo"
              autoPlay
              playsInline
              muted
            ></video>
          : <Image
              unoptimized
              fill
              alt="avatar"
              className="h-full w-full object-cover blur-sm"
              src={user?.images[0].url || ""}
            />
          }
        </div>
      </Rnd>

      <div className="absolute bottom-[60px] left-1/2 z-10 -translate-x-1/2">
        <div className="flex">
          <div className="flex items-center gap-8">
            <button
              onClick={toggleAudio}
              className="rounded-full bg-white/50 p-3"
            >
              {audioStatus ?
                <MdOutlineMic size={24} />
              : <MdOutlineMicOff size={24} color="red" />}
            </button>
            <button onClick={hangup} className="rounded-xl bg-red-500 p-3">
              <MdCallEnd size={40} />
            </button>
            <button
              onClick={toggleVideo}
              className="rounded-full bg-white/50 p-3"
            >
              {videoStatus ?
                <MdVideocam size={24} />
              : <MdVideocamOff size={24} color="red" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
