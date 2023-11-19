import { EventEmitter } from "events";

import SimplePeer from "simple-peer";
import { ISocket, OfferMessageResponse } from "./socket";
import axios from "axios";

declare interface CallVideoManager {
  on(event: "offer", listener: (payload: OfferMessageResponse) => void): this;
  on(event: "answer", listener: (roomId: string) => void): this;
  on(event: "rejectConnection", listener: () => void): this;
  on(event: "hangup", listener: () => void): this;
  on(event: "stream", listener: (stream: MediaStream) => void): this;
  on(
    event: "checkRoom",
    listener: (
      payload:
        | {
            status: false;
          }
        | { status: true; offer: SimplePeer.SignalData },
    ) => void,
  ): this;
  on(event: "verifyFirstConnection", listener: () => void): this;
  on(event: "reject", listener: () => void): this;

  emit(event: "offer", payload: OfferMessageResponse): boolean;
  emit(event: "answer", roomId: string): boolean;
  emit(
    event: "checkRoom",
    payload:
      | {
          status: false;
        }
      | { status: true; offer: SimplePeer.SignalData },
  ): boolean;
  emit(event: "verifyFirstConnection"): boolean;
  emit(event: "rejectConnection"): boolean;
  emit(event: "hangup"): boolean;
  emit(event: "stream", stream: MediaStream): boolean;
  emit(event: "reject"): boolean;
}

class CallVideoManager extends EventEmitter {
  private socket: ISocket;
  private peer: SimplePeer.Instance | null;
  private stream: MediaStream | null;

  constructor(socket: ISocket) {
    super();
    this.socket = socket;
    this.peer = null;
    this.stream = null;

    this.initSocket();
  }

  initSocket() {
    this.socket.on("verifyFirstConnection", () => {
      this.emit("verifyFirstConnection");
    });

    this.socket.on("checkRoom", (payload) => {
      this.emit("checkRoom", payload);
    });

    this.socket.on("offer", (payload) => {
      this.emit("offer", payload);
    });

    this.socket.on("answer", (answer) => {
      if (!this.peer) return;
      this.peer.signal(answer.offer);
    });

    this.socket.on("reject", () => {
      this.emit("reject");
    });

    this.socket.on("hangup", () => {
      this.emit("hangup");
    });
  }

  destroy() {
    this.peer?.destroy();
    this.peer = null;
    this.stream = null;
  }

  async checkRoom(roomId: string) {
    this.socket.emit("checkRoom", {
      roomId,
    });
  }

  async call(roomId: string, videoStream: MediaStream) {
    this.stream = videoStream;
    this.peer = await this.createPeer(true, videoStream);
    this.peer.on("signal", (offer) => {
      this.socket.emit("offer", {
        offer,
        roomId,
      });
    });
  }

  async accept(
    roomId: string,
    offer: SimplePeer.SignalData,
    videoStream: MediaStream,
  ) {
    this.stream = videoStream;
    this.peer = await this.createPeer(false, videoStream);
    this.peer.signal(offer);
    this.peer.on("signal", (answer) => {
      this.socket.emit("answer", { offer: answer, roomId });
    });
  }

  reject(remoteId: string) {
    this.socket.emit("reject", {
      roomId: remoteId,
      status: true,
    });
  }

  end(remoteId: string) {
    this.socket.emit("hangup");
    this.offStream();
  }

  offStream() {
    if (!this.peer) return;
    this.peer.destroy();
    if (!this.stream) return;
    this.stream.getTracks().forEach((track) => track.stop());
  }

  async createPeer(
    initiator: boolean,
    stream: MediaStream,
  ): Promise<SimplePeer.Instance> {
    const response = await axios.post(
      "https://api.twilio.com/2010-04-01/Accounts/ACba847817f5755207571ee3173fc85b49/Tokens.json",
      "",
      {
        auth: {
          username: "ACba847817f5755207571ee3173fc85b49",
          password: "5372770a3018a44cdc506fbc161a4ec2",
        },
      },
    );

    console.log(
      "🚀 ~ file: web-rtc.ts:119 ~ CallVideoManager ~ createPeer ~ response:",
      response,
    );

    const peer = new SimplePeer({
      initiator: initiator,
      trickle: false,
      stream,
      config: {
        iceServers: response.data.ice_servers,
      },
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
