"use client";
import SiteInformationIcon from "@/assets/icons/site-information-icon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import React from "react";

interface RequestPermissionDialogProps
  extends Omit<React.ComponentProps<typeof Modal>, "children"> {}
const RequestPermissionDialog = (props: RequestPermissionDialogProps) => {
  return (
    <Modal className="p-6 text-center" size="lg" {...props}>
      <SiteInformationIcon className="w-full" />
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">
          Chúng tôi cần quyền truy cập vào vị trí của bạn
        </h2>
        <p className="font-medium">
          Để cấp quyền, hãy làm theo hướng dẫn: 🔒 trên trình duyệt của bạn &gt;
          Location &gt; Allow
        </p>
        <div className="mx-auto w-fit">
          <Button onClick={() => props.onOpenChange?.(false)}>Đã hiểu</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RequestPermissionDialog;
