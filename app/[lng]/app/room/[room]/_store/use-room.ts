import {
  ISocket,
  OfferMessageResponse,
  socketInstance,
} from "@/utils/web-rtc/socket";
import CallVideoManager, {
  ICheckRoom,
  setSrcVideo,
} from "@/utils/web-rtc/web-rtc";
import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { confirmAction } from "../_comps/dialog-confirm";
import { useReceiver } from "@/service/conversation";
import {
  CallStatus,
  callStatusAction,
  useCallStatus,
} from "@/app/[lng]/app/room/[room]/_store/use-call-status";
import { usePathname } from "next/navigation";

const createMediaStream = () => {
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: { min: 640, ideal: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: {
        ideal: 1.7777777778,
        min: 1.3333333333,
        max: 1.7777777778,
      },
    },
    audio: true,
  });
};

const useCallVideo = () => {
  const [socket, setSocket] = useState<ISocket | null>(null);
  const [callVideo, setCallVideo] = useState<CallVideoManager | null>(null);

  useEffect(() => {
    const socket = socketInstance();
    socket.connect();
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const callVideo = new CallVideoManager(socket);
    setCallVideo(callVideo);

    return () => {
      callVideo.destroy();
      setCallVideo(null);
    };
  }, [socket]);

  return callVideo;
};

export const useRoomEvent = (roomId: string) => {
  const callVideo = useCallVideo();
  const refLocalVideo = useRef<HTMLVideoElement>(null);
  const refRemoteVideo = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [videoStatus, setVideoStatus] = useState<boolean>(true);
  const [audioStatus, setAudioStatus] = useState<boolean>(true);
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const { receiver } = useReceiver(roomId);
  const status = useCallStatus((s) => s.status);

  const handleInitRoom = useCallback(
    async (roomId: string) => {
      if (!callVideo) return;
      const localVideoStream = await createMediaStream();
      setMediaStream(localVideoStream);
      setSrcVideo(refLocalVideo.current!, localVideoStream);
      callVideo.call(roomId, localVideoStream);
    },
    [callVideo],
  );

  const handleInitAccept = useCallback(
    async (roomId: string, answer: SimplePeer.SignalData) => {
      if (!callVideo) return;
      const localVideoStream = await createMediaStream();
      setMediaStream(localVideoStream);
      setSrcVideo(refLocalVideo.current!, localVideoStream);

      callVideo.accept(roomId, answer, localVideoStream);
    },
    [callVideo],
  );

  useEffect(() => {
    if (mediaStream && refLocalVideo.current)
      setSrcVideo(refLocalVideo.current!, mediaStream);
  }, [mediaStream, videoStatus]);

  useEffect(() => {
    if (!callVideo) return;
    const handleHangup = () => {
      if (!callVideo) return;
      callVideo.offStream();

      if (status === CallStatus.ENDED || status === CallStatus.ENDED_CALL)
        return;
      callStatusAction.setStatus(
        status === CallStatus.IDLE ? CallStatus.ENDED : CallStatus.ENDED_CALL,
      );
    };
    const handleStream = (stream: MediaStream) => {
      setIsAccept(true);
      setSrcVideo(refRemoteVideo.current!, stream);

      status === CallStatus.IDLE &&
        callStatusAction.setStatus(CallStatus.CALLING);
    };

    const handleCheckRoom = async (payload: ICheckRoom) => {
      payload.status ?
        handleInitAccept(roomId, payload.offer)
      : handleInitRoom(roomId);
    };

    callVideo.on("hangup", handleHangup);
    callVideo.on("stream", handleStream);
    callVideo.on("checkRoom", handleCheckRoom);

    return () => {
      callVideo.off("hangup", handleHangup);
      callVideo.off("stream", handleStream);
      callVideo.off("checkRoom", handleCheckRoom);
    };
  }, [callVideo, handleInitAccept, handleInitRoom, roomId, status]);

  useEffect(() => {
    if (!callVideo) return;
    const handleVerifyFirstConnection = () => {
      callVideo.checkRoom(roomId);
    };

    callVideo.on("verifyFirstConnection", handleVerifyFirstConnection);
    return () => {
      callVideo.off("verifyFirstConnection", handleVerifyFirstConnection);
    };
  }, [callVideo, handleInitAccept, roomId]);

  useEffect(() => {
    if (!mediaStream) return;
    mediaStream.getVideoTracks().forEach((track) => {
      track.enabled = videoStatus;
    });
  }, [mediaStream, videoStatus]);

  useEffect(() => {
    if (!mediaStream) return;
    mediaStream.getAudioTracks().forEach((track) => {
      track.enabled = audioStatus;
    });
  }, [mediaStream, audioStatus]);

  return {
    refLocalVideo,
    refRemoteVideo,
    audioStatus,
    videoStatus,
    isAccept,
    receiver,
    hangup: () => {
      if (!callVideo) return;
      callVideo.end(roomId);
    },
    toggleVideo: () => setVideoStatus((s) => !s),
    toggleAudio: () => setAudioStatus((s) => !s),
  };
};

export const useRoomListener = () => {
  const pathname = usePathname() || "";
  const isRoom = pathname.includes("/room/");
  const callVideo = useCallVideo();
  const [offerData, setOfferData] = useState<OfferMessageResponse | null>(null);

  const handleAccept = useCallback(() => {
    if (!callVideo || !offerData?.roomId) return;
    window.open(
      `/app/room/${offerData?.roomId}`,
      "_blank",
      "width=800,height=600",
    );
    confirmAction.setOpen(false);
    setOfferData(null);
    disableRinging();
  }, [callVideo, offerData?.roomId]);

  const handleReject = useCallback(() => {
    if (!callVideo || !offerData?.roomId) return;
    callVideo.reject(offerData?.roomId);
    confirmAction.setOpen(false);
    setOfferData(null);
  }, [callVideo, offerData?.roomId]);

  useEffect(() => {
    if (!callVideo) return;
    const handleOffer = (payload: OfferMessageResponse) => {
      if (isRoom) {
        window.close();
      } else {
        setOfferData(payload);
        confirmAction.setOpen(true);
        enableRinging();
      }
    };
    const handleReject = () => {
      confirmAction.setOpen(false);
      setOfferData(null);
      disableRinging();
    };

    callVideo.on("offer", handleOffer);
    callVideo.on("reject", handleReject);
    return () => {
      callVideo.off("offer", handleOffer);
      callVideo.off("reject", handleReject);
    };
  }, [callVideo, isRoom]);

  return {
    handleAccept,
    handleReject,
    offerData,
  };
};

const enableRinging = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.play();
};

const disableRinging = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.pause();
  audio.currentTime = 0;
};
