import { ITranslation } from "@/types/common";
import HamburgerMenu from "./hamburger-menu";
import SignIn from "../auth/sign-in";
import LanguageSelect from "./language-select";
import ModeToggle from "./ModeToggle";

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
