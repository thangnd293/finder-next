import Logo from "@/components/Logo";
import ModeToggle from "@/components/ModeToggle";
import SignIn from "../auth/SignIn";
import HamburgerMenu from "./HamburgerMenu";
import LanguageSelect from "./LanguageSelect";

export default async function Header() {
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
