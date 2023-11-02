import ThanksIcon from "@/assets/icons/thanks-icon";

const ThankForFeedback = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <ThanksIcon width={420} />
      <p className="text-center text-3xl font-semibold text-primary">
        Cảm ơn bạn đã phản hồi, chúc bạn một ngày tốt lành
      </p>
    </div>
  );
};

export default ThankForFeedback;
