import CallVideoManager, { setSrcVideo } from "@/utils/web-rtc/web-rtc";
import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { confirmAction } from "../_comps/dialog-confirm";
import { ISocket, socketInstance } from "@/utils/web-rtc/socket";

const createMediaStream = () => {
  return navigator.mediaDevices.getUserMedia({
    video: {
      width: { min: 640, ideal: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: { ideal: 1.7777777778 },
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

  const handleInitAccpect = useCallback(
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
    if (!callVideo) return;
    callVideo.on("hangup", () => {
      if (!callVideo) return;
      callVideo.offStream();
    });
    callVideo.on("stream", (stream) => {
      setSrcVideo(refRemoteVideo.current!, stream);
    });
    callVideo.on("checkRoom", async (payload) => {
      if (!payload.status) {
        handleInitRoom(roomId);
      } else {
        handleInitAccpect(roomId, payload.offer);
        console.log(
          "🚀 ~ file: useRoom.ts:70 ~ callVideo.on ~ roomId, payload.offer:",
          roomId,
          payload.offer,
        );
      }
    });

    callVideo.on("verifyFirstConnection", () => {
      callVideo.checkRoom(roomId);
    });
  }, [callVideo, handleInitAccpect, handleInitRoom, roomId]);

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
    hangup: () => {
      if (!callVideo) return;
      callVideo.end(roomId);
    },
    toggleVideo: () => setVideoStatus((s) => !s),
    toggleAudio: () => setAudioStatus((s) => !s),
  };
};

export const useRoomListener = () => {
  const callVideo = useCallVideo();
  const [roomId, setRoomId] = useState<string | null>(null);

  const handleAccept = useCallback(() => {
    if (!callVideo || !roomId) return;
    window.open(`/app/room/${roomId}`, "_blank", "width=800,height=600");
    confirmAction.setOpen(false);
  }, [callVideo, roomId]);

  const handleReject = useCallback(() => {
    if (!callVideo || !roomId) return;
    callVideo.reject(roomId);
    confirmAction.setOpen(false);
  }, [callVideo, roomId]);

  useEffect(() => {
    if (!callVideo) return;
    callVideo.on("offer", (roomId) => {
      console.log("🚀 ~ file: useRoom.ts:101 ~ callVideo.on ~ roomId:", roomId);
      setRoomId(roomId);
      confirmAction.setOpen(true);
    });
  }, [callVideo]);

  return {
    handleAccept,
    handleReject,
  };
};
