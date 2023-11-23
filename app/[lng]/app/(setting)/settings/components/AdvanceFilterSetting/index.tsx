import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Switch from "@/components/Switch";
import { BASICS } from "@/constant/user-basics";
import { TagType } from "@/service/tag";
import FilterItem from "./FilterItem";

const AdvanceFilterSetting = () => {
  return (
    <AccordionItem value="advance-filter-setting">
      <AccordionTrigger className="flex-col items-start justify-start">
        <h3>Bộ lọc nâng cao</h3>
        <p className="text-left text-sm font-semibold text-muted-foreground">
          Thêm các tiêu chí nâng cao đề tăng khả năng tìm được những đối tác
          tiềm năng
        </p>
      </AccordionTrigger>

      <AccordionContent>
        <Button
          className="mb-10 w-full justify-between rounded-full bg-background"
          variant="social"
          withAnimation={false}
        >
          <span>Áp dụng bộ lọc</span> <Switch />
        </Button>
        <Label>Lọc theo:</Label>
        <div className="mt-3 flex flex-col gap-3">
          {BASICS.slice(1).map((basic) => (
            <FilterItem
              key={basic.key}
              label={basic.label}
              type={basic.key as TagType}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AdvanceFilterSetting;
