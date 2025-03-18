import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "de", "fran"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      en: "/pathnames",
      de: "/pathnames",
      fran: "/pathnames",
    }
  },
});
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
