import Logo from "@/components/Logo";
import FilterSetting from "./FilterSetting";

interface HeaderProps {
  onReload?: () => void;
}
export const Header = ({ onReload }: HeaderProps) => {
  return (
    <header className="relative flex h-14 w-full flex-shrink-0 items-center justify-center md:h-20">
      <FilterSetting onReload={onReload} />
      <Logo />
    </header>
  );
};
