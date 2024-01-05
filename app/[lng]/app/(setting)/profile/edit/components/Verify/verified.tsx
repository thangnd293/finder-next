import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { cn } from "@/lib/utils";
import { useCurrentUser, useInvalidateCurrentUser } from "@/service/user";
import { useEffect, useRef, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { LuScanFace } from "react-icons/lu";
import { usePermission } from "react-use";
import { create } from "zustand";

type Message<T> = {
  event: string;
  data: T;
};

const NameEvent = {
  DONE: "DONE",
  IMAGE_AFTER_RECOGNIZE: "IMAGE_AFTER_RECOGNIZE",
} as const;

type DONE = {
  event: typeof NameEvent.DONE;
};

type IMAGE_AFTER_RECOGNIZE = {
  event: typeof NameEvent.IMAGE_AFTER_RECOGNIZE;
  image: string;
  faceTotal: number;
  progress: number;
};
type ServerEvent = DONE | IMAGE_AFTER_RECOGNIZE;

type State = {
  open: boolean;
};

type Action = {
  setOpen: (open: boolean) => void;
};

export const useVerifyStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

const { setOpen } = useVerifyStore.getState();
export const verifyAction = { setOpen };

const VideoContainer = ({
  onDone,
  isDone,
}: {
  onDone: (state: boolean) => void;
  isDone: boolean;
}) => {
  const invalidateUser = useInvalidateCurrentUser();
  const isOpen = useVerifyStore((s) => s.open);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureIntervalRef = useRef<NodeJS.Timer | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaStream | null>(null);
  const user = useCurrentUser();
  const [imageAfterRecognize, setImageAfterRecognize] = useState<Omit<
    IMAGE_AFTER_RECOGNIZE,
    "event"
  > | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const isHaveMediaDevices =
    "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

  const captureAndSendImage = async () => {
    if (!canvasRef.current || !videoRef.current || !wsRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ws = wsRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    const imageBlob = (await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg"),
    )) as Blob | null;

    if (ws.readyState === WebSocket.OPEN && imageBlob) {
      ws.send(imageBlob);
    }
  };

  const handleRecord = () => {
    setIsRecording(true);

    wsRef.current = new WebSocket(
      "wss://finder.sohe.in/face/ws-recognize-record",
    );
    const ws = wsRef.current;
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      if (!user.data?._id) return;

      const message: Message<string> = {
        data: user.data._id,
        event: "USER",
      };
      ws.send(JSON.stringify(message));
    };

    ws.onmessage = (event) => {
      let data = JSON.parse(event.data) as ServerEvent;
      console.log("data:: ", data);
      switch (data.event) {
        case NameEvent.DONE:
          onDone(true);
          setIsRecording(false);
          clearInterval(captureIntervalRef.current!);
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current
              .getTracks()
              .forEach((track) => track.stop());
          }
          invalidateUser();
          break;
        case NameEvent.IMAGE_AFTER_RECOGNIZE:
          setImageAfterRecognize(data);
          break;
        default:
          console.log("Unknown message received:", event.data);
      }
    };

    const interval = 100; // Thời gian giữa mỗi lần gửi
    captureIntervalRef.current = setInterval(captureAndSendImage, interval);
  };

  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    (async () => {
      if (!videoRef.current) return;
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 400 },
          height: { min: 300 },
          facingMode: "user",
        },
      });
      mediaRecorderRef.current = mediaStream;
      videoRef.current.srcObject = mediaStream;
    })();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (captureIntervalRef.current) clearInterval(captureIntervalRef.current);
      setIsRecording(false);
      onDone(false);
      setImageAfterRecognize(null);
    };
  }, [isOpen]);

  return (
    <>
      <div className={`${isDone ? "hidden" : "block"}`}>
        <Modal.Header withCloseButton>Xác thực tài khoản</Modal.Header>
        <div className="relative h-[420px] w-[560px] overflow-hidden bg-black">
          {isRecording && (
            <div className="absolute top-0 z-10 h-2 w-full bg-gray-200/50">
              <div
                style={
                  imageAfterRecognize ?
                    { width: `${imageAfterRecognize.progress}%` }
                  : {}
                }
                className="h-full bg-green-600"
              ></div>
            </div>
          )}
          <video
            ref={videoRef}
            className="absolute inset-0 [transform:rotateY(180deg)]"
            id="webcam"
            autoPlay
          />

          {imageAfterRecognize && imageAfterRecognize.faceTotal !== 1 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-800/20">
              <LuScanFace size={100} className="text-red-500" />
              <p className="text-center text-lg font-semibold text-red-500">
                {imageAfterRecognize?.faceTotal === 0 &&
                  "Không tìm thấy khuôn mặt"}
                {imageAfterRecognize?.faceTotal > 1 &&
                  "Tìm thấy nhiều khuôn mặt"}
              </p>
            </div>
          )}

          {!isHaveMediaDevices && (
            <div className="absolute inset-0 flex items-center justify-center bg-yellow-600">
              <p className="text-center text-lg font-semibold text-white">
                Thiết bị không hỗ trợ
              </p>
            </div>
          )}

          {isRecording && (
            <>
              <div className="record-animation h-px w-full bg-red-600"></div>
              <div className="absolute left-3 top-3  h-3 w-3 rounded-full bg-red-600" />
            </>
          )}
        </div>

        <Modal.Footer>
          <Button onClick={() => verifyAction.setOpen(false)} variant="outline">
            Huỷ
          </Button>
          <Button
            disabled={isRecording || !isHaveMediaDevices}
            id="stopCapture"
            onClick={handleRecord}
          >
            Ghi hình
          </Button>
        </Modal.Footer>
        <canvas ref={canvasRef} id="canvas" style={{ display: "none" }} />
      </div>

      {isDone && (
        <div className="flex flex-col items-center">
          <img className="h-80 w-80" src="/images/congratulations.png" alt="" />
          <Button onClick={() => verifyAction.setOpen(false)} variant="outline">
            Chúc mừng bạn đã xác nhận thành công
          </Button>
        </div>
      )}
    </>
  );
};

export default function Verified() {
  const [isDone, setIsDone] = useState(false);

  const isVideoPermission = usePermission({ name: "camera" });

  let devices = [];
  isVideoPermission !== "granted" && devices.push("video");

  return (
    <Modal
      className={cn({
        "p-6": isDone,
      })}
      size="auto"
      open={true}
      closeOnEscape={false}
      onOpenChange={verifyAction.setOpen}
    >
      {isVideoPermission !== "granted" ?
        <div className="flex h-[520px] w-[560px] flex-col items-center justify-center gap-4 bg-gray-950 px-10 text-center">
          <p className="flex gap-4">
            <IoVideocam size={40} />
          </p>
          <p className="text-3xl font-semibold">
            Bạn chưa cho phép Finder truy cập vào {devices.join(" và ")}.
          </p>
          <p className="text-sm font-medium">
            Cho phép Finder sử dụng {devices.join(" và ")} để có thể xác thực
            tài khoản của bạn.
          </p>
        </div>
      : <VideoContainer onDone={setIsDone} isDone={isDone} />}
    </Modal>
  );
}
