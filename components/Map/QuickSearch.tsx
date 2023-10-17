"use client";

import Chip from "@/components/Chip";
import {
  MdOutlineLocalCafe,
  MdOutlineShoppingBag,
  MdRestaurant,
} from "react-icons/md";

interface QuickSearchProps {
  onSearch: (label: string) => void;
}
const QuickSearch = ({ onSearch }: QuickSearchProps) => {
  return (
    <div className="flex items-center gap-2">
      {quickSearch.map(({ label, icon: Icon }) => (
        <Chip
          key={label}
          icon={<Icon />}
          label={label}
          onClick={() => onSearch(label)}
        />
      ))}
    </div>
  );
};

export default QuickSearch;

const quickSearch = [
  {
    label: "Nhà hàng",
    icon: MdRestaurant,
  },
  {
    label: "Cafe",
    icon: MdOutlineLocalCafe,
  },
  {
    label: "Mua sắm",
    icon: MdOutlineShoppingBag,
  },
];
