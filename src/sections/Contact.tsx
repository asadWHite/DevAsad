import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Send, AtSign, Copy, Check } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";
import Magnetic from "../components/Magnetic";
import { services } from "../data/services";
import { contacts, isSet, tgUrl, igUrl } from "../data/contacts";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_LINKS = [
  { label: "KASHMIR", value: "kashmirdecor.uz", href: "https://kashmirdecor.uz/" },
  { label: "USTATOP", value: "ustatop360.uz", href: "https://ustatop360.uz/" },
  { label: "SOCIAL HUB", value: "ustatopinst.vercel.app", href: "https://ustatopinst.vercel.app/" },
  { label: "TELEGRAM BOT", value: "@UstTop_bot", href: "https://t.me/UstTop_bot" },
];

export default function Contact() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [svcId, setSvcId] = useState("websites");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [copied, setCopied] = useState(false);

  /* preselect service coming from services section */
  useEffect(() => {
    const apply = () => {
      const id = sessionStorage.getItem("asdb-service");
      if (id) setSvcId(id);
    };
    apply();
    window.addEventListener("asdb-service", apply);
    return () => window.removeEventListener("asdb-service", apply);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-c-line]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, delay: i * 0.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
      gsap.fromTo(
        "[data-c-fill]",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power4.inOut", scrollTrigger: { trigger: "[data-c-final]", start: "top 78%" } }
      );
      gsap.fromTo(
        "[data-c-name]",
        { yPercent: 30 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: "[data-c-footer]", start: "top bottom", end: "bottom bottom", scrub: 0.6 } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const svc = services.find((s) => s.id === svcId);
  const message = [
    t("ct_start"),
    name ? `${t("cf_name")}: ${name}` : "",
    contact ? `Contact: ${contact}` : "",
    svc ? `${t("nav_services")}: ${t(svc.titleKey)}` : "",
    budget ? `${t("cf_budget").replace(/ \(.+\)/, "")}: ${budget}` : "",
    desc ? `${t("cf_desc")}: ${desc}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const tg = tgUrl(message);
  const ig = igUrl();

  const send = () => {
    if (tg) {
      window.open(tg, "_blank", "noopener");
    } else {
      navigator.clipboard?.writeText(message).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2600);
      });
    }
  };

  const input =
    "w-full bg-transparent border-b border-paper/25 focus:border-paper py-3.5 text-[15px] text-paper placeholder:text-paper/35 outline-none transition-colors duration-300";

  return (
    <section id="contact" ref={root} className="relative bg-abyss text-paper overflow-hidden border-t border-paper/10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 pt-24 sm:pt-36">
        <SectionLabel dark index="12" text={t("ct_kicker")} />

        <h2 className="display- mt-14 font-extrabold leading-[0.95]" style={{ fontSize: "clamp(44px, 8.2vw, 130px)" }}>
          <span className="mask-line"><span data-c-line>{t("ct_l1")}</span></span>
          <span className="mask-line"><span data-c-line className="text-stroke text-paper/85">{t("ct_l2")}</span></span>
          <span className="mask-line"><span data-c-line>{t("ct_l3")}</span></span>
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* personal CTAs */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeUp delay={0.2}>
              <p className="mono text-[9px] tracking-[0.26em] text-paper/50 mb-4">{t("ct_start")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {tg || isSet(contacts.telegram) ? (
                  <Magnetic strength={0.35}>
                    <a href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer" data-cursor="talk"
                      className="group inline-flex items-center justify-center gap-3 bg-paper text-navy px-8 py-5 mono text-[11px] tracking-[0.18em] font-semibold hover:bg-navy hover:text-paper border border-paper hover:border-paper/30 transition-colors duration-500 w-full sm:w-auto">
                      <Send size={14} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      {t("ct_cta")}
                    </a>
                  </Magnetic>
                ) : (
                  <p className="mono text-[9px] tracking-[0.18em] text-paper/40 border border-paper/20 border-dashed px-5 py-4">{t("cf_placeholder_note")}</p>
                )}
                {isSet(contacts.instagram) && ig && (
                  <Magnetic strength={0.35}>
                    <a href={ig} target="_blank" rel="noopener noreferrer" data-cursor="open"
                      className="inline-flex items-center justify-center gap-3 border border-paper/30 text-paper px-8 py-5 mono text-[11px] tracking-[0.18em] hover:bg-paper hover:text-navy transition-colors duration-500 w-full sm:w-auto">
                      <AtSign size={14} /> {t("ct_ig")}
                    </a>
                  </Magnetic>
                )}
              </div>
            </FadeUp>

            {/* project links */}
            <FadeUp delay={0.25} className="mt-8">
              <p className="mono text-[9px] tracking-[0.26em] text-paper/40 mb-4">{t("ct_links")}</p>
              <div className="border-b border-paper/15">
                {PROJECT_LINKS.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="open"
                    className="group flex items-center gap-4 border-t border-paper/15 py-3.5 hover:bg-paper/[0.05] transition-colors duration-300 px-1">
                    <span className="mono text-[8px] tracking-[0.2em] text-paper/40 w-24 shrink-0">{l.label}</span>
                    <span className="mono flex-1 text-[12px] text-paper/80 group-hover:text-paper group-hover:translate-x-1 transition-all duration-300">{l.value}</span>
                    <ArrowUpRight size={14} className="text-paper/40 group-hover:text-paper" />
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* request flow */}
          <FadeUp delay={0.3} className="lg:col-span-7">
            <div className="border border-paper/20 p-6 sm:p-9">
              <p className="mono text-[9px] tracking-[0.26em] text-paper/50">{t("cf_q")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <button key={s.id} onClick={() => setSvcId(s.id)}
                    className={`mono text-[9px] tracking-[0.14em] px-4 py-2.5 border transition-all duration-300 ${
                      svcId === s.id ? "bg-paper text-navy border-paper font-semibold" : "border-paper/25 text-paper/60 hover:text-paper hover:border-paper"
                    }`}>
                    {t(s.titleKey)}
                  </button>
                ))}
                <button onClick={() => setSvcId("")}
                  className={`mono text-[9px] tracking-[0.14em] px-4 py-2.5 border transition-all duration-300 ${
                    svcId === "" ? "bg-paper text-navy border-paper font-semibold" : "border-paper/25 text-paper/60 hover:text-paper hover:border-paper"
                  }`}>
                  {t("cf_other")}
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("cf_name")} className={input} aria-label={t("cf_name")} />
                <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder={t("cf_contact")} className={input} aria-label={t("cf_contact")} />
                <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder={t("cf_budget")} className={input} aria-label={t("cf_budget")} />
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={t("cf_desc")} rows={3}
                  className={`${input} sm:col-span-2 resize-none`} aria-label={t("cf_desc")} />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Magnetic strength={0.35}>
                  <button onClick={send} data-cursor="talk"
                    className="group inline-flex items-center gap-3 bg-paper text-navy px-8 py-5 mono text-[11px] tracking-[0.18em] font-semibold hover:bg-navy hover:text-paper border border-paper hover:border-paper/30 transition-colors duration-500">
                    {copied ? <Check size={14} /> : tg ? <Send size={14} /> : <Copy size={14} />}
                    {copied ? t("cf_copied") : t("cf_send")}
                  </button>
                </Magnetic>
                {tg && <p className="mono text-[8px] tracking-[0.16em] text-paper/40 max-w-[240px] leading-relaxed">{t("cf_note_tg")}</p>}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* final scene */}
        <div data-c-final className="mt-28 sm:mt-40 text-center">
          <p className="mono text-[9px] tracking-[0.3em] text-paper/40">© 2026 — {t("intro_loc")}</p>
          <p className="relative mt-8 display- font-extrabold leading-none" style={{ fontSize: "clamp(40px, 7.5vw, 120px)" }}>
            <span className="text-stroke text-paper/60">{t("ct_more")}</span>
            <span data-c-fill className="absolute inset-0 text-paper" aria-hidden>
              {t("ct_more")}
            </span>
          </p>
        </div>
      </div>

      {/* footer */}
      <footer data-c-footer className="relative mt-20 sm:mt-28 pt-14 pb-8 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
          <div className="h-px w-full bg-paper/15" />
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
            <div className="overflow-hidden">
              <p data-c-name className="foot-name display- font-extrabold text-paper leading-[0.85] will-change-transform" style={{ fontSize: "clamp(56px, 11vw, 190px)" }}>
                Dev.Асад
              </p>
            </div>
            <div className="mono text-[9px] leading-loose tracking-[0.2em] text-paper/50 sm:text-right">
              <p>{t("ct_foot_note")}</p>
              <p className="mt-2 text-paper/70">{t("ct_rights")}</p>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <p className="mono text-[9px] tracking-[0.24em] text-paper/40">DEV.АСАД — 2026</p>
            <a href="#top" data-cursor="link" className="group inline-flex items-center gap-3 mono text-[9px] tracking-[0.24em] text-paper/60 hover:text-paper transition-colors">
              {t("nav_top")}
              <span className="w-8 h-8 border border-paper/25 rounded-full flex items-center justify-center group-hover:bg-paper group-hover:text-navy transition-all duration-400">
                <ArrowUp size={12} />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
