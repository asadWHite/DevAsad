import { Plus } from "lucide-react";
import { useI18n } from "@/i18n";
import { SectionLabel, RevealLine, FadeUp } from "@/components/ui";

export default function NowNext() {
  const { t } = useI18n();
  const nowItems = [
    { t: "now.b1t", b: "now.b1b" },
    { t: "now.b2t", b: "now.b2b" },
    { t: "now.b3t", b: "now.b3b" },
    { t: "now.b4t", b: "now.b4b" },
  ] as const;
  const nextItems = ["next.i1", "next.i2", "next.i3", "next.i4", "next.i5", "next.i6"] as const;

  return (
    <>
      {/* ---------------- NOW — calm ---------------- */}
      <section className="relative bg-pure py-24 sm:py-36 border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
          <SectionLabel index="10" text={t("now.kicker")} right="2026" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <RevealLine>
                <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(56px, 8vw, 120px)" }}>
                  {t("now.title")}
                  <span className="text-navy">.</span>
                </h2>
              </RevealLine>
              <FadeUp delay={0.2} className="mt-6 mono text-[10px] tracking-[0.24em] text-smoke">
                <p className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse-dot" /> {t("hero.availability")}
                </p>
              </FadeUp>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2">
              {nowItems.map((it, i) => {
                const borders =
                  i === 0 ? "border-b sm:border-r" : i === 1 ? "border-b" : i === 2 ? "border-b sm:border-b-0 sm:border-r" : "";
                return (
                <FadeUp key={it.t} delay={i * 0.07} className={`border-line p-7 sm:p-10 ${borders}`}>
                  <p className="mono text-[9px] tracking-[0.26em] text-navy">0{i + 1}</p>
                  <h3 className="display- mt-4 font-extrabold text-ink text-2xl sm:text-3xl">{t(it.t)}</h3>
                  <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-ink/65">{t(it.b)}</p>
                </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- NEXT — dark navy ---------------- */}
      <section id="next" className="relative bg-abyss text-paper py-24 sm:py-36">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
          <SectionLabel dark index="11" text={t("next.kicker")} />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <RevealLine>
                <h2 className="display- font-extrabold text-paper" style={{ fontSize: "clamp(42px, 6vw, 90px)" }}>
                  {t("next.title")}
                </h2>
              </RevealLine>
              <FadeUp delay={0.15}>
                <p className="mt-6 text-[15px] sm:text-[16px] leading-relaxed text-paper/60 max-w-md">{t("next.lead")}</p>
              </FadeUp>
              <FadeUp delay={0.25} className="mt-10" aria-hidden>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className={`h-16 sm:h-20 w-px ${i === 0 ? "bg-paper" : "bg-paper/20"}`} style={{ transform: `rotate(${18 + i * 14}deg)` }} />
                  ))}
                </div>
              </FadeUp>
            </div>
            <div className="lg:col-span-7">
              {nextItems.map((n, i) => (
                <FadeUp key={n} delay={i * 0.05} className="group flex items-start gap-5 border-t border-paper/15 py-5 sm:py-6 last:border-b hover:bg-paper/[0.04] transition-colors duration-300 px-2 sm:px-4">
                  <span className="mono text-[9px] tracking-[0.2em] text-paper/40 pt-1.5 w-8 shrink-0">0{i + 1}</span>
                  <p className="display- flex-1 font-bold text-paper/90 group-hover:text-paper text-[17px] sm:text-[22px] leading-snug transition-all duration-300 group-hover:translate-x-2">
                    {t(n)}
                  </p>
                  <Plus size={16} className="mt-1.5 text-paper/40 group-hover:text-paper group-hover:rotate-90 transition-all duration-500 shrink-0" />
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
