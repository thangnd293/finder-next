export type TLanguage = {
  code: string;
  name: string;
  hasSeparator?: boolean;
};

export type TPageParams<T> = {
  params: T;
};
