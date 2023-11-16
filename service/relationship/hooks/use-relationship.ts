import { useQuery } from "@tanstack/react-query";
import { RelationshipService } from "../relationship-service";
import { RelationshipType } from "../type";

export const useRelationship = (type: RelationshipType) => {
    return useQuery({
        queryKey: ["relationship", type],
        queryFn: () => RelationshipService.getRelationship(type)
    })
};
