import { getTranslation } from "@/lib/i18n";
import { TPageParams } from "@/types/common";
import Header from "./components/header";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Pricing from "./components/pricing";
import Testimonials from "./components/testimonials";

export default async function HomePage({
  params: { lng },
}: TPageParams<{
  lng: string;
}>) {
  const { t } = await getTranslation(lng, "home");

  return (
    <>
      <Header t={t} />
      <Navbar />
      <main className="flex flex-col items-center justify-between">
        <Hero t={t} />
        <Pricing t={t} />
        <Testimonials />
      </main>
    </>
  );
}
