import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLang } from "../i18n";
import { SectionLabel, RevealLine, FadeUp } from "../components/ui";
import Magnetic from "../components/Magnetic";
import { scrollState } from "../lib/scroll";

/* ------------------------------------------------------------------ */
const Cell = ({
  n, titleKey, descKey, children, className = "", hint,
}: { n: string; titleKey: string; descKey: string; children: ReactNode; className?: string; hint?: string }) => {
  const { t } = useLang();
  return (
    <div className={`relative border border-line bg-pure overflow-hidden ${className}`}>
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 sm:px-5 py-3 border-b border-line/70 z-10 bg-pure/80 backdrop-blur-sm">
        <p className="mono text-[9px] tracking-[0.22em] text-navy">EXP {n} — {t(titleKey)}</p>
        <p className="mono text-[8px] tracking-[0.18em] text-smoke hidden sm:block">{t(descKey)}</p>
      </div>
      <div className="absolute inset-0 pt-10">{children}</div>
      {hint && <p className="mono absolute bottom-2.5 right-3 text-[8px] tracking-[0.2em] text-smoke/70 z-10">{hint}</p>}
    </div>
  );
};

/* ---------------- EXP 01 — kinetic type ---------------- */
function KineticType() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    const st = letters.map(() => ({ tx: 0, ty: 0, x: 0, y: 0, r: 0, tr: 0 }));
    let mx = -9999, my = -9999, inside = false;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; inside = true;
    };
    const onLeave = () => { inside = false; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    let raf = 0;
    const loop = () => {
      letters.forEach((L, i) => {
        const cx = L.offsetLeft + L.offsetWidth / 2;
        const cy = L.offsetTop + L.offsetHeight / 2;
        const dx = cx - mx, dy = cy - my;
        const dist = Math.hypot(dx, dy) || 1;
        const f = inside ? Math.max(0, 1 - dist / 150) : 0;
        st[i].tx = (dx / dist) * f * 34;
        st[i].ty = (dy / dist) * f * 34;
        st[i].tr = (dx / dist) * f * 14;
        st[i].x += (st[i].tx - st[i].x) * 0.14;
        st[i].y += (st[i].ty - st[i].y) * 0.14;
        st[i].r += (st[i].tr - st[i].r) * 0.14;
        L.style.transform = `translate(${st[i].x}px, ${st[i].y}px) rotate(${st[i].r}deg)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); };
  }, []);
  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center cursor-crosshair" aria-hidden>
      {"MOTION".split("").map((c, i) => (
        <span key={i} data-l className="display- inline-block font-extrabold text-navy will-change-transform" style={{ fontSize: "clamp(44px,6.5vw,96px)" }}>
          {c}
        </span>
      ))}
    </div>
  );
}

/* ---------------- EXP 03 — cursor grid ---------------- */
function CursorGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const COLS = 12, ROWS = 6;
  useEffect(() => {
    const el = ref.current!;
    const dots = Array.from(el.querySelectorAll<HTMLElement>("[data-g]"));
    let mx = -9999, my = -9999, inside = false, time = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; inside = true;
    };
    const onLeave = () => { inside = false; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    let raf = 0;
    const loop = () => {
      time += 0.03;
      dots.forEach((d, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const parent = d.parentElement!;
        const cx = parent.offsetLeft + parent.offsetWidth / 2;
        const cy = parent.offsetTop + parent.offsetHeight / 2;
        const dist = Math.hypot(cx - mx, cy - my);
        const hover = inside ? Math.max(0, 1 - dist / 170) : 0;
        const wave = 0.14 + 0.08 * Math.sin(time + col * 0.55 + row * 0.8);
        const s = wave + hover * 0.9;
        d.style.transform = `translate(-50%,-50%) scale(${s.toFixed(3)})`;
        d.style.opacity = String(0.25 + hover * 0.75);
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); };
  }, []);
  return (
    <div
      ref={ref}
      className="relative w-full h-full grid cursor-crosshair"
      style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}
      aria-hidden
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div key={i} className="relative border-[0.5px] border-line/50">
          <span data-g className="absolute left-1/2 top-1/2 w-[70%] h-[70%] bg-navy will-change-transform origin-center" style={{ transform: "translate(-50%,-50%) scale(.15)" }} />
        </div>
      ))}
    </div>
  );
}

/* ---------------- EXP 04 — image distortion ---------------- */
function ImageDistort() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current!;
    let mx = 0, my = 0, px = 0, py = 0, vx = 0, vy = 0;
    let cx = 0, cy = 0, sk = 0, sc = 1.18;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left - r.width / 2;
      my = e.clientY - r.top - r.height / 2;
    };
    el.addEventListener("pointermove", onMove);
    let raf = 0;
    const loop = () => {
      vx = mx - px; vy = my - py; px = mx; py = my;
      const tSk = Math.max(-9, Math.min(9, vx * 0.28));
      const tSc = 1.18 + Math.min(0.06, Math.hypot(vx, vy) * 0.002);
      cx += (mx * 0.07 - cx) * 0.08;
      cy += (my * 0.07 - cy) * 0.08;
      sk += (tSk - sk) * 0.08;
      sc += (tSc - sc) * 0.06;
      if (imgRef.current)
        imgRef.current.style.transform = `translate(${cx}px, ${cy}px) skewX(${sk}deg) scale(${sc})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointermove", onMove); };
  }, []);
  const { t } = useLang();
  return (
    <div ref={ref} className="w-full h-full overflow-hidden bg-abyss cursor-crosshair">
      <img
        ref={imgRef}
        src="/images/lab-ink.jpg"
        alt={t("alt_ink")}
        loading="lazy"
        className="w-full h-full object-cover will-change-transform"
        style={{ transform: "scale(1.18)" }}
      />
    </div>
  );
}

/* ---------------- EXP 05 — scroll physics ---------------- */
function ScrollPhysics() {
  const ref = useRef<HTMLSpanElement>(null);
  const valRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let sx = 0, skew = 0, raf = 0;
    const loop = () => {
      const v = scrollState.v;
      const tX = Math.max(-160, Math.min(160, v * 2.4));
      const tSk = Math.max(-18, Math.min(18, v * 0.55));
      sx += (tX - sx) * 0.1;
      skew += (tSk - skew) * 0.1;
      if (ref.current) ref.current.style.transform = `translateX(${sx}px) skewX(${skew}deg)`;
      if (valRef.current) valRef.current.textContent = Math.abs(v).toFixed(1).padStart(5, "0");
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center gap-6 select-none">
      <span className="mono text-[9px] tracking-[0.2em] text-smoke">v=<span ref={valRef} className="text-navy">000.0</span></span>
      <span ref={ref} className="display- inline-block font-extrabold text-ink will-change-transform" style={{ fontSize: "clamp(50px,7vw,110px)" }}>
        FLOW<span className="text-navy">.</span>
      </span>
      <span className="mono text-[9px] tracking-[0.2em] text-smoke" aria-hidden>←SCROLL→</span>
    </div>
  );
}

/* ---------------- EXP 06 — AI workflow ---------------- */
function AIFlow() {
  const { t } = useLang();
  const steps = ["lab6_s1", "lab6_s2", "lab6_s3", "lab6_s4", "lab6_s5"];
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    let iv: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !iv) iv = setInterval(() => setActive((a) => (a + 1) % steps.length), 1300);
      else if (!e.isIntersecting && iv) { clearInterval(iv); iv = null; }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); if (iv) clearInterval(iv); };
  }, []);
  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-center gap-5 px-4 sm:px-8">
      <div className="flex items-stretch gap-0">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <button
              onClick={() => setActive(i)}
              className={`w-full py-3 sm:py-4 mono text-[8px] sm:text-[10px] tracking-[0.16em] border transition-all duration-500 ${
                active === i ? "bg-navy text-paper border-navy scale-y-110" : "border-line text-smoke hover:text-navy hover:border-navy"
              }`}
            >
              {t(s)}
            </button>
            {i < steps.length - 1 && <span className={`h-px w-2 sm:w-3 shrink-0 transition-colors duration-500 ${active > i ? "bg-navy" : "bg-line"}`} />}
          </div>
        ))}
      </div>
      <p className="text-[13px] sm:text-[15px] leading-relaxed text-ink/70 max-w-2xl">{t("lab6_b")}</p>
      <div className="mono text-[8px] tracking-[0.22em] text-smoke">
        GEMINI · CLAUDE · CODEX — <span className="text-navy">{active + 1}/5</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Lab() {
  const { t } = useLang();
  return (
    <section id="lab" className="relative bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="06" text={t("lab_kicker")} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <RevealLine>
<h2 className="lab-h1 display- font-extrabold text-ink" style={{ fontSize: "clamp(52px, 8.5vw, 130px)" }}>
              {t("lab_title")}<span className="text-navy">.</span>
              </h2>
            </RevealLine>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <p className="text-[15px] sm:text-[17px] leading-relaxed text-ink/70 max-w-md">{t("lab_lead")}</p>
          </FadeUp>
        </div>

        <FadeUp className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          <Cell n="01" titleKey="lab1_t" descKey="lab1_d" className="md:col-span-7 h-[240px] sm:h-[300px]">
            <KineticType />
          </Cell>
          <Cell n="02" titleKey="lab2_t" descKey="lab2_d" className="md:col-span-5 h-[240px] sm:h-[300px]">
            <div className="w-full h-full flex items-center justify-center">
              <Magnetic strength={0.55}>
                <span className="display- inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-navy text-paper font-bold text-sm tracking-[0.1em] select-none">
                  MAGNET
                </span>
              </Magnetic>
            </div>
          </Cell>
          <Cell n="03" titleKey="lab3_t" descKey="lab3_d" className="md:col-span-5 h-[240px] sm:h-[300px]">
            <CursorGrid />
          </Cell>
          <Cell n="04" titleKey="lab4_t" descKey="lab4_d" className="md:col-span-7 h-[240px] sm:h-[300px]">
            <ImageDistort />
          </Cell>
          <Cell n="05" titleKey="lab5_t" descKey="lab5_d" className="md:col-span-12 h-[150px] sm:h-[180px]">
            <ScrollPhysics />
          </Cell>
          <Cell n="06" titleKey="lab6_t" descKey="lab6_d" className="md:col-span-12 h-[220px] sm:h-[240px]">
            <AIFlow />
          </Cell>
        </FadeUp>
      </div>
    </section>
  );
}
