import { WelcomeIcon } from "@/assets/icons";
import Button from "@/components/Button";

interface WelcomeProps {
  isLastStep?: boolean;
  onNext: () => void;
}

export default function Welcome({ isLastStep, onNext }: WelcomeProps) {
  return (
    <div className="flex max-w-md flex-col items-center gap-4 text-center">
      <WelcomeIcon height={120} />

      <h3 className="text-center text-2xl font-bold">
        Chào mừng bạn đến với <span className="text-primary">finder</span>
      </h3>
      <p>
        Cùng chúng tôi thiết lập hồ sơ của bạn để bắt đầu tìm kiếm một nửa của
        bạn
      </p>

      <Button onClick={onNext}>{isLastStep ? "Hoàn tất" : "Tiếp tục"}</Button>
    </div>
  );
}
