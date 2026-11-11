import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "./index";
import { LOCALE_NATIVE_LABEL } from "./index";
import type { Locale } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DEV-ONLY LOCALE AUDIT
 *  Walks the rendered DOM and flags any visible block that mixes scripts,
 *  e.g. Uzbek page copy still carrying Cyrillic, or a Russian page carrying
 *  sentence-case Latin that is not a brand / technology name.
 *  Renders nothing in production builds.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** §16 — these never get translated, so they are always allowed. */
const UNIVERSAL = new Set([
  "next.js", "react", "tailwind", "typescript", "javascript", "supabase",
  "telegram", "mini", "app", "apps", "bot", "bots", "webapp", "vercel",
  "gsap", "lenis", "framer", "motion", "kotlin", "compose", "material",
  "mvvm", "hilt", "android", "ios", "seo", "sitemap", "json", "ld", "api",
  "crm", "ai", "ux", "ui", "rls", "auth", "http", "https", "www", "com",
  "uz", "net", "org", "vercel.app", "ustatop", "kashmir", "decor",
  "educrm", "drivera", "dev.", "асад", "asad", "dev.asad", "xidoyatovvv",
  "waitlist", "booking", "admin", "instagram", "github", "email", "mail",
  "faq", "og", "twitter", "og:image", "index", "html", "css", "figma",
  "gemini", "claude", "codex", "chatgpt", "npm", "git", "vs", "code",
  "ielts", "compose’da", "mvvm", "sql", "postgres", "postgresql",
]);

const CYRILLIC = /[\u0400-\u04FF]/g;
const LATIN_WORD = /[A-Za-z]{2,}/g;

function stripAllowed(text: string): string {
  return text
    .split(/(\s+|[·|/—–\-.,!?:;()«»"'’‘“”[…\]{}#@+=*&%><~^`])/g)
    .filter((tok) => !UNIVERSAL.has(tok.toLowerCase().replace(/[^a-zа-яё.]/gi, "")))
    .join("");
}

interface Finding {
  /** which foreign script leaked in */
  kind: "cyrillic-in-latin" | "latin-in-cyrillic";
  text: string;
}

/** Which scripts are foreign for a given locale. */
function expectedScripts(locale: Locale): { cyrillicOk: boolean; latinOk: boolean } {
  switch (locale) {
    case "ru":
      return { cyrillicOk: true, latinOk: false };
    case "uz":
    case "en":
      return { cyrillicOk: false, latinOk: true };
  }
}

function audit(root: ParentNode, locale: Locale): Finding[] {
  const { cyrillicOk, latinOk } = expectedScripts(locale);
  const out = new Map<string, Finding>();

  const walker = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent) continue;

    /* skip non-visible / non-user-facing nodes */
    if (parent.closest("[data-locale-audit], [aria-hidden='true'], script, style, noscript")) continue;
    if (parent.getAttribute("aria-hidden") === "true") continue;

    const raw = node.nodeValue?.trim() ?? "";
    if (raw.length < 2) continue;

    const text = stripAllowed(raw);
    if (text.trim().length < 2) continue;

    const cyr = (text.match(CYRILLIC) ?? []).length;
    const lat = (text.match(LATIN_WORD) ?? []).length;

    if (!cyrillicOk && cyr > 0 && cyr >= lat) {
      out.set(raw, { kind: "cyrillic-in-latin", text: raw.slice(0, 120) });
    } else if (!latinOk && lat > 0 && lat > cyr + 1) {
      out.set(raw, { kind: "latin-in-cyrillic", text: raw.slice(0, 120) });
    }
  }
  return [...out.values()];
}

export function LocaleAudit() {
  const { t, locale, setLocale } = useI18n();
  const [findings, setFindings] = useState<Finding[]>([]);
  const [open, setOpen] = useState(false);
  const scannedLocale = useRef<Locale>(locale);

  const run = useCallback(() => {
    const root = document.getElementById("root");
    if (!root) return;
    scannedLocale.current = locale;
    setFindings(audit(root, locale));
  }, [locale]);

  /* re-scan after the switch paint + after fonts/GSAP settle */
  useEffect(() => {
    const a = window.setTimeout(run, 60);
    const b = window.setTimeout(run, 600);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [run]);

  /* re-scan whenever the DOM grows (sections mount, accordions open) */
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const mo = new MutationObserver(() => {
      window.clearTimeout((mo as unknown as { _t?: number })._t);
      (mo as unknown as { _t?: number })._t = window.setTimeout(run, 250);
    });
    mo.observe(root, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [run]);

  if (!import.meta.env.DEV) return null;

  const clean = findings.length === 0;

  return (
    <div
      data-locale-audit
      className="fixed bottom-3 left-3 z-[9999] max-w-[min(92vw,420px)] font-mono text-[10px] leading-tight"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={[
            "pointer-events-auto flex items-center gap-2 border px-2 py-1 tracking-[0.12em] backdrop-blur",
            clean
              ? "border-emerald-600/40 bg-emerald-50/90 text-emerald-800"
              : "border-red-600/50 bg-red-50/95 text-red-800",
          ].join(" ")}
          aria-expanded={open}
        >
          <span className={clean ? "" : "animate-pulse-dot"}>{clean ? "●" : "▲"}</span>
          <span>{t("validate.badge")}</span>
          <span className="opacity-60">{LOCALE_NATIVE_LABEL[locale]}</span>
          <span className="tabular-nums">
            {clean ? `0` : `${findings.length} ${t("validate.issues")}`}
          </span>
        </button>

        {(["uz", "ru", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            className={[
              "pointer-events-auto border px-1.5 py-1 tracking-[0.1em] backdrop-blur",
              l === locale
                ? "border-ink bg-ink text-paper"
                : "border-ink/25 bg-paper/80 text-ink/60",
            ].join(" ")}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {open && (
        <div className="pointer-events-auto mt-1 max-h-[46vh] overflow-auto border border-ink/15 bg-paper/95 p-2 backdrop-blur">
          {clean ? (
            <p className="text-emerald-700">{t("validate.clean")}</p>
          ) : (
            <ul className="space-y-1">
              {findings.map((f) => (
                <li key={f.text} className="border-l-2 border-red-500 pl-2">
                  <span className="text-red-700">
                    {f.kind === "cyrillic-in-latin" ? "Cyrillic" : "Latin"}
                  </span>
                  <span className="mx-1 opacity-40">→</span>
                  <span className="break-words">{f.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default LocaleAudit;
