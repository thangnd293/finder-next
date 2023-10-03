import { headers } from "next/headers";
import "server-only";

export const checkMobileDevice = () => {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  return Boolean(
    userAgent!.match(
      /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i,
    ),
  );
};
