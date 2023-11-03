import { ROUTE } from "@/constant/route";
import MainLayoutMobile from "@/layout/MainLayoutMobile";
import { GearIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import CurrentUserInfo from "./CurrentUserInfo";
import MobileProfileAvatar from "./MobileProfileAvatar";
import { ServerService } from "@/service/server";
import PackageFeature from "./PackageFeature";

const MobileProfilePage = async () => {
  const data = await ServerService.getOffers();

  return (
    <MainLayoutMobile>
      <div className="container flex w-full flex-col items-center gap-3">
        <MobileProfileAvatar />
        <CurrentUserInfo />

        <div className="flex w-full gap-2">
          <Link
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3.5 text-sm font-medium"
            href={ROUTE.SETTING}
          >
            <GearIcon className="h-5 w-5" />
            <span>Cài đặt</span>
          </Link>

          <Link
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3.5 text-sm font-medium"
            href={ROUTE.EDIT_PROFILE}
          >
            <Pencil1Icon className="h-5 w-5" />
            <span>Chỉnh sửa</span>
          </Link>
        </div>
        <PackageFeature
          featureGroup={data.metadata.featureGroup}
          results={data.results}
        />
      </div>
    </MainLayoutMobile>
  );
};

export default MobileProfilePage;
