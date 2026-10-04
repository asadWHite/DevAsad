import type { L } from "@/i18n/types";

/** Tiny helper so every localized value is written uz → ru → en in one line. */
const L3 = <T,>(uz: T, ru: T, en: T): L<T> => ({ uz, ru, en });

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  USTATOP — FULL CASE STUDY CONTENT
 *  Every value is a nested { uz, ru, en } object. Nothing here is a bare
 *  string, so rendering the Russian page can never leak Uzbek copy.
 *
 *  Source of truth: the live site https://ustatop360.uz
 *  §19 — no facts are invented. Every line below mirrors what the product
 *  actually does or states publicly.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Named {
  n: string;
  d: string;
}

/* ─────────── 01 — everyday problems ─────────── */

export const UT_PROBLEMS: L<string[]> = L3(
  [
    "Kran oqyapti",
    "Svet yo‘q",
    "Konditsioner sovutmaydi",
    "Muzlatgich ishlamaydi",
    "Devor nam",
    "Eshik yopilmaydi",
    "Rozetka uchqunlaydi",
    "Truba yorildi",
  ],
  [
    "Кран течёт",
    "Нет света",
    "Кондиционер не охлаждает",
    "Холодильник не работает",
    "Сырость на стене",
    "Дверь не закрывается",
    "Розетка искрит",
    "Труба лопнула",
  ],
  [
    "Tap is leaking",
    "No electricity",
    "AC not cooling",
    "Fridge not working",
    "Damp wall",
    "Door won’t close",
    "Socket sparking",
    "Pipe burst",
  ],
);

/* ─────────── 02 — how the customer explains it ─────────── */

export const UT_CHANNELS: L<Named[]> = L3(
  [
    { n: "MATN", d: "Muammoni qisqa tasvirlang" },
    { n: "MANZIL", d: "Usta keladigan joyni kiriting" },
    { n: "VAQT", d: "Qulay vaqtni belgilang" },
    { n: "OVOZ", d: "Brauzer qo‘llasa ovozdan foydalaning" },
  ],
  [
    { n: "ТЕКСТ", d: "Кратко опишите проблему" },
    { n: "АДРЕС", d: "Укажите, куда должен приехать мастер" },
    { n: "ВРЕМЯ", d: "Выберите удобное время" },
    { n: "ГОЛОС", d: "Если браузер поддерживает, используйте голос" },
  ],
  [
    { n: "TEXT", d: "Describe the problem briefly" },
    { n: "ADDRESS", d: "Enter where the master should come" },
    { n: "TIME", d: "Pick a convenient time" },
    { n: "VOICE", d: "If the browser allows, use voice" },
  ],
);

/** The sample request shown in the interface preview. */
export const UT_EXAMPLE_REQUEST: L<string> = L3(
  "Kranim oqyapti.",
  "У меня течёт кран.",
  "My tap is leaking.",
);

/** The three mechanics cards inside stage 03. */
export const UT_MATCH_STEPS: L<string[]> = L3(
  ["Ariza tushuniladi", "Mos usta tanlanadi", "Holat kuzatiladi"],
  ["Заявка понятна", "Мастер подобран", "Статус виден"],
  ["Request understood", "Master matched", "Status tracked"],
);

/** Flow strip: message → request → master selection. */
export const UT_FLOW: L<string> = L3(
  "XABAR → ARIZA → USTA TANLOVI",
  "СООБЩЕНИЕ → ЗАЯВКА → ВЫБОР МАСТЕРА",
  "MESSAGE → REQUEST → MASTER MATCH",
);

export const UT_ANALYSING: L<string> = L3(
  "TAHLIL QILISH",
  "АНАЛИЗИРУЕМ",
  "ANALYSING",
);

/** The one-line promise, reused across the section. */
export const UT_SYSTEM: L<string> = L3(
  "MUAMMO → AYTING → TOPAMIZ → ISHONCH",
  "ПРОБЛЕМА → РАССКАЖИТЕ → НАЙДЁМ → ДОВЕРИЕ",
  "PROBLEM → TELL US → WE FIND → TRUST",
);

/* ─────────── 04 — before / after proof ─────────── */

export const UT_BEFORE_AFTER: L<string[]> = L3(
  ["01 OLDIN", "02 ISH", "03 KEYIN"],
  ["01 ДО", "02 РАБОТА", "03 ПОСЛЕ"],
  ["01 BEFORE", "02 WORK", "03 AFTER"],
);

export const UT_BEFORE_AFTER_BODY: L<string> = L3(
  "Ilovada ishni boshlashdan oldingi va yakuniy tasdiq rasmlari buyurtmaga biriktirilishi mumkin.",
  "В приложении к заказу могут прикрепляться подтверждающие фото — до начала работы и по её завершении.",
  "In the app, before-work and final confirmation photos can be attached to the order.",
);

/* ─────────── 05 — the master's side ─────────── */

export const UT_MASTER_SIDE: L<string[]> = L3(
  ["O‘z narxingiz", "O‘z hududingiz", "To‘g‘ridan-to‘g‘ri to‘lov", "Ish tarixi va reyting"],
  ["Своя цена", "Свой район", "Прямая оплата", "История работ и рейтинг"],
  ["Your own price", "Your own area", "Direct payment", "Job history and rating"],
);

export const UT_MASTER_LABELS = {
  newRequest: L3("YANGI SO‘ROV", "НОВАЯ ЗАЯВКА", "NEW REQUEST"),
  sampleRequest: L3("NAMUNA SO‘ROV", "ПРИМЕР ЗАЯВКИ", "SAMPLE REQUEST"),
  distance: L3("MASOFA", "РАССТОЯНИЕ", "DISTANCE"),
  rating: L3("REYTING", "РЕЙТИНГ", "RATING"),
  experience: L3("TAJRIBA", "ОПЫТ", "EXPERIENCE"),
  reject: L3("RAD ETISH", "ОТКЛОНИТЬ", "DECLINE"),
  accept: L3("QABUL QILISH", "ПРИНЯТЬ", "ACCEPT"),
};

/* ─────────── 06 — trust mechanism ─────────── */

export const UT_TRUST: L<Named[]> = L3(
  [
    { n: "SHAXS TASDIQLANADI", d: "Har bir usta yuzini tasdiqlaydi va tekshiruvdan o‘tadi." },
    { n: "ISH ISBOTLANADI", d: "Buyurtma yakuni ilovada tasdiqlovchi rasm bilan qayd etiladi." },
    { n: "BAHO HAQIQIY", d: "Faqat yakunlangan buyurtma egasi baho qoldiradi." },
    { n: "NARX HIMOYASI", d: "Qo‘shimcha ish siz tasdiqlamasangiz bajarilmaydi." },
  ],
  [
    { n: "ЛИЧНОСТЬ ПОДТВЕРЖДАЕТСЯ", d: "Каждый мастер подтверждает лицо и проходит проверку." },
    { n: "РАБОТА ПОДТВЕРЖДАЕТСЯ", d: "Завершение заказа фиксируется в приложении подтверждающим фото." },
    { n: "ОЦЕНКА НАСТОЯЩАЯ", d: "Оценку оставляет только владелец завершённого заказа." },
    { n: "ЗАЩИТА ЦЕНЫ", d: "Дополнительная работа не выполняется без вашего подтверждения." },
  ],
  [
    { n: "IDENTITY VERIFIED", d: "Every master verifies their face and passes a check." },
    { n: "WORK IS PROVEN", d: "Order completion is recorded in the app with a confirmation photo." },
    { n: "RATINGS ARE REAL", d: "Only the owner of a completed order can leave a rating." },
    { n: "PRICE PROTECTION", d: "Extra work is not carried out without your approval." },
  ],
);

/* ─────────── 07 — coverage map ─────────── */

export const UT_REGIONS: L<string[]> = L3(
  [
    "Toshkent", "Samarqand", "Buxoro", "Andijon", "Farg‘ona", "Namangan",
    "Qashqadaryo", "Surxondaryo", "Navoiy", "Jizzax", "Sirdaryo",
    "Xorazm", "Qoraqalpog‘iston",
  ],
  [
    "Ташкент", "Самарканд", "Бухара", "Андижан", "Фергана", "Наманган",
    "Кашкадарья", "Сурхандарья", "Навои", "Джизак", "Сырдарья",
    "Хорезм", "Каракалпакстан",
  ],
  [
    "Tashkent", "Samarkand", "Bukhara", "Andijan", "Fergana", "Namangan",
    "Kashkadarya", "Surkhandarya", "Navoi", "Jizzakh", "Syrdarya",
    "Khorezm", "Karakalpakstan",
  ],
);

export const UT_REGIONS_HEAD: L<string> = L3(
  "O‘ZBEKISTON — 14 VILOYAT",
  "УЗБЕКИСТАН — 14 ОБЛАСТЕЙ",
  "UZBEKISTAN — 14 REGIONS",
);

/* ─────────── service catalogue ─────────── */

export const UT_SERVICES_TITLE: L<string> = L3(
  "Qaysi usta kerak?",
  "Какой мастер нужен?",
  "Which master do you need?",
);

export const UT_SERVICES_LEAD: L<string> = L3(
  "Muammoingizga mos yo‘nalishni tanlang. UstaTop katalogidagi xizmatlar va har biriga oid batafsil ma’lumot shu yerda.",
  "Выберите направление под вашу проблему. Услуги из каталога UstaTop и подробности по каждой — здесь.",
  "Pick the direction that matches your problem. UstaTop’s service catalogue and the details for each one live here.",
);

export const UT_SERVICES_ALL: L<string> = L3(
  "Barcha xizmatlar",
  "Все услуги",
  "All services",
);

export const UT_SERVICE_GUIDES: L<Named[]> = L3(
  [
    { n: "Usta topish yo‘riqnomasi", d: "Muammoni qanday to‘g‘ri tasvirlash kerak" },
    { n: "Buyurtma berish tartibi", d: "Ariza qanday ko‘rib chiqiladi" },
    { n: "Foydali maslahatlar", d: "Kundalik muammolar bo‘yicha maslahatlar" },
  ],
  [
    { n: "Как найти мастера", d: "Как правильно описать проблему" },
    { n: "Порядок заказа", d: "Как рассматривается заявка" },
    { n: "Полезные советы", d: "Советы по бытовым проблемам" },
  ],
  [
    { n: "How to find a master", d: "How to describe the problem correctly" },
    { n: "Ordering process", d: "How a request is reviewed" },
    { n: "Useful tips", d: "Advice on everyday problems" },
  ],
);

/** The eight service directions — real catalogue entries from the live site. */
export const UT_CATEGORIES: L<Named[]> = L3(
  [
    { n: "Santexnika", d: "Suv tomchilashi, bosim pasayishi yoki kranni ochib-yopishdagi qiyinchilik." },
    { n: "Elektrika", d: "Rozetka ishlamasligi, qizishi, g‘alati tovush yoki uchqun paydo bo‘lishi." },
    { n: "Konditsioner", d: "Rejim, havo oqimi yoki qurilmaning ishlashida sezilgan o‘zgarish." },
    { n: "Remont", d: "Devor yuzasini tayyorlash, suvoq yoki keyingi pardozga tayyorgarlik." },
    { n: "Maishiy texnika", d: "Sovutishning sustlashishi, ishga tushmaslik yoki odatdagidan boshqacha ishlash." },
    { n: "Mebel", d: "Yangi shkaf, stol, stul yoki boshqa mebelni yig‘ish." },
    { n: "Tozalash", d: "Kundalik yoki umumiy uy tozalash ishlarini rejalashtirish." },
    { n: "Avto", d: "Avtomobildagi nosozlik alomatlarini tekshirish va sababini aniqlash." },
  ],
  [
    { n: "Сантехника", d: "Капает вода, упало давление или кран открывается и закрывается с трудом." },
    { n: "Электрика", d: "Розетка не работает, греется, издаёт странный звук или искрит." },
    { n: "Кондиционер", d: "Изменился режим, поток воздуха или работа устройства." },
    { n: "Ремонт", d: "Подготовка поверхности стены, штукатурка или подготовка к чистовой отделке." },
    { n: "Бытовая техника", d: "Ослабло охлаждение, техника не включается или работает не как обычно." },
    { n: "Мебель", d: "Сборка нового шкафа, стола, стула или другой мебели." },
    { n: "Уборка", d: "Планирование ежедневной или генеральной уборки дома." },
    { n: "Авто", d: "Проверить признаки неисправности автомобиля и выяснить причину." },
  ],
  [
    { n: "Plumbing", d: "Dripping water, low pressure or a tap that is hard to open and close." },
    { n: "Electrics", d: "A socket not working, overheating, strange noise or sparking." },
    { n: "Air conditioning", d: "A change in mode, airflow or how the unit runs." },
    { n: "Renovation", d: "Preparing a wall surface, plastering or prepping for finishing." },
    { n: "Appliances", d: "Weaker cooling, not turning on, or running differently than usual." },
    { n: "Furniture", d: "Assembling a new wardrobe, table, chair or other furniture." },
    { n: "Cleaning", d: "Planning everyday or full home cleaning." },
    { n: "Auto", d: "Checking the symptoms of a car fault and finding the cause." },
  ],
);

/* ─────────── waitlist / launch CTA ─────────── */

export const UT_WAIT = {
  soon: L3("TEZ ORADA", "СКОРО ЗАПУСК", "COMING SOON"),
  l1: L3("MUAMMO KIRADI.", "ПРОБЛЕМА ВХОДИТ.", "A PROBLEM COMES IN."),
  l2: L3("YECHIM CHIQADI.", "РЕШЕНИЕ ВЫХОДИТ.", "A SOLUTION GOES OUT."),
  title: L3("BIRINCHI BO‘LIB BILING.", "УЗНАТЬ ПЕРВЫМ.", "BE THE FIRST TO KNOW."),
  body: L3(
    "Ishga tushgach, birinchi bo‘lib sizga xabar beramiz.",
    "Когда всё запустится, мы сообщим вам первыми.",
    "When it launches, we will let you know first.",
  ),
  notify: L3("XABAR BERING", "СООБЩИТЕ МНЕ", "NOTIFY ME"),
  follow: L3("TELEGRAM ORQALI KUZATIB BORING", "СЛЕДИТЕ В TELEGRAM", "FOLLOW ON TELEGRAM"),
};

/* ─────────── the seven numbered stages ─────────── */

export interface Stage {
  n: string;
  kicker: L<string>;
  title: L<string>;
  body: L<string>;
}

export const UT_STAGES: Stage[] = [
  {
    n: "01",
    kicker: L3("01 — MUAMMOINGIZ BORMI?", "01 — У ВАС ЕСТЬ ПРОБЛЕМА?", "01 — GOT A PROBLEM?"),
    title: L3("MUAMMOINGIZ BORMI?", "У ВАС ЕСТЬ ПРОБЛЕМА?", "GOT A PROBLEM?"),
    body: L3(
      "Uy va kundalik muammolar uchun bitta platforma.",
      "Одна платформа для дома и бытовых задач.",
      "One platform for home and everyday problems.",
    ),
  },
  {
    n: "02",
    kicker: L3("02 — BIZGA AYTIB QO‘YING", "02 — РАССКАЖИТЕ НАМ", "02 — TELL US ABOUT IT"),
    title: L3("BIZGA AYTIB QO‘YING", "РАССКАЖИТЕ НАМ", "TELL US ABOUT IT"),
    body: L3(
      "Qanday qulay bo‘lsa — shunday tushuntiring.",
      "Объясните так, как вам удобно.",
      "Explain it however is convenient for you.",
    ),
  },
  {
    n: "03",
    kicker: L3("03 — USTASINI TOPAMIZ", "03 — МЫ НАЙДЁМ МАСТЕРА", "03 — WE FIND THE MASTER"),
    title: L3("USTASINI TOPAMIZ", "МЫ НАЙДЁМ МАСТЕРА", "WE FIND THE MASTER"),
    body: L3(
      "Muammo tushuniladi, mos usta tanlanadi.",
      "Проблема разбирается, подбирается подходящий мастер.",
      "The problem is understood and a matching master is chosen.",
    ),
  },
  {
    n: "04",
    kicker: L3("04 — ISH BOSHLANDI", "04 — РАБОТА НАЧАЛАСЬ", "04 — WORK HAS STARTED"),
    title: L3("ISH BOSHLANDI", "РАБОТА НАЧАЛАСЬ", "WORK HAS STARTED"),
    body: L3(
      "Buyurtma holati ilovada kuzatiladi.",
      "Статус заказа отслеживается в приложении.",
      "The order status is tracked inside the app.",
    ),
  },
  {
    n: "05",
    kicker: L3(
      "05 — MIJOZ QIDIRMANG. MIJOZ SIZNI TOPSIN.",
      "05 — НЕ ИЩИТЕ КЛИЕНТОВ. ПУСТЬ КЛИЕНТЫ НАЙДУТ ВАС.",
      "05 — DON’T CHASE CLIENTS. LET CLIENTS FIND YOU.",
    ),
    title: L3(
      "MIJOZ QIDIRMANG. MIJOZ SIZNI TOPSIN.",
      "НЕ ИЩИТЕ КЛИЕНТОВ. ПУСТЬ КЛИЕНТЫ НАЙДУТ ВАС.",
      "DON’T CHASE CLIENTS. LET CLIENTS FIND YOU.",
    ),
    body: L3(
      "Usta tomoni — professional tizim.",
      "Сторона мастера — профессиональная система.",
      "The master’s side — a professional system.",
    ),
  },
  {
    n: "06",
    kicker: L3("06 — ISHONCH — TIZIM", "06 — ДОВЕРИЕ — ЭТО СИСТЕМА", "06 — TRUST IS A SYSTEM"),
    title: L3("ISHONCH — TIZIM", "ДОВЕРИЕ — ЭТО СИСТЕМА", "TRUST IS A SYSTEM"),
    body: L3(
      "Bir nechta belgi emas, to‘liq mexanizm.",
      "Не пара значков, а полноценный механизм.",
      "Not a couple of badges — a complete mechanism.",
    ),
  },
  {
    n: "07",
    kicker: L3("07 — O‘ZBEKISTON BO‘YLAB", "07 — ПО ВСЕМУ УЗБЕКИСТАНУ", "07 — ACROSS UZBEKISTAN"),
    title: L3("O‘ZBEKISTON BO‘YLAB", "ПО ВСЕМУ УЗБЕКИСТАНУ", "ACROSS UZBEKISTAN"),
    body: L3(
      "Hududingizda usta mavjudligi manzil va faol mutaxassislarga bog‘liq.",
      "Наличие мастера в вашем регионе зависит от адреса и активных специалистов.",
      "Master availability in your area depends on the address and active specialists.",
    ),
  },
];

/* ─────────── UstaTop supporting products ─────────── */

export const UT_HUB = {
  title: L3("USTATOP SOCIAL HUB", "USTATOP SOCIAL HUB", "USTATOP SOCIAL HUB"),
  body: L3(
    "UstaTop ijtimoiy hubi — brendning Instagram va qo‘nish sahifasi tomoni. Bitta vizual tizim, bitta ovoz.",
    "Социальный хаб UstaTop — сторона бренда в Instagram и на посадочной странице. Одна визуальная система, один голос.",
    "The UstaTop social hub — the brand side on Instagram and the landing page. One visual system, one voice.",
  ),
};

export const UT_MOBILE = {
  title: L3("MOBILE LAB", "MOBILE LAB", "MOBILE LAB"),
  body: L3(
    "Kotlin va Jetpack Compose’da Android ilovasi — tadqiqot va interfeys izlanishlari. Hali chiqarilmagan, shuning uchun bu yerda soxta maketlar yo‘q.",
    "Android-приложение на Kotlin и Jetpack Compose — исследование и поиск интерфейсных решений. Ещё не выпущено, поэтому здесь нет фейковых макетов.",
    "An Android app in Kotlin and Jetpack Compose — research and interface exploration. Not shipped yet, so there are no fake mockups here.",
  ),
  dir: L3("Kotlin + Jetpack Compose", "Kotlin + Jetpack Compose", "Kotlin + Jetpack Compose"),
  status: L3(
    "TADQIQOT VA INTERFEYS IZLANISHLARI",
    "ИССЛЕДОВАНИЕ И ПОИСК ИНТЕРФЕЙСА",
    "RESEARCH & UI EXPLORATION",
  ),
  screens: L3(
    "EKRANLAR: hali chiqarilmagan — bu yerda soxta maketlar yo‘q",
    "ЭКРАНЫ: ещё не выпущены — фейковых макетов здесь нет",
    "SCREENS: not shipped yet — no fake mockups here",
  ),
};

export const UT_BOT = {
  title: L3("TELEGRAM BOT", "TELEGRAM-БОТ", "TELEGRAM BOT"),
  body: L3(
    "Muammoni yozishingiz bilan arizaga aylanadi — Telegram orqali, ilovani o‘rnatmasdan.",
    "Стоит написать проблему — и она становится заявкой. Через Telegram, без установки приложения.",
    "Write your problem and it becomes a request — straight through Telegram, no app install.",
  ),
};
