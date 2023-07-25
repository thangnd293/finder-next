import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { libreBaskerville } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import { ITranslation } from "@/type";
import ScrollingText from "./scrolling-text";

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

      <div className="lg:2/3 ml-auto flex gap-6 pt-16 xl:w-1/2">
        <div className="flex">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Avatar key={index} className="h-11 w-11 [&~&]:-ml-4">
              <AvatarImage
                src={`/images/user_${index + 1}.png`}
                alt={`User ${index + 1}`}
              />
              <AvatarFallback>U{index + 1}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <p className="text-xl">
          {t("describeFirst")}
          <span className="text-primary">&nbsp;Finder&nbsp;</span>
          {t("describeLast")}
        </p>
      </div>
    </section>
  );
}
