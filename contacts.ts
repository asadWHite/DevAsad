/**
 * SHAXSIY KONTAKTLAR — KONFIGURATSIYA
 * ⚠️ MUHIM: Bu yerga Asadbekning SHAXSIY akkauntlari yoziladi.
 * Hozir placeholder holatda — haqiqiy qiymat kiritilgach UI avtomatik ishga tushadi.
 * Hech qachon loyiha akkauntlarini (UstaTop, Kashmir) bu yerga yozmang!
 */

export interface PersonalContacts {
  telegram: string; // username without @, masalan: "asadbek_dev"
  instagram: string; // username without @
  github: string; // username or full url
  email: string; // to'liq email
}

const PLACEHOLDER = "__SET_ME__";

export const contacts: PersonalContacts = {
  telegram: PLACEHOLDER, // ← shaxsiy Telegram username kiriting
  instagram: PLACEHOLDER, // ← shaxsiy Instagram username kiriting
  github: PLACEHOLDER, // ← GitHub username kiriting
  email: PLACEHOLDER, // ← shaxsiy email kiriting
};

export const isSet = (v: string) => v !== PLACEHOLDER && v.trim().length > 0;

export const tgUrl = (text?: string) =>
  isSet(contacts.telegram)
    ? `https://t.me/${contacts.telegram}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : "";

export const igUrl = () => (isSet(contacts.instagram) ? `https://instagram.com/${contacts.instagram}` : "");
export const ghUrl = () =>
  isSet(contacts.github)
    ? contacts.github.startsWith("http")
      ? contacts.github
      : `https://github.com/${contacts.github}`
    : "";
export const mailUrl = (subject?: string) =>
  isSet(contacts.email) ? `mailto:${contacts.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` : "";
