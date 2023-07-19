"use client";

import { Fragment, useState } from "react";

import Tooltip from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const languages = [
  {
    code: "en",
    name: "English",
    hasSeparator: true,
  },
  {
    code: "vi",
    name: "Tiếng Việt",
  },
];

export default function LanguageSelect() {
  const [language, setLanguage] = useState(languages[0].code);

  return (
    <div className="flex items-center h-5 text-sm">
      {languages.map((lang) => (
        <Fragment key={lang.code}>
          <Tooltip label={lang.name}>
            <Button
              className={cn("!bg-transparent rounded-none h-fit", {
                "text-accent": language !== lang.code,
              })}
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(lang.code)}
            >
              {lang.code.toUpperCase()}
            </Button>
          </Tooltip>

          {lang.hasSeparator && <Separator orientation="vertical" />}
        </Fragment>
      ))}
    </div>
  );
}
