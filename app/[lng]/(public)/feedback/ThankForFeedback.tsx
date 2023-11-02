import ThanksIcon from "@/assets/icons/thanks-icon";

const ThankForFeedback = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <ThanksIcon className="w-60 md:w-96" />
      <p className="text-center text-xl font-semibold text-primary md:text-3xl">
        Cảm ơn bạn đã phản hồi, chúc bạn một ngày tốt lành
      </p>
    </div>
  );
};

export default ThankForFeedback;
