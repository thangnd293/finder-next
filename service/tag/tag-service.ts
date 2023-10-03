import axiosInstance from "@/lib/axios";
import { Tag, TagType } from "./type";
import { List } from "@/types/http";

export class TagService {
  static prefix = "/tag";

  static urls = {
    getTagsByType: (type: TagType) =>
      `${TagService.prefix}/?page=1&size=100&type=${type}`,
  };

  static async getTagsByType(type: TagType) {
    const { data } = await axiosInstance.get<List<Tag>>(
      TagService.urls.getTagsByType(type),
    );
    return data;
  }
}
