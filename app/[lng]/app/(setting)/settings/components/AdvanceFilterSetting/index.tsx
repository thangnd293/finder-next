"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import { buttonBaseVariants } from "@/components/ButtonBase";
import Label from "@/components/Label";
import Switch from "@/components/Switch";
import { BASICS } from "@/constant/user-basics";
import { cn } from "@/lib/utils";
import { Tag, TagType } from "@/service/tag";
import { useCurrentUser, useUpdateSetting } from "@/service/user";
import { useMemo } from "react";
import FilterItem from "./FilterItem";

const AdvanceFilterSetting = () => {
  const { data: advancedFilter } = useCurrentUser({
    select: (user) => user.setting.advancedFilter,
  });

  const updateSetting = useUpdateSetting();

  const filters = useMemo(
    () =>
      advancedFilter?.tags.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.tagType]: curr.tagId,
        }),
        {} as Record<TagType, string>,
      ),
    [advancedFilter],
  );

  const onToggleFilter = () => {
    updateSetting.mutate({
      advancedFilter: {
        enable: !advancedFilter?.enable,
        tags: advancedFilter?.tags ?? [],
      },
    });
  };

  const handleChangeFilter = (tag: Tag) => {
    updateSetting.mutate({
      advancedFilter: {
        enable: true,
        tags: [
          ...(advancedFilter?.tags.filter((t) => t.tagType !== tag.type) ?? []),
          {
            tagId: tag._id,
            tagType: tag.type,
          },
        ],
      },
    });
  };

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
        <div
          className={cn(
            buttonBaseVariants({
              variant: "social",
              className:
                "mb-10 w-full !translate-y-0 justify-between rounded-full bg-background",
            }),
          )}
          onClick={onToggleFilter}
        >
          <span>Áp dụng bộ lọc</span>
          <Switch checked={advancedFilter?.enable} />
        </div>
        <Label>Lọc theo:</Label>
        <div className="mt-3 flex flex-col gap-3">
          {BASICS.slice(1).map((basic) => (
            <FilterItem
              key={basic.key}
              label={basic.label}
              type={basic.key as TagType}
              value={filters?.[basic.key as TagType]}
              onChange={handleChangeFilter}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AdvanceFilterSetting;
