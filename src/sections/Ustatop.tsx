import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Bot, Smartphone, ShieldCheck, Clock3, MapPin, Star, BadgeCheck } from "lucide-react";
import { useI18n } from "@/i18n";
import { SectionLabel, FadeUp } from "@/components/ui";
import { projects, statusMessageKey } from "@/data/projects";
import Magnetic from "@/components/Magnetic";
import TelegramIcon from "@/components/TelegramIcon";
import { tgUrl, contacts } from "@/data/contacts";
import {
  UT_STAGES,
  UT_PROBLEMS,
  UT_CATEGORIES,
  UT_MASTER_SIDE,
  UT_MASTER_LABELS,
  UT_TRUST,
  UT_REGIONS,
  UT_REGIONS_HEAD,
  UT_CHANNELS,
  UT_EXAMPLE_REQUEST,
  UT_MATCH_STEPS,
  UT_FLOW,
  UT_ANALYSING,
  UT_SYSTEM,
  UT_BEFORE_AFTER,
  UT_BEFORE_AFTER_BODY,
  UT_SERVICES_TITLE,
  UT_WAIT,
  UT_HUB,
  UT_BOT,
  UT_MOBILE,
} from "@/data/case-ustatop";

gsap.registerPlugin(ScrollTrigger);

export default function Ustatop() {
  const { t, loc } = useI18n();
  const root = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cur = useRef(-1);
  const [stage, setStage] = useState(0);
  const p = projects[1]!;

  /* every localized value is resolved once, in one place */
  const problems = loc(UT_PROBLEMS);
  const categories = loc(UT_CATEGORIES);
  const masterSide = loc(UT_MASTER_SIDE);
  const trust = loc(UT_TRUST);
  const regions = loc(UT_REGIONS);
  const channels = loc(UT_CHANNELS);
  const matchSteps = loc(UT_MATCH_STEPS);
  const beforeAfter = loc(UT_BEFORE_AFTER);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>("[data-u-word]");
      const descs = gsap.utils.toArray<HTMLElement>("[data-u-desc]");
      const figs = gsap.utils.toArray<HTMLElement>("[data-u-fig]");

      gsap.set(words, { yPercent: 120, autoAlpha: 0 });
      gsap.set(descs, { y: 24, autoAlpha: 0 });
      gsap.set(figs, { clipPath: "inset(100% 0% 0% 0%)", visibility: "hidden" });

      const activate = (i: number, down: boolean) => {
        if (i === cur.current) return;
        const prev = cur.current;
        cur.current = i;
        setStage(i);

        if (prev >= 0) {
          gsap.to(words[prev], { yPercent: down ? -120 : 120, autoAlpha: 0, duration: 0.42, ease: "power2.in", overwrite: "auto" });
          gsap.to(descs[prev], { y: down ? -20 : 20, autoAlpha: 0, duration: 0.32, ease: "power2.in", overwrite: "auto" });
        }
        gsap.fromTo(
          words[i],
          { yPercent: down ? 120 : -120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.62, ease: "power4.out", overwrite: "auto" }
        );
        gsap.fromTo(descs[i], { y: down ? 26 : -26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, delay: 0.08, ease: "power3.out", overwrite: "auto" });

        const enterFrom = down ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
        figs.forEach((f, fi) => {
          if (fi === i) {
            gsap.set(f, { visibility: "visible", zIndex: 10, clipPath: enterFrom });
            gsap.to(f, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power4.inOut", overwrite: "auto" });
          } else if (fi === prev) {
            gsap.set(f, { zIndex: 5 });
            gsap.to(f, {
              clipPath: down ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
              duration: 0.85,
              ease: "power4.inOut",
              overwrite: "auto",
              onComplete: () => gsap.set(f, { visibility: "hidden" }),
            });
          }
        });
      };

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(UT_STAGES.length - 1, Math.floor(self.progress * UT_STAGES.length * 0.999));
          activate(i, self.direction >= 0);
        },
        onEnter: () => activate(0, true),
        onEnterBack: () => activate(cur.current === -1 ? 0 : cur.current, false),
        onRefresh: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            const i = Math.min(UT_STAGES.length - 1, Math.floor(self.progress * UT_STAGES.length * 0.999));
            activate(i, true);
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  /* ─────────────── the seven panels ─────────────── */

  const panels = [
    /* 01 — real problem chips */
    <div key="p1" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-pure">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">{loc(UT_STAGES[0]!.kicker)}</p>
      <div className="flex flex-wrap gap-2">
        {problems.map((x) => (
          <span key={x} className="mono text-[10px] sm:text-[11px] tracking-[0.06em] border border-line bg-paper px-3.5 py-2.5 text-ink">
            {x}
          </span>
        ))}
      </div>
      <p className="mono text-[8px] tracking-[0.18em] text-smoke mt-2">USTATOP360.UZ · {t("labels.realProject")}</p>
    </div>,

    /* 02 — the message becomes a request */
    <div key="p2" className="h-full flex flex-col justify-center gap-5 p-6 sm:p-10 bg-navy text-paper">
      <p className="mono text-[9px] tracking-[0.24em] text-paper/60">{loc(UT_STAGES[1]!.kicker)}</p>
      <p className="display- font-extrabold text-paper leading-tight" style={{ fontSize: "clamp(26px, 3.4vw, 52px)" }}>
        «{loc(UT_EXAMPLE_REQUEST)}»
      </p>
      <div className="grid grid-cols-2 gap-2">
        {channels.map((c, i) => (
          <div key={c.n} className="border border-paper/20 px-3 py-2.5">
            <p className="mono text-[8px] tracking-[0.2em] text-paper/50">0{i + 1}</p>
            <p className="mono text-[9px] tracking-[0.18em] text-paper mt-1">{c.n}</p>
            <p className="text-[10px] leading-snug text-paper/60 mt-1">{c.d}</p>
          </div>
        ))}
      </div>
      <p className="mono text-[9px] tracking-[0.18em] text-paper/60 leading-loose">{loc(UT_FLOW)}</p>
    </div>,

    /* 03 — mechanics preview */
    <div key="p3" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-mist">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">{loc(UT_STAGES[2]!.kicker)}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {matchSteps.map((x, i) => (
          <div key={x} className="border border-steel/20 bg-pure p-4">
            <p className="mono text-[8px] tracking-[0.2em] text-smoke">0{i + 1}</p>
            <p className="display- mt-2 font-bold text-ink text-[13px] sm:text-[14px] leading-snug">{x}</p>
          </div>
        ))}
      </div>
      <p className="mono text-[8px] tracking-[0.16em] text-steel">
        {t("labels.uiDemo")} · USTATOP360.UZ · {loc(UT_ANALYSING)}
      </p>
      <a href="https://ustatop360.uz/" target="_blank" rel="noopener noreferrer" data-cursor="open" className="u-sweep mono text-[10px] tracking-[0.18em] text-navy w-fit">
        {t("actions.tryIt")} ↗
      </a>
    </div>,

    /* 04 — work proof: before / after */
    <div key="p4" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-pure">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">{loc(UT_STAGES[3]!.kicker)}</p>
      <div className="grid grid-cols-3 gap-2">
        {beforeAfter.map((x) => (
          <div key={x} className="aspect-[3/4] border border-line bg-paper flex items-end p-3">
            <span className="mono text-[8px] sm:text-[9px] tracking-[0.16em] text-smoke">{x}</span>
          </div>
        ))}
      </div>
      <p className="text-[12px] leading-relaxed text-ink/65">{loc(UT_BEFORE_AFTER_BODY)}</p>
    </div>,

    /* 05 — trust + verification + the master's side */
    <div key="p5" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-navy text-paper">
      <p className="mono text-[9px] tracking-[0.24em] text-paper/60">{loc(UT_STAGES[5]!.kicker)}</p>
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 border border-paper/30 rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck size={20} />
        </span>
        <p className="display- font-extrabold leading-tight" style={{ fontSize: "clamp(16px, 2vw, 28px)" }}>
          {trust[0]!.n}
        </p>
      </div>
      <p className="text-[13px] leading-relaxed text-paper/70">{trust[0]!.d}</p>
      <div className="grid grid-cols-2 gap-2">
        {trust.slice(1).map((x, i) => (
          <div key={x.n} className="border border-paper/20 px-3.5 py-3">
            <p className="mono text-[8px] tracking-[0.2em] text-paper/50">0{i + 2}</p>
            <p className="display- mt-1.5 font-bold text-paper text-[11px] sm:text-[12px] leading-snug">{x.n}</p>
            <p className="text-[9px] leading-snug text-paper/55 mt-1">{x.d}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-paper/15 pt-3">
        {masterSide.map((x, i) => (
          <div key={x} className="mono text-[9px] tracking-[0.12em] text-paper/80">
            0{i + 1} — {x}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mono text-[8px] tracking-[0.16em] text-paper/50">
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={11} /> {loc(UT_MASTER_LABELS.accept)}</span>
        <span className="inline-flex items-center gap-1.5"><Star size={11} /> {loc(UT_MASTER_LABELS.rating)}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin size={11} /> {loc(UT_MASTER_LABELS.distance)}</span>
      </div>
    </div>,

    /* 06 — service catalogue + waitlist */
    <div key="p6" className="h-full flex flex-col justify-center gap-3 p-6 sm:p-10 bg-pure overflow-hidden">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">{loc(UT_STAGES[6]!.kicker)}</p>
      <p className="display- font-bold text-ink text-[15px] sm:text-[18px] leading-tight">{loc(UT_SERVICES_TITLE)}</p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
        {categories.map((c) => (
          <div key={c.n} className="border-b border-line pb-2">
            <p className="display- font-bold text-ink text-[13px] sm:text-[15px]">{c.n}</p>
            <p className="text-[10px] text-smoke leading-snug mt-0.5 hidden sm:block">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center gap-3 bg-navy text-paper px-4 py-3">
        <Clock3 size={14} className="shrink-0" />
        <p className="mono text-[8px] sm:text-[9px] tracking-[0.14em] leading-snug">
          {loc(UT_WAIT.soon)} — {loc(UT_WAIT.l1)} {loc(UT_WAIT.l2)} · {loc(UT_WAIT.title)}
        </p>
      </div>
    </div>,

    /* 07 — coverage map */
    <div key="p7" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-mist">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">{loc(UT_STAGES[6]!.kicker)}</p>
      <div className="flex flex-wrap gap-1.5">
        {regions.map((r) => (
          <span key={r} className="mono text-[9px] sm:text-[10px] tracking-[0.08em] border border-steel/25 bg-pure px-2.5 py-1.5 text-ink">
            {r}
          </span>
        ))}
      </div>
      <p className="mono text-[8px] tracking-[0.18em] text-steel">{loc(UT_REGIONS_HEAD)}</p>
      <p className="text-[12px] leading-relaxed text-ink/65">{loc(UT_STAGES[6]!.body)}</p>
    </div>,
  ];

  return (
    <section ref={root} className="relative bg-pure">
      {/* ------------ PINNED DOCUMENTARY (real content, no fake screens) ------------ */}
      <div ref={wrapRef} className="relative h-[380vh] md:h-[620vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-pure">
          <div className="px-5 sm:px-10 pt-24 shrink-0">
            <SectionLabel
              index={p.number}
              text={p.brand}
              right={`${t("labels.status")}: ${t(statusMessageKey[p.status])}`}
            />
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-5 sm:px-10 py-6 min-h-0">
            <div className="relative flex flex-col justify-center min-h-0">
              <p className="mono text-[10px] tracking-[0.3em] text-smoke mb-6">{loc(UT_SYSTEM)}</p>
              <div className="relative h-[130px] sm:h-[200px] overflow-visible">
                {UT_STAGES.map((s) => (
                  <h3
                    key={s.n}
                    data-u-word
                    className="display- absolute inset-0 font-extrabold text-navy flex items-center"
                    style={{ fontSize: "clamp(34px, 6.4vw, 108px)" }}
                  >
                    {loc(s.title)}
                  </h3>
                ))}
              </div>
              <div className="relative h-[128px] sm:h-[120px] mt-4 max-w-xl">
                {UT_STAGES.map((s) => (
                  <p key={s.n} data-u-desc className="absolute inset-0 text-[13px] sm:text-[16px] leading-relaxed text-ink/75">
                    {loc(s.body)}
                  </p>
                ))}
              </div>
              <div className="mono mt-6 text-[10px] tracking-[0.24em] text-navy">
                <span className="text-ink font-semibold">0{stage + 1}</span> / {String(UT_STAGES.length).padStart(2, "0")}
              </div>
            </div>

            <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden border border-line">
              {panels.map((panel, i) => (
                <div key={i} data-u-fig className="absolute inset-0 overflow-hidden">
                  {panel}
                </div>
              ))}
              <div className="absolute top-3 right-3 mono text-[8px] tracking-[0.22em] bg-navy text-paper px-2.5 py-1.5 z-20">
                {t("labels.realContent")}
              </div>
            </div>
          </div>

          <div className="shrink-0 px-5 sm:px-10 pb-6">
            <div className="flex gap-1.5">
              {UT_STAGES.map((s, i) => (
                <div key={s.n} className="h-[3px] flex-1 bg-line overflow-hidden">
                  <div
                    className={`h-full bg-navy origin-left transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)] ${
                      i <= stage ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------ CASE STUDY: problem → solution → status → lessons ------------ */}
      <div className="relative bg-paper border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
          <SectionLabel index="UT" text={t("labels.caseStudy")} right={p.brand} />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {(["problem", "solution", "status", "lessons"] as const).map((k) => {
              const block = p.cs[k];
              if (!block) return null;
              return (
                <FadeUp key={k} className="border-t border-line pt-5">
                  <p className="mono text-[9px] tracking-[0.22em] text-navy">{loc(block.kicker)}</p>
                  <h4 className="display- mt-3 font-extrabold text-ink text-xl sm:text-2xl leading-tight">{loc(block.title)}</h4>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink/70">{loc(block.body)}</p>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------ ECOSYSTEM ------------ */}
      <div className="relative bg-paper py-24 sm:py-32 border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeUp>
              <h3 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}>
                {loc(UT_HUB.title)}
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-ink/75 max-w-md">{loc(UT_HUB.body)}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="https://ustatop360.uz/" target="_blank" rel="noopener noreferrer" data-cursor="open"
                    className="group inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.2em] px-5 py-3.5 bg-navy text-paper hover:bg-abyss transition-colors">
                    ustatop360.uz <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="https://ustatopinst.vercel.app/" target="_blank" rel="noopener noreferrer" data-cursor="open"
                    className="inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.2em] px-5 py-3.5 border border-line text-ink hover:border-navy hover:text-navy transition-colors">
                    social hub <ArrowUpRight size={13} />
                  </a>
                </Magnetic>
              </div>
            </FadeUp>

            <FadeUp className="border border-line p-6 sm:p-8 bg-pure">
              <div className="flex items-center gap-3 text-navy">
                <Bot size={18} />
                <p className="mono text-[10px] tracking-[0.24em]">{loc(UT_BOT.title)}</p>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{loc(UT_BOT.body)}</p>
              <a href={tgUrl()} target="_blank" rel="noopener noreferrer" data-cursor="talk" className="mt-4 inline-flex items-center gap-3 display- font-bold text-ink text-2xl sm:text-3xl hover:text-navy transition-colors">
                <TelegramIcon size={22} /> @{contacts.telegram}
              </a>
            </FadeUp>
          </div>

          {/* mobile direction — typography only, no fake screens */}
          <div className="lg:col-span-7">
            <FadeUp className="flex items-center gap-3 text-navy mb-6">
              <Smartphone size={16} />
              <p className="mono text-[10px] tracking-[0.24em]">{loc(UT_MOBILE.title)}</p>
              <span className="mono text-[9px] tracking-[0.18em] text-paper bg-steel px-2 py-1 ml-2">{t("status.experiment")}</span>
            </FadeUp>
            <div className="border border-line bg-abyss text-paper p-6 sm:p-8 overflow-hidden">
              <p className="mono text-[9px] tracking-[0.2em] text-paper/50 mb-4">~/ustatop-android</p>
              <pre className="mono text-[10px] sm:text-[11px] leading-[1.9] text-paper/80 overflow-x-auto">
{`// ${loc(UT_MOBILE.dir)}
val stack = listOf(
  "Kotlin", "Jetpack Compose",
  "Material 3", "MVVM",
  "Clean Architecture", "Hilt"
)
// ${loc(UT_MOBILE.status)}
// ${loc(UT_MOBILE.screens)}`}
              </pre>
            </div>
            <FadeUp className="mt-6">
              <p className="text-[15px] leading-relaxed text-ink/75 max-w-xl">{loc(UT_MOBILE.body)}</p>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ------------ WAITLIST CTA ------------ */}
      <div className="relative bg-abyss text-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 flex flex-col items-start gap-6">
          <p className="mono text-[9px] tracking-[0.26em] text-paper/50">{loc(UT_WAIT.soon)}</p>
          <h3 className="display- font-extrabold leading-[0.92]" style={{ fontSize: "clamp(30px, 5vw, 76px)" }}>
            <span className="block">{loc(UT_WAIT.l1)}</span>
            <span className="block text-paper/55">{loc(UT_WAIT.l2)}</span>
          </h3>
          <p className="display- font-extrabold text-paper text-2xl sm:text-4xl">{loc(UT_WAIT.title)}</p>
          <p className="text-[15px] leading-relaxed text-paper/70 max-w-xl">{loc(UT_WAIT.body)}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Magnetic>
              <a href={tgUrl()} target="_blank" rel="noopener noreferrer" data-cursor="talk"
                className="group inline-flex items-center gap-3 bg-paper text-navy px-6 py-4 mono text-[10px] tracking-[0.2em] font-semibold hover:bg-mist transition-colors">
                <TelegramIcon size={15} /> {loc(UT_WAIT.notify)}
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <span className="mono text-[9px] tracking-[0.2em] text-paper/45">{loc(UT_WAIT.follow)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
