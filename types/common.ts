import { TFunction } from "i18next";
import React from "react";
import { IconType } from "react-icons/lib";

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

export interface IFile extends File {
  id: string;
}

export type NavItem = {
  label: string;
  Icon: IconType;
  notificationCount?: number;
} & (
  | {
      href: string;
      action?: never;
    }
  | {
      href?: never;
      action: () => void;
    }
);
