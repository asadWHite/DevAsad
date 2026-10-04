import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { LangProvider, useLang } from "./i18n";
import { scrollState } from "./lib/scroll";
import Cursor from "./components/Cursor";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import StickyCTA from "./components/StickyCTA";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Kashmir from "./sections/Kashmir";
import Ustatop from "./sections/Ustatop";
import Educrm from "./sections/Educrm";
import Drivera from "./sections/Drivera";
import HorizontalStory from "./sections/HorizontalStory";
import Services from "./sections/Services";
import Estimator from "./sections/Estimator";
import FaqCompare from "./sections/FaqCompare";
import Lab from "./sections/Lab";
import Stack from "./sections/Stack";
import Process from "./sections/Process";
import Catalogue from "./sections/Catalogue";
import NowNext from "./sections/NowNext";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const META = {
  ru: {
    title: "Dev.Асад — Личная цифровая студия",
    desc: "Dev.Асад — веб-разработчик и создатель цифровых продуктов. Реальная работа: kashmirdecor.uz · ustatop360.uz. Цены от 1,5 млн сум.",
  },
  en: {
    title: "Dev.Асад — Personal Digital Studio",
    desc: "Dev.Асад — web developer and digital product builder. Real work: kashmirdecor.uz · ustatop360.uz. Prices from 1.5M UZS.",
  },
  uz: {
    title: "Dev.Асад — Shaxsiy raqamli studiya",
    desc: "Dev.Асад — veb dasturchi va raqamli mahsulotlar yaratuvchisi. Haqiqiy ishlar: kashmirdecor.uz · ustatop360.uz. Narxlar 1.5 mln so'mdan.",
  },
};

function Site() {
  const { lang, t } = useLang();
  const [introDone, setIntroDone] = useState(false);
  const [morphing, setMorphing] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  /* -------- Lenis + ScrollTrigger wiring -------- */
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) gsap.globalTimeline.timeScale(60);

    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({ duration: 1.15, smoothWheel: !reduced, anchors: true });
    lenisRef.current = lenis;
    lenis.on("scroll", (e: { velocity: number; scroll: number }) => {
      scrollState.v = e.velocity;
      scrollState.y = e.scroll;
    });
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    /* global scroll progress hairline */
    ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => {
        const bar = document.getElementById("s-progress");
        if (bar) bar.style.transform = `scaleY(${self.progress})`;
      },
    });

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  /* -------- scroll lock during intro -------- */
  useEffect(() => {
    if (!introDone) {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = "";
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [introDone]);

  /* -------- language: metadata + refresh -------- */
  useEffect(() => {
    const m = META[lang];
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", m.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", m.desc);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  /* -------- premium language switch pulse -------- */
  const onLangSwitch = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      mainRef.current,
      { filter: "blur(7px)", opacity: 0.55, y: 4 },
      { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.7, ease: "power2.out", clearProps: "filter" }
    );
  };

  return (
    <>
      <Cursor />
      <div id="s-progress" className="fixed right-0 top-0 z-[95] h-full w-[2px] bg-navy origin-top scale-y-0" aria-hidden />
      {!introDone && <Intro onDone={() => setIntroDone(true)} onMorphStart={() => setMorphing(true)} />}
      <Nav onLang={onLangSwitch} />
      <StickyCTA />
      <main ref={mainRef}>
        <Hero ready={morphing || introDone} />
        <About />
        <Kashmir />
        <Ustatop />
        <Educrm />
        <Drivera />
        <HorizontalStory />
        <Services />
        <Estimator />
        <FaqCompare />
        <Lab />
        <Stack />
        <Process />
        <Catalogue />
        <NowNext />
        <Contact />
      </main>
      <div className="sr-only" aria-live="polite">
        {t("intro_archive")} — {lang.toUpperCase()}
      </div>
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Site />
      {/*
        Vercel Web Analytics + Speed Insights.
        Mounted exactly once here in the root component (this project is a Vite SPA,
        not Next.js, so there is no app/layout.tsx): one global instance for the whole
        site, all locales (/uz, /ru, /) and nested paths. Both components render `null`
        and inject a deferred script, so they add no DOM, no layout shift and never
        block the intro/hero. Auto pageview tracking is left on (no `route` prop) so
        client-side history changes are measured by the official script itself.
      */}
      <Analytics />
      <SpeedInsights />
    </LangProvider>
  );
}
