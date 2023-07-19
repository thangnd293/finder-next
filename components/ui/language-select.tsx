"use client";

import { Fragment } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Tooltip from "@/components/ui/tooltip";
import { languages } from "@/lib/i18n/settings";
import { cn } from "@/lib/utils";

export default function LanguageSelect() {
  const { lng } = useParams();
  const pathname = usePathname();
  const pathnameWithoutLng = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center h-5 text-sm">
      {languages.map((lang) => (
        <Fragment key={lang.code}>
          <Tooltip label={lang.name}>
            <Button
              className={cn("!bg-transparent rounded-none h-fit text-accent", {
                "!text-inherit": lng === lang.code,
              })}
              variant="ghost"
              size="icon"
              asChild
            >
              <Link href={`/${lang.code}/${pathnameWithoutLng}`}>
                {lang.code.toUpperCase()}
              </Link>
            </Button>
          </Tooltip>

          {lang.hasSeparator && <Separator orientation="vertical" />}
        </Fragment>
      ))}
    </div>
  );
}
