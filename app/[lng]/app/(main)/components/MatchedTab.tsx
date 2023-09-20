import AspectRatio from "@/components/AspectRatio";
import { TabsContent } from "@/components/Tabs";

export default function MatchedTab() {
  return (
    <TabsContent
      className="grid max-h-full w-full grid-cols-3 items-start justify-start gap-2 overflow-auto p-4"
      value="matched"
    >
      {Array.from({
        length: 10,
      }).map((_, i) => (
        <AspectRatio key={i} ratio={7 / 9} className="rounded-md bg-primary-50">
          {i}
        </AspectRatio>
      ))}
    </TabsContent>
  );
}
