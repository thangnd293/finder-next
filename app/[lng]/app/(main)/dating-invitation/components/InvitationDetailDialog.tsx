import Avatar from "@/components/Avatar";
import DatingLocation from "@/components/DatingLocation";
import ErrorView from "@/components/ErrorView";
import Modal from "@/components/Modal";
import { Skeleton } from "@/components/Skeleton";
import { useScheduleDetail } from "@/service/schedule";
import { useCurrentUser } from "@/service/user";

interface InvitationDetailDialogProps {
  selectedScheduleID: string;
  close: () => void;
}
const InvitationDetailDialog = ({
  selectedScheduleID,
  close,
}: InvitationDetailDialogProps) => {
  const {
    data: selectedSchedule,
    isLoading,
    isError,
  } = useScheduleDetail(selectedScheduleID);
  const { data: currentUserID } = useCurrentUser({
    select: (user) => user._id,
  });

  return (
    <Modal size="lg" open={!!selectedScheduleID} onOpenChange={close}>
      {isLoading && (
        <>
          <Modal.Header withCloseButton>
            <Skeleton className="mx-auto h-5 w-32 rounded-sm text-sm" />
          </Modal.Header>
          <Modal.Body className="space-y-5 p-4 md:p-6">
            <div className="flex justify-between gap-4 overflow-hidden">
              <div className="flex flex-1 items-center gap-2">
                <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-1/2 rounded-sm text-sm" />
                  <Skeleton className="h-4 w-full rounded-sm text-sm" />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-1/2 rounded-sm text-sm" />
                  <Skeleton className="h-4 w-full rounded-sm text-sm" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
            <DatingLocation.Skeleton />
          </Modal.Body>
        </>
      )}
      {isError && <ErrorView />}
      {!isLoading && selectedSchedule && (
        <>
          <Modal.Header withCloseButton>Chi tiết lời mời</Modal.Header>

          <Modal.Body>
            <div className="w-full space-y-5 divide-y p-4 md:p-6">
              <div className="flex justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Avatar
                    size="lg"
                    src={selectedSchedule.sender.images?.[0]?.url}
                  />
                  <div>
                    <p className="text-sm text-secondary-foreground">
                      Người gửi
                    </p>
                    <p>
                      {selectedSchedule.sender._id === currentUserID
                        ? "Bạn"
                        : selectedSchedule.sender.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar
                    size="lg"
                    src={selectedSchedule.receiver.images?.[0]?.url}
                  />
                  <div>
                    <p className="text-sm text-secondary-foreground">
                      Người nhận
                    </p>
                    <p>
                      {selectedSchedule.receiver._id === currentUserID
                        ? "Bạn"
                        : selectedSchedule.receiver.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-5">
                <p className="font-semibold">Thời gian</p>
                <div className="flex divide-x">
                  <p className="pr-3">
                    {selectedSchedule.appointmentDate.prettyFullDate()}
                  </p>
                  <p className="pl-3">Hồ Chí Minh</p>
                </div>
              </div>

              <div className="pt-5">
                <p className="font-semibold">Địa điểm</p>
                <div className="mt-1 space-y-4">
                  {selectedSchedule.locationDating?.map((location) => (
                    <DatingLocation key={location.place_id} {...location} />
                  ))}
                </div>
              </div>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default InvitationDetailDialog;
