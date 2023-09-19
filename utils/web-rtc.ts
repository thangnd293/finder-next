import { EventEmitter } from "events";
import { Socket } from "socket.io-client";

import SimplePeer from "simple-peer";

class CallVideoManager extends EventEmitter {
  private socket: Socket;
  private peer: SimplePeer.Instance | null;
  private localId: string;
  private remoteId: string;

  constructor(socket: Socket, localId: string, remoteId: string) {
    super();
    this.socket = socket;
    this.peer = null;

    this.localId = localId;
    this.remoteId = remoteId;

    this.initSocket();
  }

  initSocket() {
    this.socket.on("offer", (offer) => {
      this.onOfferReceived(offer);
    });

    this.socket.on("answer", (answer) => {
      this.onAnswerReceived(answer);
    });

    this.socket.on("reject", () => {
      this.onRejectConnection();
    });

    this.socket.on("end", () => {
      this.onEndConnection();
    });
  }

  async onAnswerReceived(answer: SimplePeer.SignalData) {
    if (!this.peer) return;
    console.log(
      "🚀 ~ file: web-rtc.tsx:45 ~ CallVideoManager ~ onAnswerReceived ~ answer:",
      answer,
    );
    this.peer.signal(answer);
  }

  onOfferReceived(offer: SimplePeer.SignalData) {
    this.emit("offerReceived", offer);
  }

  onRejectConnection() {
    this.emit("rejectConnection");
  }

  onEndConnection() {
    this.emit("endConnection");
  }

  async call(userId: string, videoStream: MediaStream) {
    this.peer = await this.createPeer(true, videoStream);
    this.peer.on("signal", (offer) => {
      this.socket.emit("offer", userId, offer);
    });
  }

  async accept(videoStream: MediaStream, offer: SimplePeer.SignalData) {
    this.peer = await this.createPeer(false, videoStream);
    this.peer.signal(offer);
    this.peer.on("signal", (answer) => {
      this.socket.emit("answer", this.remoteId, answer);
    });
  }

  reject() {
    this.socket.emit("reject", this.remoteId);
  }

  end() {
    this.socket.emit("end", this.remoteId);
  }

  createPeer(initiator: boolean, stream: MediaStream): SimplePeer.Instance {
    const peer = new SimplePeer({
      initiator: initiator,
      trickle: false,
      stream,
    });

    peer._debug = (message) => {
      console.log("🚀 ~ peer._debug ~ message:", message);
    };

    peer.on("data", (data) => {
      this.emit("data", data);
    });

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
