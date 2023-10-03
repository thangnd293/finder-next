import React from "react";
import { IconType } from "react-icons/lib";

interface StepSettingLayoutProps {
  Icon: IconType;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

const StepSettingLayout = ({
  Icon,
  title,
  children,
  onSubmit,
}: StepSettingLayoutProps) => {
  return (
    <form className="mb-6 space-y-3" onSubmit={onSubmit}>
      <div className="space-y-2 pb-5 pt-8 text-center text-lg font-medium">
        <Icon className="mx-auto text-primary" size={30} />
        <h1>{title}</h1>
      </div>
      {children}
    </form>
  );
};

export default StepSettingLayout;
