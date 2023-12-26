"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import Button from "@/components/Button";
import { BASICS } from "@/constant/user-basics";
import { TagType } from "@/service/tag";
import { useCurrentUser } from "@/service/user";
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
  const { data: userBasics } = useCurrentUser({
    select: (user) => {
      const tags = user.tags.reduce(
        (acc, tag) => {
          acc[tag.type] = tag.name;
          return acc;
        },
        {} as Record<TagType, any>,
      );
      return {
        height: user.height ? user.height + "cm" : undefined,
        ...tags,
      };
    },
  });

  return (
    <>
      <AccordionItem value="basic-setting">
        <AccordionTrigger>Thông tin cơ bản</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            {BASICS.map((basic) => {
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
                  {userBasics?.[basic.key] && (
                    <span className="text-muted-foreground">
                      {userBasics?.[basic.key]}
                    </span>
                  )}
                  {!userBasics?.[basic.key] && (
                    <BsPlusLg className="text-muted-foreground" size={20} />
                  )}
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
