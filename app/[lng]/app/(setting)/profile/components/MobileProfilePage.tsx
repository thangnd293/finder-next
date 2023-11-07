import { ROUTE } from "@/constant/route";
import MainLayoutMobile from "@/layout/MainLayoutMobile";
import { ServerService } from "@/service/server";
import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Boost from "./Boost";
import CurrentUserInfo from "./CurrentUserInfo";
import MobileProfileAvatar from "./MobileProfileAvatar";
import PackageFeature from "./PackageFeature";
import SuperLike from "./SuperLike";

const MobileProfilePage = async () => {
  const data = await ServerService.getOffers();

  return (
    <MainLayoutMobile>
      <div className="container relative flex w-full flex-col items-center gap-3">
        <Link className="mt-10" href={ROUTE.EDIT_PROFILE}>
          <MobileProfileAvatar />
        </Link>
        <CurrentUserInfo />

        <Link className="absolute right-3 top-3" href={ROUTE.SETTING}>
          <GearIcon className="h-6 w-6" />
        </Link>

        <div className="flex w-full items-center justify-between rounded-md border">
          <SuperLike offer={data.results[0]} />
          <hr className="h-12 border-l" />
          <Boost offer={data.results[2]} />
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
