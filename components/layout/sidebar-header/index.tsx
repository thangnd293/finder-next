import Avatar from "@/components/avatar";
import { MagnifyingGlassIcon, SewingPinIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ActionLink from "./action-link";

export default function SidebarHeader() {
  return (
    <header className="flex h-20 items-center justify-between px-3 py-4">
      <Link className="flex items-center space-x-2" href="/app/settings">
        <Avatar fallback='DT'/>
        <p className="font-medium">Dac Thang</p>
      </Link>

      <div className="flex gap-3">
        <ActionLink href="/app/explore">
          <MagnifyingGlassIcon width={16} height={16} />
        </ActionLink>

        <ActionLink href="/app/dating">
          <SewingPinIcon width={16} height={16} />
        </ActionLink>
      </div>
    </header>
  );
}
