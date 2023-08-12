"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";

import Tooltip from "@/components/tooltip";
import { languages } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";
import Separator from "@/components/separator";
import ButtonBase from "@/components/button-base";

export default function LanguageSelect() {
  const param = useParams();
  const pathname = usePathname();
  const pathnameWithoutLng = pathname?.split("/").slice(2).join("/");

  return (
    <div className="flex h-5 items-center text-sm">
      {languages.map((lang) => (
        <Fragment key={lang.code}>
          <Tooltip label={lang.name}>
            <ButtonBase
              className={cn("h-fit rounded-none !bg-transparent", {
                "!text-inherit": param?.lng === lang.code,
              })}
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href={`/${lang.code}/${pathnameWithoutLng}`}>
                {lang.code.toUpperCase()}
              </Link>
            </ButtonBase>
          </Tooltip>

          {lang.hasSeparator && <Separator orientation="vertical" />}
        </Fragment>
      ))}
    </div>
  );
}
