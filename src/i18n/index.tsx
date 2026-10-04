import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_HREFLANG,
  LOCALE_NUMBER,
  LOCALE_OG,
  LOCALE_PATH,
  LOCALE_TAG,
  isLocale,
  type L,
  type ListPaths,
  type Locale,
  type StringPaths,
} from "./types";
import { uz, type Messages } from "./messages/uz";
import { ru } from "./messages/ru";
import { en } from "./messages/en";

export * from "./types";
export type { Messages } from "./messages/uz";

/** The single source of truth for every user-facing string on the site. */
export const MESSAGES: Record<Locale, Messages> = { uz, ru, en };

const STORAGE_KEY = "asdb-locale";

/** Canonical origin used for hreflang + canonical tags. */
const SITE_ORIGIN = "https://asadbek.uz";

/* -------------------------------------------------------------------------- */
/*  tree access                                                               */
/* -------------------------------------------------------------------------- */

type Tree = { [key: string]: unknown };

function resolve(root: unknown, path: string): unknown {
  let node: unknown = root;
  for (const part of path.split(".")) {
    if (node === null || typeof node !== "object") return undefined;
    node = (node as Tree)[part];
  }
  return node;
}

/* -------------------------------------------------------------------------- */
/*  locale resolution: URL → storage → default                                */
/* -------------------------------------------------------------------------- */

function localeFromPath(): Locale | null {
  if (typeof window === "undefined") return null;
  const seg = window.location.pathname.split("/").filter(Boolean)[0];
  return isLocale(seg) ? seg : null;
}

function localeFromStorage(): Locale | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(saved) ? saved : null;
}

function initialLocale(): Locale {
  return localeFromPath() ?? localeFromStorage() ?? DEFAULT_LOCALE;
}

/* -------------------------------------------------------------------------- */
/*  context                                                                   */
/* -------------------------------------------------------------------------- */

export interface I18nValue {
  /** The one and only locale for the whole page. */
  locale: Locale;
  /** Switch locale — rewrites the URL without a reload and keeps scroll position. */
  setLocale: (next: Locale) => void;
  /** Translate a single string. Key is compile-time checked. */
  t: (key: StringPaths<Messages>) => string;
  /** Translate a string list (e.g. hero.roles). Key is compile-time checked. */
  tl: (key: ListPaths<Messages>) => readonly string[];
  /** Pick the current locale out of a localized data value: loc(project.c.title) */
  loc: <T>(value: L<T>) => T;
  /** Format a number with the locale's grouping rules (prices stay identical). */
  num: (value: number) => string;
  /** All locales, in picker order. */
  locales: readonly Locale[];
}

const I18nContext = createContext<I18nValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  /* ---- side effects of a locale change ---------------------------------- */

  const applyLocale = useCallback((next: Locale) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.lang = LOCALE_TAG[next];

    /* canonical + hreflang */
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${SITE_ORIGIN}${LOCALE_PATH[next]}/`;
      canonical.dataset.href = SITE_ORIGIN;
    }

    document.querySelectorAll<HTMLLinkElement>("link[data-hreflang]").forEach((link) => {
      const target = link.dataset.hreflang;
      if (!isLocale(target)) return;
      link.hreflang = LOCALE_HREFLANG[target];
      link.href = `${SITE_ORIGIN}${LOCALE_PATH[target]}/`;
    });

    /* og:locale + alternates */
    const setMeta = (sel: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(sel);
      if (el) el.content = value;
    };
    setMeta('meta[property="og:locale"]', LOCALE_OG[next]);
    const alternates = (["uz", "ru", "en"] as const).filter((l) => l !== next);
    document
      .querySelectorAll<HTMLMetaElement>('meta[property="og:locale:alternate"]')
      .forEach((el, i) => {
        if (alternates[i]) el.content = LOCALE_OG[alternates[i]!];
      });

    /* document direction stays ltr for all three, but keep it explicit */
    root.dir = "ltr";
  }, []);

  useEffect(() => {
    applyLocale(locale);
  }, [locale, applyLocale]);

  /* ---- switching -------------------------------------------------------- */

  const setLocale = useCallback((next: Locale) => {
    setLocaleState((current) => {
      if (current === next) return current;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);

        /* §17 — /uz/… /ru/… /en/… without a page reload (§13 keeps scroll) */
        const rest = window.location.pathname
          .split("/")
          .filter(Boolean)
          .filter((seg) => !isLocale(seg));
        const nextPath = `/${next}${rest.length ? `/${rest.join("/")}` : ""}`;
        const url = `${nextPath}${window.location.search}${window.location.hash}`;
        window.history.replaceState(window.history.state, "", url);
      }
      return next;
    });
  }, []);

  /* ---- tree accessors --------------------------------------------------- */

  const value = useMemo<I18nValue>(() => {
    const table = MESSAGES[locale];

    const t = (key: string): string => {
      const found = resolve(table, key);
      if (typeof found === "string") return found;
      if (import.meta.env.DEV) {
        console.warn(`[i18n] missing message for "${key}" in "${locale}"`);
      }
      /* Never leak another language: fall back to the same key in UZ, then the
         key itself. A missing translation is visible, not a silent mix. */
      const fallback = resolve(MESSAGES.uz, key);
      return typeof fallback === "string" ? fallback : key;
    };

    const tl = (key: string): readonly string[] => {
      const found = resolve(table, key);
      if (Array.isArray(found)) return found as readonly string[];
      const fallback = resolve(MESSAGES.uz, key);
      return Array.isArray(fallback) ? (fallback as readonly string[]) : [];
    };

    const loc = <T,>(v: L<T>): T => v[locale];

    const num = (v: number): string =>
      new Intl.NumberFormat(LOCALE_NUMBER[locale]).format(v);

    return {
      locale,
      setLocale,
      t,
      tl,
      loc,
      num,
      locales: ["uz", "ru", "en"],
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * The ONLY way a component may reach for localized text.
 * There is no second, per-component language state anywhere on the site.
 */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LocaleProvider>");
  return ctx;
}

/** Convenience: the label of a locale in its own language, for the picker. */
export const LOCALE_NATIVE_LABEL: Record<Locale, string> = {
  uz: "O‘ZBEKCHA",
  ru: "РУССКИЙ",
  en: "ENGLISH",
};
