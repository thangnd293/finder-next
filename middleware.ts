import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, supportedLngs } from "./lib/i18n/settings";

acceptLanguage.languages(supportedLngs);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/images|assets|images|audio|favicon.ico|sw.js).*)",
  ],
};

const cookieName = "i18next";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !supportedLngs.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${pathname}${search}`, req.url),
    );
  }

  const isAuth = Boolean(req.cookies.get("accessToken"));
  console.log("=========MIDDLEWARE=========");

  if (isAuth && pathname === `/${lng}`) {
    return NextResponse.redirect(new URL("/app", req.url));
  }

  if (!isAuth && pathname.startsWith(`/${lng}/app`)) {
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
