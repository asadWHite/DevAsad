/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  O‘ZBEKCHA — UZ
 *  Canonical message tree. Its shape defines `Messages`; ru.ts and en.ts are
 *  type-checked against it, so a missing or extra key fails the build.
 *
 *  Rules:
 *   • Natural modern Uzbek Latin, correct ‘ apostrophe (o‘ / g‘).
 *   • Brand + technology names stay universal: Next.js, React, Supabase,
 *     Telegram, UstaTop, Kashmir Decor, EduCRM, DRIVERA, Dev.Асад.
 *   • No Russian and no English sentences in this file.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const uz = {
  /* ─────────── metadata & SEO ─────────── */
  meta: {
    title: "Dev.Асад — Shaxsiy raqamli studiya",
    description:
      "Dev.Асад — veb dasturchi va raqamli mahsulotlar yaratuvchisi. Haqiqiy loyihalar: Kashmir Decor (kashmirdecor.uz) va UstaTop (ustatop360.uz). Saytlar, Telegram botlar, ilovalar. O‘zbekiston, 2026.",
    ogTitle: "Dev.Асад — Shaxsiy raqamli studiya",
    ogDescription:
      "Haqiqiy ishlar: kashmirdecor.uz · ustatop360.uz. Saytlar, Telegram botlar, Mini Apps, UI/UX va AI.",
    ogSiteName: "ASADBEK",
    twitterTitle: "Dev.Асад — Shaxsiy raqamli studiya",
    twitterDescription: "Haqiqiy loyihalar: Kashmir Decor · UstaTop. Veb, Telegram, ilovalar, AI.",
    noscript: "ASADBEK — shaxsiy raqamli arxiv. Sayt ishlashi uchun JavaScript kerak.",
    jobTitle: "Veb dasturchi · Mahsulot yaratuvchisi",
    nationality: "O‘zbekiston",
  },

  /* ─────────── language picker ─────────── */
  locale: {
    picker: "Tilni tanlash",
    uz: "O‘zbekcha",
    ru: "Ruscha",
    en: "Inglizcha",
    changed: "Til o‘zbekchaga o‘zgartirildi",
    short: "UZ",
  },

  /* ─────────── accessibility ─────────── */
  a11y: {
    mainNav: "Asosiy navigatsiya",
    mobileMenu: "Mobil menyu",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    projectFilters: "Loyihalarni filtrlash",
    serviceFilters: "Xizmatlarni filtrlash",
    prev: "Oldingi",
    next: "Keyingi",
    intro: "Kirish sahnasi",
    skipIntro: "Kirishni o‘tkazib yuborish",
    projectPreview: "Loyihaning oldindan ko‘rinishi",
    scrollProgress: "Sahifa bo‘ylab harakatlanish progressi",
    liveRegion: "Til va bo‘lim holati",
    estimator: "Narx kalkulyatori",
    languageDemo: "Til kombinatsiyasi",
  },

  /* ─────────── cursor labels ─────────── */
  cursor: {
    view: "KO‘RISH",
    open: "OCHISH",
    talk: "YOZISH",
  },

  /* ─────────── intro ─────────── */
  intro: {
    archive: "SHAXSIY RAQAMLI STUDIYA",
    loc: "O‘ZBEKISTON / 2026",
    role1: "VEB DASTURCHI",
    role2: "MAHSULOT YARATUVCHISI",
    w1: "QURISH",
    w2: "DIZAYN",
    w3: "EKSPERIMENT",
    w4: "TAKRORLASH",
    s1: "HALI HAM O‘RGANYAPMAN.",
    s2: "LEKIN ALLAQACHON QURYAPMAN.",
    skip: "O‘tkazish",
    m1: "O‘YLAYMAN.",
    m2: "QURAMAN.",
    m3: "ISHGA TUSHIRAMAN.",
  },

  /* ─────────── nav ─────────── */
  nav: {
    work: "Ishlar",
    services: "Xizmatlar",
    about: "Men haqimda",
    lab: "Laboratoriya",
    contact: "Aloqa",
    menu: "Menyu",
    close: "Yopish",
    top: "Yuqoriga",
  },

  /* ─────────── hero ─────────── */
  hero: {
    kicker: "RAQAMLI STUDIYA — O‘ZBEKISTON, 2026",
    l1: "G‘OYADAN",
    l2: "ISHLAYDIGAN",
    l3: "MAHSULOTGACHA.",
    sub: "Veb-saytlar, Telegram botlar, Mini Apps, veb va mobil ilovalar, UI/UX va AI integratsiyalari. Hali o‘rganyapman — lekin allaqachon haqiqiy mahsulotlar qurayapman.",
    cta1: "Loyihani muhokama qilish",
    cta2: "Ishlarni ko‘rish",
    meta1: "VEB-DASTURLASH",
    meta2: "TELEGRAM EKOTIZIMI",
    meta3: "MAHSULOT VA AI",
    availability: "YANGI LOYIHALARGA OCHIQMAN",
    ghost: "ARXIV",
    scroll: "Pastga suring",
    roles: [
      "VEB-SAYTLAR",
      "TELEGRAM BOTLAR",
      "MINI APPS",
      "VEB ILOVALAR",
      "MOBIL ILOVALAR",
      "UI/UX",
      "AI INTEGRATSIYA",
    ],
  },

  /* ─────────── about ─────────── */
  about: {
    kicker: "01 — «MEN HAQIMDA» EMAS, MEN KIMMAN",
    title: "BIR NECHTA BOB",
    buildTitle: "NIMA QURAMAN",
    buildBody:
      "Premium veb-saytlar, marketplace tizimlari, boshqaruv platformalari va Telegram ekotizimidagi mahsulotlar. Mijozdan xaritagacha, admin paneldan botgacha — tizimni boshidan oxirigacha o‘ylashga harakat qilaman.",
    thinkTitle: "QANDAY O‘YLAYMAN",
    thinkBody:
      "Avval tuzilma, keyin go‘zallik. Har bir sahifa, animatsiya va tugma ma’noga ega bo‘lishi kerak. Gipoteza qo‘yaman, prototip quraman, buzaman va qaytadan quraman. AI vositalaridan tezkor fikr sherigi sifatida foydalanaman — lekin yakuniy qaror doim meniki.",
  },

  /* ─────────── shared project labels ─────────── */
  labels: {
    project: "LOYIHA",
    category: "KATEGORIYA",
    status: "HOLAT",
    year: "YIL",
    role: "ROL",
    tech: "TEXNOLOGIYA",
    link: "HAVOLA",
    realProject: "JONLI SAYT · HAQIQIY LOYIHA",
    uiDemo: "INTERFEYS NAMUNASI · MEXANIKA JOYLASHUVI",
    realContent: "HAQIQIY KONTENT",
    caseStudy: "KEYS",
    ecosystem: "EKOTIZIM",
    overview: "UMUMIY",
    sourceOfTruth: "MANBA",
    projectOf: "loyiha",
  },

  /* ─────────── status labels ─────────── */
  status: {
    live: "JONLI",
    liveDev: "JONLI / ISHLAB CHIQILMOQDA",
    waitlist: "JONLI · KUTISH RO‘YXATI / ISHLAB CHIQILMOQDA",
    concept: "KONSEPT",
    support: "QO‘SHIMCHA LOYIHA",
    experiment: "EKSPERIMENT",
    inDevelopment: "ISHLAB CHIQILMOQDA",
  },

  /* ─────────── buttons & actions ─────────── */
  actions: {
    viewProject: "LOYIHANI KO‘RISH",
    discussProject: "LOYIHANI MUHOKAMA QILISH",
    writeTelegram: "TELEGRAMDA YOZISH",
    details: "BATAFSIL",
    nextProject: "KEYINGI LOYIHA",
    prevProject: "OLDINGI LOYIHA",
    back: "ORQAGA",
    backToArchive: "ARXIVGA QAYTISH",
    openSite: "SAYTNI OCHISH",
    viewCase: "KEYSNI KO‘RISH",
    tryIt: "O‘ZINGIZ SINAB KO‘RING",
    allServices: "BARCHA XIZMATLAR",
    notifyMe: "BIRINCHI BO‘LIB BILING",
    followTelegram: "TELEGRAM ORQALI KUZATIB BORING",
    requestQuote: "Hisob-kitob so‘rash",
    orderThis: "Shundayini buyurtma qilish",
    sendRequest: "So‘rovni Telegramga yuborish",
    restart: "Qaytadan",
    scrollDown: "Pastga suring",
    scroll: "Suring",
    next: "Keyingi",
    openLive: "Jonli saytni ochish",
  },

  /* ─────────── filters ─────────── */
  filters: {
    all: "BARCHASI",
    web: "VEB",
    telegram: "TELEGRAM",
    app: "ILOVALAR",
    design: "DIZAYN",
    ai: "AI",
    products: "MAHSULOTLAR",
    live: "JONLI",
    mobile: "MOBIL",
    experiments: "EKSPERIMENTLAR",
  },

  /* ─────────── horizontal archive ─────────── */
  archive: {
    kicker: "ARXIV — GORIZONTAL SAHNA",
    title: "TO‘RTTA HIKOYA",
    hint: "Aylantiring — arxiv yonga ochiladi",
    comingSoon: "TEZ ORADA · HAQIQIY SAYT",
    waitlistNote: "KUTISH RO‘YXATI · 8 TA XIZMAT YO‘NALISHI",
    techLine: "TEXNOLOGIYALAR",
  },

  /* ─────────── services ─────────── */
  services: {
    kicker: "SIZ UCHUN NIMA QURIB BEROLAMAN",
    title: "XIZMATLAR",
    sub: "G‘oyadan ishga tushirishgacha bo‘lgan raqamli mahsulotlar. Boshlang‘ich narx har bir tur yonida ko‘rsatilgan.",
    from: "BOSHLANG‘ICH NARX",
    price: "NARX",
    priceNote: "Yakuniy narx loyiha murakkabligiga bog‘liq.",
    disclaimer:
      "Bular boshlang‘ich narxlar. Yakuniy narx hajm, funksiyalar, integratsiyalar va dizayn murakkabligiga bog‘liq.",
    bestFor: "KIMGA MOS",
    included: "NIMALAR KIRADI",
    customQuote: "ALOHIDA HISOB-KITOB",
    example: "NAMUNA",
    uzs: "so‘m",
    examplesLine: "BOSHLANG‘ICH NARXLAR",
    toEstimator: "Kalkulyatorga o‘tish",
  },

  /* ─────────── pricing transparency ─────────── */
  pricing: {
    kicker: "SHAFFOFLIK",
    title: "NARX QANDAY HISOBLANADI",
    formula:
      "Boshlang‘ich narx · dizayn murakkabligi · funksiyalar · integratsiyalar · tillar · backend · admin tizimi · uchinchi tomon xizmatlari = yakuniy narx",
    note: "Shuning uchun 2,5 millionlik landing va 15 millionlik marketplace bir xil narsa emas. Qisqa briefdan so‘ng, ish boshlanishidan oldin aniq oraliqni aytaman.",
  },

  /* ─────────── comparison ─────────── */
  compare: {
    kicker: "TAQQOSLASH",
    title: "QAYSI BIRI KERAK?",
    purpose: "MAQSAD",
    price: "BOSHLANISHI",
    features: "ODATIY FUNKSIYALAR",
    client: "IDEAL MIJOZ",
    webPurpose: "brendni ko‘rsatish, xizmat sotish",
    webappPurpose: "kompaniya jarayonlarini avtomatlashtirish",
    miniappPurpose: "mahsulotni to‘g‘ridan-to‘g‘ri Telegramda ishga tushirish",
    webClient: "ekspert, mahalliy biznes, brend",
    webappClient: "jamoa va jarayonlari bor kompaniya",
    miniappClient: "Telegram auditoriyasiga ega xizmat",
  },

  /* ─────────── estimator ─────────── */
  estimator: {
    kicker: "INTERAKTIV BAHOLASH",
    title: "SIZGA NIMA KERAK?",
    step: "QADAM",
    q1: "Mahsulot turi",
    q2: "Murakkablik",
    q3: "Tillar",
    q4: "Integratsiyalar",
    basic: "Oddiy",
    standard: "Standart",
    advanced: "Ilg‘or",
    none: "Yo‘q",
    result: "TAXMINIY BOSHLANG‘ICH ORALIQ",
    disclaimer: "Bu taxminiy hisob, yakuniy smeta emas. Aniq narxni qisqa briefdan keyin aytaman.",
    back: "Orqaga",
    next: "Keyingi",
    telegram: "Telegram",
    payment: "To‘lovlar",
    maps: "Xaritalar",
    crm: "CRM",
    ai: "AI",
    langOne: "1 til — o‘zbekcha",
    langTwo: "2 til — o‘zbek + rus",
    langThree: "3 til — o‘zbek + rus + ingliz",
    languagesOf: "til",
  },

  /* ─────────── faq ─────────── */
  faq: {
    kicker: "SAVOLLAR",
    title: "FAQ",
    q1: "Sayt qancha turadi?",
    a1: "Landing — 2,5 mln so‘mdan, biznes sayt — 5,5 mln so‘mdan, premium — 8,5 mln so‘mdan. Yakuniy narx hajm va funksiyalarga bog‘liq.",
    q2: "Ishlab chiqish qancha vaqt oladi?",
    a2: "Landing — 5–10 kun, biznes sayt — 2–3 hafta. Bot va ilovalar hajmga bog‘liq — muddatni briefdan keyin aytaman.",
    q3: "Saytni o‘zbek va rus tilida qilish mumkinmi?",
    a3: "Ha — ko‘p tillilik arxitekturaga eng boshidanoq joylashtiriladi, ingliz tili ham mumkin.",
    q4: "Telegram ulash mumkinmi?",
    a4: "Ha — bot, bildirishnomalar, Telegramga yuboruvchi formalar va to‘liq Mini Apps.",
    q5: "To‘lov tizimlarini ulash mumkinmi?",
    a5: "Ha, mahalliy provayderlar va Telegram Payments — loyihaga qarab.",
    q6: "Mavjud saytni qayta ishlay olasizmi?",
    a6: "Ha — audit, yangi tuzilma va to‘liq vizual qayta qurish. Bunday loyihalar menga ayniqsa yoqadi.",
    q7: "Mobil ilova qilasizmi?",
    a7: "Kotlin/Compose’da Android — ha. iOS uchun kross-platforma arxitekturasi mumkin.",
    q8: "Loyihani faqat g‘oyadan boshlash mumkinmi?",
    a8: "Albatta — mahsulotlarimning ko‘pi «buni yaxshiroq qilib bo‘ladimi?» degan savoldan boshlangan. G‘oyani tuzilma va rejaga aylantirishga yordam beraman.",
  },

  /* ─────────── lab ─────────── */
  lab: {
    kicker: "INTERAKTIV MAYDON",
    title: "LABORATORIYA",
    lead: "Bu yerda tomoshabin yo‘q — hammasini tegib ko‘rish mumkin. Har bir eksperiment haqiqatan ham ishlaydi.",
    e1t: "KINETIK SHRIFT",
    e1d: "Harflar kursordan qochadi",
    e2t: "MAGNIT UI",
    e2d: "Tugma kursorga tortiladi",
    e3t: "KURSOR PANJARASI",
    e3d: "Katakchalar yaqinlikka javob beradi",
    e4t: "RASM DEFORMATSIYASI",
    e4d: "Surat kursor tezligidan eriydi",
    e5t: "SKROLL FIZIKASI",
    e5d: "So‘z skroll tezligini eshitadi",
    e6t: "AI ISH JARAYONI",
    e6d: "G‘oyadan mahsulotgacha",
    s1: "G‘OYA",
    s2: "PROMPT",
    s3: "PROTOTIP",
    s4: "ITERATSIYA",
    s5: "MAHSULOT",
    aiBody:
      "AI — xonadagi sehrgar emas, stolimdagi sherik. Men g‘oya beraman, u tezlik beradi; men buzaman, u qayta yig‘ishga yordam beradi.",
    scrollHint: "←SURING→",
    magnet: "MAGNIT",
    motion: "HARAKAT",
    flow: "OQIM",
    experiment: "EKSPERIMENT",
  },

  /* ─────────── stack ─────────── */
  stack: {
    kicker: "TEXNOLOGIYA XARITASI",
    title: "TIZIM NIMA USTIDA TURIBDI",
    frontend: "FRONTEND",
    motion: "ANIMATSIYA",
    backend: "BACKEND",
    deploy: "JOYLASHTIRISH",
    ecosystem: "EKOTIZIM",
    mobile: "MOBIL",
    ai: "AI JARAYONI",
    note: "AI vositalari — mening «maxfiy ko‘nikmam» emas, ish jarayonimning ochiq qismi. Muhimi — natijani kim boshqarayotgani.",
  },

  /* ─────────── process ─────────── */
  process: {
    kicker: "MAHKAMLANGAN SAHNA",
    title: "QANDAY QURAMAN",
    s1: "G‘OYA",
    b1: "Hammasi oddiy savoldan boshlanadi: «buni yaxshiroq qilib bo‘ladimi?»",
    s2: "TADQIQOT",
    b2: "Kim uchun, nima uchun, boshqalar nima qilishgan — avval tushunish.",
    s3: "TUZILMA",
    b3: "Sahifalar, holatlar, ma’lumot oqimi — dizayndan oldin qog‘ozdagi arxitektura.",
    s4: "DIZAYN",
    b4: "Tasvir, tipografika, harakat — tuzilma ustidagi his-tuyg‘u qatlami.",
    s5: "QURISH",
    b5: "Birinchi versiya tez va mukammal emas. Muhimi — nafas olishi.",
    s6: "BUZISH",
    b6: "O‘z ishimga qat’iy qarayman: zaif joylarni topib, buzaman.",
    s7: "QAYTA QURISH",
    b7: "02-versiya deyarli har doim 01-versiyadan tubdan yaxshi chiqadi.",
    s8: "ISHGA TUSHIRISH",
    b8: "Vercel, domen, indeksatsiya — mahsulot odamlar qo‘lida bo‘lgandagina tirik.",
    v1: "01-VERSIYA",
    v2: "02-VERSIYA",
    problem: "MUAMMO",
    iteration: "ITERATSIYA",
    of: "qadam",
  },

  /* ─────────── catalogue ─────────── */
  catalogue: {
    kicker: "TO‘LIQ INDEKS",
    title: "ARXIV",
    techLine: "TEXNOLOGIYALAR",
    shown: "ko‘rsatilgan",
  },

  /* ─────────── now ─────────── */
  now: {
    kicker: "JORIY HOLAT — 2026",
    title: "HOZIR",
    b1t: "QURYAPMAN",
    b1b: "yangi raqamli mahsulotlar va UstaTop ekotizimini kengaytirish",
    b2t: "O‘RGANYAPMAN",
    b2b: "chuqur interaktiv dizayn, kinetik tipografika va skroll sahnalari",
    b3t: "O‘ZLASHTIRYAPMAN",
    b3b: "ingliz tili / IELTS, frontend arxitekturasi va mahsulot fikrlashi",
    b4t: "O‘YLAYAPMAN",
    b4b: "mobil ilovalar, AI integratsiyalar va marketplace tizimlari",
  },

  /* ─────────── next ─────────── */
  next: {
    kicker: "KELAJAK XARITASI",
    title: "KEYINGISI NIMA?",
    lead: "Va’dalar emas — yo‘nalishlar. Bu ro‘yxat har yili yangilanadi.",
    i1: "Kuchliroq va yaxlitroq raqamli mahsulotlar",
    i2: "Murakkab interaktiv sahnalar va mikro-animatsiyalar",
    i3: "Mobil ilovalar — Compose ustida haqiqiy ishlab chiqish",
    i4: "Mahsulot ichidagi AI integratsiyalari",
    i5: "Marketplace va to‘lov tizimlari arxitekturasi",
    i6: "Brendlar uchun kuchli vizual tizimlar",
  },

  /* ─────────── contact ─────────── */
  contact: {
    kicker: "ALOQA — OCHIQ",
    l1: "KELING,",
    l2: "OCHISHGA ARZIYDIGAN",
    l3: "NARSANI QURAMIZ.",
    cta: "TELEGRAMDA YOZISH",
    links: "ARXIVDAGI LOYIHALAR",
    start: "TO‘G‘RIDAN-TO‘G‘RI ALOQA",
    directNote:
      "Formasiz va kutishsiz. Telegramda shaxsan yozing — g‘oya, vazifa va keyingi qadamni muhokama qilamiz.",
    more: "QURILADIGANLAR KO‘P.",
    projects: {
      kashmir: "KASHMIR DECOR",
      ustatop: "USTATOP",
      hub: "IJTIMOIY HUB",
    },
  },

  /* ─────────── footer ─────────── */
  footer: {
    note: "Sayt React · TypeScript · Tailwind · GSAP · Lenis bilan qurilgan. Shaxsiy studiya — doimiy yangilanadi.",
    rights: "BARCHA HUQUQLAR — VA BARCHA REJALAR — DEV.АСАДNIKI.",
    stamp: "DEV.АСАД — 2026",
    copyright: "© 2026 — O‘ZBEKISTON",
  },

  /* ─────────── dev validation overlay ─────────── */
  validate: {
    badge: "TIL TEKSHIRUVI",
    clean: "Aralash matn topilmadi",
    issues: "aralash tilli blok",
    open: "Ochish",
    close: "Yopish",
  },
};

/**
 * The canonical message shape. ru.ts and en.ts are typed against this, so a
 * missing / misspelled / extra key is a compile-time error, never a runtime
 * fallback to another language.
 */
export type Messages = typeof uz;
