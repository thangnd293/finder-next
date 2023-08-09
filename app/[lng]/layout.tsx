import { dir } from "i18next";
import type { Metadata } from "next";

import "draft-js/dist/Draft.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@/styles/global.css";
import "@/styles/draft-js.css";

import ThemeProvider from "@/components/theme-provider";
import { supportedLngs } from "@/lib/i18n/settings";
import { PropsWithChildren } from "react";
import { TPageParams } from "@/types";
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
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
