import { Accordion } from "@/components/Accordion";
import ScrollArea from "@/components/ScrollArea";
import Header from "../../components/Header";
import PhotoSection from "./components/PhotoSection";
import BasicSetting from "./components/BasicSetting";
import BioSection from "./components/BioSection";
import LinkedAccount from "./components/LinkedAccount";
import PreviewProfile from "./components/PreviewProfile";
import MainLayout from "@/layout/MainLayout";
import WorkAndEducationSection from "./components/WorkAndEducationSection";
import VerifySection from "./components/Verify";

const EditProfilePage = () => {
  return (
    <MainLayout renderHeaderContent={() => <Header title="Sửa thông tin" />}>
      <ScrollArea className="min-h-full w-full">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center space-y-3 px-4 py-8">
          <PhotoSection />
          <PreviewProfile />

          <div className="mt-4" />

          <Accordion className="w-full space-y-6" type="single" collapsible>
            <VerifySection />
            <BioSection />
            <WorkAndEducationSection />
            <BasicSetting />
            <LinkedAccount />
          </Accordion>
        </div>
      </ScrollArea>
    </MainLayout>
  );
};

export default EditProfilePage;
