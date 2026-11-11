import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n";
import { SectionLabel } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { t: "process.s1", b: "process.b1" },
  { t: "process.s2", b: "process.b2" },
  { t: "process.s3", b: "process.b3" },
  { t: "process.s4", b: "process.b4" },
  { t: "process.s5", b: "process.b5" },
  { t: "process.s6", b: "process.b6" },
  { t: "process.s7", b: "process.b7" },
  { t: "process.s8", b: "process.b8" },
] as const;

export default function Process() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cur = useRef(-1);
  const [step, setStep] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-p-word]");
      const descs = gsap.utils.toArray<HTMLElement>("[data-p-desc]");
      gsap.set(words, { clipPath: "inset(0 0 100% 0)", autoAlpha: 0, yPercent: 40 });
      gsap.set(descs, { autoAlpha: 0, y: 24 });

      const activate = (i: number, down: boolean) => {
        if (i === cur.current) return;
        const prev = cur.current;
        cur.current = i;
        setStep(i);
        if (prev >= 0) {
          gsap.to(words[prev], { autoAlpha: 0, yPercent: down ? -35 : 35, filter: "blur(6px)", duration: 0.35, ease: "power2.in", overwrite: "auto" });
          gsap.to(descs[prev], { autoAlpha: 0, y: down ? -18 : 18, duration: 0.28, ease: "power2.in", overwrite: "auto" });
        }
        gsap.fromTo(
          words[i],
          { clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", autoAlpha: 1, yPercent: down ? 40 : -40, filter: "blur(0px)", letterSpacing: "0.08em" },
          { clipPath: "inset(0% 0 0% 0)", yPercent: 0, letterSpacing: "-0.04em", duration: 0.7, ease: "power4.inOut", overwrite: "auto" }
        );
        gsap.fromTo(descs[i], { autoAlpha: 0, y: down ? 22 : -22 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power3.out", overwrite: "auto" });
      };

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length * 0.999));
          activate(i, self.direction >= 0);
        },
        onEnter: () => activate(0, true),
        onRefresh: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            const i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length * 0.999));
            activate(i, true);
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" className="relative bg-navy text-paper">
      <div ref={wrapRef} className="relative h-[440vh] md:h-[720vh]">
        <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
          <div className="px-5 sm:px-10 pt-24 shrink-0">
            <SectionLabel dark index="08" text={t("process.kicker")} right={t("process.title")} />
          </div>

          <div className="flex-1 grid grid-cols-12 gap-6 px-5 sm:px-10 items-center min-h-0 py-6">
            <div className="col-span-12 lg:col-span-7 relative h-full flex flex-col justify-center min-h-0">
              <p className="mono text-[10px] tracking-[0.3em] text-paper/50 mb-4">
                <span className="text-paper font-semibold">0{step + 1}</span> / 08
              </p>
              <div className="relative h-[130px] sm:h-[200px] lg:h-[260px]">
                {STEPS.map((s) => (
                  <h3 key={s.t} data-p-word className="display- absolute inset-0 flex items-center font-extrabold text-paper will-change-transform" style={{ fontSize: "clamp(52px, 9.5vw, 150px)" }}>
                    {t(s.t)}
                  </h3>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9 relative min-h-[110px]">
              {STEPS.map((s) => (
                <p key={s.b} data-p-desc className="absolute inset-0 text-[14px] sm:text-[17px] leading-relaxed text-paper/75 max-w-md">
                  {t(s.b)}
                </p>
              ))}
            </div>
          </div>

          {/* version strip + progress */}
          <div className="shrink-0 px-5 sm:px-10 pb-8">
            <div className="mono text-[9px] tracking-[0.22em] text-paper/50 flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5">
              <span className={step <= 4 ? "text-paper" : ""}>{t("process.v1")}</span>
              <span>→</span><span className={step === 5 ? "text-paper" : ""}>{t("process.problem")}</span>
              <span>→</span><span className={step === 6 ? "text-paper" : ""}>{t("process.iteration")}</span>
              <span>→</span><span className={step >= 7 ? "text-paper" : ""}>{t("process.v2")}</span>
            </div>
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 bg-paper/15 overflow-hidden">
                  <div className={`h-full bg-paper origin-left transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)] ${i <= step ? "scale-x-100" : "scale-x-0"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
