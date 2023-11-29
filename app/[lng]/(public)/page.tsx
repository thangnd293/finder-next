import { getTranslation } from "@/lib/i18n";
import { TPageParams } from "@/types/common";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWork from "./components/HowItWork";
import Navbar from "./components/Navbar";
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
        <HowItWork />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
