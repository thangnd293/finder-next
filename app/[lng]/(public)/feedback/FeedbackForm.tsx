"use client";

import Button from "@/components/Button";
import { useState } from "react";
import PartnerFeedbackForm from "./PartnerFeedbackForm";
import { useFeedbackSchedule, useVerifyFormToken } from "@/service/schedule";
import ThankForFeedback from "./ThankForFeedback";

const FeedbackForm = () => {
  const [isJoined, setIsJoined] = useState(false);
  const { data } = useVerifyFormToken();
  const sendFeedback = useFeedbackSchedule();

  if (!data) return null;

  const { schedule, currentUser } = data.data;

  const partner =
    currentUser._id === schedule.sender._id
      ? schedule.receiver
      : schedule.sender;

  const onNotJoin = () => {
    if (!data.token) return;

    sendFeedback.mutate({
      token: data.token,
      isJoin: false,
    });
  };

  const onJoin = () => {
    if (sendFeedback.isLoading) return;

    setIsJoined(true);
  };

  if (sendFeedback.isSuccess) return <ThankForFeedback />;
  
  return (
    <>
      {isJoined ? (
        <PartnerFeedbackForm />
      ) : (
        <>
          <div className="overflow-hidden rounded-md border bg-background">
            <div className="h-2.5 bg-primary" />
            <div className="divide-y p-4">
              <h1 className="pb-3 text-2xl font-bold">
                Buổi hẹn của bạn thế nào
              </h1>
              <div>
                <p className="pt-3">
                  Chào <span className="font-semibold">{currentUser.name}</span>
                  , chúng tôi rất vui khi bạn đã có một buổi hẹn với{" "}
                  <span className="font-semibold">{partner.name}</span> vào lúc{" "}
                  <span className="font-semibold">
                    {schedule.appointmentDate.prettyFullDate()}
                  </span>
                  . Chúng tôi rất mong nhận được phản hồi của bạn về buổi hẹn
                  này.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border bg-background">
            <h3 className="bg-primary p-3 text-white">
              Bạn có tham gia buổi hẹn này không?
            </h3>
            <div className="flex items-center justify-end gap-2 p-3">
              <Button
                size="sm"
                variant="ghost"
                loading={sendFeedback.isLoading}
                onClick={onNotJoin}
              >
                Không
              </Button>
              <Button size="sm" onClick={onJoin}>
                Có
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeedbackForm;
