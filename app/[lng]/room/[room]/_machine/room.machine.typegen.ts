// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.CallManager.caller.calling:invocation[0]": {
      type: "done.invoke.CallManager.caller.calling:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.CallManager.caller.waiting:invocation[0]": {
      type: "done.invoke.CallManager.caller.waiting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.CallManager.end:invocation[0]": {
      type: "done.invoke.CallManager.end:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.CallManager.ending:invocation[0]": {
      type: "done.invoke.CallManager.ending:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.CallManager.receiver.accpecting:invocation[0]": {
      type: "done.invoke.CallManager.receiver.accpecting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.invoke-7ni6r": {
      type: "done.invoke.invoke-7ni6r";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.CallManager.init:invocation[0]": {
      type: "error.platform.CallManager.init:invocation[0]";
      data: unknown;
    };
    "error.platform.invoke-7ni6r": {
      type: "error.platform.invoke-7ni6r";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {
    destroy: "done.invoke.CallManager.end:invocation[0]";
    endCall: "done.invoke.CallManager.ending:invocation[0]";
    handleAccpect: "done.invoke.CallManager.receiver.accpecting:invocation[0]";
    handleCall: "done.invoke.CallManager.caller.calling:invocation[0]";
    handleListenAnswer: "done.invoke.CallManager.caller.waiting:invocation[0]";
    handleReceiverAccpect: "done.invoke.CallManager.caller.accpecting:invocation[0]";
    handleReject: "done.invoke.invoke-7ni6r";
    init: "done.invoke.CallManager.init:invocation[0]";
  };
  missingImplementations: {
    actions:
      | "closeConfirmModal"
      | "openConfirmModal"
      | "playRingtone"
      | "removeAnwser"
      | "resetContext"
      | "setAnswer"
      | "setRemoteId"
      | "stopRingtone"
      | "toggleAudio"
      | "toggleVideo";
    delays: never;
    guards: never;
    services:
      | "destroy"
      | "endCall"
      | "handleAccpect"
      | "handleCall"
      | "handleListenAnswer"
      | "handleReceiverAccpect"
      | "handleReject"
      | "init";
  };
  eventsCausingActions: {
    closeConfirmModal:
      | "UNMOUNT"
      | "done.invoke.CallManager.receiver.accpecting:invocation[0]"
      | "done.invoke.invoke-7ni6r"
      | "error.platform.invoke-7ni6r"
      | "xstate.stop";
    openConfirmModal: "LISTEN";
    playRingtone: "LISTEN";
    removeAnwser: "RECEIVER_REJECT";
    resetContext: "done.invoke.CallManager.ending:invocation[0]";
    setAnswer:
      | "LISTEN"
      | "done.invoke.CallManager.caller.waiting:invocation[0]";
    setRemoteId:
      | "LISTEN"
      | "done.invoke.CallManager.caller.calling:invocation[0]";
    stopRingtone:
      | "UNMOUNT"
      | "done.invoke.CallManager.receiver.accpecting:invocation[0]"
      | "done.invoke.invoke-7ni6r"
      | "error.platform.invoke-7ni6r"
      | "xstate.stop";
    toggleAudio: "AUDIO";
    toggleVideo: "VIDEO";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    destroy: "UNMOUNT" | "error.platform.CallManager.init:invocation[0]";
    endCall: "END_CALL";
    handleAccpect: "RECEIVER_ACCEPT";
    handleCall: "CALL";
    handleListenAnswer: "done.invoke.CallManager.caller.calling:invocation[0]";
    handleReceiverAccpect: "done.invoke.CallManager.caller.waiting:invocation[0]";
    handleReject: "RECEIVER_REJECT";
    init: "done.invoke.CallManager.end:invocation[0]" | "xstate.init";
  };
  matchesStates:
    | "caller"
    | "caller.accpecting"
    | "caller.calling"
    | "caller.waiting"
    | "connected"
    | "end"
    | "ending"
    | "error"
    | "idle"
    | "init"
    | "receiver"
    | "receiver.accpecting"
    | "receiver.idle"
    | "receiver.rejecting"
    | {
        caller?: "accpecting" | "calling" | "waiting";
        receiver?: "accpecting" | "idle" | "rejecting";
      };
  tags: never;
}
