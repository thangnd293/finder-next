import axiosInstance from "@/lib/axios";
import { List } from "@/types/http";
import { Relationship, RelationshipType } from "./type";

export class RelationshipService {
  static prefix = "/relationship";

  static urls = {
    getRelationship: (type: RelationshipType) =>
      `${this.prefix}?page=1&size=100&type=${type}`,
  };

  static async getRelationship(type: RelationshipType) {
    const { data } = await axiosInstance.get<List<Relationship>>(
      this.urls.getRelationship(type),
    );

    return data;
  }
}
