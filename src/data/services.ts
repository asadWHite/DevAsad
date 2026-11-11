import type { L } from "@/i18n/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  XIZMATLAR / УСЛУГИ / SERVICES — centralized, fully localized data.
 *
 *  §08 — every service carries UZ + RU + EN title, description, features and
 *        pricing note.
 *  §09 — the numbers are identical in all locales; only the surrounding words
 *        change, so 2 500 000 stays 2 500 000 everywhere.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const L3 = <T,>(uz: T, ru: T, en: T): L<T> => ({ uz, ru, en });

export type ServiceTag = "web" | "telegram" | "app" | "design" | "ai";

export interface ServiceLevel {
  /** Level name, localized (e.g. LENDING / ЛЕНДИНГ / LANDING). */
  name: L<string>;
  /** Price in UZS — identical across locales. */
  price: number;
  /** Marks the “custom quote” row (price shown as text, not a number). */
  extra?: boolean;
}

export interface Service {
  id: string;
  num: string;
  title: L<string>;
  desc: L<string>;
  /** “Best for” — who this service suits. */
  forWhom: L<string>;
  /** “What’s included” — an already-formatted list line. */
  included: L<string>;
  levels: ServiceLevel[];
  tags: ServiceTag[];
  featured?: boolean;
  /** Real project that demonstrates this service — a brand name, untranslated. */
  example?: string;
}

export const services: Service[] = [
  {
    id: "websites",
    num: "01",
    title: L3("VEB-SAYTLAR", "ВЕБ-САЙТЫ", "WEBSITES"),
    desc: L3(
      "Lending, biznes va premium saytlar — kinematograf taqdimot bilan.",
      "Лендинги, корпоративные и премиальные сайты с кинематографичной подачей.",
      "Landing pages, business and premium websites with cinematic presentation.",
    ),
    forWhom: L3(
      "shaxsiy brendlar, kompaniyalar, agentliklar, mahsulot ishga tushirish",
      "личные бренды, компании, агентства, запуски продуктов",
      "personal brands, companies, agencies, product launches",
    ),
    included: L3(
      "responsiv dizayn, animatsiyalar, to‘g‘ridan-to‘g‘ri Telegram aloqasi, SEO asos, joylashtirish",
      "адаптивный дизайн, анимации, прямой Telegram-контакт, SEO-база, деплой",
      "responsive design, animation, direct Telegram contact, SEO foundation, deployment",
    ),
    levels: [
      { name: L3("LENDING", "ЛЕНДИНГ", "LANDING"), price: 2_500_000 },
      { name: L3("BIZNES SAYT", "БИЗНЕС-САЙТ", "BUSINESS WEBSITE"), price: 5_500_000 },
      { name: L3("PREMIUM / MAXSUS", "ПРЕМИУМ / КАСТОМ", "PREMIUM / CUSTOM"), price: 8_500_000 },
    ],
    tags: ["web"],
    featured: true,
    example: "KASHMIR DECOR",
  },
  {
    id: "telegram",
    num: "02",
    title: L3("TELEGRAM BOTLAR", "TELEGRAM-БОТЫ", "TELEGRAM BOTS"),
    desc: L3(
      "Biznes uchun botlar: arizalar, kataloglar, admin, AI dialoglar.",
      "Боты для бизнеса: заявки, каталоги, админки, AI-диалоги.",
      "Bots for business: leads, catalogs, admin, AI conversations.",
    ),
    forWhom: L3(
      "xizmatlar, do‘konlar, maktablar, mahalliy biznes",
      "услуги, магазины, школы, локальный бизнес",
      "services, shops, schools, local businesses",
    ),
    included: L3(
      "buyruqlar va menyu, lid yig‘ish, ma’lumotlar bazasi, bildirishnomalar, ko‘p tillilik, admin logika",
      "команды и меню, сбор лидов, база данных, уведомления, мультиязычность, админ-логика",
      "commands & menus, lead collection, database, notifications, multilingual flow, admin logic",
    ),
    levels: [
      { name: L3("ODDIY BOT", "БАЗОВЫЙ БОТ", "BASIC BOT"), price: 2_000_000 },
      { name: L3("BIZNES BOT", "БИЗНЕС-БОТ", "BUSINESS BOT"), price: 4_000_000 },
      { name: L3("ILG‘OR / AI", "ПРОДВИНУТЫЙ / AI", "ADVANCED / AI"), price: 7_000_000 },
    ],
    tags: ["telegram"],
    example: "USTATOP",
  },
  {
    id: "miniapp",
    num: "03",
    title: L3("TELEGRAM MINI APP", "TELEGRAM MINI APP", "TELEGRAM MINI APP"),
    desc: L3(
      "Telegram ichidagi to‘liq ilova — o‘rnatish shart emas.",
      "Полноценное приложение внутри Telegram — без установки.",
      "A full app inside Telegram — no installation needed.",
    ),
    forWhom: L3(
      "marketplace’lar, bron qilish, kataloglar, xizmatlar",
      "маркетплейсы, бронирование, каталоги, сервисы",
      "marketplaces, booking, catalogs, services",
    ),
    included: L3(
      "Telegram avtorizatsiya, profil, katalog, bron, to‘lovlar, kabinet, API",
      "Telegram-авторизация, профиль, каталог, бронь, платежи, кабинет, API",
      "Telegram auth, profile, catalog, booking, payments, dashboard, API",
    ),
    levels: [{ name: L3("MINI APP", "MINI APP", "MINI APP"), price: 5_000_000 }],
    tags: ["telegram", "app", "web"],
    featured: true,
    example: "DRIVERA",
  },
  {
    id: "webapp",
    num: "04",
    title: L3("VEB ILOVALAR", "ВЕБ-ПРИЛОЖЕНИЯ", "WEB APPS"),
    desc: L3(
      "Panellar, CRM, marketplace’lar va ichki tizimlar.",
      "Панели, CRM, маркетплейсы и внутренние системы.",
      "Dashboards, CRMs, marketplaces and internal systems.",
    ),
    forWhom: L3(
      "jarayonli kompaniyalar, o‘quv markazlari, xizmatlar",
      "компании с процессами, учебные центры, сервисы",
      "process-driven companies, learning centers, services",
    ),
    included: L3(
      "avtorizatsiya, rollar, dashboardlar, baza, admin, API, to‘lovlar",
      "авторизация, роли, дашборды, база данных, админ, API, платежи",
      "authentication, roles, dashboards, database, admin, APIs, payments",
    ),
    levels: [
      { name: L3("VEB ILOVA / TIZIM", "ВЕБ-ПРИЛОЖЕНИЕ / СИСТЕМА", "WEB APP / SYSTEM"), price: 8_000_000 },
      { name: L3("KATTA MAHSULOT", "КРУПНЫЙ ПРОДУКТ", "LARGE PRODUCT"), price: 0, extra: true },
    ],
    tags: ["web", "app"],
    example: "EDUCRM",
  },
  {
    id: "mobile",
    num: "05",
    title: L3("MOBIL ILOVALAR", "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ", "MOBILE APPS"),
    desc: L3(
      "Kotlin / Compose’da Android va kross-platforma mahsulotlar.",
      "Android на Kotlin / Compose и кроссплатформенные продукты.",
      "Android with Kotlin / Compose and cross-platform products.",
    ),
    forWhom: L3(
      "startaplar, marketplace’lar, xaritaviy xizmatlar",
      "стартапы, маркетплейсы, сервисы с картой",
      "startups, marketplaces, map-based services",
    ),
    included: L3(
      "avtorizatsiya, API, baza, bildirishnomalar, xaritalar, admin",
      "авторизация, API, база данных, уведомления, карты, админ",
      "authentication, API, database, notifications, maps, admin",
    ),
    levels: [
      { name: L3("ANDROID ILOVA", "ANDROID APP", "ANDROID APP"), price: 7_000_000 },
      { name: L3("KROSS-PLATFORMA", "КРОССПЛАТФОРМА", "CROSS-PLATFORM"), price: 10_000_000 },
      { name: L3("ILG‘OR MAHSULOT", "ПРОДВИНУТЫЙ ПРОДУКТ", "ADVANCED PRODUCT"), price: 15_000_000 },
    ],
    tags: ["app"],
    example: "MOBILE LAB",
  },
  {
    id: "uiux",
    num: "06",
    title: L3("UI / UX DIZAYN", "UI / UX ДИЗАЙН", "UI / UX DESIGN"),
    desc: L3(
      "Sotadigan tuzilma, prototiplar va interfeyslar.",
      "Структура, прототипы и интерфейсы, которые продают.",
      "Structure, prototypes and interfaces that sell.",
    ),
    forWhom: L3(
      "startaplar, redizayn, yangi mahsulotlar",
      "стартапы, редизайн, новые продукты",
      "startups, redesigns, new products",
    ),
    included: L3(
      "UX tuzilma, sahifa arxitekturasi, komponentlar, interfeys, dizayn tizimi",
      "UX-структура, архитектура страниц, компоненты, интерфейс, дизайн-система",
      "UX structure, page architecture, components, interface design, design system",
    ),
    levels: [
      { name: L3("UI / UX LOYIHA", "UI / UX ПРОЕКТ", "UI / UX PROJECT"), price: 1_500_000 },
      { name: L3("KATTA MAHSULOT", "КРУПНЫЙ ПРОДУКТ", "LARGE PRODUCT"), price: 0, extra: true },
    ],
    tags: ["design"],
  },
  {
    id: "ai",
    num: "07",
    title: L3("AI VA AVTOMATLASHTIRISH", "AI И АВТОМАТИЗАЦИЯ", "AI & AUTOMATION"),
    desc: L3(
      "AI chatbotlar, assistentlar va kontent avtomatlashtirish.",
      "AI-чатботы, ассистенты и автоматизация контента.",
      "AI chatbots, assistants and content automation.",
    ),
    forWhom: L3(
      "qo‘llab-quvvatlash, kontent, qidiruv, tavsiyalar",
      "поддержка, контент, поиск, рекомендации",
      "support, content, search, recommendations",
    ),
    included: L3(
      "AI chatbot, yordamchi assistent, avtomatlashtirish, AI qidiruv, API integratsiya",
      "AI-чатбот, ассистент поддержки, автоматизация, AI-поиск, API-интеграция",
      "AI chatbot, support assistant, automation, AI search, API integration",
    ),
    levels: [
      { name: L3("AI INTEGRATSIYA", "AI ИНТЕГРАЦИЯ", "AI INTEGRATION"), price: 3_000_000 },
      { name: L3("KATTA MAHSULOT", "КРУПНЫЙ ПРОДУКТ", "LARGE PRODUCT"), price: 0, extra: true },
    ],
    tags: ["ai"],
  },
];

/* -------------------------------------------------------------------------- */
/*  pricing helpers — the number never changes, only its grouping does         */
/* -------------------------------------------------------------------------- */

export const minPrice = (s: Service): number =>
  Math.min(...s.levels.filter((l) => l.price > 0).map((l) => l.price));

/** Compact form used in the card corner: 2.5M+ — digits identical everywhere. */
export const fmtShort = (v: number): string => {
  const m = v / 1_000_000;
  return `${m % 1 === 0 ? m : m.toFixed(1)}M+`;
};

/** Short grouping used inside the estimator: 2 500 000 → "2,5 mln" (localized
 *  decimal separator, identical digits). */
export const fmtCompactUZS = (v: number): L<string> => {
  const m = v / 1_000_000;
  const digits = m % 1 === 0 ? String(m) : m.toFixed(1).replace(".", ",");
  return L3(`${digits} mln`, `${digits} млн`, `${digits}M`);
};
