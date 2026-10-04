import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";

gsap.registerPlugin(ScrollTrigger);

const ROWS: { label: string; items: string[] }[] = [
  { label: "FRONTEND", items: ["Next.js", "React", "TypeScript", "HTML", "CSS", "Tailwind"] },
  { label: "MOTION", items: ["GSAP", "ScrollTrigger", "Lenis", "Framer Motion", "React Bits"] },
  { label: "BACKEND", items: ["Supabase", "Postgres", "Auth", "Storage", "RLS"] },
  { label: "__DEPLOY", items: ["Vercel"] },
  { label: "__ECO", items: ["Telegram", "Mini Apps", "Google Maps", "Search Console", "SEO"] },
  { label: "__MOBILE", items: ["Kotlin", "Jetpack Compose"] },
  { label: "__AI", items: ["Gemini", "Claude", "Codex"] },
];

function Row({ label, items, index }: { label: string; items: string[]; index: number }) {
  const { t } = useLang();
  const name =
    label === "__DEPLOY" ? t("stack_deploy") : label === "__ECO" ? t("stack_eco") : label === "__MOBILE" ? t("stack_mobile") : label === "__AI" ? t("stack_ai") : label;
  return (
    <div data-st-row className="relative grid grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-t border-line last:border-b items-baseline">
      <div className="col-span-12 sm:col-span-3 flex items-center gap-4">
        <span className="relative z-10 w-2.5 h-2.5 bg-navy shrink-0" />
        <p className="mono text-[10px] sm:text-[11px] tracking-[0.24em] text-navy font-semibold">{name}</p>
        <span className="mono text-[9px] text-smoke/60">0{index + 1}</span>
      </div>
      <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-x-6 gap-y-2">
        {items.map((it) => (
          <span key={it} data-st-item className="display- font-bold text-ink text-xl sm:text-3xl hover:text-navy transition-colors duration-300">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-st-line]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: "[data-st-rows]", start: "top 80%", end: "bottom 40%", scrub: 0.5 } }
      );
      gsap.utils.toArray<HTMLElement>("[data-st-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: row, start: "top 88%" } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-pure py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="07" text={t("stack_kicker")} />
        <div className="mt-10 mb-14 max-w-3xl">
          <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(36px, 5vw, 76px)" }}>
            {t("stack_title")}
          </h2>
        </div>

        <div className="relative">
          <div data-st-line className="absolute left-[4px] top-0 bottom-0 w-px bg-navy/30 hidden sm:block" />
          <div data-st-rows className="sm:pl-10">
            {ROWS.map((r, i) => (
              <Row key={r.label} label={r.label} items={r.items} index={i} />
            ))}
          </div>
        </div>

        <FadeUp className="mt-12 max-w-2xl">
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-smoke italic border-l-2 border-navy pl-5">{t("stack_note")}</p>
        </FadeUp>
      </div>
    </section>
  );
}
