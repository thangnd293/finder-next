"use client";

import Button from "@/components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import ScrollArea from "@/components/ScrollArea";
import { Skeleton } from "@/components/Skeleton";
import { cn } from "@/lib/utils";
import { Tag, TagType, useTagsByType } from "@/service/tag";
import { getTagIcon } from "@/utils/tag";
import { useMemo, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

interface FilterItemProps {
  label: string;
  type: TagType;
  value?: string;
  onChange?: (type: TagType, tag: Tag | null) => void;
}

const FilterItem = ({ label, type, value, onChange }: FilterItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { tags, isLoading } = useTagsByType(type);
  const Icon = getTagIcon(type);

  const selectedTag = useMemo(
    () => tags.find((tag) => tag._id === value),
    [value, tags],
  );

  const onChoose = (type: TagType, tag: Tag | null) => {
    if (tag?._id === selectedTag?._id) return;

    setIsOpen(false);
    onChange?.(type, tag);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="justify-between rounded-full bg-background"
          variant="social"
          onClick={() => setIsOpen(true)}
        >
          <span className="flex items-center gap-4">
            <Icon className="text-muted-foreground" /> {label}
          </span>

          {selectedTag ? (
            <span className="max-w-[120px] truncate text-muted-foreground">
              {selectedTag.name}
            </span>
          ) : (
            <BsPlusLg className="text-muted-foreground" size={20} />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-52 rounded-lg px-0 py-2" align="end">
        <ScrollArea className="max-h-56">
          {isLoading &&
            Array.from({
              length: 5,
            }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-full" />
            ))}

          {!isLoading && (
            <>
              <button
                className={cn(
                  "w-full px-2 py-1.5 text-left text-sm hover:bg-background-100",
                  {
                    "text-primary-500": !selectedTag,
                  },
                )}
                type="button"
                onClick={() => onChoose(type, null)}
              >
                Không áp dụng
              </button>
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  className={cn(
                    "w-full px-2 py-1.5 text-left text-sm hover:bg-background-100",
                    {
                      "text-primary-500": selectedTag?._id === tag._id,
                    },
                  )}
                  type="button"
                  onClick={() => onChoose(tag.type, tag)}
                >
                  {tag.name}
                </button>
              ))}
            </>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default FilterItem;
