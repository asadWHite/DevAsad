import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, RotateCcw, Send } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";
import { services, fmtUZS } from "../data/services";
import { tgUrl } from "../data/contacts";

const CX: Record<string, number> = { basic: 1, standard: 1.55, advanced: 2.2 };
const LANG_MULT: Record<number, number> = { 1: 1, 2: 1.12, 3: 1.22 };
const INTS = ["est_none", "TELEGRAM", "PAYMENT", "MAPS", "AI", "CRM"] as const;
const INT_ADD = 0.06;

export default function Estimator() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [svcId, setSvcId] = useState<string>("websites");
  const [cx, setCx] = useState<string>("standard");
  const [langsN, setLangsN] = useState(2);
  const [ints, setInts] = useState<Set<string>>(new Set());
  const wrapRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLSpanElement>(null);

  const svc = services.find((s) => s.id === svcId)!;
  const base = Math.min(...svc.levels.filter((l) => l.price > 0).map((l) => l.price));
  const range = useMemo(() => {
    const lo = base * CX[cx] * LANG_MULT[langsN] * (1 + ints.size * INT_ADD);
    return { lo, hi: lo * 1.38 };
  }, [base, cx, langsN, ints]);

  const go = (n: number) => {
    if (!wrapRef.current) return setStep(n);
    gsap.fromTo(
      wrapRef.current.children,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
    );
    if (n === 4 && resultRef.current) {
      const o = { v: 0 };
      gsap.to(o, {
        v: range.lo,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          if (resultRef.current) resultRef.current.textContent = fmtUZS(o.v);
        },
      });
    }
    setStep(n);
  };

  const toggleInt = (k: string) => {
    if (k === "est_none") return setInts(new Set());
    setInts((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  };

  const steps = [t("est_q1"), t("est_q2"), t("est_q3"), t("est_q4"), t("est_result").toUpperCase()];
  const option = "px-5 py-4 mono text-[10px] sm:text-[11px] tracking-[0.14em] border transition-all duration-300 text-left";
  const on = "bg-navy text-paper border-navy";
  const off = "border-line text-ink/70 hover:border-navy hover:text-navy";

  const message = `${t("ct_start")}\n— ${t(svc.titleKey)}\n— ${t("est_q2")}: ${t("est_" + cx)}\n— ${t("est_q3")}: ${langsN}\n— ${t("est_q4")}: ${ints.size ? [...ints].join(", ") : t("est_none")}\n— ${t("est_result")}: ${fmtUZS(range.lo)}–${fmtUZS(range.hi)} ${t("svc_uzs")}`;
  const tg = tgUrl(message);

  return (
    <section className="relative bg-pure py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        {/* how pricing works */}
        <FadeUp className="mb-16 border border-line bg-paper p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="mono text-[9px] tracking-[0.26em] text-navy">{t("prc_kicker")}</p>
              <h3 className="display- mt-3 font-extrabold text-ink text-3xl sm:text-4xl">{t("prc_title")}</h3>
            </div>
            <div className="lg:col-span-7">
              <p className="mono text-[10px] sm:text-[11px] leading-loose tracking-[0.08em] text-ink/70">{t("prc_formula")}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-smoke">{t("prc_note")}</p>
            </div>
          </div>
          <span aria-hidden className="absolute -right-6 -bottom-8 display- font-extrabold text-navy/[0.05] select-none" style={{ fontSize: 180 }}>
            =
          </span>
        </FadeUp>

        <SectionLabel index="04" text={t("est_kicker")} right={`${t("est_step")} 0${step + 1} / 05`} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="estimator" className="display- font-extrabold text-ink scroll-mt-32" style={{ fontSize: "clamp(40px, 5.5vw, 84px)" }}>
              {t("est_title")}
            </h2>
            <div className="mt-8 flex gap-1.5 max-w-xs">
              {steps.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 bg-line overflow-hidden">
                  <div className={`h-full bg-navy origin-left transition-transform duration-500 ${i <= step ? "scale-x-100" : "scale-x-0"}`} />
                </div>
              ))}
            </div>
            <p className="mono mt-4 text-[9px] tracking-[0.22em] text-smoke">{steps[step].toUpperCase()}</p>
            <p className="mt-8 text-[13px] leading-relaxed text-smoke max-w-xs">{t("est_disclaimer")}</p>
          </div>

          <div className="lg:col-span-8 min-h-[340px]">
            <div ref={wrapRef} key={step}>
              {step === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {services.map((s) => (
                    <button key={s.id} onClick={() => setSvcId(s.id)} className={`${option} ${svcId === s.id ? on : off}`}>
                      <span className="font-semibold">{t(s.titleKey)}</span>
                      <span className="block mt-1 text-[9px] opacity-70">
                        {t("svc_from")} {fmtUZS(Math.min(...s.levels.filter((l) => l.price > 0).map((l) => l.price)))} {t("svc_uzs")}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-2.5 max-w-lg">
                  {(["basic", "standard", "advanced"] as const).map((k) => (
                    <button key={k} onClick={() => setCx(k)} className={`${option} ${cx === k ? on : off} flex justify-between items-center`}>
                      <span className="font-semibold">{t("est_" + k)}</span>
                      <span className="text-[9px] opacity-70">×{CX[k]}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-2.5 max-w-lg">
                  {[1, 2, 3].map((n) => (
                    <button key={n} onClick={() => setLangsN(n)} className={`${option} ${langsN === n ? on : off} flex justify-between items-center`}>
                      <span className="font-semibold">
                        {n} — {n === 1 ? "UZ" : n === 2 ? "UZ + RU" : "UZ + RU + EN"}
                      </span>
                      <span className="text-[9px] opacity-70">×{LANG_MULT[n]}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-wrap gap-2.5">
                  {INTS.map((k) => {
                    const key = k === "est_none" ? "est_none" : k;
                    const active = key === "est_none" ? ints.size === 0 : ints.has(key);
                    return (
                      <button key={key} onClick={() => toggleInt(key)} className={`${option} ${active ? on : off}`}>
                        {key === "est_none" ? t("est_none") : key}
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 4 && (
                <div className="bg-abyss text-paper p-7 sm:p-10">
                  <p className="mono text-[9px] tracking-[0.26em] text-paper/50">{t("est_result")}</p>
                  <p className="display- mt-4 font-extrabold leading-none" style={{ fontSize: "clamp(34px, 5vw, 72px)" }}>
                    <span ref={resultRef}>{fmtUZS(range.lo)}</span>
                    <span className="text-paper/40"> – </span>
                    {fmtUZS(range.hi)}
                    <span className="mono ml-3 text-[11px] tracking-[0.2em] font-normal text-paper/60">{t("svc_uzs")}</span>
                  </p>
                  <p className="mono mt-5 text-[9px] tracking-[0.16em] text-paper/50 leading-relaxed">{t("est_disclaimer")}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {tg ? (
                      <a href={tg} target="_blank" rel="noopener noreferrer" data-cursor="open" className="inline-flex items-center gap-3 bg-paper text-navy px-6 py-4 mono text-[10px] tracking-[0.18em] font-semibold hover:bg-navy hover:text-paper border border-paper hover:border-paper/30 transition-colors">
                        <Send size={13} /> {t("est_send")}
                      </a>
                    ) : (
                      <a href="#contact" data-cursor="link" className="inline-flex items-center gap-3 bg-paper text-navy px-6 py-4 mono text-[10px] tracking-[0.18em] font-semibold hover:bg-navy hover:text-paper border border-paper transition-colors">
                        <Send size={13} /> {t("svc_quote")}
                      </a>
                    )}
                    <button onClick={() => { setInts(new Set()); setStep(0); }} className="inline-flex items-center gap-2 mono text-[10px] tracking-[0.18em] text-paper/60 hover:text-paper px-4 py-4">
                      <RotateCcw size={13} /> {t("est_restart")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* controls */}
            {step < 4 && (
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => go(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 mono text-[10px] tracking-[0.18em] text-smoke hover:text-navy disabled:opacity-30 px-3 py-3"
                >
                  <ArrowLeft size={13} /> {t("est_back")}
                </button>
                <button
                  onClick={() => go(step + 1)}
                  data-cursor="link"
                  className="inline-flex items-center gap-3 bg-navy text-paper px-7 py-4 mono text-[10px] tracking-[0.18em] font-semibold hover:bg-abyss transition-colors"
                >
                  {t("est_next")} <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
