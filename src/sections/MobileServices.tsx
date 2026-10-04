import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";
import { services, minPrice, fmtUZS, type Service } from "../data/services";
import Magnetic from "../components/Magnetic";
import TelegramIcon from "../components/TelegramIcon";
import { tgUrl } from "../data/contacts";

/* Mobile-only controlled service scene: one active frame, tap/swipe to switch.
   Auto-advances every 6s until the user touches it. */

function PriceMorph({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const obj = useRef({ v: value });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const tw = gsap.to(obj.current, {
      v: value,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmtUZS(obj.current.v);
      },
    });
    return () => {
      tw.kill();
    };
  }, [value]);
  return <span ref={ref}>{fmtUZS(value)}</span>;
}

export default function MobileServices({ onOrder }: { onOrder: (id: string) => void }) {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const touched = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const s: Service = services[i];
  const features = t(s.inclKey).split(",");

  /* auto-advance until first interaction */
  useEffect(() => {
    const iv = setInterval(() => {
      if (!touched.current) setI((p) => (p + 1) % services.length);
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  /* content transform on switch */
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", overwrite: "auto" }
      );
    }
  }, [i]);

  /* swipe */
  const px = useRef<number | null>(null);
  const onDown = (e: React.PointerEvent) => {
    px.current = e.clientX;
    touched.current = true;
  };
  const onUp = (e: React.PointerEvent) => {
    if (px.current === null) return;
    const dx = e.clientX - px.current;
    px.current = null;
    if (Math.abs(dx) < 42) return;
    setI((p) => (dx < 0 ? (p + 1) % services.length : (p - 1 + services.length) % services.length));
  };

  const goto = (n: number) => {
    touched.current = true;
    setI(((n % services.length) + services.length) % services.length);
  };

  return (
    <div className="md:hidden" onPointerDown={onDown} onPointerUp={onUp}>
      {/* tab chips */}
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 -mx-1 px-1">
        {services.map((sv, si) => (
          <button
            key={sv.id}
            onClick={() => goto(si)}
            className={`shrink-0 mono text-[9px] tracking-[0.14em] px-3.5 py-2.5 border transition-all duration-300 ${
              si === i ? "bg-navy text-paper border-navy" : "border-line text-smoke"
            }`}
          >
            {sv.num} {t(sv.titleKey)}
          </button>
        ))}
      </div>

      {/* active frame */}
      <div className="border border-line bg-pure p-6" ref={contentRef}>
        <p className="mono text-[9px] tracking-[0.24em] text-smoke">
          {s.num} / 0{services.length} {s.featured && <span className="text-navy font-semibold">· ★</span>}
        </p>
        <h3 className="display- mt-2 font-extrabold text-ink leading-none" style={{ fontSize: "clamp(34px, 10vw, 56px)" }}>
          {t(s.titleKey)}
        </h3>
        <p className="mt-4 mono text-[9px] tracking-[0.22em] text-smoke">{t("svc_from")}</p>
        <p className="display- mt-1 font-extrabold text-navy tabular-nums" style={{ fontSize: "clamp(30px, 9vw, 50px)" }}>
          <PriceMorph value={minPrice(s)} />
          <span className="mono ml-2 text-[10px] tracking-[0.16em] font-normal text-smoke">+ {t("svc_uzs")}</span>
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-ink/70">{t(s.descKey)}</p>
        <ul className="mt-4 space-y-2">
          {features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[12px] text-ink/65">
              <span className="w-1 h-1 bg-navy shrink-0" /> {f.trim()}
            </li>
          ))}
        </ul>
        <p className="mono mt-4 text-[8px] tracking-[0.14em] text-smoke/80 leading-relaxed">{t("svc_disclaimer")}</p>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Magnetic strength={0.3}>
            <a
              href={tgUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOrder(s.id)}
              className="inline-flex items-center gap-2.5 bg-navy text-paper px-6 py-4 mono text-[10px] tracking-[0.16em] font-semibold"
            >
              <TelegramIcon size={14} /> {t("cta_float")} <ArrowUpRight size={13} />
            </a>
          </Magnetic>
          <div className="flex gap-2">
            <button onClick={() => goto(i - 1)} aria-label="Oldingi" className="w-11 h-11 border border-line flex items-center justify-center text-ink active:bg-mist">
              <ArrowLeft size={15} />
            </button>
            <button onClick={() => goto(i + 1)} aria-label="Keyingi" className="w-11 h-11 border border-navy bg-navy text-paper flex items-center justify-center active:bg-abyss">
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="mt-3 flex gap-1.5">
        {services.map((_, si) => (
          <div key={si} className="h-[3px] flex-1 bg-line overflow-hidden">
            <div className={`h-full bg-navy origin-left transition-transform duration-500 ${si <= i ? "scale-x-100" : "scale-x-0"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
