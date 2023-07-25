import { dir } from "i18next";
import type { Metadata } from "next";

import "@/styles/global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { supportedLngs } from "@/lib/i18n/settings";
import { PropsWithChildren } from "react";
import { TPageParams } from "@/type";
import { inter } from "@/assets/fonts";

import "@/utils/prototype";

export const metadata: Metadata = {
  title: "Finder | Tìm kiếm, kết bạn và hẹn hò",
  description: "Finder là nơi bạn có thể tìm kiếm, kết bạn và hẹn hò.",
};

export async function generateStaticParams() {
  return supportedLngs.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: PropsWithChildren<
  TPageParams<{
    lng: string;
  }>
>) {
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      suppressHydrationWarning
      className="text-[10px] sm:text-[12px] lg:text-[14px] 2xl:text-[16px]"
    >
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
