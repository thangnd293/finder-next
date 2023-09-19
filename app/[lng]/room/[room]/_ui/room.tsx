import CallVideoManager, { setSrcVideo } from "@/utils/web-rtc";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdCallEnd, MdOutlineMic, MdVideocam } from "react-icons/md";
import { io } from "socket.io-client";

export default function Room() {
  const searchParams = useSearchParams();
  const localName = searchParams?.get("localName") || "";
  const remoteName = searchParams?.get("remoteName") || "";

  const refLocalVideo = useRef<HTMLVideoElement>(null);
  const refRemoteVideo = useRef<HTMLVideoElement>(null);

  const [callVideo, setCallVideo] = useState<CallVideoManager | null>(null);
  const handleCall = useCallback(async () => {
    const localVideoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setSrcVideo(refLocalVideo.current!, localVideoStream);
    callVideo?.call(remoteName, localVideoStream);
  }, [callVideo, remoteName]);

  useEffect(() => {
    const socket = io("http://localhost:4000/call", {
      query: {
        userId: localName,
      },
    });

    const callVideo = new CallVideoManager(socket, localName, remoteName);
    setCallVideo(callVideo);

    callVideo.on("offerReceived", async (offer) => {
      const localVideoStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 640, ideal: 1920 },
          height: { min: 400, ideal: 1080 },
          aspectRatio: { ideal: 1.7777777778 },
        },
        audio: true,
      });
      console.log({
        localVideoStream,
      });

      setSrcVideo(refLocalVideo.current!, localVideoStream);
      callVideo.accept(localVideoStream, offer);
    });

    callVideo.on("stream", (stream) => {
      console.log(
        "🚀 ~ file: web-rtc.tsx:174 ~ callVideo.on ~ stream:",
        stream,
      );
      setSrcVideo(refRemoteVideo.current!, stream);
    });

    callVideo.on("data", (data) => {
      console.log("data", data);
    });
    // console.log("run");
    // (async () => {
    //   const localVideoStream = await navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true,
    //   });

    //   setSrcVideo(refRemoteVideo.current!, localVideoStream);

    //   const peer1 = new SimplePeer({
    //     initiator: true,
    //     stream: localVideoStream,
    //   });
    //   const peer2 = new SimplePeer({
    //     // initiator: true,
    //     stream: localVideoStream,
    //   });

    //   peer1.on("signal", (data) => {
    //     console.log({
    //       data,
    //     });
    //     peer2.signal(data);
    //   });

    //   peer2.on("signal", (data) => {
    //     console.log({
    //       data,
    //     });
    //     peer1.signal(data);
    //   });

    //   peer2.on("stream", (stream) => {
    //     setSrcVideo(refLocalVideo.current!, stream);
    //   });
    // })();
  }, [localName, remoteName]);

  useEffect(() => {
    handleCall();
  }, [handleCall]);

  const currentTime = useCurrentTime();

  return (
    <div className="relative">
      <div className="absolute z-10">
        <div className="flex gap-4">
          <p>{localName}</p>

          <p>{remoteName}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={handleCall}>Call</button>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 h-[240px] overflow-hidden rounded-md">
        <video
          className="h-full w-full scale-x-[-1] object-contain"
          ref={refLocalVideo}
          id="localVideo"
          autoPlay
        ></video>
      </div>

      <video
        className="mx-auto h-screen object-contain"
        ref={refRemoteVideo}
        id="remoteVideo"
        autoPlay
      ></video>

      <div className="absolute left-[60px] top-[60px]">
        <div className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          {currentTime}
        </div>
      </div>

      <div className="absolute bottom-[60px] left-1/2 z-10 -translate-x-1/2">
        <div className="flex">
          <div className="flex items-center gap-8">
            <button className="rounded-full bg-white/20 p-3">
              <MdOutlineMic size={24} />
            </button>
            <button className="rounded-xl bg-red-500 p-3">
              <MdCallEnd size={30} />
            </button>
            <button className="rounded-full bg-white/20 p-3">
              <MdVideocam size={24} />
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
