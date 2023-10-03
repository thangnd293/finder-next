import Button from "@/components/Button";
import { Skeleton } from "@/components/Skeleton";
import { cn } from "@/lib/utils";
import { TagType, useTagsByType } from "@/service/tag";
import { getTagIcon } from "@/utils/tag";
import StepSettingLayout from "./StepSettingLayout";
import { useUpdateUserTag } from "@/service/user";

interface SettingFactoryProps {
  title: string;
  type: TagType;
  currentValue: string;
  onNextStep: () => void;
}
const SettingFactory = ({
  title,
  type,
  currentValue,
  onNextStep,
}: SettingFactoryProps) => {
  const { tags, isLoading } = useTagsByType(type);
  const updateUserTag = useUpdateUserTag();

  const handleUpdate = (id: string) => {
    if (id === currentValue) return;

    updateUserTag.mutate({
      tagId: id,
      tagType: type,
    });

    onNextStep();
  };

  const Icon = getTagIcon(type);

  return (
    <StepSettingLayout Icon={Icon} title={title} onSubmit={() => {}}>
      {isLoading &&
        Array.from({
          length: 5,
        }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-full" />
        ))}

      {!isLoading &&
        tags.map((tag) => (
          <Button
            key={tag._id}
            className={cn(
              "w-full rounded-full active:border-primary active:text-primary",
              {
                "border-primary text-primary": currentValue === tag._id,
              },
            )}
            variant="social"
            type="button"
            onClick={() => handleUpdate(tag._id)}
          >
            {tag.name}
          </Button>
        ))}
      <Button
        className="w-full rounded-full"
        variant="social"
        type="button"
        onClick={onNextStep}
      >
        Bỏ qua
      </Button>
    </StepSettingLayout>
  );
};

export default SettingFactory;
