import { useMachine } from "@xstate-ninja/react";
import { machine } from "./room.machine";
import { useCallback, useEffect, useRef, useState } from "react";
import CallVideoManager, { setSrcVideo } from "@/utils/web-rtc";
import { io } from "socket.io-client";
import { assign, send, sendTo } from "xstate";
import { confirmAction } from "../_comps/dialog-confirm";
import SimplePeer from "simple-peer";

const useRoomMachine = (local: string) => {
  const [callVideo, setCallVideo] = useState<CallVideoManager | null>(null);

  const refLocalVideo = useRef<HTMLVideoElement>(null);
  const refRemoteVideo = useRef<HTMLVideoElement>(null);

  const [state, send] = useMachine(machine, {
    devTools: true,
    context: {
      localId: local,
      remoteId: "",
      answer: null,
      audioStatus: false,
      videoStatus: false,
    },
    actions: {
      resetContext: assign((ctx, event) => ({
        localId: local,
        remoteId: "",
        answer: null,
        audioStatus: false,
        videoStatus: false,
      })),
      playRingtone: () => {
        const audio = document.getElementById("audio") as HTMLAudioElement;
        audio.play();
      },
      stopRingtone: () => {
        const audio = document.getElementById("audio") as HTMLAudioElement;
        audio.pause();
      },
      toggleVideo: assign((ctx, event) => ({
        ...ctx,
        videoStatus: !ctx.videoStatus,
      })),
      toggleAudio: assign((ctx, event) => ({
        ...ctx,
        audioStatus: !ctx.audioStatus,
      })),
      closeConfirmModal: () => confirmAction.setOpen(false),
      removeAnwser: assign((ctx, event) => ({
        ...ctx,
        answer: null,
      })),
      setRemoteId: assign((ctx, event) => {
        switch (event.type) {
          case "LISTEN": {
            return {
              ...ctx,
              remoteId: event.remoteId,
            };
          }
          default:
            return {
              ...ctx,
              remoteId: event.data.remoteId,
            };
        }
      }),
      setAnswer: assign((ctx, event) => {
        switch (event.type) {
          case "LISTEN": {
            return {
              ...ctx,
              answer: event.anwser,
            };
          }
          default:
            return {
              ...ctx,
              answer: event.data.answer,
            };
        }
      }),
      openConfirmModal: assign((ctx, event) => {
        confirmAction.setOpen(true);
        return {
          ...ctx,
          remoteId: event.remoteId,
        };
      }),
    },
    services: {
      init: (ctx) => () =>
        new Promise((resolve, reject) => {
          try {
            const socket = io("http://localhost:4000/call", {
              query: {
                userId: ctx.localId,
              },
            });

            const callVideo = new CallVideoManager(socket);
            setCallVideo(callVideo);

            callVideo.on("offerReceived", async (offer, remoteId) => {
              send({
                type: "LISTEN",
                anwser: offer,
                remoteId,
              });
            });

            callVideo.on("hangup", () => {
              send("END_CALL");
            });

            callVideo.on("stream", (stream) => {
              setSrcVideo(refRemoteVideo.current!, stream);
            });

            resolve(true);
          } catch (error) {
            reject(false);
          }
        }),
      handleCall: (_, event) => () =>
        new Promise(async (resolve, reject) => {
          if (!callVideo) {
            return reject(false);
          }

          const { remoteId } = event;
          const localVideoStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { min: 640, ideal: 1920 },
              height: { min: 400, ideal: 1080 },
              aspectRatio: { ideal: 1.7777777778 },
            },
            audio: true,
          });

          setSrcVideo(refLocalVideo.current!, localVideoStream);

          callVideo.call(remoteId, localVideoStream);
          resolve({ remoteId });
        }),
      handleAccpect: (context, event) => async () => {
        if (!callVideo || !context.answer) return;
        const localVideoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 640, ideal: 1920 },
            height: { min: 400, ideal: 1080 },
            aspectRatio: { ideal: 1.7777777778 },
          },
          audio: true,
        });

        setSrcVideo(refLocalVideo.current!, localVideoStream);
        callVideo.accept(context.remoteId, localVideoStream, context.answer);
      },
      handleReject: () => async () => {
        if (!callVideo) return;
        callVideo.reject("");
      },
      handleListenAnswer: () => async (args) =>
        new Promise((resolve, reject) => {
          args;
          if (!callVideo) return reject(false);
          const handleAnswer = (answer: SimplePeer.SignalData) => {
            callVideo.off("answerReceived", handleAnswer);
            resolve({ answer });
          };

          callVideo.on("answerReceived", handleAnswer);
        }),
      handleReceiverAccpect: (ctx) => async () => {
        new Promise((resolve, reject) => {
          if (!callVideo || !ctx.answer) return reject(false);
          callVideo.handleAnswerReceived(ctx.answer);
          resolve(true);
        });
      },
      destroy: () => async () => {
        if (!callVideo) return;
        callVideo.destroy();
      },
      endCall: (ctx) => () =>
        new Promise((resolve, reject) => {
          if (!callVideo) return reject(false);
          callVideo.end(ctx.remoteId);
          callVideo.offStream();
          resolve(true);
        }),
    },
  });

  useEffect(() => {
    return () => {
      send("UNMOUNT");
    };
  }, []);

  return { state, send, refLocalVideo, refRemoteVideo };
};

export default useRoomMachine;
