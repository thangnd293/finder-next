import { TPageParams } from "@/type";
import Header from "./components/header";
import Hero from "./components/hero";
import Pricing from "./components/pricing";
import Testimonials from "./components/testimonials";
import { getTranslation } from "@/lib/i18n";

export default async function Home({
  params: { lng },
}: TPageParams<{
  lng: string;
}>) {
  const { t } = await getTranslation(lng, "home");
  return (
    <>
      <Header t={t} />
      {/* <Navbar /> */}
      <main className="flex flex-col items-center justify-between">
        <Hero t={t} />
        <Pricing t={t} />
        <Testimonials />
      </main>
    </>
  );
}