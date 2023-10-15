import { EventEmitter } from "events";

import SimplePeer from "simple-peer";
import { ISocket, OfferMessageResponse } from "./socket";

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
      this.emit("rejectConnection");
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
    this.socket.emit("reject", remoteId);
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

  createPeer(initiator: boolean, stream: MediaStream): SimplePeer.Instance {
    // stun.l.google.com:19302
    // stun1.l.google.com:19302
    // stun2.l.google.com:19302
    // stun3.l.google.com:19302
    // stun4.l.google.com:19302
    // stun01.sipphone.com
    // stun.ekiga.net
    // stun.fwdnet.net
    // stun.ideasip.com
    // stun.iptel.org
    // stun.rixtelecom.se
    // stun.schlund.de
    // stunserver.org
    // stun.softjoys.com
    // stun.voiparound.com
    // stun.voipbuster.com
    // stun.voipstunt.com
    // stun.voxgratia.org
    // stun.xten.com
    const peer = new SimplePeer({
      initiator: initiator,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            urls: "turn:stun1.l.google.com:19302",
          },
          {
            urls: "turn:stun2.l.google.com:19302",
          },
          {
            urls: "turn:stun3.l.google.com:19302",
          },
          {
            urls: "turn:stun4.l.google.com:19302",
          },
          {
            urls: "turn:stun01.sipphone.com",
          },
          {
            urls: "turn:stun.ekiga.net",
          },
          {
            urls: "turn:stun.fwdnet.net",
          },
          {
            urls: "turn:stun.ideasip.com",
          },
          {
            urls: "turn:stun.iptel.org",
          },
          {
            urls: "turn:stun.rixtelecom.se",
          },
          {
            urls: "turn:stun.schlund.de",
          },
          {
            urls: "turn:stunserver.org",
          },
          {
            urls: "turn:stun.softjoys.com",
          },
          {
            urls: "turn:stun.voiparound.com",
          },
          {
            urls: "turn:stun.voipbuster.com",
          },
          {
            urls: "turn:stun.voipstunt.com",
          },
          {
            urls: "turn:stun.voxgratia.org",
          },
          {
            urls: "turn:stun.xten.com",
          },
        ],
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
