import { HeartIcon } from "@radix-ui/react-icons";
import { BsFlag } from "react-icons/bs";
import { User } from "@/service/user";
import Container from "./Container";
import { FormValues, StepProps } from ".";
import { useFormContext } from "react-hook-form";

interface AlertProps extends StepProps {}

const Alert = ({ onNext }: AlertProps) => {
  const { watch } = useFormContext<FormValues>();

  const target = watch("target") as User;

  return (
    <Container title={`Báo cáo ${target.name}`} onNext={onNext}>
      <div className="flex items-start gap-4">
        <HeartIcon
          width={18}
          height={18}
          color="black"
          className="mt-1 shrink-0"
        />
        <p>
          Chúng tôi quan tâm tới bạn và những điều bạn muốn nói. Vì sự an toàn
          của bạn, những điều bạn chia sẻ với chúng tôi ở đây sẽ được bảo mật.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <BsFlag
          width={18}
          height={18}
          color="black"
          className="mt-1 shrink-0"
        />
        <p>
          Nếu bạn đang gặp nguy hiểm, hãy gọi ngay cho nhà chức trách địa
          phương.
        </p>
      </div>
    </Container>
  );
};

export default Alert;
