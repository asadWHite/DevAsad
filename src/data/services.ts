/** XIZMATLAR — markazlashtirilgan data. Narxni o'zgartirish uchun faqat shu fayl. */

export type ServiceTag = "web" | "telegram" | "app" | "design" | "ai";

export interface ServiceLevel {
  nameKey: string; // i18n: daraja nomi
  price: number; // UZS
  extra?: boolean; // "custom quote" variant
}

export interface Service {
  id: string;
  num: string;
  titleKey: string;
  descKey: string;
  forKey: string;
  inclKey: string; // vergul bilan ajratilgan ro'yxat key'i
  levels: ServiceLevel[];
  tags: ServiceTag[];
  featured?: boolean;
  exampleKey?: string; // namuna loyiha nomi
}

export const services: Service[] = [
  {
    id: "websites",
    num: "01",
    titleKey: "s1_t",
    descKey: "s1_d",
    forKey: "s1_f",
    inclKey: "s1_i",
    levels: [
      { nameKey: "lv_landing", price: 2_500_000 },
      { nameKey: "lv_business", price: 5_500_000 },
      { nameKey: "lv_premium", price: 8_500_000 },
    ],
    tags: ["web"],
    featured: true,
    exampleKey: "KASHMIR",
  },
  {
    id: "telegram",
    num: "02",
    titleKey: "s2_t",
    descKey: "s2_d",
    forKey: "s2_f",
    inclKey: "s2_i",
    levels: [
      { nameKey: "lv_basic_bot", price: 2_000_000 },
      { nameKey: "lv_business_bot", price: 4_000_000 },
      { nameKey: "lv_ai_bot", price: 7_000_000 },
    ],
    tags: ["telegram"],
    exampleKey: "USTATOP",
  },
  {
    id: "miniapp",
    num: "03",
    titleKey: "s3_t",
    descKey: "s3_d",
    forKey: "s3_f",
    inclKey: "s3_i",
    levels: [{ nameKey: "lv_miniapp", price: 5_000_000 }],
    tags: ["telegram", "app", "web"],
    featured: true,
    exampleKey: "DRIVERA",
  },
  {
    id: "webapp",
    num: "04",
    titleKey: "s4_t",
    descKey: "s4_d",
    forKey: "s4_f",
    inclKey: "s4_i",
    levels: [
      { nameKey: "lv_webapp", price: 8_000_000 },
      { nameKey: "lv_custom", price: 0, extra: true },
    ],
    tags: ["web", "app"],
    exampleKey: "EDUCRM",
  },
  {
    id: "mobile",
    num: "05",
    titleKey: "s5_t",
    descKey: "s5_d",
    forKey: "s5_f",
    inclKey: "s5_i",
    levels: [
      { nameKey: "lv_android", price: 7_000_000 },
      { nameKey: "lv_cross", price: 10_000_000 },
      { nameKey: "lv_advmob", price: 15_000_000 },
    ],
    tags: ["app"],
    exampleKey: "MOBILE LAB",
  },
  {
    id: "uiux",
    num: "06",
    titleKey: "s6_t",
    descKey: "s6_d",
    forKey: "s6_f",
    inclKey: "s6_i",
    levels: [
      { nameKey: "lv_uiux", price: 1_500_000 },
      { nameKey: "lv_custom", price: 0, extra: true },
    ],
    tags: ["design"],
  },
  {
    id: "ai",
    num: "07",
    titleKey: "s7_t",
    descKey: "s7_d",
    forKey: "s7_f",
    inclKey: "s7_i",
    levels: [
      { nameKey: "lv_ai", price: 3_000_000 },
      { nameKey: "lv_custom", price: 0, extra: true },
    ],
    tags: ["ai"],
  },
];

export const minPrice = (s: Service) => Math.min(...s.levels.filter((l) => l.price > 0).map((l) => l.price));

export const fmtUZS = (v: number) => new Intl.NumberFormat("ru-RU").format(Math.round(v));
export const fmtShort = (v: number) => {
  const m = v / 1_000_000;
  return `${m % 1 === 0 ? m : m.toFixed(1)}M+`;
};
