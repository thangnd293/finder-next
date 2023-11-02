import { Place } from "@/types/map";
import { User } from "../user";

export interface Schedule {
  _id: string;
  description: string;
  status: "Accept" | "Decline" | "Wait for approval" | "Cancel";
  locationDating: string[];
  receiver: User;
  sender: User;
  isShowLocationDating: boolean;
  appointmentDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleDetail extends Omit<Schedule, "locationDating"> {
  locationDating: Place[];
}

export enum DatingStatus {
  YES = "Yes",
  NO = "No",
  HALFWAY = "Halfway",
}
