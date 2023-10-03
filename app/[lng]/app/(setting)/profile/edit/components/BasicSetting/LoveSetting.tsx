import { TagType } from "@/service/tag";
import { StepSettingProps } from "./BasicSettingDialog";
import SettingFactory from "./SettingFactory";

const LoveSetting = (props: StepSettingProps) => {
  return (
    <SettingFactory
      title="Khi yêu, bạn thích nhận được điều gì?"
      type={TagType.LOVE_QUESTION}
      {...props}
    />
  );
};

export default LoveSetting;
