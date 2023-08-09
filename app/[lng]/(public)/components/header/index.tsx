import LanguageSelect from "@/app/[lng]/(public)/components/header/language-select";

import ModeToggle from "@/components/mode-toggle";
import { ITranslation } from "@/types/common";
import SignIn from "../sign-in";
import HamburgerMenu from "./hamburger-menu";

interface IHeaderProps extends ITranslation {}
export default async function Header({ t }: IHeaderProps) {
  return (
    <header className="container relative flex items-center justify-between pt-12">
      <LanguageSelect />

      <span>Finder</span>

      <div className="hidden items-center space-x-2 sm:flex">
        <ModeToggle />
        <SignIn />
      </div>
      <HamburgerMenu />
    </header>
  );
}
