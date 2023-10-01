import ButtonBase from "@/components/ButtonBase";
import { DialogContent } from "@/components/Dialog";
import Modal from "@/components/Modal";
import { create } from "zustand";

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

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DialogConfirm({ onConfirm, onCancel }: Props) {
  const open = useConfirmStore((s) => s.open);

  return (
    <Modal open={open} onOpenChange={confirmAction.setOpen}>
      <ButtonBase onClick={onCancel}>Cancel</ButtonBase>
      <ButtonBase onClick={onConfirm}>Confirm</ButtonBase>
    </Modal>
  );
}
