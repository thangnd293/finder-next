import ActionIcon from "@/components/action-icon";
import Avatar from "@/components/avatar";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[360px] border-r">
      <header className="relative flex h-20 items-center px-3 py-4">
        <Link className="flex flex-shrink-0" href="/app">
          <ActionIcon variant="ghost" size="lg">
            <ChevronLeftIcon width={30} height={30} />
          </ActionIcon>
        </Link>

        <Avatar
          className="absolute left-1/2 -translate-x-1/2"
          size="lg"
          fallback="DT"
        />
      </header>
      setting
    </div>
  );
}
