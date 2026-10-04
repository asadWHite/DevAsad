/** Personal contact details. This is a direct Telegram link — no bot or lead system. */
export interface PersonalContacts {
  telegram: string;
  instagram: string;
  github: string;
  email: string;
}

const PLACEHOLDER = "__SET_ME__";

export const contacts: PersonalContacts = {
  telegram: "Xidoyatovvv",
  instagram: PLACEHOLDER,
  github: PLACEHOLDER,
  email: PLACEHOLDER,
};

export const isSet = (v: string) => v !== PLACEHOLDER && v.trim().length > 0;
export const tgUrl = () => `https://t.me/${contacts.telegram}`;
export const igUrl = () => (isSet(contacts.instagram) ? `https://instagram.com/${contacts.instagram}` : "");
export const ghUrl = () => isSet(contacts.github) ? (contacts.github.startsWith("http") ? contacts.github : `https://github.com/${contacts.github}`) : "";
export const mailUrl = (subject?: string) => isSet(contacts.email) ? `mailto:${contacts.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` : "";
