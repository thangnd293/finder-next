import Modal from "@/components/Modal";
import { timeMap } from "@/constant/common";
import { Offer } from "@/service/offer";
import Image from "next/image";
import { useState } from "react";

interface CurrentOfferProps extends Offer {}
const CurrentOffer = ({ iconUrl, type, merchandising }: CurrentOfferProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="relative flex w-full cursor-pointer items-center space-y-1 rounded-full py-2 text-center hover:bg-background-50 md:px-8"
        onClick={() => setOpen(true)}
      >
        <Image width={30} height={30} src={iconUrl} alt={type} />

        <div className="absolute left-1/2 hidden -translate-x-1/2 pb-1 md:block">
          <p className="font-semibold">{type}</p>
          <p className="text-sm text-muted-foreground">Quản lý gói của bạn</p>
        </div>
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header withCloseButton onOpenChange={setOpen}>
          {type}
        </Modal.Header>
        <Modal.Body className="space-y-2 p-6">
          <p>
            <span className="font-semibold">Hết hạn:</span>{" "}
            <span>30/10/2021</span>
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
    </>
  );
};

export default CurrentOffer;
