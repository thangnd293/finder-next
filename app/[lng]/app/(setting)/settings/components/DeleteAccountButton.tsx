"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useDeleteAccount } from "@/service/user";
import { eraseCookie } from "@/utils/cookie";
import { signOut } from "next-auth/react";

const DeleteAccountButton = () => {
  const { isOpen, open, close } = useDisclosure();

  const deleteAccount = useDeleteAccount();

  const handleLogout = () => {
    signOut();
    eraseCookie("accessToken");
  };

  const onDeleteAccount = () => {
    deleteAccount.mutate(undefined, {
      onSuccess: handleLogout,
    });
  };

  return (
    <>
      <Button className="w-full rounded-full" variant="social" onClick={open}>
        Xóa tài khoản
      </Button>

      <Modal
        size="sm"
        open={isOpen || deleteAccount.isLoading}
        onOpenChange={close}
      >
        <Modal.Header>Xóa tài khoản</Modal.Header>

        <Modal.Body>
          <p className="p-6 text-center">
            Việc xóa hồ sơ của bạn để tạo tài khoản mới có thể ảnh hưởng đến
            những người bạn nhìn thấy trên nền tảng và chúng tôi muốn bạn có
            trải nghiệm tốt nhất có thể.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={close}>
            Hủy
          </Button>
          <Button loading={deleteAccount.isLoading} onClick={onDeleteAccount}>
            Xóa tài khoản
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccountButton;
