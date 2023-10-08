import DialogConfirm from "@/app/[lng]/app/room/[room]/_comps/dialog-confirm";
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
  } = useRoomEvent(room);

  const currentTime = useCurrentTime();

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-video h-screen max-w-[100vw]">
        {/* <div className="absolute left-[80px] top-[60px]">
          <div className="flex w-[126px] items-center justify-center gap-2 rounded-md bg-black/40 px-3 py-2 text-sm font-medium">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            {currentTime}
          </div>
        </div> */}
        <video
          className="h-full w-full object-contain"
          ref={refRemoteVideo}
          id="remoteVideo"
          autoPlay
          playsInline
        ></video>
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
              className="rounded-full bg-white/20 p-3"
            >
              {audioStatus ? (
                <MdOutlineMic size={24} />
              ) : (
                <MdOutlineMicOff size={24} color="red" />
              )}
            </button>
            <button onClick={hangup} className="rounded-xl bg-red-500 p-3">
              <MdCallEnd size={30} />
            </button>
            <button
              onClick={toggleVideo}
              className="rounded-full bg-white/20 p-3"
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
