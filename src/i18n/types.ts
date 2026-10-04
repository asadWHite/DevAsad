/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LOCALIZATION CORE TYPES
 *  One centralized locale state for the ENTIRE user-facing website.
 *  Nothing language-dependent may live inside a component.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Every locale the site is genuinely designed for. */
export type Locale = "uz" | "ru" | "en";

/** Order used by the language picker (UZ ↔ RU are the primary pair). */
export const LOCALES: readonly Locale[] = ["uz", "ru", "en"] as const;

/** Locale used when nothing else can be determined. */
export const DEFAULT_LOCALE: Locale = "ru";

/**
 * A localized value. EVERY language-dependent field in project / service data
 * is wrapped in this, so a missing locale is a compile-time error.
 */
export type L<T> = Record<Locale, T>;

/** BCP-47 tag per locale — used for <html lang>, og:locale, Intl formatting. */
export const LOCALE_TAG: Record<Locale, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

/** Short BCP-47 (no region) — used for JSON-LD knowsLanguage / inLanguage. */
export const LOCALE_SHORT: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "en",
};

/** og:locale style tag (Facebook format). */
export const LOCALE_OG: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/** hreflang value per locale. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "en",
};

/** Number-format locale so prices read naturally in each language. */
export const LOCALE_NUMBER: Record<Locale, string> = {
  uz: "fr-FR", // narrow no-break space grouping — same visual as ru-RU, avoids RTL quirks
  ru: "ru-RU",
  en: "en-US",
};

/** Path segment used by the locale router: /uz/… /ru/… /en/… */
export const LOCALE_PATH: Record<Locale, string> = {
  uz: "/uz",
  ru: "/ru",
  en: "/en",
};

export function isLocale(value: unknown): value is Locale {
  return value === "uz" || value === "ru" || value === "en";
}

/* -------------------------------------------------------------------------- */
/*  Type-level dotted paths over the message tree                             */
/* -------------------------------------------------------------------------- */

type MessageNode = string | readonly string[] | { readonly [key: string]: MessageNode };

/** Dotted paths that resolve to a single string → usable with `t()`. */
export type StringPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? Prefix extends ""
      ? K
      : `${Prefix}.${K}`
    : T[K] extends readonly string[]
      ? never
      : T[K] extends MessageNode
        ? StringPaths<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
        : never;
}[keyof T & string];

/** Dotted paths that resolve to a string list → usable with `tl()`. */
export type ListPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends readonly string[]
    ? Prefix extends ""
      ? K
      : `${Prefix}.${K}`
    : T[K] extends string
      ? never
      : T[K] extends MessageNode
        ? ListPaths<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
        : never;
}[keyof T & string];
