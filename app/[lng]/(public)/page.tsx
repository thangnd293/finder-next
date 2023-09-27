import { getTranslation } from "@/lib/i18n";
import { TPageParams } from "@/types/common";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

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
