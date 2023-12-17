"use client";
import { create } from "zustand";

export const CallStatus = {
  IDLE: "IDLE",
  CALLING: "CALLING",
  ENDED_CALL: "ENDED_CALL",
  ENDED: "ENDED",
} as const;

export type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];

export const useCallStatus = create<{
  status: CallStatus;
  setStatus: (status: CallStatus) => void;

  messageId: string | null;
  setMessageId: (messageId: string) => void;
}>((set) => ({
  status: CallStatus.IDLE,
  setStatus: (status) => set({ status }),

  messageId: null,
  setMessageId: (messageId) => set({ messageId }),
}));

const { setStatus, setMessageId } = useCallStatus.getState();
export const callStatusAction = { setStatus, setMessageId };
