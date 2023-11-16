"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import Button from "@/components/Button";
import { TagType } from "@/service/tag";
import { BasicSettingStep, getTagIcon } from "@/utils/tag";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { BasicSettingDialog } from "./BasicSettingDialog";
import GenderSetting from "./GenderSetting";
import HometownSetting from "./HometownSetting";
import LiveAtSetting from "./LiveAtSetting";
import LookingForSetting from "./LookingForSetting";

const BasicSetting = () => {
  const [step, setStep] = useState<BasicSettingStep | null>(null);

  return (
    <>
      <AccordionItem value="basic-setting">
        <AccordionTrigger>Thông tin cơ bản</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            {basics.map((basic) => {
              const Icon = getTagIcon(basic.key);
              return (
                <Button
                  key={basic.key}
                  className="justify-between rounded-full bg-background"
                  variant="social"
                  onClick={() => setStep(basic.key)}
                >
                  <span className="flex items-center gap-4">
                    <Icon className="text-muted-foreground" /> {basic.label}
                  </span>
                  <BsPlusLg className="text-muted-foreground" size={20} />
                </Button>
              );
            })}
            <GenderSetting />
            <LookingForSetting />
            <LiveAtSetting />
            <HometownSetting />
          </div>
        </AccordionContent>
      </AccordionItem>

      <BasicSettingDialog step={step} onClose={() => setStep(null)} />
    </>
  );
};

export default BasicSetting;

const basics: {
  label: string;
  key: BasicSettingStep;
}[] = [
  {
    label: "Chiều cao",
    key: "height",
  },
  {
    label: "Luyện tập",
    key: TagType.DO_EXERCISE,
  },
  {
    label: "Giáo dục",
    key: TagType.EDUCATION,
  },
  {
    label: "Uống rượu",
    key: TagType.DRINK,
  },
  {
    label: "Hút thuốc",
    key: TagType.SMOKE_QUESTION,
  },
  {
    label: "Chế độ ăn",
    key: TagType.DIETARY_PREFERENCE,
  },
  {
    label: "Trẻ em",
    key: TagType.KIDS,
  },
  {
    label: "Cung hoàng đạo",
    key: TagType.ZODIAC,
  },
  {
    label: "Ngôn ngữ tình yêu",
    key: TagType.LOVE_QUESTION,
  },
  {
    label: "Kiểu tính cách",
    key: TagType.PERSONALITY_TYPE,
  },
  {
    label: "Thú cưng",
    key: TagType.PETS,
  },
  {
    label: "Tôn giáo",
    key: TagType.RELIGION,
  },
];
