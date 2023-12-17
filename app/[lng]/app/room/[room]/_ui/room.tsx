"use client";
import { useParams } from "next/navigation";

import { usePermission } from "react-use";
import { CallStatus, useCallStatus } from "../_store/use-call-status";
import { useRoomEvent } from "../_store/use-room";
import CallVideo from "../_ui/call-video";
import Ended from "../_ui/ended";
import EndedCall from "../_ui/ended-call";
import Permission from "../_ui/permission";

export default function Room() {
  const { room } = useParams() as { room: string };
  const status = useCallStatus((s) => s.status);
  const isVideoPermission = usePermission({ name: "camera" });
  const isAudioPermission = usePermission({ name: "microphone" });
  const data = useRoomEvent(room);

  const isFullPermission =
    isVideoPermission === "granted" && isAudioPermission === "granted";
  return (
    isFullPermission ?
      status === CallStatus.ENDED ? <Ended room={room} />
      : status === CallStatus.ENDED_CALL ? <EndedCall room={room} />
      : <CallVideo data={data} room={room} />
    : <Permission />
  );
}
