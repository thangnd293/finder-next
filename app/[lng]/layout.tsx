import { dir } from "i18next";
import type { Metadata } from "next";

import "@/styles/draft-js.css";
import "@/styles/global.css";
import "@/styles/message.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "draft-js/dist/Draft.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import { inter } from "@/assets/fonts";
import { supportedLngs } from "@/lib/i18n/settings";
import { PropsWithChildren } from "react";

import Providers from "@/components/Providers";
import { TPageParams } from "@/types/common";
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
      className="scroll-smooth"
      lang={lng}
      dir={dir(lng)}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
      </head>

      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}
