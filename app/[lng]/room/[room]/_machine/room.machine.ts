import SimplePeer from "simple-peer";
import { assign, createMachine } from "xstate";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGECGAbdBZVA7VMATgMQCqAclgPIUAqA2gAwC6ioADgPawCWALj0642IAB6IArACYANCACeiKVIDMKgHQAWVVIDsuiSs0BGKYwBsAX0ty0mHPiLqeufsQhCwz3ADdOAay87bDwCMEJvfgQXPwBjVAEhJmZkkS5eROEkMURjAE5ddWNNFX1GY0ZKqQlzOUUEKWNjCXUADlapc3M8koLzTutbDBDHcMi+YnDCTgj2dASAMxmAW3VghzCIlyiYznjM5NTs9P5BLNBxBHzC4tLdcsrGatqFJU1y9UZNaXemxgl-oMQOtQk4eBB0GBiAAZACSAGVaABRchHDjcU5CESXAC0AJaug6AJUrTyHUYKmMdVyjDyjHU-U05gBeTyxl0JjyQJBoy2EKhyAAgtDoWiQCdMtjEP1qQ0LC1WuVKZo8hJ9CpzJpucMNk4wLgIO5PN4-IE1jrQWN9RBor49gkzocWGkMZLspdrkUSmUKlUarLVIZ1HlzCpVZp9BJjEZtfZLRFCGBYmAeD4xuDIcQAEpI5BI2EANSRWYA+jmAFK5hjO46us5ShA4noE4ytb55ar6RV5WWGTTqNVPRi6KQdNkk2MjTbqRPJ1Pp-nZ3P5oulwXIPMABWrrFrGXr7sQTe+6l0rfbncJtNl3yk6jM+kaumZJU6uknurGs5TaYTYAAVkmAi4FARq4F4uxmpBYA4rorjmIQYoSgeFyIO09KGNGKpsk8z6yroPRaF0dLEaqbJajYwIWryM5Jj+X4AUBLigVMMzqHMiwrCaAQwXBPAIUhdZYoeCDoQOlJGKyFR6C89RtsYA6aK00b6MY5gGMUH7xrRc6-uoqCxLE7BMSBYEQXaZo8tO37zhEBlGSZUC2nEDpJCwgn7sJqFXG+ny9MOZ4EVIKoBoS6gktUw7RuYykSKqWk0fEmBjEl6DMWZ3GWdR06pSlwzMc59oHO5Nbop55w5AgcWFD0BRknSKiDhIsrMuYnxqhUmp6KYoYJTlwxjAA7qgpymR44GZUE2VOLlETDaNTm7PsjolbuZWYhVHoUoUlISN8HJSCGoaydKRinq00jdRydIhn1M0DXNI3ASxhDTLM8x8EshCrFZ93JY9C2FctbkpKV4pCZtuR6IUXxhgF7IdiFrwIO8LRqK0z6ahIynFFId15f96jzc9xBCuQeaimDyFeZVpj6H5cOqUFSP1LeWhmE85gWCS3MSPjESzfphnGbEJPjeZppTXGiUPULDmiwVS2ubgTpreD5UNj1MP+UziM9sjqgKSo5TBQYlKmGGeOUb9KVCOBouQMQKIACIlkKIoeRtmtdApjR6Gqmj7cFAatBoh3KcFMU1IS-PqLEdtAY7xZZlQWae263lqeYvt0wHQeaAGaj3mp7RqfVeitFY1vTbbuD23wjsFrCztIlQ6cobTF15J8ynaM+XytrIyPsm1WPlAYTKqP8VtDNLOUJw7hqCqQzuwm3VMQ5rF2tKeRiXWyBhRkPckKU0pRqpSodxc0sfWul4uTeac96gait2sDKurS6GsiXo-YdMpEk-QyQWGPrkAi-YRxVBDMoDUfNq7PytK-UyrF3qcW+k-KcL8IBvxcsVUGatqaQwaByNoo5oyV3DqA2UzRWzBj2mGJkHJvhdGsJRXAnAIBwBEDbQg38vYiRxKYC6DJTDKC5iSdo3xZR4mDARMklJNRHXaFyBBWD0yuD4PwjOlVtCF0OkRWkw4JAAkrmoWOGYwDaI7pcEo9IzD9BUYYQM+t6hmDJG0XQagYqNGHLdNRn4IjWmsTTS4Go7xtnlCGdC7xWiFxMfee4pgOylDJCUWONlfwhOIUI1QhRs7KE6BSdobZmoG3ZAOTo+0fYYzivA2e6i-y6QXJCbJDYhGtm7gU8RxSpFlNZmdKBjRuh0lgSYjJdFbK0UAgrECbTBEcgUoqOKgYTDmwLsjPs94OyMAxkyUkh8JnNLssLRy8zvKwX+G0UwwinhND2idFGBizDtjpEpTUgIAnaVmucyqjV+y4RuiYxqdzewnnHBqXZHYLqx0FqlZivzbFPE+HoIFhgASNBantRJpJFSOMtqohpgS46y2JgivcAjvKqXZiXC6TQ2w9Cxf2CuID8UdkJVRRBAtZb2RFs9RFUN7inhWaqRoylmRxORqGDQlQzxKmfCPWFC8G4QAFVcS6p4vHZzbPJb4VIDb0xHp0aVldSQUSJdpO+cyKU6MuAUGhpiGQqGqCYMwZhjYqFvq9GYartA70rjUbGl9ehtgdRULQrJI67NDPkeB1ggA */
    id: "CallManager",
    initial: "init",
    states: {
      init: {
        invoke: {
          src: "init",
          onDone: [
            {
              target: "idle",
            },
          ],
          onError: [
            {
              target: "end",
            },
          ],
        },
      },
      idle: {
        on: {
          LISTEN: {
            target: "receiver",
          },
          CALL: {
            target: "caller",
          },
        },
      },
      end: {
        invoke: [
          {
            src: "destroy",
            onDone: [
              {
                target: "init",
              },
            ],
          },
        ],
      },
      receiver: {
        initial: "idle",

        states: {
          idle: {
            on: {
              RECEIVER_REJECT: {
                target: "rejecting",
                actions: ["removeAnwser"],
              },
              RECEIVER_ACCEPT: {
                target: "accpecting",
              },
            },

            entry: ["openConfirmModal", "playRingtone"],
          },

          rejecting: {
            invoke: {
              src: "handleReject",
              id: "invoke-7ni6r",

              onDone: [
                {
                  target: "#CallManager.idle",
                },
              ],

              onError: "#CallManager.idle",
            },
          },

          accpecting: {
            invoke: {
              src: "handleAccpect",
              onDone: "#CallManager.connected",
            },
          },
        },

        entry: ["setAnswer", "setRemoteId"],
        exit: ["stopRingtone", "closeConfirmModal"],
      },
      caller: {
        initial: "calling",
        states: {
          calling: {
            invoke: {
              src: "handleCall",
              onDone: {
                target: "waiting",
                actions: "setRemoteId",
              },
            },
          },
          waiting: {
            on: {
              CANCEL: {
                target: "#CallManager.idle",
              },
            },

            invoke: {
              src: "handleListenAnswer",

              onDone: {
                target: "accpecting",
                actions: ["setAnswer"],
              },

              onError: "#CallManager.idle",
            },
          },

          accpecting: {
            invoke: {
              src: "handleReceiverAccpect",
              onDone: "#CallManager.connected",
            },
          },
        },
      },
      connected: {
        on: {
          END_CALL: {
            target: "ending",
          },
          ERROR: {
            target: "error",
          },
          VIDEO: {
            internal: true,
            actions: "toggleVideo",
          },
          AUDIO: {
            internal: true,
            actions: "toggleAudio",
          },
        },
      },
      ending: {
        invoke: {
          src: "endCall",
          onDone: [
            {
              target: "idle",
              actions: "resetContext",
            },
          ],
          onError: [
            {
              target: "error",
            },
          ],
        },
      },
      error: {},
    },
    on: {
      UNMOUNT: {
        target: ".end",
      },
    },
    schema: {
      events: {} as
        | { type: "LISTEN"; anwser: SimplePeer.SignalData; remoteId: string }
        | { type: "CALL"; remoteId: string }
        | { type: "END_CALL" }
        | { type: "ERROR" }
        | { type: "VIDEO" }
        | { type: "AUDIO" }
        | { type: "UNMOUNT" }
        | { type: "RECEIVER_REJECT"; answer: SimplePeer.SignalData }
        | { type: "RECEIVER_ACCEPT" }
        | { type: "CALLER_ACCEPT"; answer: SimplePeer.SignalData }
        | { type: "CALLER_REJECT" }
        | { type: "CANCEL" },
      context: {} as {
        localId: string;
        remoteId: string;
        audioStatus: boolean;
        videoStatus: boolean;
        answer: SimplePeer.SignalData | null;
      },
      services: {} as {
        handleCall: {
          data: { remoteId: string };
        };
        handleListenAnswer: {
          data: {
            answer: SimplePeer.SignalData;
          };
        };
      },
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./room.machine.typegen").Typegen0,
  },
  // {
  //   actions: {
  //     openConfirmModal: (context, event) => {},

  //     toggleVideo: (context, event) => {},

  //     toggleAudio: (context, event) => {},
  //   },
  //   services: {
  //     init: createMachine({
  //       /* ... */
  //     }),

  //     initListenSocket: createMachine({
  //       /* ... */
  //     }),

  //     endCall: createMachine({
  //       /* ... */
  //     }),

  //     handleReject: createMachine({
  //       /* ... */
  //     }),

  //     destroy: createMachine({
  //       /* ... */
  //     }),
  //   },
  //   guards: {},
  //   delays: {},
  // },
);
