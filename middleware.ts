import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, supportedLngs } from "./lib/i18n/settings";

acceptLanguage.languages(supportedLngs);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|favicon.ico|sw.js).*)",
  ],
};

const cookieName = "i18next";

export function middleware(req: NextRequest) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !supportedLngs.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  const isAuth = Boolean(
    req.cookies.get("accessToken") &&
      req.cookies.get("next-auth.session-token"),
  );

  if (isAuth && req.nextUrl.pathname === `/${lng}`) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  if (!isAuth && req.nextUrl.pathname.startsWith(`/${lng}/app`)) {
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = supportedLngs.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);

    return response;
  }
  return NextResponse.next();
}
