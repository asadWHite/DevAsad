export type ProjectStatus = "live" | "live_dev" | "waitlist" | "concept" | "support" | "experiment";
export type ProjectTag = "live" | "product" | "web" | "mobile" | "experiment";

export interface Project {
  id: string;
  number: string;
  title: string;
  catKey: string;
  leadKey: string;
  status: ProjectStatus;
  year: string;
  roleEn: string;
  roleRu: string;
  tech: string[];
  url?: string;
  urlLabel?: string;
  url2?: string;
  url2Label?: string;
  accent: string;
  tags: ProjectTag[];
  /** REAL asset only — haqiqiy sayt/screenshot URL. AI yoki stock manbaning yo'li yo'q. */
  image?: string;
  altKey?: string;
}

/** Haqiqiy Kashmir Decor assetlari — kashmirdecor.uz dan */
export const KASHMIR_HERO = "https://kashmirdecor.uz/assets/hero.jpg";
export const KASHMIR_ABOUT = "https://kashmirdecor.uz/assets/about.jpg";

export const projects: Project[] = [
  {
    id: "kashmir",
    number: "01",
    title: "KASHMIR DECOR",
    catKey: "k_cat",
    leadKey: "k_lead",
    status: "live",
    year: "2026",
    roleEn: "DESIGN · DEVELOPMENT · SEO",
    roleRu: "ДИЗАЙН · РАЗРАБОТКА · SEO",
    tech: ["React", "Tailwind", "i18n", "SEO", "Vercel"],
    url: "https://kashmirdecor.uz/",
    urlLabel: "kashmirdecor.uz",
    url2: "https://kashmir-uz.vercel.app/",
    url2Label: "kashmir-uz.vercel.app",
    accent: "#0B1F3A",
    tags: ["live", "web", "product"],
    image: KASHMIR_HERO,
    altKey: "alt_kashmir",
  },
  {
    id: "ustatop",
    number: "02",
    title: "USTATOP",
    catKey: "u_cat",
    leadKey: "u_lead",
    status: "waitlist",
    year: "2026",
    roleEn: "PRODUCT · DESIGN · DEVELOPMENT",
    roleRu: "ПРОДУКТ · ДИЗАЙН · РАЗРАБОТКА",
    tech: ["Next.js", "TypeScript", "Telegram Bot", "Waitlist", "SEO"],
    url: "https://ustatop360.uz/",
    urlLabel: "ustatop360.uz",
    accent: "#0B1F3A",
    tags: ["live", "product", "web"],
    /* UstaTop'da hozircha real screenshot yo'q — sayt typographic coming-soon.
       Vizual = real kontent (muammolar, xizmatlar, ishonch) tipografika orqali. */
    altKey: "alt_ustatop",
  },
  {
    id: "educrm",
    number: "03",
    title: "EDUCRM",
    catKey: "e_cat",
    leadKey: "e_lead",
    status: "concept",
    year: "2026",
    roleEn: "CONCEPT · SYSTEM · UI",
    roleRu: "КОНЦЕПТ · СИСТЕМА · UI",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Auth", "RLS", "Telegram WebApp"],
    accent: "#17385F",
    tags: ["product", "web", "experiment"],
    image: "/images/educrm-dash.jpg",
    altKey: "alt_educrm",
  },
  {
    id: "drivera",
    number: "04",
    title: "DRIVERA",
    catKey: "d_cat",
    leadKey: "d_lead",
    status: "concept",
    year: "2026",
    roleEn: "CONCEPT · BRAND · UI",
    roleRu: "КОНЦЕПТ · БРЕНД · UI",
    tech: ["Telegram Bot", "Mini App", "Booking", "Admin"],
    accent: "#8E1B2C",
    tags: ["product", "experiment"],
    image: "/images/drivera-main.jpg",
    altKey: "alt_drivera",
  },
  {
    id: "hub",
    number: "05",
    title: "USTATOP SOCIAL HUB",
    catKey: "u_hub_t",
    leadKey: "u_hub_b",
    status: "support",
    year: "2026",
    roleEn: "DESIGN · DEVELOPMENT",
    roleRu: "ДИЗАЙН · РАЗРАБОТКА",
    tech: ["Landing", "Instagram", "Vercel"],
    url: "https://ustatopinst.vercel.app/",
    urlLabel: "ustatopinst.vercel.app",
    accent: "#0B1F3A",
    tags: ["live", "web"],
  },
  {
    id: "mobilelab",
    number: "06",
    title: "MOBILE LAB",
    catKey: "u_mobile_t",
    leadKey: "u_mobile_b",
    status: "experiment",
    year: "2026",
    roleEn: "RESEARCH · UI",
    roleRu: "ИССЛЕДОВАНИЕ · UI",
    tech: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM", "Hilt"],
    accent: "#17385F",
    tags: ["mobile", "experiment"],
  },
];

export const statusKey: Record<ProjectStatus, string> = {
  live: "st_live",
  live_dev: "st_live_dev",
  waitlist: "st_waitlist",
  concept: "st_concept",
  support: "st_support",
  experiment: "st_experiment",
};
