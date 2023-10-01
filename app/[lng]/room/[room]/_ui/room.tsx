import DialogConfirm, {
  confirmAction,
} from "@/app/[lng]/room/[room]/_comps/dialog-confirm";
import CallVideoManager, { setSrcVideo } from "@/utils/web-rtc";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdCallEnd, MdOutlineMic, MdVideocam } from "react-icons/md";
import { io } from "socket.io-client";
import useRoomMachine from "../_machine/useRoomMachine";



export default function Room() {
  const searchParams = useSearchParams();
  const localName = searchParams?.get("localName") || "";
  const remoteName = searchParams?.get("remoteName") || "";
  const {refLocalVideo,refRemoteVideo,send,state}= useRoomMachine(localName)
  const [offer, setOffer] = useState<RTCSessionDescriptionInit>();

  const handleCall = ()=>{
    send({type:"CALL",remoteId:remoteName})
  }
 

  const currentTime = useCurrentTime();

  return (
    <>
      <audio
        // infinite loop
        loop
        id="audio"
        src="/audio/ring.mp3"
      ></audio>
      <DialogConfirm
        onConfirm={() => {
          send({type:"RECEIVER_ACCEPT",})
        }}
        onCancel={() => {
          console.log("cancel");
        }}
      />
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
            playsInline
            muted
          ></video>
        </div>

        <video
          className="mx-auto h-screen object-contain"
          ref={refRemoteVideo}
          id="remoteVideo"
          autoPlay
          playsInline
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
              <button onClick={()=>{
                send({type:"END_CALL"})
              }} className="rounded-xl bg-red-500 p-3">
                <MdCallEnd size={30} />
              </button>
              <button className="rounded-full bg-white/20 p-3">
                <MdVideocam size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
