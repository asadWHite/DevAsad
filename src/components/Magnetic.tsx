import { useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";

export default function Magnetic({
  children,
  strength = 0.32,
  className = "",
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    if (!xTo.current) {
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.9, ease: "power3.out" });
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.9, ease: "power3.out" });
    }
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 10;
    xTo.current!(gsap.utils.clamp(-max, max, dx * strength));
    yTo.current!(gsap.utils.clamp(-max, max, dy * strength));
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div ref={ref} className={`inline-block ${className}`} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
