import { libreBaskerville } from "@/assets/fonts";

import { cn } from "@/lib/utils";
import ScrollingText from "./scrolling-text";
import SignUp from "../sign-up";
import Avatar from "@/components/avatar";
import { ITranslation } from "@/types/common";

interface IHeroProps extends ITranslation {}
export default function Hero({ t }: IHeroProps) {
  return (
    <section
      id="#hero"
      className={cn(
        "max-xl::py-72 container max-w-xs py-32 max-xl:max-w-6xl sm:max-w-md sm:py-52 md:max-w-xl lg:max-w-2xl lg:py-60 xl:max-w-5xl",
      )}
    >
      <div
        className={cn(
          libreBaskerville.className,
          "text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
        )}
      >
        <p>{t("findRealLove")},</p>
        <ScrollingText displayText={t("joinFinder")} />
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-4xl px-11 py-10 md:col-span-2 md:flex-row lg:col-span-3">
        <div className="space-y-2 sm:space-y-1 md:max-w-[66%]">
          <div className="flex">
            {Array.from({
              length: 10,
            }).map((_, index) => (
              <Avatar
                key={index}
                className="h-11 w-11 [&~&]:-ml-4"
                src={`/images/user_${index + 1}.png`}
                alt={`User ${index + 1}`}
                fallback={`U${index + 1}`}
              />
            ))}
          </div>

          <p className="text-xl">
            {t("describeFirst")}
            <span className="text-primary">&nbsp;Finder&nbsp;</span>
            {t("describeLast")}
          </p>
        </div>
        <SignUp className="flex-shrink-0" variant="default" />
      </div>
    </section>
  );
}
