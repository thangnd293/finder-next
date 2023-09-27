"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";

import Button from "@/components/Button";
import Separator from "@/components/Separator";
import Tooltip from "@/components/Tooltip";
import { languages } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";

const LanguageSelect = () => {
  const router = useRouter();
  const param = useParams();
  const pathname = usePathname();
  const pathnameWithoutLng = pathname?.split("/").slice(2).join("/");

  const onChangeLanguage = (lng: string) => {
    router.push(`/${lng}/${pathnameWithoutLng}`);
  };
  return (
    <div className="flex h-5 items-center text-sm">
      {languages.map((lang) => (
        <Fragment key={lang.code}>
          <Tooltip label={lang.name}>
            <Button
              className={cn(
                "h-fit rounded-none !bg-transparent px-0 text-muted-foreground",
                {
                  "text-foreground": param?.lng === lang.code,
                },
              )}
              variant="ghost"
              size="sm"
              onClick={() => onChangeLanguage(lang.code)}
            >
              {lang.code.toUpperCase()}
            </Button>
          </Tooltip>

          {lang.hasSeparator && (
            <Separator className="mx-2 md:mx-5" orientation="vertical" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default LanguageSelect;
