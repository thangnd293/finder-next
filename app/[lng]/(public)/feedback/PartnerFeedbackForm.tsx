import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Option } from "@/components/RadioGroup";
import {
  DatingStatus,
  FeedbackSchedulePayload,
  useFeedbackSchedule,
  useVerifyFormToken,
} from "@/service/schedule";
import ThankForFeedback from "./ThankForFeedback";

interface FormValues {
  feedback: string;
  partnerFeedback: string;
  isContinue: DatingStatus | "";
  comment: string;
}

const PartnerFeedbackForm = () => {
  const { handleSubmit, register, control } = useForm<FormValues>({
    defaultValues: {
      feedback: "",
      partnerFeedback: "",
      isContinue: "",
      comment: "",
    },
  });
  const { data } = useVerifyFormToken();
  const sendFeedback = useFeedbackSchedule();

  if (!data) return null;

  const onSubmit = (values: FormValues) => {
    if (!data.token || !values.isContinue) return;

    const detail = questions
      .filter((question) => !question.options)
      .map((question) => ({
        question: question.question,
        answer: values[question.key],
      }));

    const payload: FeedbackSchedulePayload = {
      token: data.token,
      isJoin: true,
      datingStatus: values.isContinue,
      detail,
    };

    sendFeedback.mutate(payload);
  };

  if (sendFeedback.isSuccess) return <ThankForFeedback />;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {questions.map((question) =>
        question.options ? (
          <div
            key={question.key}
            className="overflow-hidden rounded-md border bg-background"
          >
            <h3 className="bg-primary p-3 text-sm text-white md:text-base">
              {question.question} {question.isRequired && <span>*</span>}
            </h3>
            <div className="p-3">
              <Controller
                control={control}
                name={question.key}
                rules={
                  question.isRequired
                    ? {
                        required: "Bạn chưa chọn câu trả lời",
                      }
                    : undefined
                }
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="space-y-2">
                    <RadioGroup value={value} onValueChange={onChange}>
                      {question.options?.map((option) => (
                        <RadioGroupItem key={option.value} {...option} />
                      ))}
                    </RadioGroup>
                    {error?.message && (
                      <p className="text-sm text-red-500">{error.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        ) : (
          <div
            key={question.key}
            className="overflow-hidden rounded-md border bg-background"
          >
            <h3 className="bg-primary p-3 text-sm text-white md:text-base">
              {question.question}
            </h3>
            <Textarea
              className="!border-none p-3 !outline-none !ring-0"
              placeholder="Câu trả lời của bạn"
              {...register(question.key)}
            />
          </div>
        ),
      )}

      <Button
        className="ml-auto flex w-fit"
        type="submit"
        loading={sendFeedback.isLoading}
      >
        Gửi
      </Button>
    </form>
  );
};

export default PartnerFeedbackForm;

const questions: {
  key: keyof FormValues;
  question: string;
  options?: Option[];
  isRequired?: boolean;
}[] = [
  {
    key: "feedback",
    question:
      "Hãy cho chúng tôi biết về buổi hẹn của bạn. Bạn đã có một trải nghiệm thế nào?",
  },
  {
    key: "partnerFeedback",
    question: "Chia sẻ với chúng tôi về đối tác của bạn",
  },
  {
    key: "isContinue",
    question: "Bạn có muốn tiến tới với đối tác này không?",
    options: [
      {
        value: DatingStatus.YES,
        label: "Có, tôi muốn tiến tới",
      },
      {
        value: DatingStatus.HALFWAY,
        label: "Chưa chắc chắn",
      },
      {
        value: DatingStatus.NO,
        label: "Không, tôi không muốn tiến tới",
      },
    ],
    isRequired: true,
  },
  {
    key: "comment",
    question: "Bạn có lời khuyên hoặc góp ý cụ thể nào cho chúng tôi không?",
  },
];
