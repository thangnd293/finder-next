"use client";

import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import { FEATURES, PACKS } from "@/constant/config-pack";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GoInfo } from "react-icons/go";

const PackFeature = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);

  const [currentPack, setCurrentPack] = useState<"premium" | "plus">("premium");

  const onPremiumActive = useCallback(() => setCurrentPack("premium"), []);
  const onPlusActive = useCallback(() => setCurrentPack("plus"), []);

  useDetectElementFullVisible(premiumRef, containerRef, onPremiumActive);
  useDetectElementFullVisible(plusRef, containerRef, onPlusActive);

  return (
    <>
      <div
        ref={containerRef}
        className="no-scrollbar flex shrink-0 snap-x snap-mandatory gap-2 overflow-auto"
      >
        <PackCard ref={premiumRef} {...PACKS[0]} />
        <PackCard ref={plusRef} {...PACKS[1]} />
      </div>

      <div className="mt-1 w-full text-sm">
        <FeatureHeader currentPack={currentPack} />
        <div className="h-1" />
        {FEATURES.map((feature) => (
          <FeatureRow
            key={feature.name}
            currentPack={currentPack}
            {...feature}
          />
        ))}
      </div>
    </>
  );
};

export default PackFeature;

const useDetectElementFullVisible = (
  elementRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  onFullVisible: () => void,
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onFullVisible();
      },
      {
        root: containerRef.current,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [onFullVisible]);
};

interface FeatureHeaderProps {
  currentPack: "premium" | "plus";
}
const FeatureHeader = ({ currentPack }: FeatureHeaderProps) => {
  return (
    <div className="flex items-center text-sm font-medium">
      <p className="flex-1">What you get:</p>
      <div className="flex items-center gap-1 text-center">
        <p className={cn("w-20", currentPack !== "premium" && "opacity-50")}>
          Premium
        </p>
        <p className={cn("w-8", currentPack !== "plus" && "opacity-50")}>
          Plus
        </p>
      </div>
    </div>
  );
};

interface PackCardProps {
  name: string;
  price: number;
  description: string;
  background: string;
  backgroundButton: string;
  colorButton: string;
}

const PackCard = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PackCardProps>
>(
  (
    { name, description, price, background, backgroundButton, colorButton },
    ref,
  ) => {
    console.log({
      backgroundButton,
      background,
      colorButton,
    });

    return (
      <div
        className={cn(
          "flex w-full flex-shrink-0 snap-center flex-col items-center gap-1 rounded-2xl bg-gradient-to-r px-3.5 py-2.5 text-center",
          background,
        )}
        ref={ref}
      >
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs">{description}</p>
        <Button
          className={"rounded-full"}
          size="sm"
          style={{
            backgroundColor: backgroundButton,
            color: colorButton,
          }}
        >
          Mở khóa chỉ với {price}$
        </Button>
      </div>
    );
  },
);

PackCard.displayName = "PackCard";

interface FeatureRowProps {
  name: string;
  description?: string;
  premium: boolean;
  plus: boolean;
  currentPack: "premium" | "plus";
}

const FeatureRow = ({
  name,
  description,
  premium,
  plus,
  currentPack,
}: FeatureRowProps) => {
  return (
    <div className="flex items-center border-b border-dashed py-2 text-xs font-medium">
      <p className="flex flex-1 items-center gap-1">
        {name}
        {description && (
          <Tooltip label={description}>
            <span>
              <GoInfo />
            </span>
          </Tooltip>
        )}
      </p>
      <div className="flex items-center gap-1 text-center text-secondary-foreground">
        <p className="w-20">
          <BsCheckLg
            size={20}
            className={cn("mx-auto", {
              "invisible opacity-0": !premium,
              "text-yellow-500 opacity-100": currentPack === "premium",
              "opacity-50": currentPack !== "premium",
            })}
          />
        </p>
        <p className="w-8">
          <BsCheckLg
            size={20}
            className={cn("mx-auto", {
              "invisible opacity-0": !plus,
              "text-green-500 opacity-100": currentPack === "plus",
              "opacity-50": currentPack !== "plus",
            })}
          />
        </p>
      </div>
    </div>
  );
};
