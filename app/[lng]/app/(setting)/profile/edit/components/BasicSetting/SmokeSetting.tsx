import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const SmokeSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Bạn có hút thuốc không?"
      type={TagType.SMOKE_QUESTION}
      {...props}
    />
  );
};

export default SmokeSetting;
