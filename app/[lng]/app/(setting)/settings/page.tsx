import { Accordion } from "@/components/Accordion";
import ScrollArea from "@/components/ScrollArea";
import MainLayout from "@/layout/MainLayout";
import Header from "../components/Header";
import FilterSetting from "./components/FilterSetting";
import LocationSetting from "./components/LocationSetting";
import LogoutButton from "./components/LogoutButton";
import ModeSetting from "./components/ModeSetting";
import NotificationSetting from "./components/NotificationSetting";
import AdvanceFilterSetting from "./components/AdvanceFilterSetting";
import DeleteAccountButton from "./components/DeleteAccountButton";

export default function SettingPage() {
  return (
    <MainLayout renderHeaderContent={() => <Header title="Cài đặt" />}>
      <ScrollArea className="min-h-full w-full">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center space-y-6 px-4 py-8">
          <ModeSetting />
          <Accordion
            className="w-full space-y-6"
            type="single"
            defaultValue="filter-setting"
            collapsible
          >
            <FilterSetting />
            <AdvanceFilterSetting />
            <NotificationSetting />
          </Accordion>
          <LocationSetting />
          <LogoutButton />
          <DeleteAccountButton />
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
