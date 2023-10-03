import { ROUTE } from "@/constant/route";
import MainLayout from "@/layout/MainLayout";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CurrentUserCard from "./CurrentUserCard";

const DesktopProfilePage = () => {
  return (
    <MainLayout
      renderSidebarContent={Sidebar}
      renderHeaderContent={() => (
        <Header title="Thông tin cá nhân" backTo={ROUTE.HOME} />
      )}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-3/4 w-3/4">
          <CurrentUserCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default DesktopProfilePage;
