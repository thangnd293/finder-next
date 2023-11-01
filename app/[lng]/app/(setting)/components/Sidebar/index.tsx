import ActionIcon from "@/components/ActionIcon";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import NavList from "./NavList";
import { ROUTE } from "@/constant/route";
import CurrentUserAvatar from "@/components/CurrentUserAvatar";
import PacketList from "./PacketList";

const Sidebar = () => {
  return (
    <>
      <header className="relative flex h-18 items-center px-3 py-4 md:h-20">
        <Link className="hidden flex-shrink-0 md:block" href="/app">
          <ActionIcon variant="ghost" size="lg">
            <ChevronLeftIcon width={30} height={30} />
          </ActionIcon>
        </Link>

        <Link className="absolute left-1/2 -translate-x-1/2" href={ROUTE.HOME}>
          <CurrentUserAvatar />
        </Link>
      </header>
      <PacketList />
      <NavList />
    </>
  );
};

export default Sidebar;
