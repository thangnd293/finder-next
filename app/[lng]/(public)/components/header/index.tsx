import LanguageSelect from "@/app/[lng]/(public)/components/header/language-select";
import Button from "@/components/button";

import ModeToggle from "@/components/mode-toggle";
import { ITranslation } from "@/type/common";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import HamburgerMenu from "./hamburger-menu";

interface IHeaderProps extends ITranslation {}
export default async function Header({ t }: IHeaderProps) {
  return (
    <header className="container relative flex items-center justify-between pt-12">
      <LanguageSelect />

      <span>Finder</span>

      <div className="hidden items-center space-x-2 sm:flex">
        <ModeToggle />
        <Button
          className="rounded-lg"
          size={"lg"}
          leftIcon={<ArrowRightIcon className="h-4 w-4" />}
        >
          {t("signUp")}
        </Button>
      </div>
      <HamburgerMenu />
    </header>
  );
}
