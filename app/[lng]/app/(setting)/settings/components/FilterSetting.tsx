"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import FilterForm from "@/components/FilterForm";

const FilterSetting = () => {
  return (
    <AccordionItem value="filter-setting">
      <AccordionTrigger>Bộ lọc</AccordionTrigger>
      <AccordionContent>
        <FilterForm />
      </AccordionContent>
    </AccordionItem>
  );
};

export default FilterSetting;
