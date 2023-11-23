import { TagType } from "@/service/tag";
import { BasicSettingStep } from "@/utils/tag";

export const BASICS: {
  label: string;
  key: BasicSettingStep;
}[] = [
  {
    label: "Chiều cao",
    key: "height",
  },
  {
    label: "Luyện tập",
    key: TagType.DO_EXERCISE,
  },
  {
    label: "Giáo dục",
    key: TagType.EDUCATION,
  },
  {
    label: "Uống rượu",
    key: TagType.DRINK,
  },
  {
    label: "Hút thuốc",
    key: TagType.SMOKE_QUESTION,
  },
  {
    label: "Chế độ ăn",
    key: TagType.DIETARY_PREFERENCE,
  },
  {
    label: "Trẻ em",
    key: TagType.KIDS,
  },
  {
    label: "Cung hoàng đạo",
    key: TagType.ZODIAC,
  },
  {
    label: "Ngôn ngữ tình yêu",
    key: TagType.LOVE_QUESTION,
  },
  {
    label: "Kiểu tính cách",
    key: TagType.PERSONALITY_TYPE,
  },
  {
    label: "Thú cưng",
    key: TagType.PETS,
  },
  {
    label: "Tôn giáo",
    key: TagType.RELIGION,
  },
];
