"use client";

import ActionIcon from "@/components/ActionIcon";
import Progress from "@/components/Progress";
import { useCurrentUser } from "@/service/user";
import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import UpdateInfo from "./UpdateInfo";
import UpdateLookingFor from "./UpdateLookingFor";
import UploadPhoto from "./UploadPhoto";
import Welcome from "./Welcome";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";

export default function GetStarted() {
  const { data: stepStarted } = useCurrentUser({
    select: (user) => user.stepStarted,
  });

  const [step, setStep] = useState(stepStarted || 0);
  const [steps] = useState([
    Welcome,
    UploadPhoto,
    UpdateInfo,
    UpdateLookingFor,
  ]);

  const isLastStep = step === steps.length - 1;

  const CurrentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      redirect("/app");
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="container flex min-h-screen w-full flex-col items-center gap-3">
      <header className="flex h-20 items-center justify-center text-4xl text-primary">
        <Logo />
      </header>
      <Progress
        className="mx-auto h-1 w-36"
        value={(step / steps.length) * 100}
      />
      <div className="h-9 w-full">
        {step > 0 && (
          <ActionIcon variant="ghost" size="lg" onClick={handleBack}>
            <BsChevronLeft size={20} />
          </ActionIcon>
        )}
      </div>

      <CurrentStep
        currentStep={step}
        isLastStep={isLastStep}
        onNext={handleNext}
      />
    </div>
  );
}
