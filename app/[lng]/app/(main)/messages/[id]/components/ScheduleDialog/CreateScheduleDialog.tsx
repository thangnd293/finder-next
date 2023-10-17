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

interface FormValues {
  date: Date;
  hour: string;
  minute: string;
  description: string;
  hidePlace: boolean;
}

interface CreateScheduleDialogProps {
  selectedPlaces: Place[];
  onClose: () => void;
}

const CreateScheduleDialog = ({
  selectedPlaces,
  onClose,
}: CreateScheduleDialogProps) => {
  const params = useParams();

  const { conversation } = useConversationByID(params?.["id"] as string);
  const createSchedule = useCreateSchedule();

  const currentDate = new Date();
  const { handleSubmit, control, register } = useForm<FormValues>({
    defaultValues: {
      date: currentDate,
      hour: currentDate.getHours().toString(),
      minute: currentDate.getMinutes().toString(),
      description: "",
      hidePlace: false,
    },
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
      onSuccess: console.log,
      onError: console.log,
    });
  };

  return (
    <Modal className="!overflow-hidden" onOpenChange={onClose}>
      <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-lg font-semibold">Tạo lời mời</h2>

        <div>
          <Label>Thời gian</Label>
          <div className="flex gap-2">
            <Controller
              name={"date"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  className="w-40"
                  placeholder="Chọn ngày hẹn"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

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
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <Textarea
          label="Lời nhắn"
          placeholder="Ví dụ: Bồ chỉ cần ngồi sau, cả thế giới để tôi lo :>"
          {...register("description")}
        />

        {selectedPlaces.length > 0 && (
          <>
            <div className="w-full">
              <Label>Địa điểm</Label>
              <div className="w-full space-y-2">
                {selectedPlaces.map((place) => (
                  <PlaceItem key={place.place_id} className="p-0" {...place} />
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

        <Modal.Footer>
          <Button variant="ghost" onClick={onClose}>
            Huỷ
          </Button>
          <Button type="submit" loading={createSchedule.isLoading}>
            Tạo
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateScheduleDialog;
