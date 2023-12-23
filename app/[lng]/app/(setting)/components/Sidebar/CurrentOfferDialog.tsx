import Modal from "@/components/Modal";
import { timeMap } from "@/constant/common";
import { Offer } from "@/service/offer";
import Image from "next/image";

interface CurrentOfferDialogProps extends Pick<Offer, 'type' | 'merchandising' > {
  open: boolean;
  expiredDate?: string;
  onClose: () => void;
}

const CurrentOfferDialog = ({
  open,
  type,
  expiredDate,
  merchandising,
  onClose,
}: CurrentOfferDialogProps) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Header withCloseButton onOpenChange={onClose}>
        {type}
      </Modal.Header>
      <Modal.Body className="space-y-2 p-6">
        <p>
          <span className="font-semibold">Hết hạn:</span>{" "}
          <span>{expiredDate?.prettyFullDate()}</span>
        </p>

        <div className="space-y-1">
          <p className="font-semibold ">Đặc quyền:</p>
          <div className="space-y-2.5">
            {merchandising.map((item, index) => (
              <p key={index} className="flex items-center gap-2 ">
                <Image
                  width={30}
                  height={30}
                  src={item.iconUrl}
                  alt={item.text}
                />

                <span>
                  {item.name}{" "}
                  {item.amount &&
                    item.refreshInterval &&
                    item.refreshIntervalUnit && (
                      <>
                        với {item.amount} lượt mỗi{" "}
                        {timeMap[item.refreshIntervalUnit].toLowerCase()}
                      </>
                    )}
                </span>
              </p>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CurrentOfferDialog;
