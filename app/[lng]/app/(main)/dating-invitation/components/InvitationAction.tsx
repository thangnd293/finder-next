import Button from "@/components/Button";
import { Schedule, useActionSchedule } from "@/service/schedule";
import { useCurrentUserID } from "@/service/user";
import dayjs from "dayjs";

type InvitationActionProps = Pick<
  Schedule,
  "_id" | "appointmentDate" | "status" | "sender"
> & {
  onDoneAction?: () => void;
};
const InvitationAction = ({
  _id,
  appointmentDate,
  status,
  sender,
  onDoneAction,
}: InvitationActionProps) => {
  const { currentUserID } = useCurrentUserID();
  const declineSchedule = useActionSchedule("decline");
  const acceptSchedule = useActionSchedule("accept");
  const cancelSchedule = useActionSchedule("cancel");

  const countDown = dayjs(appointmentDate).diff(dayjs(), "minute");
  const isSelf = currentUserID === sender._id;

  const isProcessing =
    declineSchedule.isLoading ||
    acceptSchedule.isLoading ||
    cancelSchedule.isLoading;

  const postAction = {
    onSettled: () => {
      console.log("onSettled");
      onDoneAction?.();
    },
  };

  const onDecline = () => {
    if (isProcessing) return;
    declineSchedule.mutate(_id, postAction);
  };
  const onAccept = () => {
    if (isProcessing) return;
    acceptSchedule.mutate(_id, postAction);
  };
  const onCancel = () => {
    if (isProcessing) return;
    cancelSchedule.mutate(_id, postAction);
  };

  if (
    isSelf &&
    (status === "Accept" || status === "Wait for approval") &&
    countDown > 0
  )
    return (
      <>
        <Button size="sm" loading={cancelSchedule.isLoading} onClick={onCancel}>
          Hủy
        </Button>
      </>
    );

  if (status !== "Cancel" && status !== "Decline" && countDown > 0)
    return (
      <>
        {status === "Wait for approval" ?
          <>
            <Button
              loading={declineSchedule.isLoading}
              variant="ghost"
              size="sm"
              onClick={onDecline}
            >
              Từ chối
            </Button>
            <Button
              loading={acceptSchedule.isLoading}
              size="sm"
              onClick={onAccept}
            >
              Chấp nhận
            </Button>
          </>
        : <Button loading={cancelSchedule.isLoading} onClick={onCancel}>
            Hủy
          </Button>
        }
      </>
    );

  return null;
};

export default InvitationAction;
