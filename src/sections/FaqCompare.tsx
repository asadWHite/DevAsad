import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";

const COMPARE = [
  { title: "s1_t", price: "2.5M+", purpose: "cmp_web", client: "cmp_web_c", feat: "lv_landing" },
  { title: "s4_t", price: "8M+", purpose: "cmp_webapp", client: "cmp_webapp_c", feat: "lv_webapp" },
  { title: "s3_t", price: "5M+", purpose: "cmp_miniapp", client: "cmp_miniapp_c", feat: "lv_miniapp" },
];

const FAQS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function FaqCompare() {
  const { t } = useLang();
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative bg-paper py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        {/* comparison */}
        <SectionLabel index="05" text={t("cmp_kicker")} />
        <h2 className="display- mt-10 mb-12 font-extrabold text-ink" style={{ fontSize: "clamp(36px, 5vw, 76px)" }}>
          {t("cmp_title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          {COMPARE.map((c, i) => (
            <div key={c.title} className="group bg-paper p-7 sm:p-9 hover:bg-navy transition-colors duration-500">
              <p className="mono text-[9px] tracking-[0.22em] text-navy group-hover:text-paper/50">0{i + 1}</p>
              <h3 className="display- mt-4 font-extrabold text-ink group-hover:text-paper text-2xl sm:text-3xl transition-colors">{t(c.title)}</h3>
              <p className="display- mt-3 font-extrabold text-navy group-hover:text-paper text-xl transition-colors">
                {c.price} <span className="mono text-[9px] tracking-[0.16em] font-normal group-hover:text-paper/50">UZS</span>
              </p>
              <div className="mt-7 space-y-4">
                <div>
                  <p className="mono text-[8px] tracking-[0.22em] text-smoke group-hover:text-paper/40">{t("cmp_purpose")}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 group-hover:text-paper/80">{t(c.purpose)}</p>
                </div>
                <div>
                  <p className="mono text-[8px] tracking-[0.22em] text-smoke group-hover:text-paper/40">{t("cmp_features")}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 group-hover:text-paper/80">{t(c.feat)}</p>
                </div>
                <div>
                  <p className="mono text-[8px] tracking-[0.22em] text-smoke group-hover:text-paper/40">{t("cmp_client")}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/70 group-hover:text-paper/80">{t(c.client)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionLabel index="06" text={t("faq_kicker")} />
            <h2 className="display- mt-8 font-extrabold text-ink" style={{ fontSize: "clamp(40px, 5vw, 84px)" }}>
              {t("faq_title")}
              <span className="text-navy">.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((n, i) => {
              const isOpen = open === i;
              return (
                <FadeUp key={n} delay={i * 0.03} className="border-t border-line last:border-b">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-5 sm:py-6 text-left group"
                  >
                    <span className={`display- font-bold text-[16px] sm:text-[19px] transition-colors duration-300 ${isOpen ? "text-navy" : "text-ink group-hover:text-navy"}`}>
                      {t(`q${n}`)}
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
                      <p className="pb-6 pr-10 text-[14px] sm:text-[15px] leading-relaxed text-ink/70 max-w-2xl">{t(`a${n}`)}</p>
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
