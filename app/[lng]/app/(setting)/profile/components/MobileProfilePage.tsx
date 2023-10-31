import CurrentUserAvatar from "@/components/CurrentUserAvatar";
import { ROUTE } from "@/constant/route";
import MainLayoutMobile from "@/layout/MainLayoutMobile";
import { GearIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import CircleProgress from "./CircleProgress";
import CurrentUserInfo from "./CurrentUserInfo";
import PackFeature from "./PackFeature";

const MobileProfilePage = () => {
  return (
    <MainLayoutMobile>
      <div className="container flex w-full flex-col items-center gap-3">
        <div className="relative mt-10">
          <CurrentUserAvatar className="border-8 border-white" size="3xl" />

          <CircleProgress
            className="absolute left-0 top-0 "
            percentage={45}
            size={128}
            strokeWidth={4}
          />
        </div>
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
        <PackFeature />
      </div>
    </MainLayoutMobile>
  );
};

export default MobileProfilePage;
