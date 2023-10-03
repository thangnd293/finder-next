import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const ExerciseSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Bạn có tập thể dục không?"
      type={TagType.DO_EXERCISE}
      {...props}
    />
  );
};

export default ExerciseSetting;
