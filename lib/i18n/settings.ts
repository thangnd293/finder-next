import { TLanguage } from "@/types/common";

export const fallbackLng: TLanguage = {
  code: "vi",
  name: "Tiếng Việt",
  hasSeparator: true,
};

export const languages: TLanguage[] = [
  fallbackLng,
  {
    code: "en",
    name: "English",
  },
];

export const supportedLngs = languages.map((l) => l.code);

export const defaultNS = "home";

export function getOptions(lng = fallbackLng.code, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs,
    fallbackLng: lng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
