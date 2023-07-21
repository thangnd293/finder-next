import ActionIcon from "@/components/action-icon";
import Button from "@/components/button";
import { TPageParams } from "@/type";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default async function Lab({
  params: { lng },
}: TPageParams<{
  lng: string;
}>) {
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-4">
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button variant="outline" loading>
          outline
        </Button>
        <Button>default</Button>
        <a href="#">
          <Button>test</Button>
        </a>

        <Button size="lg">lg</Button>
        <Button variant="accent" size="lg">
          lg
        </Button>
        <Button variant="accent" size="lg" loading>
          lg
        </Button>
        <ActionIcon size="xs">
          <ArrowLeftIcon />
        </ActionIcon>
        <ActionIcon>
          <ArrowLeftIcon />
        </ActionIcon>
        <ActionIcon size="lg">
          <ArrowLeftIcon />
        </ActionIcon>
      </main>
    </>
  );
}
