import { RefreshIntervalUnit } from "@/service/offer";

export const DEFAULT_IMAGE = "/images/placeholder-image.jpg";

export const timeMap: Record<RefreshIntervalUnit, string> = {
  Minutes: "Phút",
  Hours: "Giờ",
  Day: "Ngày",
  Week: "Tuần",
  Month: "Tháng",
  Year: "Năm",
};
