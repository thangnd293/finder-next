import ShieldIcon from "@/assets/icons/shield-icon";
import Button from "@/components/Button";

interface ContainerProps {
  title: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onNext?: () => void;
}

const Container = ({
  title,
  isDisabled,
  isSubmitting,
  children,
  onNext,
}: ContainerProps) => {
  return (
    <div className="mb-1 flex w-full flex-col items-center gap-6 px-1.5">
      <ShieldIcon width={26} height={26} className="mt-6 text-blue-500" />
      <h3 className="text-center text-xl font-semibold">{title}</h3>

      {children}
      {!onNext ? (
        <Button
          className="w-full rounded-full"
          type="submit"
          disabled={isDisabled}
          loading={isSubmitting}
        >
          Báo cáo
        </Button>
      ) : (
        <Button
          className="rounded-full"
          type="button"
          disabled={isDisabled}
          onClick={onNext}
        >
          Tiếp theo
        </Button>
      )}
    </div>
  );
};

export default Container;
