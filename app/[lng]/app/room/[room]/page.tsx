import BrowserOnly from "@/components/BrowserOnly";
import Room from "./_ui/room";

export default function Page() {
  return (
    <BrowserOnly>
      <Room />
    </BrowserOnly>
  );
}
