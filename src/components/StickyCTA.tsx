import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";

/* Mobile-only floating CTA: appears after hero, hides on scroll-up & near contact */
export default function StickyCTA() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const lastY = useRef(0);
  const nearContact = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        lastY.current = y;
        const past = y > window.innerHeight * 0.85;
        setShow(past && !nearContact.current && dy >= -2);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const contact = document.getElementById("contact");
    const obs = contact
      ? new IntersectionObserver(([e]) => (nearContact.current = e.isIntersecting), { rootMargin: "0px 0px -20% 0px" })
      : null;
    if (contact && obs) obs.observe(contact);
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, []);

  return (
    <a
      href="#contact"
      aria-hidden={!show}
      className={`md:hidden fixed left-4 right-4 z-[85] flex items-center justify-center gap-2.5 bg-navy text-paper py-4 mono text-[11px] tracking-[0.2em] font-semibold shadow-[0_16px_40px_-12px_rgba(7,22,42,0.55)] transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${
        show ? "bottom-4 opacity-100" : "-bottom-20 opacity-0 pointer-events-none"
      }`}
      style={{ bottom: show ? "calc(env(safe-area-inset-bottom, 0px) + 16px)" : undefined }}
    >
      {t("cta_float")}
      <ArrowUpRight size={14} />
    </a>
  );
}
