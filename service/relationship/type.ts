export enum RelationshipType {
  RELATIONSHIP_STATUS = "Relationship status",
  MODE = "Mode",
  LOOKING_FOR = "Looking for",
}

export interface Relationship {
  _id: string;
  iconUrl: string;
  name: string;
  description: string;
  type: RelationshipType;
  createdAt: string;
  updatedAt: string;
}
