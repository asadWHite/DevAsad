import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/i18n";
import { SectionLabel, FadeUp } from "@/components/ui";
import { services } from "@/data/services";

const serviceById = (id: string) => services.find((s) => s.id === id);

/* Rows reference service data + message keys — no literal copy here.
   §09 — the prices stay identical in every locale. */
const COMPARE = [
  {
    svc: "websites",
    price: "2.5M+",
    purpose: "compare.webPurpose",
    client: "compare.webClient",
  },
  {
    svc: "webapp",
    price: "8M+",
    purpose: "compare.webappPurpose",
    client: "compare.webappClient",
  },
  {
    svc: "miniapp",
    price: "5M+",
    purpose: "compare.miniappPurpose",
    client: "compare.miniappClient",
  },
] as const;

const FAQS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
] as const;

export default function FaqCompare() {
  const { t, loc } = useI18n();
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative bg-paper py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        {/* comparison */}
        <SectionLabel index="05" text={t("compare.kicker")} />
        <h2 className="display- mt-10 mb-12 font-extrabold text-ink" style={{ fontSize: "clamp(36px, 5vw, 76px)" }}>
          {t("compare.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          {COMPARE.map((c, i) => (
            <div key={c.svc} className="group bg-paper p-7 sm:p-9 hover:bg-navy transition-colors duration-500">
              <p className="mono text-[9px] tracking-[0.22em] text-navy group-hover:text-paper/50">0{i + 1}</p>
              <h3 className="display- mt-4 font-extrabold text-ink group-hover:text-paper text-2xl sm:text-3xl transition-colors">
                {loc(serviceById(c.svc)!.title)}
              </h3>
              <p className="display- mt-3 font-extrabold text-navy group-hover:text-paper text-xl transition-colors">
                {c.price} <span className="mono text-[9px] tracking-[0.16em] font-normal group-hover:text-paper/50">{t("services.uzs")}</span>
              </p>
              <div className="mt-7 space-y-4">
                <div>
                  <p className="mono text-[8px] tracking-[0.22em] text-smoke group-hover:text-paper/40">{t("compare.purpose")}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 group-hover:text-paper/80">{t(c.purpose)}</p>
                </div>
                <div>
                  <p className="mono text-[8px] tracking-[0.22em] text-smoke group-hover:text-paper/40">{t("compare.features")}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 group-hover:text-paper/80">{loc(serviceById(c.svc)!.included)}</p>
                </div>
                <div>
                  <p className="mono text-[8px] tracking-[0.22em] text-smoke group-hover:text-paper/40">{t("compare.client")}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 group-hover:text-paper/80">{t(c.client)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionLabel index="06" text={t("faq.kicker")} />
            <h2 className="display- mt-8 font-extrabold text-ink" style={{ fontSize: "clamp(40px, 5vw, 84px)" }}>
              {t("faq.title")}
              <span className="text-navy">.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((qa, i) => {
              const isOpen = open === i;
              return (
                <FadeUp key={qa.q} delay={i * 0.03} className="border-t border-line last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left group"
                  >
                    <span className={`display- font-bold text-[16px] sm:text-[19px] transition-colors duration-300 ${isOpen ? "text-navy" : "text-ink group-hover:text-navy"}`}>
                      {t(qa.q)}
                    </span>
                    <span className={`shrink-0 w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-400 ${isOpen ? "bg-navy border-navy text-paper" : "border-line text-smoke group-hover:border-navy group-hover:text-navy"}`}>
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.65,0,.35,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-[14px] sm:text-[15px] leading-relaxed text-ink/70 max-w-2xl">{t(qa.a)}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
