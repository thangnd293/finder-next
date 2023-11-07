"use client";

import { cn } from "@/lib/utils";
import { Feature, Offer } from "@/service/offer";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import PackCard from "./PackCard";
import PacketDialog from "@/components/PackageDialog";

interface PackageFeatureProps {
  featureGroup: Feature[];
  results: Offer[];
}
const PackageFeature = ({ featureGroup, results }: PackageFeatureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const [activePackage, setActivePackage] = useState<Offer>(results[0]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const packages = useMemo(
    () => results.filter((offer) => !offer.isRetail),
    [results],
  );

  const featureTableData = useMemo(
    () =>
      packages.map((pack) => ({
        package: pack,
        features: featureGroup.map((feature) =>
          pack.merchandising.find((item) => item.name === feature.name),
        ),
      })),
    [packages, featureGroup],
  );

  useEffect(() => {
    const unObserves = packages.map((pack, index) => {
      const ref = refs.current[index];
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActivePackage(pack);
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
    });

    return () => {
      unObserves.forEach((unObserve) => unObserve?.());
    };
  }, [packages]);

  return (
    <>
      <div
        ref={containerRef}
        className="no-scrollbar flex w-full shrink-0 snap-x snap-mandatory gap-2 overflow-auto"
      >
        {packages.map((pack, index) => {
          const ref = React.createRef<HTMLDivElement>();
          refs.current[index] = ref;
          return (
            <PackCard
              key={index}
              ref={ref}
              {...pack}
              onClick={() => setIsOpenDetail(true)}
            />
          );
        })}
      </div>
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <h3 className="flex h-9 w-full items-center font-medium">
            Bạn sẽ có:
          </h3>
          {featureGroup.map((feature) => (
            <p
              key={feature.name}
              className="flex h-9 items-center border-b border-dashed text-sm font-medium"
            >
              {feature.name}
            </p>
          ))}
        </div>
        {featureTableData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="flex h-9 w-full items-center justify-center px-2 font-medium">
              {item.package.type}
            </h3>
            {item.features.map((feature, index) => (
              <p
                key={index}
                className="flex h-9 items-center justify-center border-b border-dashed text-sm font-medium"
              >
                <BsCheckLg
                  className={cn("mx-auto", {
                    "invisible opacity-0": !feature,
                    "opacity-50": activePackage._id !== item.package._id,

                    // "text-green-500 opacity-100": currentPack === "plus",
                  })}
                  size={20}
                  style={{
                    color:
                      activePackage._id === item.package._id
                        ? item.package.style.primaryColor
                        : undefined,
                  }}
                />
              </p>
            ))}
          </div>
        ))}
      </div>
      {isOpenDetail && (
        <PacketDialog
          {...activePackage}
          onClose={() => setIsOpenDetail(false)}
        />
      )}
    </>
  );
};

export default PackageFeature;
