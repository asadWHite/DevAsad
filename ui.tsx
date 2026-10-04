import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Section label: "01 — ISHLAR" ---------------- */
export function SectionLabel({
  index,
  text,
  right,
  dark = false,
}: {
  index: string;
  text: string;
  right?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-label-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          transformOrigin: "left",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        }
      );
      gsap.fromTo(
        "[data-label-txt]",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={`mono text-[10px] sm:text-[11px] tracking-[0.22em] ${dark ? "text-paper/70" : "text-navy"}`}>
      <div className="flex items-baseline justify-between gap-6">
        <span data-label-txt className="inline-flex items-center gap-3">
          <span className={dark ? "text-paper" : "text-ink font-semibold"}>{index}</span>
          <span className={`w-1.5 h-1.5 ${dark ? "bg-paper" : "bg-navy"}`} aria-hidden />
          <span>{text}</span>
        </span>
        {right && <span data-label-txt className={dark ? "text-paper/50" : "text-smoke"}>{right}</span>}
      </div>
      <div data-label-line className={`mt-3 h-px w-full origin-left ${dark ? "bg-paper/20" : "bg-line"}`} />
    </div>
  );
}

/* ---------------- Masked line reveal ---------------- */
export function RevealLine({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.15,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <span className="mask-line">
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    </span>
  );
}

/* ---------------- Cinematic image w/ clip reveal + slow scale ---------------- */
export function ClipImage({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "",
  parallax = 5,
  cropTop = 0,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  parallax?: number;
  cropTop?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(18% 8% 18% 8%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 35%", scrub: 0.6 },
        }
      );
      gsap.fromTo(
        imgRef.current,
        { scale: 1.16, yPercent: -parallax },
        {
          scale: 1.05,
          yPercent: parallax,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        }
      );
      if (caption) {
        gsap.fromTo(
          "[data-cap]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 55%" } }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, [parallax, caption]);
  return (
    <figure ref={ref} className={`relative overflow-hidden ${className}`} style={{ clipPath: "inset(18% 8% 18% 8%)" }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover will-change-transform ${imgClassName}`}
        style={{ height: `${112 + cropTop}%`, marginTop: `${-(6 + cropTop)}%` }}
      />
      {caption && (
        <figcaption data-cap className="mono absolute bottom-3 left-3 z-10 text-[9px] sm:text-[10px] tracking-[0.2em] bg-paper/90 text-navy px-2.5 py-1.5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------- Simple fade-up for meta blocks ---------------- */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
