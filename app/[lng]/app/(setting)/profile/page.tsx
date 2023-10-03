import { checkMobileDevice } from "@/utils/check-mobile-device";
import DesktopProfilePage from "./components/DesktopProfilePage";
import MobileProfilePage from "./components/MobileProfilePage";

const ProfilePage = () => {
  const isMobileView = checkMobileDevice();

  if (isMobileView) return <MobileProfilePage />;
  return <DesktopProfilePage />;
};

export default ProfilePage;
