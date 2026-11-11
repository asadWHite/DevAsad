import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";

type CursorMode = "default" | "link" | "view" | "open" | "talk";

export default function Cursor() {
  const { t } = useI18n();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const modeRef = useRef<CursorMode>("default");
  modeRef.current = mode;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const m = (el?.dataset.cursor as CursorMode) || "default";
      if (m !== modeRef.current) setMode(m);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      const { x, y } = pos.current;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  /* Every cursor label comes from the message tree — no inline ternaries. */
  const labelMap: Record<CursorMode, string> = {
    default: "",
    link: "",
    view: t("cursor.view"),
    open: t("cursor.open"),
    talk: t("cursor.talk"),
  };

  const big = mode === "view" || mode === "open" || mode === "talk";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed left-0 top-0 z-[200] pointer-events-none"
      >
        <div
          className={`rounded-full bg-navy transition-all duration-300 ease-out ${
            mode === "default" ? "w-2 h-2" : big ? "w-0 h-0 opacity-0" : "w-8 h-8 opacity-15"
          }`}
        />
      </div>
      <div ref={ringRef} aria-hidden className="fixed left-0 top-0 z-[199] pointer-events-none">
        <div
          className={`flex items-center justify-center rounded-full bg-navy text-paper mono font-medium tracking-[0.15em] transition-[width,height,opacity] duration-300 ease-[cubic-bezier(.32,.72,.35,1)] ${
            big ? "w-[84px] h-[84px] opacity-95" : "w-0 h-0 opacity-0"
          }`}
        >
          <span className="text-[9px] whitespace-nowrap px-2">{labelMap[mode]}</span>
        </div>
      </div>
    </>
  );
}
