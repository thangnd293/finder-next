export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum LookingFor {
  Male = "Male",
  Female = "Female",
  All = "All",
}

export enum ModeGoal {
  Date = "Date",
  BFF = "Bff",
}

export interface Discovery {
  minAge: number;
  maxAge: number;
  distance: number;
  onlyShowAgeThisRange: boolean;
  onlyShowDistanceThisRange: boolean;
  lookingFor: LookingFor;
  recentlyActive: boolean;
  modeGoal: ModeGoal;
}
export interface User {
  _id: string;
  name: string;
  images: string[];
  stepStarted: number;
  gender: Gender;
  homeTown: {
    province: string;
  };
  birthDate: string;
  setting: {
    discovery: Discovery;
  };
}
