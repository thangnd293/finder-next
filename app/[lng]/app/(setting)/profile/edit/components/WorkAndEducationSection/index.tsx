import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import WorkSetting from "./WorkSetting";
import SchoolSetting from "./SchoolSetting";

const WorkAndEducationSection = () => {
  return (
    <AccordionItem value="workAndEducation">
      <AccordionTrigger>Công việc và học vấn</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-6">
          <WorkSetting />
          <SchoolSetting />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default WorkAndEducationSection;
