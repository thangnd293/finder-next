import { TFunction } from "i18next";
import React from "react";

export type TLanguage = {
  code: string;
  name: string;
  hasSeparator?: boolean;
};

export type TPageParams<T> = {
  params: T;
};

export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number;
}

export interface ITranslation {
  t: TFunction<any, undefined>;
}
