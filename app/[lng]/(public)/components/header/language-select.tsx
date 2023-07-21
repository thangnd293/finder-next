"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";

import Tooltip from "@/components/tooltip";
import ButtonBase from "@/components/ui/button-base";
import { Separator } from "@/components/ui/separator";
import { languages } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";

export default function LanguageSelect() {
  const { lng } = useParams();
  const pathname = usePathname();
  const pathnameWithoutLng = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex h-5 items-center text-sm">
      {languages.map((lang) => (
        <Fragment key={lang.code}>
          <Tooltip label={lang.name}>
            <ButtonBase
              className={cn("h-fit rounded-none !bg-transparent text-accent", {
                "!text-inherit": lng === lang.code,
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
