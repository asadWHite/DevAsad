import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Bot, Smartphone, ShieldCheck, Clock3 } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";
import { projects, statusKey } from "../data/projects";
import Magnetic from "../components/Magnetic";
import TelegramIcon from "../components/TelegramIcon";
import { tgUrl } from "../data/contacts";

gsap.registerPlugin(ScrollTrigger);

/* REAL content from ustatop360.uz — источник правды */
const PROBLEMS = ["Kran oqyapti", "Svet yo'q", "Konditsioner sovutmaydi", "Muzlatgich ishlamaydi", "Devor nam", "Eshik yopilmaydi", "Rozetka uchqunlaydi", "Truba yorildi"];
const CATEGORIES = [
  { n: "Santexnika", d: "Suv tomchilashi, bosim pasayishi yoki kran muammolari." },
  { n: "Elektrika", d: "Rozetka ishlamasligi, qizishi, uchqun." },
  { n: "Konditsioner", d: "Rejim, havo oqimi yoki ishlashdagi o'zgarish." },
  { n: "Remont", d: "Devor tayyorlash, suvoq, pardozga tayyorgarlik." },
  { n: "Maishiy texnika", d: "Sovutish sustlashishi, ishga tushmaslik." },
  { n: "Mebel", d: "Shkaf, stol, stul yig'ish." },
  { n: "Tozalash", d: "Kundalik yoki umumiy tozalash." },
  { n: "Avto", d: "Nosozlik alomatlarini tekshirish." },
];
const MASTER_SIDE = ["O'z narxingiz", "O'z hududingiz", "To'g'ridan-to'g'ri to'lov", "Ish tarixi va reyting"];

const STAGES = [
  { t: "u_stage1_t", b: "u_stage1_b" },
  { t: "u_stage2_t", b: "u_stage2_b" },
  { t: "u_stage3_t", b: "u_stage3_b" },
  { t: "u_stage4_t", b: "u_stage4_b" },
  { t: "u_stage5_t", b: "u_stage5_b" },
  { t: "u_stage6_t", b: "u_stage6_b" },
];

export default function Ustatop() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cur = useRef(-1);
  const [stage, setStage] = useState(0);
  const p = projects[1];

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
          const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length * 0.999));
          activate(i, self.direction >= 0);
        },
        onEnter: () => activate(0, true),
        onEnterBack: () => activate(cur.current === -1 ? 0 : cur.current, false),
        onRefresh: (self) => {
          if (self.progress > 0 && self.progress < 1) {
            const i = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length * 0.999));
            activate(i, true);
          }
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const panels = [
    /* 01 — real problem chips */
    <div key="p1" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-pure">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">01 — MUAMMOINGIZ BORMI?</p>
      <div className="flex flex-wrap gap-2">
        {PROBLEMS.map((x) => (
          <span key={x} className="mono text-[10px] sm:text-[11px] tracking-[0.06em] border border-line bg-paper px-3.5 py-2.5 text-ink">
            {x}
          </span>
        ))}
      </div>
      <p className="mono text-[8px] tracking-[0.18em] text-smoke mt-2">USTATOP360.UZ · {t("p_real")}</p>
    </div>,
    /* 02 — message becomes request */
    <div key="p2" className="h-full flex flex-col justify-center gap-5 p-6 sm:p-10 bg-navy text-paper">
      <p className="mono text-[9px] tracking-[0.24em] text-paper/60">02 — BIZGA AYTIB QO'YING</p>
      <p className="display- font-extrabold text-paper leading-tight" style={{ fontSize: "clamp(26px, 3.4vw, 52px)" }}>
        «Kranim oqyapti.»
      </p>
      <p className="mono text-[9px] tracking-[0.18em] text-paper/60 leading-loose">
        XABAR <span className="text-paper">→</span> ARIZA <span className="text-paper">→</span> USTA TANLOVI
      </p>
    </div>,
    /* 03 — mechanics preview */
    <div key="p3" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-mist">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">03 — USTASINI TOPAMIZ</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { n: "01", x: lang === "ru" ? "Заявка понятна" : lang === "uz" ? "Ariza tushuniladi" : "Request understood" },
          { n: "02", x: lang === "ru" ? "Мастер подобран" : lang === "uz" ? "Mos usta tanlanadi" : "Master matched" },
          { n: "03", x: lang === "ru" ? "Статус виден" : lang === "uz" ? "Holat kuzatiladi" : "Status tracked" },
        ].map((s) => (
          <div key={s.n} className="border border-steel/20 bg-pure p-4">
            <p className="mono text-[8px] tracking-[0.2em] text-smoke">{s.n}</p>
            <p className="display- mt-2 font-bold text-ink text-[13px] sm:text-[14px] leading-snug">{s.x}</p>
          </div>
        ))}
      </div>
      <p className="mono text-[8px] tracking-[0.16em] text-steel">{t("ui_demo")} · USTATOP360.UZ</p>
      <a href="https://ustatop360.uz/" target="_blank" rel="noopener noreferrer" data-cursor="open" className="u-sweep mono text-[10px] tracking-[0.18em] text-navy w-fit">
        O'zingiz sinab ko'ring ↗
      </a>
    </div>,
    /* 04 — work proof */
    <div key="p4" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-pure">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">04 — USTATOP WORK PROOF</p>
      <div className="grid grid-cols-3 gap-2">
        {["01 — OLDIN", "02 — ISH", "03 — KEYIN"].map((x) => (
          <div key={x} className="aspect-[3/4] border border-line bg-paper flex items-end p-3">
            <span className="mono text-[8px] sm:text-[9px] tracking-[0.16em] text-smoke">{x}</span>
          </div>
        ))}
      </div>
      <p className="text-[12px] leading-relaxed text-ink/65">
        {lang === "ru"
          ? "Фото до и после прикрепляются к заказу — такая же честная пометка стоит и на самом сайте UstaTop."
          : lang === "uz"
          ? "Oldin/keyin rasmlari buyurtmaga birikadi — UstaTop saytining o'zida ham shunday halol belgi bor."
          : "Before/after photos attach to the order — the live UstaTop site carries the same honest label."}
      </p>
    </div>,
    /* 05 — trust */
    <div key="p5" className="h-full flex flex-col justify-center gap-5 p-6 sm:p-10 bg-navy text-paper">
      <p className="mono text-[9px] tracking-[0.24em] text-paper/60">05–06 — ISHONCH — TIZIM</p>
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 border border-paper/30 rounded-full flex items-center justify-center shrink-0">
          <ShieldCheck size={20} />
        </span>
        <p className="display- font-extrabold leading-tight" style={{ fontSize: "clamp(18px, 2.2vw, 32px)" }}>
          SHAXS TASDIQLANADI
        </p>
      </div>
      <p className="text-[13px] leading-relaxed text-paper/70">Har bir usta yuzini tasdiqlaydi va tekshiruvdan o'tadi.</p>
      <div className="grid grid-cols-2 gap-2">
        {MASTER_SIDE.map((x, i) => (
          <div key={x} className="border border-paper/20 px-3.5 py-3 mono text-[9px] tracking-[0.12em] text-paper/80">
            0{i + 1} — {x}
          </div>
        ))}
      </div>
    </div>,
    /* 06 — catalog + waitlist */
    <div key="p6" className="h-full flex flex-col justify-center gap-4 p-6 sm:p-10 bg-pure overflow-hidden">
      <p className="mono text-[9px] tracking-[0.24em] text-navy">07 — USTATOP · XIZMATLAR</p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
        {CATEGORIES.map((c) => (
          <div key={c.n} className="border-b border-line pb-2">
            <p className="display- font-bold text-ink text-[13px] sm:text-[15px]">{c.n}</p>
            <p className="text-[10px] text-smoke leading-snug mt-0.5 hidden sm:block">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center gap-3 bg-navy text-paper px-4 py-3">
        <Clock3 size={14} className="shrink-0" />
        <p className="mono text-[8px] sm:text-[9px] tracking-[0.14em] leading-snug">
          TEZ ORADA — MUAMMO KIRADI. YECHIM CHIQADI. · BIRINCHI BO'LIB BILING.
        </p>
      </div>
    </div>,
  ];

  return (
    <section ref={root} className="relative bg-pure">
      {/* ------------ PINNED DOCUMENTARY (real content, no fake screens) ------------ */}
      <div ref={wrapRef} className="relative h-[340vh] md:h-[560vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-pure">
          <div className="px-5 sm:px-10 pt-24 shrink-0">
            <SectionLabel index="02" text="USTATOP" right={`${t("p_status")}: ${t(statusKey[p.status])}`} />
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-5 sm:px-10 py-6 min-h-0">
            <div className="relative flex flex-col justify-center min-h-0">
              <p className="mono text-[10px] tracking-[0.3em] text-smoke mb-6">{t("u_system")}</p>
              <div className="relative h-[130px] sm:h-[200px] overflow-visible">
                {STAGES.map((s) => (
                  <h3
                    key={s.t}
                    data-u-word
                    className="display- absolute inset-0 font-extrabold text-navy flex items-center"
                    style={{ fontSize: "clamp(44px, 8vw, 120px)" }}
                  >
                    {t(s.t)}
                  </h3>
                ))}
              </div>
              <div className="relative h-[128px] sm:h-[120px] mt-4 max-w-xl">
                {STAGES.map((s) => (
                  <p key={s.b} data-u-desc className="absolute inset-0 text-[13px] sm:text-[16px] leading-relaxed text-ink/75">
                    {t(s.b)}
                  </p>
                ))}
              </div>
              <div className="mono mt-6 text-[10px] tracking-[0.24em] text-navy">
                <span className="text-ink font-semibold">0{stage + 1}</span> / 06
              </div>
            </div>

            <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden border border-line">
              {panels.map((panel, i) => (
                <div key={i} data-u-fig className="absolute inset-0 overflow-hidden">
                  {panel}
                </div>
              ))}
              <div className="absolute top-3 right-3 mono text-[8px] tracking-[0.22em] bg-navy text-paper px-2.5 py-1.5 z-20">
                REAL CONTENT
              </div>
            </div>
          </div>

          <div className="shrink-0 px-5 sm:px-10 pb-6">
            <div className="flex gap-1.5">
              {STAGES.map((_, i) => (
                <div key={i} className="h-[3px] flex-1 bg-line overflow-hidden">
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

      {/* ------------ ECOSYSTEM ------------ */}
      <div className="relative bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeUp>
              <h3 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}>
                {t("u_hub_t")}
              </h3>
              <p className="mt-5 text-[16px] leading-relaxed text-ink/75 max-w-md">{t("u_hub_b")}</p>
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
                <p className="mono text-[10px] tracking-[0.24em]">{t("u_bot")}</p>
              </div>
              <a href={tgUrl()} target="_blank" rel="noopener noreferrer" data-cursor="talk" className="mt-4 inline-flex items-center gap-3 display- font-bold text-ink text-2xl sm:text-3xl hover:text-navy transition-colors">
                <TelegramIcon size={22} /> @Xidoyatovvv
              </a>
            </FadeUp>
          </div>

          {/* mobile direction — typography only, no fake screens */}
          <div className="lg:col-span-7">
            <FadeUp className="flex items-center gap-3 text-navy mb-6">
              <Smartphone size={16} />
              <p className="mono text-[10px] tracking-[0.24em]">{t("u_mobile_t")}</p>
              <span className="mono text-[9px] tracking-[0.18em] text-paper bg-steel px-2 py-1 ml-2">{t("st_experiment")}</span>
            </FadeUp>
            <div className="border border-line bg-abyss text-paper p-6 sm:p-8 overflow-hidden">
              <p className="mono text-[9px] tracking-[0.2em] text-paper/50 mb-4">~/ustatop-android</p>
              <pre className="mono text-[10px] sm:text-[11px] leading-[1.9] text-paper/80 overflow-x-auto">
{`// direction: Kotlin + Jetpack Compose
val stack = listOf(
  "Kotlin", "Jetpack Compose",
  "Material 3", "MVVM",
  "Clean Architecture", "Hilt"
)
// status: research & UI exploration
// screens: not shipped yet — no fake mockups here`}
              </pre>
            </div>
            <FadeUp className="mt-6">
              <p className="text-[15px] leading-relaxed text-ink/75 max-w-xl">{t("u_mobile_b")}</p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
