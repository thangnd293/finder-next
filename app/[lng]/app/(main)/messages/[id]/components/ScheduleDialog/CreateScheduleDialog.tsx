import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Combobox from "@/components/Combobox";
import DatePicker from "@/components/DatePicker";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import { Place } from "@/types/map";
import { Controller, useForm } from "react-hook-form";
import { useConversationByID } from "@/service/conversation";
import { useParams } from "next/navigation";
import { useCreateSchedule } from "@/service/schedule/hooks";
import PlaceItem from "./PlaceItem";
import * as yup from "yup";
import useYupValidationResolver from "@/hooks/use-yup-validation-resolver";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRef } from "react";

interface FormValues {
  date: Date;
  hour: string;
  minute: string;
  description: string;
  hidePlace: boolean;
}

const validateForm = yup.object({
  description: yup.string().required("Vui lòng nhập lời nhắn"),
});

interface CreateScheduleDialogProps {
  selectedPlaces: Place[];
  onClose: () => void;
  onCreateDone?: () => void;
}

const CreateScheduleDialog = ({
  selectedPlaces,
  onClose,
  onCreateDone,
}: CreateScheduleDialogProps) => {
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);

  const { data: conversation } = useConversationByID(params?.["id"] as string);
  const createSchedule = useCreateSchedule();
  const formResolver = useYupValidationResolver(validateForm);

  const currentDate = new Date();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      date: currentDate,
      hour: currentDate.getHours().toString(),
      minute: currentDate.getMinutes().toString(),
      description: "",
      hidePlace: false,
    },
    resolver: formResolver,
  });

  const onSubmit = ({
    date,
    hour,
    minute,
    description,
    hidePlace,
  }: FormValues) => {
    if (!conversation) return;

    const dateTime = new Date(date).setHours(Number(hour), Number(minute));
    const appointmentDate = new Date(dateTime).toString();

    const payload = {
      appointmentDate,
      description,
      receiver: conversation.user._id,
      locationDating: selectedPlaces.map((place) => place.place_id),
      isShowLocationDating: hidePlace,
    };

    createSchedule.mutate(payload, {
      onSuccess: onCreateDone,
      onError: console.log,
    });
  };

  const handleClose = () => {
    if (createSchedule.isLoading) return;

    onClose();
  };

  return (
    <Modal onOpenChange={handleClose}>
      <Modal.Header withCloseButton>Tạo lời mời</Modal.Header>

      <Modal.Body className="px-6 py-4">
        <form
          className="space-y-3"
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label>Thời gian</Label>
            <div className="flex gap-2">
              <div className="flex gap-1">
                <Controller
                  name="hour"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Combobox
                      placeholder="Giờ"
                      data={Array.from({ length: 24 }, (_, i) => ({
                        label: `${i < 10 ? `0${i}` : i}`,
                        value: `${i}`,
                      }))}
                      leftIcon={<AiOutlineClockCircle />}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="minute"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Combobox
                      placeholder="Phút"
                      data={Array.from({ length: 60 }, (_, i) => ({
                        label: `${i < 10 ? `0${i}` : i}`,
                        value: `${i}`,
                      }))}
                      leftIcon={<AiOutlineClockCircle />}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <Controller
                name={"date"}
                control={control}
                render={({
                  field: { onChange, value },
                  formState: { errors },
                }) => (
                  <DatePicker
                    className="w-40"
                    placeholder="Chọn ngày hẹn"
                    error={errors.date?.message}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
          <Textarea
            label="Lời nhắn"
            placeholder="Ví dụ: Bồ chỉ cần ngồi sau, cả thế giới để tôi lo :>"
            error={errors.description?.message}
            {...register("description")}
          />
          {selectedPlaces.length > 0 && (
            <>
              <div className="w-full">
                <Label>Địa điểm</Label>
                <div className="w-full space-y-2">
                  {selectedPlaces.map((place) => (
                    <PlaceItem
                      key={place.place_id}
                      className="p-0"
                      {...place}
                    />
                  ))}
                </div>
              </div>
              <Controller
                name="hidePlace"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    label="Ẩn địa điểm với người kia"
                    description="Lưu ý chỉ dùng khi 2 bạn đã đủ thân nếu không khả năng cao bạn sẽ bị từ chối"
                    checked={value}
                    onCheckedChange={onChange}
                  />
                )}
              />
            </>
          )}
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="ghost" onClick={onClose}>
          Huỷ
        </Button>
        <Button
          type="submit"
          loading={createSchedule.isLoading}
          onClick={() => formRef.current?.requestSubmit()}
        >
          Tạo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateScheduleDialog;
