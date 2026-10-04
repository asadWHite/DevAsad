import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import { tgUrl } from "@/data/contacts";
import TelegramIcon from "./TelegramIcon";

/* Direct personal Telegram contact, always one tap away on mobile. */
export default function StickyCTA() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const lastY = useRef(0);
  const nearContact = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      setShow(y > window.innerHeight * 0.75 && !nearContact.current && dy >= -2);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const contact = document.getElementById("contact");
    const obs = contact ? new IntersectionObserver(([e]) => (nearContact.current = e.isIntersecting), { rootMargin: "0px 0px -20% 0px" }) : null;
    if (contact && obs) obs.observe(contact);
    return () => { window.removeEventListener("scroll", onScroll); obs?.disconnect(); };
  }, []);

  return (
    <a href={tgUrl()} target="_blank" rel="noopener noreferrer" aria-hidden={!show}
      className={`md:hidden fixed left-4 right-4 z-[85] flex items-center justify-center gap-3 bg-paper text-navy border border-navy py-4 mono text-[11px] tracking-[0.2em] font-semibold shadow-[0_16px_40px_-12px_rgba(7,22,42,0.35)] transition-all duration-500 ${show ? "bottom-4 opacity-100" : "-bottom-20 opacity-0 pointer-events-none"}`}
      style={{ bottom: show ? "calc(env(safe-area-inset-bottom, 0px) + 16px)" : undefined }}>
      <TelegramIcon size={16} /> {t("actions.discussProject")}
    </a>
  );
}
