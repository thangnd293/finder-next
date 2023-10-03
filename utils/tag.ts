import { TagType } from "@/service/tag";
import { BiDrink } from "react-icons/bi";
import { BsChatLeftHeart } from "react-icons/bs";
import { GiJigsawPiece } from "react-icons/gi";
import { LiaDumbbellSolid, LiaSmokingSolid } from "react-icons/lia";
import { LuPizza } from "react-icons/lu";
import { MdOutlineHandshake, MdPets } from "react-icons/md";
import { PiGraduationCapBold, PiRuler } from "react-icons/pi";
import { TbMoodKid, TbZodiacLibra } from "react-icons/tb";

export type BasicSettingStep = TagType | "height";

export const getTagIcon = (type: BasicSettingStep) => {
  switch (type) {
    case "height":
      return PiRuler;
    case TagType.DO_EXERCISE:
      return LiaDumbbellSolid;
    case TagType.EDUCATION:
      return PiGraduationCapBold;
    case TagType.DRINK:
      return BiDrink;
    case TagType.SMOKE_QUESTION:
      return LiaSmokingSolid;
    case TagType.DIETARY_PREFERENCE:
      return LuPizza;
    case TagType.KIDS:
      return TbMoodKid;
    case TagType.ZODIAC:
      return TbZodiacLibra;
    case TagType.LOVE_QUESTION:
      return BsChatLeftHeart;
    case TagType.PERSONALITY_TYPE:
      return GiJigsawPiece;
    case TagType.PETS:
      return MdPets;
    case TagType.RELIGION:
      return MdOutlineHandshake;
  }
};
