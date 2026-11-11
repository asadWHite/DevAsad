import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useI18n, type Messages, type StringPaths } from "@/i18n";
import { SectionLabel } from "@/components/ui";
import { projects, statusMessageKey, type ProjectTag } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const FILTERS: { key: string; labelKey: StringPaths<Messages>; match: (p: (typeof projects)[number]) => boolean }[] = [
  { key: "all", labelKey: "filters.all", match: () => true },
  { key: "live", labelKey: "filters.live", match: (p) => p.tags.includes("live" as ProjectTag) },
  { key: "products", labelKey: "filters.products", match: (p) => p.tags.includes("product" as ProjectTag) },
  { key: "web", labelKey: "filters.web", match: (p) => p.tags.includes("web" as ProjectTag) },
  { key: "mobile", labelKey: "filters.mobile", match: (p) => p.tags.includes("mobile" as ProjectTag) },
  { key: "exp", labelKey: "filters.experiments", match: (p) => p.tags.includes("experiment" as ProjectTag) },
];

export default function Catalogue() {
  const { t, loc } = useI18n();
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("all");
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  const visible = projects.filter(FILTERS.find((f) => f.key === filter)!.match);

  /* preview follow loop */
  useLayoutEffect(() => {
    if (!fine) return;
    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (previewRef.current)
        previewRef.current.style.transform = `translate(${pos.current.x + 28}px, ${pos.current.y - 110}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fine]);

  /* rows animate on filter change + scroll */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cat-row]",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: listRef.current, start: "top 88%" } }
      );
    }, listRef);
    return () => ctx.revert();
  }, [filter]);

  const showPreview = (img?: string) => {
    if (!fine || !img || !previewRef.current) return;
    const el = previewRef.current;
    el.querySelector("img")!.setAttribute("src", img);
    gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  };
  const hidePreview = () => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: "power2.in" });
  };

  return (
    <section id="index" ref={root} className="relative bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="09" text={t("catalogue.kicker")} right={`${visible.length}/06 ${t("catalogue.shown")}`} />
        <h2 className="display- mt-10 font-extrabold text-ink" style={{ fontSize: "clamp(44px, 6.5vw, 100px)" }}>
          {t("catalogue.title")}<span className="text-navy">.</span>
        </h2>

        {/* filters */}
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3" role="tablist" aria-label={t("a11y.projectFilters")}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`u-sweep mono text-[10px] tracking-[0.24em] pb-1 transition-colors duration-300 ${
                filter === f.key ? "text-navy font-semibold" : "text-smoke hover:text-navy"
              }`}
            >
              {t(f.labelKey)}
              <sup className="ml-1 text-[8px]">{projects.filter(f.match).length}</sup>
            </button>
          ))}
        </div>

        {/* rows */}
        <div ref={listRef} className="mt-10 border-b border-line">
          {visible.map((p) => {
            const inner = (
              <>
                <span className="mono text-[10px] tracking-[0.2em] text-smoke w-10 shrink-0">{p.number}</span>
                <span className="display- flex-1 font-extrabold text-ink group-hover:text-navy group-hover:translate-x-2 transition-all duration-500 text-[clamp(22px,3.4vw,48px)] leading-none">
                  {p.brand}
                </span>
                <span className="hidden md:block mono text-[9px] tracking-[0.2em] text-smoke w-56">{loc(p.c.category)}</span>
                <span className="hidden sm:block mono text-[10px] text-smoke w-14">{p.year}</span>
                <span
                  className={`mono text-[8px] sm:text-[9px] tracking-[0.16em] px-2 py-1 w-28 sm:w-32 text-center ${
                    p.status === "live" || p.status === "live_dev" ? "bg-navy text-paper" : "border border-line text-smoke"
                  }`}
                >
                  {t(statusMessageKey[p.status])}
                </span>
                <ArrowUpRight size={18} className="text-smoke group-hover:text-navy group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400 shrink-0" />
              </>
            );
            const cls =
              "group flex items-center gap-5 sm:gap-8 border-t border-line py-5 sm:py-7 transition-colors duration-300 hover:bg-pure";
            const hoverProps = {
              onMouseEnter: (e: React.MouseEvent) => {
                target.current = { x: e.clientX, y: e.clientY };
                showPreview(p.image);
              },
              onMouseMove: (e: React.MouseEvent) => {
                target.current = { x: e.clientX, y: e.clientY };
              },
              onMouseLeave: hidePreview,
            };
            return p.url ? (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="view" data-cat-row className={cls} {...hoverProps}>
                {inner}
              </a>
            ) : (
              <div key={p.id} data-cat-row data-cursor="view" className={cls} {...hoverProps}>
                {inner}
              </div>
            );
          })}
        </div>

        <p className="mono mt-8 text-[9px] tracking-[0.2em] text-smoke">
          {t("catalogue.techLine")}:{" "}
          {[...new Set(projects.flatMap((p) => p.tech))].slice(0, 7).join(" · ").toUpperCase()}
        </p>
      </div>

      {/* floating preview */}
      {fine && (
        <div
          ref={previewRef}
          className="fixed left-0 top-0 z-[80] w-[280px] h-[190px] pointer-events-none opacity-0 overflow-hidden shadow-[0_30px_60px_-20px_rgba(11,31,58,0.5)]"
          aria-hidden
        >
          <img src="https://kashmirdecor.uz/assets/hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </section>
  );
}
