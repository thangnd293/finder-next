import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useCurrentUser } from "@/service/user";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuScanFace } from "react-icons/lu";
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
};
type ServerEvent = DONE | IMAGE_AFTER_RECOGNIZE;

type State = {
  open: boolean;
};

type Action = {
  setOpen: (open: boolean) => void;
};

const useVerifyStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

const { setOpen } = useVerifyStore.getState();
export const verifyAction = { setOpen };

export default function Verified() {
  const isOpen = useVerifyStore((s) => s.open);
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureIntervalRef = useRef<NodeJS.Timer | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageAfterRecognizeRef = useRef<HTMLImageElement | null>(null);
  const user = useCurrentUser();
  const [imageAfterRecognize, setImageAfterRecognize] = useState<Omit<
    IMAGE_AFTER_RECOGNIZE,
    "event"
  > | null>(null);
  const [isRecording, setIsRecording] = useState(false);

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

    wsRef.current = new WebSocket("ws://localhost:3008/ws-recognize-record");
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
          console.log("Done");
          setIsDone(true);
          setIsRecording(false);
          clearInterval(captureIntervalRef.current!);
          break;
        case NameEvent.IMAGE_AFTER_RECOGNIZE:
          if (!imageAfterRecognizeRef.current) return;
          setImageAfterRecognize(data);
          const imageAfterRecognize = imageAfterRecognizeRef.current;
          imageAfterRecognize.src = "data:image/jpeg;base64," + data.image;
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
    console.log("videoRef.current: ", videoRef.current);

    (async () => {
      if (!videoRef.current) return;
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 400 },
          height: { min: 300 },
          facingMode: "user",
        },
      });
      videoRef.current.srcObject = mediaStream;
    })();

    return () => {
      if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop());
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (captureIntervalRef.current) clearInterval(captureIntervalRef.current);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <Modal
        size="auto"
        open={true}
        closeOnEscape={false}
        withCloseButton={false}
        onOpenChange={verifyAction.setOpen}
      >
        <div className={`grid gap-4 ${isDone ? "hidden" : "block"}`}>
          <div>
            <h1 className="text-center text-xl font-semibold">
              Xác thực tài khoản
            </h1>
          </div>
          <div className="relative h-[420px] w-[560px] overflow-hidden rounded-sm bg-black">
            <video
              ref={videoRef}
              className="[transform:rotateY(180deg)]"
              id="webcam"
              autoPlay
            />

            {isRecording && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="absolute inset-0 [transform:rotateY(180deg)]"
                ref={imageAfterRecognizeRef}
              />
            )}
            {imageAfterRecognize && imageAfterRecognize.faceTotal !== 1 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-800/20">
                <LuScanFace size={100} className="text-red-500" />
                <p className="text-center text-lg font-semibold text-red-500">
                  {imageAfterRecognize.faceTotal === 0 &&
                    "Không tìm thấy khuôn mặt"}
                  {imageAfterRecognize.faceTotal > 1 &&
                    "Tìm thấy nhiều khuôn mặt"}
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

          <div className="flex justify-around">
            <Button
              onClick={() => verifyAction.setOpen(false)}
              variant="outline"
            >
              Huỷ
            </Button>
            <Button
              disabled={isRecording}
              id="stopCapture"
              onClick={handleRecord}
            >
              Ghi hình
            </Button>
          </div>
          <canvas ref={canvasRef} id="canvas" style={{ display: "none" }} />
        </div>

        {isDone && (
          <div className="flex flex-col items-center">
            <img
              className="h-80 w-80"
              src="/images/congratulations.png"
              alt=""
            />
            <Button
              onClick={() => verifyAction.setOpen(false)}
              variant="outline"
              className="text-xl font-semibold"
            >
              Chúc mừng bạn đã xác nhận thành công
            </Button>
          </div>
        )}
      </Modal>
    )
  );
}