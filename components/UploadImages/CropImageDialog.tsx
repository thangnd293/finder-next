import { useEffect, useId, useState } from "react";

import ActionIcon from "@/components/ActionIcon";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Slider from "@/components/Slider";
import { cn } from "@/lib/utils";
import { MdRotate90DegreesCcw } from "react-icons/md";
import { BOX_HEIGHT, BOX_WIDTH, CropImage } from "./crop-image";
import { useEventListener } from "./use-event-listener";

interface CropImageDialogProps {
  isVisible: boolean;
  file?: File;
  onCropDone: (file: File) => void;
  closeModal: () => void;
}

const CropImageDialog = ({
  isVisible,
  file,
  onCropDone,
  closeModal,
}: CropImageDialogProps) => {
  const cropImageId = `crop-image-${useId()}`;

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoomDefault, setZoomDefault] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [cropImage, setCropImage] = useState<CropImage>();

  useEffect(() => {
    if (!file || !cropImageId) return;
    setCropImage(new CropImage(cropImageId, file));
  }, [file, cropImageId]);

  useEffect(() => {
    if (!cropImage?.zoomDefault) return;
    setZoomDefault(cropImage?.zoomDefault);
  }, [cropImage]);

  useEventListener(cropImage?.id, "zoom", (event) => {
    const { detail } = event;
    const zoom = detail.zoom;
    setZoom(zoom);
  });

  useEventListener(cropImage?.id, "translate", (event) => {
    const { detail } = event;
    const translate = detail.translate;
    setTranslate(translate);
  });

  useEventListener(cropImage?.id, "rotate", (event) => {
    const { detail } = event;
    const rotate = detail.rotate;
    setRotate(rotate);
  });

  useEventListener(cropImage?.id, "zoomDefault", (event) => {
    const { detail } = event;
    const zoomDefault = detail.zoomDefault;
    setZoomDefault(zoomDefault);
  });

  useEventListener(cropImage?.id, "result", (event) => {
    const { detail } = event;
    const result = detail.result;

    onCropDone(result);
    closeModal();
  });

  return (
    <Modal
      className="p-6"
      title="Chỉnh sửa ảnh"
      open={isVisible}
      size="auto"
      closeOnClickOutside={false}
      onOpenChange={closeModal}
    >
      <div className="relative select-none space-y-1.5 overflow-hidden">
        <div
          id="crop-image-complete"
          style={{ height: BOX_HEIGHT + "px", width: BOX_WIDTH + "px" }}
          className="mx-14 my-7 flex cursor-pointer items-center justify-center"
          onMouseDown={cropImage?.onMove}
        >
          {file && cropImage?.image?.src && (
            <div
              className="absolute"
              style={{
                height: cropImage?.image?.height + "px",
                width: cropImage?.image?.width + "px",
                backgroundImage: `url(${cropImage?.image?.src})`,
                backgroundRepeat: "no-repeat",
                transform: `scale(${zoom * zoomDefault}) translate(${
                  translate.x
                }px, ${translate.y}px) rotate(${rotate}deg)`,
              }}
            />
          )}
          <div className="absolute inset-0 border border-x-[56px]  border-y-[28px] border-white/20 after:absolute after:inset-0 after:border" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-1 py-0.5">
        <Slider
          defaultValue={[1]}
          min={1}
          max={5}
          step={0.1}
          onValueChange={cropImage?.onZoom}
          className={cn("w-full")}
        />

        <ActionIcon
          className="rounded-full"
          size="lg"
          onClick={cropImage?.onRotate}
        >
          <MdRotate90DegreesCcw size={18} />
        </ActionIcon>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={closeModal}>
          Hủy
        </Button>
        <Button onClick={cropImage?.saveImage}>Chọn</Button>
      </div>
    </Modal>
  );
};

export default CropImageDialog;
