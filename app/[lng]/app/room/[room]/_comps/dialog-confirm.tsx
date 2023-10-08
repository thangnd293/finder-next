import ButtonBase from "@/components/ButtonBase";
import { DialogContent } from "@/components/Dialog";
import Modal from "@/components/Modal";
import { create } from "zustand";
import { useRoomListener } from "../_machine/useRoom";
import { Avatar } from "@radix-ui/react-avatar";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

type State = {
  open: boolean;
};

type Action = {
  setOpen: (open: boolean) => void;
};

const useConfirmStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

const { setOpen } = useConfirmStore.getState();
export const confirmAction = {
  setOpen,
};

export default function DialogConfirm() {
  const open = useConfirmStore((s) => s.open);
  const { handleAccept, handleReject } = useRoomListener();

  return (
    <>
      <audio loop id="audio" src="/audio/ring.mp3" />
      <Modal
        size={"sm"}
        open={open}
        onOpenChange={() => {}}
        withCloseButton={false}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Avatar
              className="block h-12 w-12 flex-shrink-0 rounded-full"
              // fallback={user.name}
              // src={user.images[0]?.url}
            />
            <p className="text-center text-xl">
              Phạm Minh Phát đang gọi cho bạn
            </p>
            <p className="text-center text-sm font-medium">
              Cuộc gọi sẽ bắt đầu ngay khi bạn bấm <br /> chấp nhận
            </p>
          </div>

          <div className="flex justify-evenly">
            <button
              onClick={handleReject}
              className="flex flex-col items-center gap-2"
            >
              <div className="grid h-5 w-5 place-content-center rounded-full bg-gray-500 p-6">
                <MdClose size={28} />
              </div>
              <p className="text-sm font-medium">Từ chối</p>
            </button>
            <button
              onClick={handleAccept}
              className="flex flex-col items-center gap-2"
            >
              <div className="grid h-5 w-5 place-content-center rounded-full bg-green-500 p-6">
                <HiMiniVideoCamera size={28} />
              </div>
              <p className="text-sm font-medium">Chấp nhận</p>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
