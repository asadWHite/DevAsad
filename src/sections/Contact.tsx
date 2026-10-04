import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n";
import { SectionLabel, FadeUp } from "@/components/ui";
import Magnetic from "@/components/Magnetic";
import { tgUrl, contacts } from "@/data/contacts";
import TelegramIcon from "@/components/TelegramIcon";

gsap.registerPlugin(ScrollTrigger);

/* Labels come from the message tree; the domains are brand names (§16). */
const PROJECT_LINKS = [
  { labelKey: "contact.projects.kashmir", value: "kashmirdecor.uz", href: "https://kashmirdecor.uz/" },
  { labelKey: "contact.projects.ustatop", value: "ustatop360.uz", href: "https://ustatop360.uz/" },
  { labelKey: "contact.projects.hub", value: "ustatopinst.vercel.app", href: "https://ustatopinst.vercel.app/" },
] as const;

export default function Contact() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-c-line]").forEach((el, i) => gsap.fromTo(el, { yPercent: 115 }, { yPercent: 0, duration: 1.2, delay: i * .1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%" } }));
      gsap.fromTo("[data-c-fill]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power4.inOut", scrollTrigger: { trigger: "[data-c-final]", start: "top 78%" } });
      gsap.fromTo("[data-c-name]", { yPercent: 30 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-c-footer]", start: "top bottom", end: "bottom bottom", scrub: .6 } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative bg-abyss text-paper overflow-hidden border-t border-paper/10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 pt-24 sm:pt-36">
        <SectionLabel dark index="12" text={t("contact.kicker")} />
        <h2 className="display- mt-14 font-extrabold leading-[0.95]" style={{ fontSize: "clamp(44px, 8.2vw, 130px)" }}>
          <span className="mask-line"><span data-c-line>{t("contact.l1")}</span></span>
          <span className="mask-line"><span data-c-line className="text-stroke text-paper/85">{t("contact.l2")}</span></span>
          <span className="mask-line"><span data-c-line>{t("contact.l3")}</span></span>
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <FadeUp className="lg:col-span-7">
            <p className="mono text-[9px] tracking-[0.26em] text-paper/50 mb-5">{t("contact.start")}</p>
            <p className="max-w-xl text-[20px] sm:text-[28px] leading-tight text-paper/80">{t("contact.directNote")}</p>
            <Magnetic strength={.35}>
              <a href={tgUrl()} target="_blank" rel="noopener noreferrer" data-cursor="talk"
                className="group mt-9 inline-flex items-center justify-center gap-3 bg-paper text-navy px-8 py-5 mono text-[11px] tracking-[.18em] font-semibold hover:bg-navy hover:text-paper border border-paper transition-colors duration-500">
                <TelegramIcon size={17} /> {t("contact.cta")} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Magnetic>
            <p className="mt-5 mono text-[11px] tracking-[.16em] text-paper/55">@{contacts.telegram}</p>
          </FadeUp>

          <FadeUp delay={.2} className="lg:col-span-5">
            <div className="border border-paper/15 p-6 sm:p-8">
              <p className="mono text-[9px] tracking-[.24em] text-paper/45">{t("contact.links")}</p>
              <div className="mt-4 border-b border-paper/15">
                {PROJECT_LINKS.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border-t border-paper/15 py-3.5 px-1">
                  <span className="mono text-[8px] tracking-[.2em] text-paper/40 w-24 shrink-0">{t(l.labelKey)}</span><span className="mono flex-1 text-[12px] text-paper/80 group-hover:text-paper">{l.value}</span><ArrowUpRight size={14} className="text-paper/40" />
                </a>)}
              </div>
            </div>
          </FadeUp>
        </div>

        <div data-c-final className="mt-28 sm:mt-40 text-center"><p className="mono text-[9px] tracking-[.3em] text-paper/40">{t("footer.copyright")} — {t("intro.loc")}</p><p className="relative mt-8 display- font-extrabold leading-none" style={{ fontSize: "clamp(40px, 7.5vw, 120px)" }}><span className="text-stroke text-paper/60">{t("contact.more")}</span><span data-c-fill className="absolute inset-0 text-paper" aria-hidden>{t("contact.more")}</span></p></div>
      </div>
      <footer data-c-footer className="relative mt-20 sm:mt-28 pt-14 pb-8 overflow-hidden"><div className="mx-auto max-w-[1600px] px-5 sm:px-10"><div className="h-px w-full bg-paper/15" /><div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10"><div className="overflow-hidden"><p data-c-name className="foot-name display- font-extrabold text-paper leading-[.85]" style={{ fontSize: "clamp(56px, 11vw, 190px)" }}>Dev.Асад</p></div><div className="mono text-[9px] leading-loose tracking-[.2em] text-paper/50 sm:text-right"><p>{t("footer.note")}</p><p className="mt-2 text-paper/70">{t("footer.rights")}</p></div></div><div className="mt-10 flex items-center justify-between"><p className="mono text-[9px] tracking-[.24em] text-paper/40">{t("footer.stamp")}</p><a href="#top" className="group inline-flex items-center gap-3 mono text-[9px] tracking-[.24em] text-paper/60 hover:text-paper">{t("nav.top")}<span className="w-8 h-8 border border-paper/25 rounded-full flex items-center justify-center"><ArrowUp size={12} /></span></a></div></div></footer>
    </section>
  );
}
