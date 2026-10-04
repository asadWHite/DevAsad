import type { L } from "@/i18n/types";

const L3 = <T,>(uz: T, ru: T, en: T): L<T> => ({ uz, ru, en });

/* -------------------------------------------------------------------------- */
/*  types                                                                      */
/* -------------------------------------------------------------------------- */

export type ProjectStatus =
  | "live"
  | "live_dev"
  | "waitlist"
  | "concept"
  | "support"
  | "experiment";

export type ProjectTag = "live" | "product" | "web" | "mobile" | "experiment";

/** One localized block inside a case study. */
export interface CaseBlock {
  kicker: L<string>;
  title: L<string>;
  body: L<string>;
  /** optional bullet / step / item list */
  items?: L<string[]>;
  note?: L<string>;
}

export type CaseKey =
  | "overview"
  | "problem"
  | "solution"
  | "how"
  | "customer"
  | "master"
  | "admin"
  | "trust"
  | "verification"
  | "ratings"
  | "beforeAfter"
  | "map"
  | "telegram"
  | "mobile"
  | "technology"
  | "status"
  | "lessons";

export type ProjectCase = Partial<Record<CaseKey, CaseBlock>>;

/** All user-facing copy for one project. Nothing here is a bare string. */
export interface ProjectContent {
  title: L<string>;
  category: L<string>;
  lead: L<string>;
  role: L<string>;
  alt: L<string>;
  note?: L<string>;
}

export interface Project {
  id: string;
  number: string;
  /** Brand name — never translated (§16). */
  brand: string;
  status: ProjectStatus;
  year: string;
  /** Technology names — never translated (§16). */
  tech: string[];
  url?: string;
  url2?: string;
  accent: string;
  tags: ProjectTag[];
  /** REAL asset only — a real site or screenshot URL. No AI or stock imagery. */
  image?: string;
  c: ProjectContent;
  cs: ProjectCase;
}

/** status → message key, so the label is localized in exactly one place. */
export type StatusMessageKey =
  | "status.live"
  | "status.liveDev"
  | "status.waitlist"
  | "status.concept"
  | "status.support"
  | "status.experiment";

export const statusMessageKey: Record<ProjectStatus, StatusMessageKey> = {
  live: "status.live",
  live_dev: "status.liveDev",
  waitlist: "status.waitlist",
  concept: "status.concept",
  support: "status.support",
  experiment: "status.experiment",
};

/* -------------------------------------------------------------------------- */
/*  real Kashmir Decor assets                                                  */
/* -------------------------------------------------------------------------- */

export const KASHMIR_HERO = "https://kashmirdecor.uz/assets/hero.jpg";
export const KASHMIR_ABOUT = "https://kashmirdecor.uz/assets/about.jpg";

/* -------------------------------------------------------------------------- */
/*  projects                                                                   */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  /* ═══════════════════════════════ 01 — KASHMIR DECOR ═══════════════════ */
  {
    id: "kashmir",
    number: "01",
    brand: "KASHMIR DECOR",
    status: "live",
    year: "2026",
    tech: ["React", "Tailwind", "i18n", "SEO", "Vercel"],
    url: "https://kashmirdecor.uz/",
    url2: "https://kashmir-uz.vercel.app/",
    accent: "#0B1F3A",
    tags: ["live", "web", "product"],
    image: KASHMIR_HERO,
    c: {
      title: L3("KASHMIR DECOR", "KASHMIR DECOR", "KASHMIR DECOR"),
      category: L3(
        "PARDALAR SALONI · TOSHKENT · INTERYERLAR",
        "САЛОН ШТОР · ТАШКЕНТ · ИНТЕРЬЕРЫ",
        "CURTAIN SALON · TASHKENT · INTERIORS",
      ),
      lead: L3(
        "KASHMIR DECOR — Toshkentdagi pardalar saloni: buyurtma bo‘yicha parda tikish, matolar kolleksiyasi, interyer kompozitsiyalari va besh bosqichli jarayon — tanishuvdan montajgacha.",
        "KASHMIR DECOR — салон штор в Ташкенте: пошив штор на заказ, коллекция тканей, интерьерные композиции и процесс из пяти шагов — от знакомства до монтажа.",
        "KASHMIR DECOR — a curtain salon in Tashkent: custom curtain tailoring, a fabric collection, interior compositions and a five-step process — from first meeting to installation.",
      ),
      role: L3(
        "DIZAYN · DASTURLASH · SEO",
        "ДИЗАЙН · РАЗРАБОТКА · SEO",
        "DESIGN · DEVELOPMENT · SEO",
      ),
      alt: L3(
        "Kashmir Decor — premium pardalar saloni sayti",
        "Kashmir Decor — сайт салона премиальных штор",
        "Kashmir Decor — premium curtain salon website",
      ),
      note: L3(
        "Haqiqiy bo‘limlar: salon · kolleksiya · interyerlar · jarayon 01–05 · FAQ · ko‘p tillilik · SEO · Vercel",
        "Реальные разделы: салон · коллекция · интерьеры · процесс 01–05 · FAQ · многоязычность · SEO · Vercel",
        "Real sections: salon · collection · interiors · process 01–05 · FAQ · multilingual · SEO · Vercel",
      ),
    },
    cs: {
      overview: {
        kicker: L3("UMUMIY", "ОБЗОР", "OVERVIEW"),
        title: L3("TIKISH + INTERYER", "ПОШИВ + ИНТЕРЬЕРЫ", "TAILORING + INTERIORS"),
        body: L3(
          "Salon, kolleksiya, interyerlar va besh bosqichli jarayon — bitta saytda.",
          "Салон, коллекция, интерьеры и процесс из пяти шагов — на одном сайте.",
          "Salon, collection, interiors and a five-step process — all on one site.",
        ),
        note: L3(
          "SEO · SITEMAP · VERCEL · i18n",
          "SEO · SITEMAP · VERCEL · i18n",
          "SEO · SITEMAP · VERCEL · i18n",
        ),
      },
      problem: {
        kicker: L3("01 — MUAMMO", "01 — ПРОБЛЕМА", "01 — PROBLEM"),
        title: L3("NEGA?", "ЗАЧЕМ?", "WHY?"),
        body: L3(
          "Interyer — bu his-tuyg‘u. Sayt mahsulot emas, kayfiyat sotishi kerak edi: yumshoqlik, sokinlik va ishonch.",
          "Интерьер — это ощущение. Сайт должен был продавать не товар, а настроение: мягкость, спокойствие и доверие.",
          "Interior is a feeling. The site had to sell not a product, but a mood: softness, calm and trust.",
        ),
      },
      solution: {
        kicker: L3("02 — YECHIM", "02 — РЕШЕНИЕ", "02 — SOLUTION"),
        title: L3("YONDASHUV", "ПОДХОД", "APPROACH"),
        body: L3(
          "Moda jurnali kabi sahnalashtirilgan sahifalar: katta rasmlar, ko‘p havo, sekin harakat. Har bir ekran interyer katalogiga o‘xshaydi.",
          "Страницы, поставленные как модный журнал: крупные фото, много воздуха, медленное движение. Каждый экран похож на интерьерный каталог.",
          "Pages staged like a fashion magazine: large images, plenty of air, slow motion. Every screen feels like an interior catalogue.",
        ),
      },
      technology: {
        kicker: L3("03 — TEXNOLOGIYA", "03 — ТЕХНОЛОГИИ", "03 — TECHNOLOGY"),
        title: L3("TEXNIK TOMONI", "ТЕХНИЧЕСКАЯ СТОРОНА", "TECHNICAL SIDE"),
        body: L3(
          "SEO-first arxitektura: to‘g‘ri sarlavhalar, sitemap, indeksatsiya va uch til uchun alohida yo‘llar. Vercel’da tez yuklanadi.",
          "SEO-first архитектура: правильные заголовки, sitemap, индексация и отдельные пути для трёх языков. Быстрая загрузка на Vercel.",
          "SEO-first architecture: proper headings, sitemap, indexing and separate paths for three languages. Loads fast on Vercel.",
        ),
      },
      status: {
        kicker: L3("HOLAT", "СТАТУС", "STATUS"),
        title: L3("JONLI", "РАБОТАЕТ", "LIVE"),
        body: L3(
          "Sayt ishlayapti va indeksatsiya qilinmoqda — kashmirdecor.uz.",
          "Сайт работает и индексируется — kashmirdecor.uz.",
          "The site is live and indexed — kashmirdecor.uz.",
        ),
      },
      lessons: {
        kicker: L3("04 — XULOSA", "04 — ВЫВОДЫ", "04 — LESSONS"),
        title: L3("NIMA O‘RGANDIM", "ЧЕМУ Я НАУЧИЛСЯ", "WHAT I LEARNED"),
        body: L3(
          "Premium — bu bezak emas, intizom. Har bir bo‘sh joy, har bir sekin harakat o‘lchangan bo‘lishi kerak.",
          "Премиальность — это не декор, а дисциплина. Каждый отступ и каждое медленное движение должны быть выверены.",
          "Premium is not decoration — it is discipline. Every gap and every slow movement has to be measured.",
        ),
      },
    },
  },

  /* ═══════════════════════════════ 02 — USTATOP ════════════════════════ */
  {
    id: "ustatop",
    number: "02",
    brand: "USTATOP",
    status: "waitlist",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Telegram Bot", "Waitlist", "SEO"],
    url: "https://ustatop360.uz/",
    accent: "#0B1F3A",
    tags: ["live", "product", "web"],
    c: {
      title: L3("USTATOP", "USTATOP", "USTATOP"),
      category: L3(
        "XIZMATLAR MARKETPLEYSI",
        "МАРКЕТПЛЕЙС УСЛУГ",
        "SERVICE MARKETPLACE",
      ),
      lead: L3(
        "UstaTop — uy va kundalik xizmatlar marketpleysi. Sayt allaqachon jonli: hozircha bu kutish ro‘yxati, xizmatlar katalogi va ishonch mexanikasi bo‘lgan e’lon sahifasi. Platforma ishlab chiqilmoqda.",
        "UstaTop — маркетплейс бытовых услуг. Сайт уже работает: сейчас это страница-анонс с листом ожидания, каталогом услуг и механикой доверия. Платформа в разработке.",
        "UstaTop — a home services marketplace. The site is already live: right now it is an announcement page with a waitlist, service catalogue and trust mechanics. The platform is in development.",
      ),
      role: L3(
        "MAHSULOT · DIZAYN · DASTURLASH",
        "ПРОДУКТ · ДИЗАЙН · РАЗРАБОТКА",
        "PRODUCT · DESIGN · DEVELOPMENT",
      ),
      alt: L3(
        "UstaTop platformasi interfeysi",
        "Интерфейс платформы UstaTop",
        "UstaTop platform interface",
      ),
    },
    cs: {
      problem: {
        kicker: L3("01 — MUAMMO", "01 — ПРОБЛЕМА", "01 — PROBLEM"),
        title: L3("MUAMMOINGIZ BORMI?", "У ВАС ЕСТЬ ПРОБЛЕМА?", "GOT A PROBLEM?"),
        body: L3(
          "Uy va kundalik muammolar uchun bitta platforma. Kran oqyaptimi, svet yo‘qmi — izlash, tanish-bilish, ishonch muammosi haligacha qo‘lda.",
          "Одна платформа для дома и быта. Течёт кран или нет света — поиск, знакомые и вопрос доверия до сих пор решаются вручную.",
          "One platform for home and everyday problems. A leaking tap, no electricity — searching, asking around and the trust question are all still manual.",
        ),
      },
      solution: {
        kicker: L3("02 — YECHIM", "02 — РЕШЕНИЕ", "02 — SOLUTION"),
        title: L3("USTASINI TOPAMIZ", "МЫ НАЙДЁМ МАСТЕРА", "WE FIND THE MASTER"),
        body: L3(
          "Muammoni yozasiz — u arizaga aylanadi, mos usta tanlanadi va ish ilovada kuzatiladi.",
          "Вы описываете проблему — она превращается в заявку, подбирается подходящий мастер, и работа отслеживается в приложении.",
          "You describe the problem — it becomes a request, a matching master is selected, and the job is tracked inside the app.",
        ),
      },
      how: {
        kicker: L3("03 — QANDAY ISHLAYDI", "03 — КАК ЭТО РАБОТАЕТ", "03 — HOW IT WORKS"),
        title: L3("UCH QADAM", "ТРИ ШАГА", "THREE STEPS"),
        body: L3(
          "Muammo → ayting → topamiz. Oddiy oqim, ortiqcha bosqichlarsiz.",
          "Проблема → расскажите → найдём. Простой поток без лишних шагов.",
          "Problem → tell us → we find. A simple flow with no extra steps.",
        ),
      },
      trust: {
        kicker: L3("06 — ISHONCH", "06 — ДОВЕРИЕ", "06 — TRUST"),
        title: L3("ISHONCH — TIZIM", "ДОВЕРИЕ — ЭТО СИСТЕМА", "TRUST IS A SYSTEM"),
        body: L3(
          "Bir nechta belgi emas, to‘liq mexanizm: shaxs tasdiqlanadi, ish isbotlanadi, baho haqiqiy, narx himoyalangan.",
          "Не пара значков, а полноценный механизм: личность подтверждается, работа доказывается, оценка настоящая, цена защищена.",
          "Not a couple of badges — a complete mechanism: identity verified, work proven, ratings real, price protected.",
        ),
      },
      map: {
        kicker: L3("07 — XARITA", "07 — КАРТА", "07 — MAP"),
        title: L3("O‘ZBEKISTON BO‘YLAB", "ПО ВСЕМУ УЗБЕКИСТАНУ", "ACROSS UZBEKISTAN"),
        body: L3(
          "Hududingizda usta mavjudligi manzil va faol mutaxassislarga bog‘liq.",
          "Наличие мастера в вашем регионе зависит от адреса и активных специалистов.",
          "Master availability in your area depends on the address and active specialists.",
        ),
      },
      technology: {
        kicker: L3("08 — TEXNOLOGIYA", "08 — ТЕХНОЛОГИИ", "08 — TECHNOLOGY"),
        title: L3("NIMA USTIDA", "НА ЧЁМ СТОИТ", "WHAT IT STANDS ON"),
        body: L3(
          "Next.js va TypeScript — sayt, Telegram Bot — ariza oqimi, SEO — katalog sahifalari uchun.",
          "Next.js и TypeScript — сайт, Telegram-бот — поток заявок, SEO — страницы каталога.",
          "Next.js and TypeScript for the site, a Telegram bot for the request flow, SEO for the catalogue pages.",
        ),
      },
      status: {
        kicker: L3("HOLAT", "СТАТУС", "STATUS"),
        title: L3("JONLI · ISHLAB CHIQILMOQDA", "РАБОТАЕТ · В РАЗРАБОТКЕ", "LIVE · IN DEVELOPMENT"),
        body: L3(
          "Sayt jonli; platforma ishlab chiqilmoqda. Kutish ro‘yxati ochiq.",
          "Сайт работает; платформа в разработке. Лист ожидания открыт.",
          "The site is live; the platform is in development. The waitlist is open.",
        ),
      },
      lessons: {
        kicker: L3("09 — XULOSA", "09 — ВЫВОДЫ", "09 — LESSONS"),
        title: L3("ENG KATTA SABOQ", "ГЛАВНЫЙ УРОК", "THE BIGGEST LESSON"),
        body: L3(
          "Ishonch — bu tugma emas, tizim. UstaTop’da har bir mexanika shuni isbotlash uchun qurilgan.",
          "Доверие — это не кнопка, а система. В UstaTop каждая механика построена, чтобы доказать это.",
          "Trust is not a button — it is a system. Every mechanic in UstaTop is built to prove that.",
        ),
      },
    },
  },

  /* ═══════════════════════════════ 03 — EDUCRM ═════════════════════════ */
  {
    id: "educrm",
    number: "03",
    brand: "EDUCRM",
    status: "concept",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Auth", "RLS", "Telegram WebApp"],
    accent: "#17385F",
    tags: ["product", "web", "experiment"],
    image: "/images/educrm-dash.jpg",
    c: {
      title: L3("EDUCRM", "EDUCRM", "EDUCRM"),
      category: L3(
        "TA’LIMNI BOSHQARISH PLATFORMASI",
        "ПЛАТФОРМА УПРАВЛЕНИЯ ОБРАЗОВАНИЕМ",
        "EDUCATION MANAGEMENT PLATFORM",
      ),
      lead: L3(
        "O‘zbekistondagi kichik xususiy o‘quv markazlari uchun boshqaruv tizimi. Davlat maktablari uchun emas — real xususiy biznes uchun.",
        "Система управления для небольших частных учебных центров Узбекистана. Не для государственных школ — для реального частного бизнеса.",
        "A management system for small private learning centres in Uzbekistan. Not for public schools — for real private business.",
      ),
      role: L3(
        "KONSEPT · TIZIM · UI",
        "КОНЦЕПТ · СИСТЕМА · UI",
        "CONCEPT · SYSTEM · UI",
      ),
      alt: L3(
        "O‘quv markazlari uchun EduCRM paneli konsepsiyasi",
        "Концепт панели EduCRM для учебных центров",
        "EduCRM dashboard concept for learning centres",
      ),
      note: L3(
        "Veb-admin · Telegram Bot · Telegram Mini App — uch yuz, bitta miya",
        "Веб-админка · Telegram-бот · Telegram Mini App — три лица, один мозг",
        "Web admin · Telegram bot · Telegram Mini App — three faces, one brain",
      ),
    },
    cs: {
      problem: {
        kicker: L3("01 — MUAMMO", "01 — ПРОБЛЕМА", "01 — PROBLEM"),
        title: L3("NIMA MUAMMO", "В ЧЁМ ПРОБЛЕМА", "WHAT’S THE PROBLEM"),
        body: L3(
          "Kichik o‘quv markazlari pul, qarz, davomat va o‘qituvchilar oyligini alohida daftar va jadvallarda yuritadi.",
          "Небольшие учебные центры ведут деньги, долги, посещаемость и зарплаты учителей в разрозненных тетрадях и таблицах.",
          "Small learning centres track money, debts, attendance and teacher salaries across scattered notebooks and spreadsheets.",
        ),
      },
      solution: {
        kicker: L3("02 — YECHIM", "02 — РЕШЕНИЕ", "02 — SOLUTION"),
        title: L3("BITTA PANEL", "ОДНА ПАНЕЛЬ", "ONE PANEL"),
        body: L3(
          "Markaz egasi bitta paneldan pul, qarzlar, davomat, o‘qituvchilar oyligi, o‘quvchilar va guruhlarni ko‘radi.",
          "Владелец центра видит из одной панели деньги, долги, посещаемость, зарплаты учителей, учеников и группы.",
          "The owner sees money, debts, attendance, teacher salaries, students and groups from a single panel.",
        ),
      },
      admin: {
        kicker: L3("03 — ADMIN", "03 — АДМИНКА", "03 — ADMIN"),
        title: L3("UCH YUZ, BITTA MIYA", "ТРИ ЛИЦА, ОДИН МОЗГ", "THREE FACES, ONE BRAIN"),
        body: L3(
          "Veb-admin, Telegram Bot va Telegram Mini App bitta ma’lumotlar bazasi va bitta rollar tizimi bilan ishlaydi.",
          "Веб-админка, Telegram-бот и Telegram Mini App работают с одной базой данных и одной системой ролей.",
          "The web admin, Telegram bot and Telegram Mini App all run on one database and one role system.",
        ),
      },
      technology: {
        kicker: L3("04 — TEXNOLOGIYA", "04 — ТЕХНОЛОГИИ", "04 — TECHNOLOGY"),
        title: L3("NIMA USTIDA", "НА ЧЁМ СТОИТ", "WHAT IT STANDS ON"),
        body: L3(
          "Next.js, TypeScript va Tailwind — interfeys; Supabase, Auth va RLS — ma’lumotlar va huquqlar.",
          "Next.js, TypeScript и Tailwind — интерфейс; Supabase, Auth и RLS — данные и права доступа.",
          "Next.js, TypeScript and Tailwind for the interface; Supabase, Auth and RLS for data and access rights.",
        ),
        note: L3(
          "TIL YO‘NALISHI: AVVAL O‘ZBEK · KEYIN RUS · INGLIZ IXTIYORIY",
          "ЯЗЫКИ: СНАЧАЛА УЗБЕКСКИЙ · ЗАТЕМ РУССКИЙ · АНГЛИЙСКИЙ ОПЦИОНАЛЬНО",
          "LANGUAGES: UZBEK FIRST · RUSSIAN SECOND · ENGLISH OPTIONAL",
        ),
      },
      status: {
        kicker: L3("HOLAT", "СТАТУС", "STATUS"),
        title: L3("KONSEPT", "КОНЦЕПЦИЯ", "CONCEPT"),
        body: L3(
          "Hozircha konsepsiya va ishlab chiqish bosqichida — interfeyslar prototip sifatida qurilmoqda, biznes ko‘rsatkichlari uydurilmayapti.",
          "Пока это концепт в разработке — интерфейсы собираются как прототип, без выдуманных бизнес-метрик.",
          "Currently a concept in development — interfaces are being built as a prototype, with no fabricated business metrics.",
        ),
      },
    },
  },

  /* ═══════════════════════════════ 04 — DRIVERA ════════════════════════ */
  {
    id: "drivera",
    number: "04",
    brand: "DRIVERA",
    status: "concept",
    year: "2026",
    tech: ["Telegram Bot", "Mini App", "Booking", "Admin"],
    accent: "#8E1B2C",
    tags: ["product", "experiment"],
    image: "/images/drivera-main.jpg",
    c: {
      title: L3("DRIVERA", "DRIVERA", "DRIVERA"),
      category: L3(
        "AVTOMOBIL IJARASI MARKETPLEYSI",
        "МАРКЕТПЛЕЙС АРЕНДЫ АВТО",
        "CAR RENTAL MARKETPLACE",
      ),
      lead: L3(
        "Premium avtomobil ijarasi bozori konsepsiyasi: egalar mashina qo‘yadi, haydovchilar band qiladi, platforma komissiya oladi.",
        "Концепт премиального маркетплейса аренды автомобилей: владельцы размещают машины, водители бронируют, платформа берёт комиссию.",
        "A concept for a premium car rental marketplace: owners list cars, drivers book, the platform takes a commission.",
      ),
      role: L3(
        "KONSEPT · BREND · UI",
        "КОНЦЕПТ · БРЕНД · UI",
        "CONCEPT · BRAND · UI",
      ),
      alt: L3(
        "DRIVERA — avtomobil ijarasi konsepsiyasi",
        "DRIVERA — концепт аренды автомобилей",
        "DRIVERA — car rental concept",
      ),
    },
    cs: {
      overview: {
        kicker: L3("UMUMIY", "ОБЗОР", "OVERVIEW"),
        title: L3("DRIVERA — KONSEPT UI", "DRIVERA — КОНЦЕПТ UI", "DRIVERA — CONCEPT UI"),
        body: L3(
          "Egalar mashina joylashtiradi, haydovchilar band qiladi, platforma komissiya oladi.",
          "Владельцы размещают машины, водители бронируют, платформа берёт комиссию.",
          "Owners list cars, drivers book, the platform takes a commission.",
        ),
        note: L3(
          "CHUQUR TO‘Q KO‘K · SHAROB QIZIL · TAHRIRIY YONDASHUV",
          "ГЛУБОКИЙ ТЁМНО-СИНИЙ · ВИННЫЙ КРАСНЫЙ · РЕДАКЦИОННАЯ ПОДАЧА",
          "DEEP NAVY BLUE · WINE RED · EDITORIAL APPROACH",
        ),
      },
      how: {
        kicker: L3("01 — QANDAY ISHLAYDI", "01 — КАК ЭТО РАБОТАЕТ", "01 — HOW IT WORKS"),
        title: L3("BESHTA QISM", "ПЯТЬ ЧАСТЕЙ", "FIVE PARTS"),
        body: L3(
          "Telegram Bot, Mini App, band qilish, admin tasdig‘i va komissiya modeli.",
          "Telegram-бот, Mini App, бронирование, подтверждение админом и модель комиссии.",
          "Telegram bot, Mini App, booking, admin approval and a commission model.",
        ),
        items: L3(
          ["TELEGRAM BOT", "MINI APP", "BAND QILISH", "ADMIN TASDIG‘I", "KOMISSIYA MODELI"],
          ["TELEGRAM-БОТ", "MINI APP", "БРОНИРОВАНИЕ", "МОДЕРАЦИЯ", "КОМИССИЯ"],
          ["TELEGRAM BOT", "MINI APP", "BOOKING", "ADMIN APPROVAL", "COMMISSION MODEL"],
        ),
      },
      status: {
        kicker: L3("HOLAT", "СТАТУС", "STATUS"),
        title: L3("KONSEPT — TADQIQOT BOSQICHIDA", "КОНЦЕПТ — НА СТАДИИ ИССЛЕДОВАНИЯ", "CONCEPT — RESEARCH PHASE"),
        body: L3(
          "Bozor va raqobatchilar o‘rganilmoqda; interfeys vizual konsept sifatida tayyor.",
          "Изучаются рынок и конкуренты; интерфейс готов как визуальная концепция.",
          "Market and competitors are being studied; the interface is ready as a visual concept.",
        ),
      },
    },
  },

  /* ═══════════════════════════════ 05 — USTATOP SOCIAL HUB ═════════════ */
  {
    id: "hub",
    number: "05",
    brand: "USTATOP SOCIAL HUB",
    status: "support",
    year: "2026",
    tech: ["Landing", "Instagram", "Vercel"],
    url: "https://ustatopinst.vercel.app/",
    accent: "#0B1F3A",
    tags: ["live", "web"],
    c: {
      title: L3("USTATOP SOCIAL HUB", "USTATOP SOCIAL HUB", "USTATOP SOCIAL HUB"),
      category: L3(
        "BRENDNING IJTIMOIY TOMONI",
        "СОЦИАЛЬНАЯ СТОРОНА БРЕНДА",
        "THE BRAND’S SOCIAL SIDE",
      ),
      lead: L3(
        "UstaTop ijtimoiy hubi — brendning Instagram va qo‘nish sahifasi tomoni. Bitta vizual tizim, bitta ovoz.",
        "Социальный хаб UstaTop — сторона бренда в Instagram и на посадочной странице. Одна визуальная система, один голос.",
        "The UstaTop social hub — the brand side on Instagram and the landing page. One visual system, one voice.",
      ),
      role: L3("DIZAYN · DASTURLASH", "ДИЗАЙН · РАЗРАБОТКА", "DESIGN · DEVELOPMENT"),
      alt: L3(
        "UstaTop Social Hub qo‘nish sahifasi",
        "Посадочная страница UstaTop Social Hub",
        "UstaTop Social Hub landing page",
      ),
    },
    cs: {
      overview: {
        kicker: L3("UMUMIY", "ОБЗОР", "OVERVIEW"),
        title: L3("BITTA OVOZ", "ОДИН ГОЛОС", "ONE VOICE"),
        body: L3(
          "UstaTop’ning barcha yuzalarida ishlaydigan yagona vizual tizim.",
          "Единая визуальная система, работающая на всех поверхностях UstaTop.",
          "A single visual system that works across every UstaTop surface.",
        ),
      },
      status: {
        kicker: L3("HOLAT", "СТАТУС", "STATUS"),
        title: L3("QO‘SHIMCHA LOYIHA", "ВСПОМОГАТЕЛЬНЫЙ ПРОЕКТ", "SUPPORTING PROJECT"),
        body: L3(
          "Asosiy mahsulotni qo‘llab-quvvatlaydigan qo‘nish sahifasi — jonli.",
          "Посадочная страница, поддерживающая основной продукт, — работает.",
          "A landing page that supports the main product — live.",
        ),
      },
    },
  },

  /* ═══════════════════════════════ 06 — MOBILE LAB ═════════════════════ */
  {
    id: "mobilelab",
    number: "06",
    brand: "MOBILE LAB",
    status: "experiment",
    year: "2026",
    tech: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM", "Hilt"],
    accent: "#17385F",
    tags: ["mobile", "experiment"],
    c: {
      title: L3("MOBILE LAB", "MOBILE LAB", "MOBILE LAB"),
      category: L3(
        "ANDROID TADQIQOTI",
        "ANDROID-ИССЛЕДОВАНИЕ",
        "ANDROID RESEARCH",
      ),
      lead: L3(
        "Kotlin va Jetpack Compose’da Android ilovasi — tadqiqot va interfeys izlanishlari. Hali chiqarilmagan, shuning uchun bu yerda soxta maketlar yo‘q.",
        "Android-приложение на Kotlin и Jetpack Compose — исследование и поиск интерфейсных решений. Ещё не выпущено, поэтому здесь нет фейковых макетов.",
        "An Android app in Kotlin and Jetpack Compose — research and interface exploration. Not shipped yet, so there are no fake mockups here.",
      ),
      role: L3("TADQIQOT · UI", "ИССЛЕДОВАНИЕ · UI", "RESEARCH · UI"),
      alt: L3(
        "UstaTop Android ilovasi ekranlari",
        "Экраны Android-приложения UstaTop",
        "UstaTop Android app screens",
      ),
    },
    cs: {
      overview: {
        kicker: L3("UMUMIY", "ОБЗОР", "OVERVIEW"),
        title: L3("MOBIL TOMON", "МОБИЛЬНАЯ СТОРОНА", "THE MOBILE SIDE"),
        body: L3(
          "Kotlin + Jetpack Compose ustida tadqiqot. Ekranlar hali chiqarilmagan — faqat haqiqiy narsa ko‘rsatiladi.",
          "Исследование на Kotlin + Jetpack Compose. Экраны ещё не выпущены — показывается только реальное.",
          "Research on Kotlin + Jetpack Compose. Screens are not shipped yet — only what is real is shown.",
        ),
        note: L3(
          "EKRANLAR: hali chiqarilmagan — bu yerda soxta maketlar yo‘q",
          "ЭКРАНЫ: ещё не выпущены — фейковых макетов здесь нет",
          "SCREENS: not shipped yet — no fake mockups here",
        ),
      },
      technology: {
        kicker: L3("TEXNOLOGIYA", "ТЕХНОЛОГИИ", "TECHNOLOGY"),
        title: L3("NIMA USTIDA", "НА ЧЁМ СТОИТ", "WHAT IT STANDS ON"),
        body: L3(
          "Kotlin, Jetpack Compose, Material 3, MVVM va Hilt.",
          "Kotlin, Jetpack Compose, Material 3, MVVM и Hilt.",
          "Kotlin, Jetpack Compose, Material 3, MVVM and Hilt.",
        ),
      },
      status: {
        kicker: L3("HOLAT", "СТАТУС", "STATUS"),
        title: L3("EKSPERIMENT", "ЭКСПЕРИМЕНТ", "EXPERIMENT"),
        body: L3(
          "O‘rganish laboratoriyasi — mahsulot va’dasi emas.",
          "Лаборатория обучения, а не обещание продукта.",
          "A learning lab, not a product promise.",
        ),
      },
    },
  },
];

/** The five EduCRM screens — localized. */
export const EDUCRM_SCREENS: L<string[]> = L3(
  ["Boshqaruv paneli", "O‘quvchilar", "Davomat", "Moliya", "O‘qituvchilar"],
  ["Панель", "Ученики", "Посещаемость", "Финансы", "Учителя"],
  ["Dashboard", "Students", "Attendance", "Finance", "Teachers"],
);

/* -------------------------------------------------------------------------- */
/*  helpers                                                                    */
/* -------------------------------------------------------------------------- */

export const projectsById: Record<string, Project> = Object.fromEntries(
  projects.map((p) => [p.id, p]),
);

export function getProject(id: string): Project {
  const p = projectsById[id];
  if (!p) throw new Error(`Unknown project: ${id}`);
  return p;
}
