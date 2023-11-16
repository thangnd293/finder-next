import { ITranslation } from "@/types/common";
import SignIn from "../auth/SignIn";
import LanguageSelect from "./LanguageSelect";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "@/components/Logo";
import ModeToggle from "@/components/ModeToggle";

interface IHeaderProps extends ITranslation {}
export default async function Header({ t }: IHeaderProps) {
  return (
    <header className="container relative flex items-center justify-between pt-12">
      <LanguageSelect />

      <Logo />

      <div className="hidden items-center space-x-2 sm:flex">
        <ModeToggle />
        <SignIn />
      </div>
      <HamburgerMenu />
    </header>
  );
}
