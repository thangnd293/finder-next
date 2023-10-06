import { EventEmitter } from "events";
import { Socket } from "socket.io-client";

import SimplePeer from "simple-peer";

declare interface CallVideoManager {
  on(
    event: "offerReceived",
    listener: (offer: SimplePeer.SignalData, userId: string) => void,
  ): this;
  on(
    event: "answerReceived",
    listener: (answer: SimplePeer.SignalData) => void,
  ): this;
  on(event: "rejectConnection", listener: () => void): this;
  on(event: "hangup", listener: () => void): this;
  on(event: "stream", listener: (stream: MediaStream) => void): this;
  emit(
    event: "offerReceived",
    offer: SimplePeer.SignalData,
    userId: string,
  ): boolean;
  emit(event: "answerReceived", answer: SimplePeer.SignalData): boolean;
  emit(event: "rejectConnection"): boolean;
  emit(event: "hangup"): boolean;
  emit(event: "stream", stream: MediaStream): boolean;
}

class CallVideoManager extends EventEmitter {
  private socket: Socket;
  private peer: SimplePeer.Instance | null;
  private stream: MediaStream | null;

  constructor(socket: Socket) {
    super();
    this.socket = socket;
    this.peer = null;
    this.stream = null;

    this.initSocket();
  }

  initSocket() {
    this.socket.on("offer", (offer, userId) => {
      this.emit("offerReceived", offer, userId);
    });

    this.socket.on("answer", (answer) => {
      this.emit("answerReceived", answer);
    });

    this.socket.on("reject", () => {
      this.emit("rejectConnection");
    });

    this.socket.on("hangup", () => {
      console.log(
        "🚀 ~ file: web-rtc.ts:59 ~ CallVideoManager ~ this.socket.on ~ hangup",
      );
      this.emit("hangup");
    });
  }

  destroy() {
    this.peer?.destroy();
    this.peer = null;
  }

  handleAnswerReceived(answer: SimplePeer.SignalData) {
    if (!this.peer) return;
    this.peer.signal(answer);
  }

  async call(remoteId: string, videoStream: MediaStream) {
    this.stream = videoStream;
    this.peer = await this.createPeer(true, videoStream);
    this.peer.on("signal", (offer) => {
      this.socket.emit("offer", remoteId, offer);
    });
  }

  async accept(
    remoteId: string,
    videoStream: MediaStream,
    offer: SimplePeer.SignalData,
  ) {
    this.stream = videoStream;
    this.peer = await this.createPeer(false, videoStream);
    this.peer.signal(offer);
    this.peer.on("signal", (answer) => {
      this.socket.emit("answer", remoteId, answer);
    });
  }

  reject(remoteId: string) {
    this.socket.emit("reject", remoteId);
  }

  end(remoteId: string) {
    this.socket.emit("hangup", remoteId);
    this.offStream();
  }

  offStream() {
    if (!this.peer) return;
    this.peer.destroy();
    if (!this.stream) return;
    this.stream.getTracks().forEach((track) => track.stop());
  }

  createPeer(initiator: boolean, stream: MediaStream): SimplePeer.Instance {
    const peer = new SimplePeer({
      initiator: initiator,
      trickle: false,
      stream,
    });

    peer._debug = (message) => {
      console.log(
        "🚀 ~ file: web-rtc.ts:119 ~ CallVideoManager ~ createPeer ~ message:",
        message,
      );
    };

    peer.on("stream", (stream) => {
      this.emit("stream", stream);
    });

    return peer;
  }
}

export default CallVideoManager;

export const setSrcVideo = (video: HTMLVideoElement, stream: MediaStream) => {
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else if ("src" in video) {
    (video as any).src = window.URL.createObjectURL(stream as any); // for older browsers
  }
};
