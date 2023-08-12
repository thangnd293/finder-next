import { usePathname as useNextPathname } from "next/navigation";

export function usePathname() {
  const pathname = useNextPathname();
  return "/" + pathname?.split("/").slice(2).join("/");
}
