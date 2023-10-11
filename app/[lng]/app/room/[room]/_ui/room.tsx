import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdCallEnd,
  MdOutlineMic,
  MdOutlineMicOff,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";
import { useRoomEvent } from "../_machine/useRoom";

import NextImage from "next/image";

export default function Room() {
  const { room } = useParams() as { room: string };
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
  } = useRoomEvent(room);

  const image = receiver?.images[0];

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-video h-screen max-w-[100vw] bg-gray-950">
        <video
          className="h-full w-full object-contain"
          ref={refRemoteVideo}
          id="remoteVideo"
          autoPlay
          playsInline
        ></video>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="flex items-center gap-2">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-solid border-primary-500">
              {image && !isAccept ? (
                <NextImage
                  src={image.url}
                  alt="avatar"
                  blurDataURL={image.blur}
                  className=" h-full w-full object-cover"
                  fill
                  unoptimized
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 aspect-video w-[24vw] overflow-hidden rounded-md">
        <video
          className="h-full w-full scale-x-[-1] object-contain"
          ref={refLocalVideo}
          id="localVideo"
          autoPlay
          playsInline
          muted
        ></video>
      </div>

      <div className="absolute bottom-[60px] left-1/2 z-10 -translate-x-1/2">
        <div className="flex">
          <div className="flex items-center gap-8">
            <button
              onClick={toggleAudio}
              className="rounded-full bg-white/50 p-3"
            >
              {audioStatus ? (
                <MdOutlineMic size={24} />
              ) : (
                <MdOutlineMicOff size={24} color="red" />
              )}
            </button>
            <button onClick={hangup} className="rounded-xl bg-red-500 p-3">
              <MdCallEnd size={40} />
            </button>
            <button
              onClick={toggleVideo}
              className="rounded-full bg-white/50 p-3"
            >
              {videoStatus ? (
                <MdVideocam size={24} />
              ) : (
                <MdVideocamOff size={24} color="red" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //format HH:mm:ss
  return currentTime.toLocaleTimeString("en-US");
};
