import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en" | "uz";
type Row = { ru: string; en: string; uz: string };
type Dict = Record<string, Row>;

export const LANGS: { id: Lang; label: string }[] = [
  { id: "ru", label: "RU" },
  { id: "en", label: "EN" },
  { id: "uz", label: "UZ" },
];

export const dict: Dict = {
  /* ---------- intro ---------- */
  intro_archive: { ru: "ЛИЧНАЯ ЦИФРОВАЯ СТУДИЯ", en: "PERSONAL DIGITAL STUDIO", uz: "SHAXSIY RAQAMLI STUDIYA" },
  intro_loc: { ru: "УЗБЕКИСТАН / 2026", en: "UZBEKISTAN / 2026", uz: "O'ZBEKISTON / 2026" },
  intro_role1: { ru: "ВЕБ-РАЗРАБОТЧИК", en: "WEB DEVELOPER", uz: "VEB DASTURCHI" },
  intro_role2: { ru: "СОЗДАТЕЛЬ ПРОДУКТОВ", en: "PRODUCT BUILDER", uz: "MAHSULOT YARATUVCHISI" },
  intro_w1: { ru: "СОЗДАВАТЬ", en: "BUILD", uz: "QURISH" },
  intro_w2: { ru: "ПРОЕКТИРОВАТЬ", en: "DESIGN", uz: "DIZAYN" },
  intro_w3: { ru: "ЭКСПЕРИМЕНТ", en: "EXPERIMENT", uz: "EKSPERIMENT" },
  intro_w4: { ru: "ИТЕРАЦИЯ", en: "ITERATE", uz: "TAKRORLASH" },
  intro_s1: { ru: "Я ВСЁ ЕЩЁ УЧУСЬ.", en: "STILL LEARNING.", uz: "HALI HAM O'RGANYAPMAN." },
  intro_s2: { ru: "НО УЖЕ СТРОЮ.", en: "ALREADY BUILDING.", uz: "LEKIN ALLAQACHON QURYAPMAN." },
  intro_skip: { ru: "Пропустить", en: "Skip", uz: "O'tkazish" },
  intro_m1: { ru: "ПРИДУМЫВАЮ.", en: "I IMAGINE.", uz: "O'YLAYMAN." },
  intro_m2: { ru: "СОЗДАЮ.", en: "I BUILD.", uz: "QURAMAN." },
  intro_m3: { ru: "ЗАПУСКАЮ.", en: "I LAUNCH.", uz: "ISHGA TUSHIRAMAN." },
  cta_float: { ru: "Обсудить проект", en: "Start a project", uz: "Loyihani boshlash" },
  intro_loading: { ru: "ОТКРЫВАЮ СТУДИЮ", en: "OPENING STUDIO", uz: "STUDIYA OCHILMOQDA" },

  /* ---------- nav ---------- */
  nav_work: { ru: "Работы", en: "Work", uz: "Ishlar" },
  nav_services: { ru: "Услуги", en: "Services", uz: "Xizmatlar" },
  nav_about: { ru: "Обо мне", en: "About", uz: "Haqida" },
  nav_lab: { ru: "Лаб", en: "Lab", uz: "Lab" },
  nav_contact: { ru: "Контакт", en: "Contact", uz: "Aloqa" },
  nav_process: { ru: "Процесс", en: "Process", uz: "Jarayon" },
  nav_index: { ru: "Индекс", en: "Index", uz: "Indeks" },
  nav_menu: { ru: "Меню", en: "Menu", uz: "Menyu" },
  nav_close: { ru: "Закрыть", en: "Close", uz: "Yopish" },
  nav_top: { ru: "Наверх", en: "Top", uz: "Yuqoriga" },

  /* ---------- hero ---------- */
  hero_kicker: { ru: "ЦИФРОВАЯ СТУДИЯ — УЗБЕКИСТАН, 2026", en: "A DIGITAL STUDIO — UZBEKISTAN, 2026", uz: "RAQAMLI STUDIYA — O'ZBEKISTON, 2026" },
  hero_l1: { ru: "ОТ ИДЕИ", en: "FROM IDEA", uz: "G'OYADAN" },
  hero_l2: { ru: "ДО РАБОТАЮЩЕГО", en: "TO A WORKING", uz: "ISHLEYDIGAN" },
  hero_l3: { ru: "ПРОДУКТА.", en: "PRODUCT.", uz: "MAHSULOTGA." },
  hero_sub: {
    ru: "Веб-сайты, Telegram-боты, Mini Apps, веб- и мобильные приложения, UI/UX и AI-интеграции. Всё ещё учусь — но уже строю настоящие продукты.",
    en: "Websites, Telegram bots, Mini Apps, web & mobile applications, UI/UX and AI integrations. Still learning — but already building real products.",
    uz: "Veb-saytlar, Telegram botlar, Mini Apps, veb va mobil ilovalar, UI/UX va AI integratsiyalar. Hali o'rganyapman — lekin allaqachon haqiqiy mahsulotlar qurayapman.",
  },
  hero_cta1: { ru: "Обсудить проект", en: "Start a project", uz: "Loyihani boshlash" },
  hero_cta2: { ru: "Смотреть работы", en: "Explore my work", uz: "Ishlarni ko'rish" },
  hero_meta1: { ru: "ВЕБ-РАЗРАБОТКА", en: "WEB DEVELOPMENT", uz: "VEB-DASTURLASH" },
  hero_meta2: { ru: "TELEGRAM ЭКОСИСТЕМА", en: "TELEGRAM ECOSYSTEM", uz: "TELEGRAM EKOTIZIMI" },
  hero_meta3: { ru: "ПРОДУКТ И AI", en: "PRODUCT & AI", uz: "MAHSULOT VA AI" },
  hero_scroll: { ru: "Листайте вниз", en: "Scroll down", uz: "Pastga suring" },
  hero_availability: { ru: "ОТКРЫТ К НОВЫМ ПРОЕКТАМ", en: "OPEN TO NEW PROJECTS", uz: "YANGI LOYIHALARGA OCHIQMAN" },
  hero_stat_projects: { ru: "ПРОЕКТОВ", en: "PROJECTS", uz: "LOYIHALAR" },
  hero_stat_live: { ru: "В ЖИВУЮ", en: "LIVE", uz: "JONLI" },
  hero_stat_grade: { ru: "КЛАСС — И УЖЕ СТРОЮ", en: "GRADE — ALREADY BUILDING", uz: "SINF — VA QURYAPMAN" },
  hero_roles: { ru: "САЙТЫ¦TELEGRAM-БОТЫ¦MINI APPS¦ВЕБ-ПРИЛОЖЕНИЯ¦МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ¦UI/UX¦AI-ИНТЕГРАЦИИ", en: "WEBSITES¦TELEGRAM BOTS¦MINI APPS¦WEB APPS¦MOBILE APPS¦UI/UX¦AI INTEGRATIONS", uz: "VEB-SAYTLAR¦TELEGRAM BOTLAR¦MINI APPS¦VEB ILOVALAR¦MOBIL ILOVALAR¦UI/UX¦AI INTEGRATSIYA" },

  /* ---------- about ---------- */
  about_kicker: { ru: "01 — НЕ «ОБО МНЕ», А КТО Я", en: "01 — NOT \u201CABOUT ME\u201D BUT WHO I AM", uz: "01 — HAQLARIMDA EMAS, HAQIMDA" },
  about_title: { ru: "НЕСКОЛЬКО ГЛАВ", en: "A FEW CHAPTERS", uz: "BIR NECHTA BOB" },
  about_ch1_t: { ru: "КТО Я", en: "WHO I AM", uz: "MEN KIMMAN" },
  about_ch1_b: {
    ru: "Я учусь в 11 классе. Несмотря на возраст, отношусь к делу серьёзно: каждый проект я строю не как «школьное задание», а как настоящий продукт. Узбекистан — большой растущий рынок, и я учусь создавать для него.",
    en: "I'm an 11th-grade student. Despite my age, I take the work seriously: every project is built not as a school assignment, but as a real product. Uzbekistan is a big, fast-growing market — and I'm learning to build for it.",
    uz: "11-sinf o'quvchisiman. Yoshimga qaramay, ishga jiddiy qarayman: har bir loyihani «maktab topshirig'i» emas, haqiqiy mahsulotdek quraman. O'zbekiston — katta o'sayotgan bozor, va men shu bozor uchun qurishni o'rganyapman.",
  },
  about_ch2_t: { ru: "ЧТО Я СТРОЮ", en: "WHAT I BUILD", uz: "NIMA QURAMAN" },
  about_ch2_b: {
    ru: "Премиальные сайты, маркетплейсы, платформы управления и продукты внутри экосистемы Telegram. От клиента до карты, от админки до бота — стараюсь продумывать систему целиком, от начала до конца.",
    en: "Premium websites, marketplaces, management platforms and products inside the Telegram ecosystem. From customer to map, from admin panel to bot — I try to think through the whole system, end to end.",
    uz: "Premium veb-saytlar, marketplace tizimlari, boshqaruv platformalari va Telegram ekotizimidagi mahsulotlar. Mijozdan xaritagacha, adminkadan botgacha — tizimni boshidan oxirigacha o'ylashga harakat qilaman.",
  },
  about_ch3_t: { ru: "КАК Я ДУМАЮ", en: "HOW I THINK", uz: "QANDAY O'YLAYMAN" },
  about_ch3_b: {
    ru: "Сначала структура, потом красота. Каждая страница, анимация и кнопка должны иметь смысл. Я выдвигаю гипотезу, собираю прототип, ломаю и строю заново. Использую ИИ-инструменты как быстрого партнёра по мышлению — но финальное решение всегда моё.",
    en: "Structure first, beauty second. Every page, animation and button must mean something. I form a hypothesis, build a prototype, break it and rebuild. I use AI tools as a fast thinking partner — but the final decision is always mine.",
    uz: "Avval tuzilma, keyin go'zallik. Har bir sahifa, animatsiya va tugma ma'no kasb etishi kerak. Gipoteza qo'yaman, prototip quraman, buzaman va qaytadan quraman. AI vositalaridan tezkor fikr sherigi sifatida foydalanaman — lekin yakuniy qaror doim meniki.",
  },
  about_ch4_t: { ru: "ЧЕМУ СЕЙЧАС УЧУСЬ", en: "WHAT I'M LEARNING", uz: "NIMA O'RGANYAPMAN" },
  about_ch4_b: {
    ru: "Английский и IELTS — одно из главных направлений. Параллельно углубляюсь во фронтенд и интересуюсь авиацией: путь пилота притягивает не только небом, но и дисциплиной. Лучший способ учиться — строить.",
    en: "English and IELTS are one of my main tracks. In parallel I'm going deeper into frontend and I'm drawn to aviation: the pilot path attracts me not only with the sky, but with discipline. The best way to learn is to build.",
    uz: "Ingliz tili va IELTS — asosiy yo'nalishlarimdan biri. Parallel ravishda frontend'ni chuqurlashtiryapman va aviatsiyaga qiziqyapman: uchuvchi yo'li nafaqat osmon, balki intizomi bilan ham tortadi. O'rganishning eng yaxshi usuli — qurish.",
  },

  /* ---------- shared project labels ---------- */
  p_number: { ru: "ПРОЕКТ", en: "PROJECT", uz: "LOYIHA" },
  p_category: { ru: "КАТЕГОРИЯ", en: "CATEGORY", uz: "KATEGORIYA" },
  p_status: { ru: "СТАТУС", en: "STATUS", uz: "HOLAT" },
  p_year: { ru: "ГОД", en: "YEAR", uz: "YIL" },
  p_role: { ru: "РОЛЬ", en: "ROLE", uz: "ROL" },
  p_tech: { ru: "ТЕХНОЛОГИИ", en: "TECH", uz: "TEXNOLOGIYA" },
  p_link: { ru: "ССЫЛКА", en: "LINK", uz: "HAVOLA" },
  p_visit: { ru: "Открыть сайт", en: "Open website", uz: "Saytni ochish" },
  p_case: { ru: "Смотреть кейс", en: "View case", uz: "Keysni ko'rish" },
  st_live: { ru: "LIVE", en: "LIVE", uz: "JONLI" },
  st_live_dev: { ru: "LIVE / В РАЗРАБОТКЕ", en: "LIVE / IN DEVELOPMENT", uz: "JONLI / RIVOJLANTIRILMOQDA" },
  st_concept: { ru: "КОНЦЕПТ", en: "CONCEPT", uz: "KONSEPSIYA" },
  st_support: { ru: "ВСПОМОГАТЕЛЬНЫЙ", en: "SUPPORTING", uz: "QO'SHIMCHA LOYIHA" },
  st_experiment: { ru: "ЭКСПЕРИМЕНТ", en: "EXPERIMENT", uz: "EKSPERIMENT" },
  st_waitlist: { ru: "LIVE · WAITLIST / В РАЗРАБОТКЕ", en: "LIVE · WAITLIST / IN DEVELOPMENT", uz: "JONLI · WAITLIST / ISHLAB CHIQILMOQDA" },
  p_real: { ru: "ЖИВОЙ САЙТ · РЕАЛЬНЫЙ ПРОЕКТ", en: "LIVE WEBSITE · REAL PROJECT", uz: "JONLI SAYT · HAQIQIY LOYIHA" },
  ui_demo: { ru: "ИНТЕРФЕЙС-ПРЕВЬЮ · РАЗМЕТКА МЕХАНИКИ", en: "INTERFACE PREVIEW · MECHANICS LAYOUT", uz: "INTERFEYS NAMUNASI · MEXANIKA JOYLASHUVI" },
  scroll_hint: { ru: "Листайте", en: "Scroll", uz: "Suring" },

  /* ---------- kashmir ---------- */
  k_cat: { ru: "САЛОН ШТОР · ТАШКЕНТ · ИНТЕРЬЕРЫ", en: "CURTAIN SALON · TASHKENT · INTERIORS", uz: "PARDALAR SALONI · TOSHKENT · INTERYERLAR" },
  k_lead: {
    ru: "KASHMIR DECOR — салон штор в Ташкенте: пошив штор на заказ, коллекция тканей, интерьерные композиции и процесс из пяти шагов — от знакомства до монтажа.",
    en: "KASHMIR DECOR — a curtain salon in Tashkent: custom curtain tailoring, fabric collection, interior compositions and a five-step process — from first meeting to installation.",
    uz: "KASHMIR DECOR — Toshkentdagi pardalar saloni: buyurtma bo'yicha parda tikish, matolar kolleksiyasi, interyer kompozitsiyalari va besh bosqichli jarayon — tanishuvdan montajgacha.",
  },
  k_note: {
    ru: "Реальные разделы: салон · коллекция · интерьеры · процесс 01–05 · FAQ · многоязычность · SEO · Vercel",
    en: "Real sections: salon · collection · interiors · process 01–05 · FAQ · multilingual · SEO · Vercel",
    uz: "Haqiqiy bo'limlar: salon · kolleksiya · interyerlar · jarayon 01–05 · FAQ · ko'p tillilik · SEO · Vercel",
  },
  k_img1: { ru: "Главная — полный экран", en: "Homepage — full screen", uz: "Bosh sahifa — to'liq ekran" },
  k_img2: { ru: "Страница коллекции — деталь", en: "Collection page — detail", uz: "Kolleksiya sahifasi — detal" },
  k_q1: { ru: "Зачем?", en: "Why?", uz: "Nega?" },
  k_q1_b: {
    ru: "Интерьер — это ощущение. Сайт должен был продавать не товар, а настроение: мягкость, спокойствие и доверие.",
    en: "Interior is a feeling. The site had to sell not a product, but a mood: softness, calm and trust.",
    uz: "Interyer — bu his-tuyg'u. Sayt mahsulot emas, kayfiyat sotishi kerak edi: yumshoqlik, sokinlik va ishonch.",
  },
  k_q2: { ru: "Подход", en: "Approach", uz: "Yondashuv" },
  k_q2_b: {
    ru: "Страницы, поставленные как модный журнал: крупные фото, много воздуха, медленное движение. Каждый экран похож на интерьерный каталог.",
    en: "Pages staged like a fashion magazine: large images, plenty of air, slow motion. Every screen feels like an interior catalogue.",
    uz: "Moda jurnali kabi sahnalashtirilgan sahifalar: katta rasmlar, ko'p havo, sekin harakat. Har bir ekran interyer katalogiga o'xshaydi.",
  },
  k_q3: { ru: "Техническая сторона", en: "Technical side", uz: "Texnik tomoni" },
  k_q3_b: {
    ru: "SEO-first архитектура: правильные заголовки, sitemap, индексация и отдельные пути для трёх языков. Быстрая загрузка на Vercel.",
    en: "SEO-first architecture: proper headings, sitemap, indexing and separate paths for three languages. Loads fast on Vercel.",
    uz: "SEO-first arxitektura: to'g'ri sarlavhalar, sitemap, indeksatsiya va uch til uchun alohida yo'llar. Vercel'da tez yuklanadi.",
  },

  /* ---------- ustatop ---------- */
  u_cat: { ru: "МАРКЕТПЛЕЙС УСЛУГ", en: "SERVICE MARKETPLACE", uz: "XIZMAT KO'RSATISH MARKETPLEYSI" },
  u_lead: {
    ru: "«Muammoingiz bormi? Ustasini topamiz.» Сайт уже в живую — сейчас это coming-soon страница с waitlist, каталогом услуг и механикой доверия. Платформа в разработке.",
    en: "«Muammoingiz bormi? Ustasini topamiz.» The site is already live — currently a coming-soon page with a waitlist, service catalog and trust mechanics. The platform is in development.",
    uz: "«Muammoingiz bormi? Ustasini topamiz.» Sayt allaqachon jonli — hozir bu waitlist, xizmatlar katalogi va ishonch mexanikasi bilan coming-soon sahifa. Platforma ishlab chiqilmoqda.",
  },
  u_system: { ru: "MUAMMO → AYTING → TOPAMIZ → ISHONCH", en: "PROBLEM → TELL → FIND → TRUST", uz: "MUAMMO → AYTING → TOPAMIZ → ISHONCH" },
  u_stage1_t: { ru: "МУАММО", en: "PROBLEM", uz: "MUAMMO" },
  u_stage1_b: {
    ru: "Раздел 01 на живом сайте: бытовые проблемы — от крана до электрики. Одна платформа для дома и быта.",
    en: "Section 01 on the live site: everyday household problems — from taps to electrics. One platform for home.",
    uz: "Jonli saytdagi 01-bo'lim: uy va kundalik muammolar — krandan elektrikagacha. Bitta platforma.",
  },
  u_stage2_t: { ru: "СКАЖИТЕ", en: "TELL US", uz: "AYTING" },
  u_stage2_b: {
    ru: "«Kranim oqyapti.» — раздел 02: опишите проблему так, как удобно. Сообщение превращается в заявку.",
    en: "«Kranim oqyapti.» — section 02: describe the problem any way you like. The message becomes a request.",
    uz: "«Kranim oqyapti.» — 02-bo'lim: muammoni qanday qulay bo'lsa shunday yozing. Xabar arizaga aylanadi.",
  },
  u_stage3_t: { ru: "НАЙДЁМ", en: "WE FIND", uz: "TOPAMIZ" },
  u_stage3_b: {
    ru: "Раздел 03: заявка понимается, подбирается подходящий мастер. Протестировать механику можно прямо на сайте.",
    en: "Section 03: the request is understood and a suitable master is selected. The mechanics can be tried on the site.",
    uz: "03-bo'lim: ariza tushuniladi, mos usta tanlanadi. Mexanikani saytning o'zida sinab ko'rish mumkin.",
  },
  u_stage4_t: { ru: "WORK PROOF", en: "WORK PROOF", uz: "ISH ISBOTI" },
  u_stage4_b: {
    ru: "Раздел 04: фото «до / в работе / после» прикрепляются к заказу. Доверие строится на доказательствах.",
    en: "Section 04: before / during / after photos attach to the order. Trust is built on proof.",
    uz: "04-bo'lim: «oldin / jarayonda / keyin» rasmlari buyurtmaga birikadi. Ishonch isbotlar asosida quriladi.",
  },
  u_stage5_t: { ru: "ДОВЕРИЕ", en: "TRUST", uz: "ISHONCH" },
  u_stage5_b: {
    ru: "Раздел 06: идентификация каждого мастера. Плюс профессиональная сторона: своя цена, район, прямая оплата, рейтинг.",
    en: "Section 06: every master verifies identity. Plus the pro side: own price, area, direct payment, rating.",
    uz: "06-bo'lim: har bir ustaning shaxsi tasdiqlanadi. Usta tomoni: o'z narxi, hududi, to'g'ridan-to'g'ri to'lov, reyting.",
  },
  u_stage6_t: { ru: "КАТАЛОГ", en: "CATALOG", uz: "KATALOG" },
  u_stage6_b: {
    ru: "Каталог уже жив: 8 направлений услуг с детальными страницами. Waitlist открыт — «Birinchi bo'lib biling.»",
    en: "The catalog is already live: 8 service categories with detail pages. The waitlist is open — «Birinchi bo'lib biling.»",
    uz: "Katalog allaqachon jonli: 8 ta yo'nalish, har birida batafsil sahifa. Waitlist ochiq — «Birinchi bo'lib biling.»",
  },
  u_hub_t: { ru: "USTATOP SOCIAL HUB", en: "USTATOP SOCIAL HUB", uz: "USTATOP SOCIAL HUB" },
  u_hub_b: {
    ru: "Отдельная страница, приводящая трафик из Instagram на основной сайт. Маленькая, но важная часть экосистемы.",
    en: "A separate page that brings Instagram traffic to the main website. A small but important part of the ecosystem.",
    uz: "Instagram trafigini asosiy saytga olib keluvchi alohida sahifa. Ekotizimning mayda, lekin muhim qismi.",
  },
  u_bot: { ru: "TELEGRAM-БОТ", en: "TELEGRAM BOT", uz: "TELEGRAM BOT" },
  u_mobile_t: { ru: "МОБИЛЬНОЕ НАПРАВЛЕНИЕ", en: "MOBILE DIRECTION", uz: "MOBIL YO'NALISH" },
  u_mobile_b: {
    ru: "Android-версия UstaTop исследуется на Kotlin и Jetpack Compose: Material 3, MVVM, Clean Architecture и Hilt.",
    en: "The UstaTop Android version is being explored with Kotlin and Jetpack Compose: Material 3, MVVM, Clean Architecture and Hilt.",
    uz: "UstaTop Android versiyasi Kotlin va Jetpack Compose ustida tadqiq qilinyapti: Material 3, MVVM, Clean Architecture va Hilt bilan.",
  },

  /* ---------- educrm ---------- */
  e_cat: { ru: "ПЛАТФОРМА УПРАВЛЕНИЯ ОБУЧЕНИЕМ", en: "EDUCATION MANAGEMENT PLATFORM", uz: "TA'LIMNI BOSHQARISH PLATFORMALARI" },
  e_lead: {
    ru: "Система управления для небольших частных учебных центров Узбекистана. Не для государственных школ — для реального частного бизнеса.",
    en: "A management system for small private learning centers in Uzbekistan. Not for public schools — for real private business.",
    uz: "O'zbekistondagi kichik xususiy o'quv markazlari uchun boshqaruv tizimi. Davlat maktablari uchun emas — real xususiy biznes uchun.",
  },
  e_note: {
    ru: "Веб-админка · Telegram-бот · Telegram Mini App — три лица, один мозг.",
    en: "Web admin · Telegram bot · Telegram Mini App — three faces, one brain.",
    uz: "Veb-admin · Telegram Bot · Telegram Mini App — uch yuz, bitta miya.",
  },
  e_owner: {
    ru: "Владелец центра видит из одной панели деньги, долги, посещаемость, зарплаты учителей, учеников и группы.",
    en: "The owner sees money, debts, attendance, teacher salaries, students and groups from a single panel.",
    uz: "Markaz egasi bitta paneldan pul, qarzlar, davomat, o'qituvchilar oyligi, o'quvchilar va guruhlarni ko'radi.",
  },
  e_lang: { ru: "ЯЗЫКИ: СНАЧАЛА УЗБЕКСКИЙ · ЗАТЕМ РУССКИЙ · АНГЛИЙСКИЙ ОПЦИОНАЛЬНО", en: "LANGUAGES: UZBEK FIRST · RUSSIAN SECOND · ENGLISH OPTIONAL", uz: "TIL YO'NALISHI: AVVAL O'ZBEK · KEYIN RUS · INGLIZ IXTIMOIIY" },
  e_scr1: { ru: "Панель", en: "Dashboard", uz: "Boshqaruv paneli" },
  e_scr2: { ru: "Ученики", en: "Students", uz: "O'quvchilar" },
  e_scr3: { ru: "Посещаемость", en: "Attendance", uz: "Davomat" },
  e_scr4: { ru: "Финансы", en: "Finance", uz: "Moliya" },
  e_scr5: { ru: "Учителя", en: "Teachers", uz: "O'qituvchilar" },
  e_concept_note: {
    ru: "Пока это концепт в разработке — интерфейсы собираются как прототип, без выдуманных бизнес-метрик.",
    en: "Currently a concept in development — interfaces are being built as a prototype, with no fabricated business metrics.",
    uz: "Hozircha konsepsiya va ishlab chiqish bosqichida — interfeyslar prototip sifatida qurilmoqda, biznes ko'rsatkichlari uydurilmayapti.",
  },

  /* ---------- drivera ---------- */
  d_cat: { ru: "МАРКЕТПЛЕЙС АРЕНДЫ АВТО", en: "CAR RENTAL MARKETPLACE", uz: "AVTOMOBIL IJARASI MARKETPLEYSI" },
  d_lead: {
    ru: "Концепт премиального маркетплейса аренды автомобилей: владельцы размещают машины, водители бронируют, платформа берёт комиссию.",
    en: "A concept for a premium car rental marketplace: owners list cars, drivers book, the platform takes a commission.",
    uz: "Premium avtomobil ijarasi bozori konsepsiyasi: egalar mashina qo'yadi, haydovchilar band qiladi, platforma komissiya oladi.",
  },
  d_f1: { ru: "TELEGRAM-БОТ", en: "TELEGRAM BOT", uz: "TELEGRAM BOT" },
  d_f2: { ru: "MINI APP", en: "MINI APP", uz: "MINI APP" },
  d_f3: { ru: "БРОНИРОВАНИЕ", en: "BOOKING", uz: "BAND QILISH" },
  d_f4: { ru: "МОДЕРАЦИЯ", en: "ADMIN APPROVAL", uz: "ADMIN TASDIG'I" },
  d_f5: { ru: "КОМИССИЯ", en: "COMMISSION MODEL", uz: "KOMISSIYA MODELI" },
  d_stamp: { ru: "КОНЦЕПТ — НА СТАДИИ ИССЛЕДОВАНИЯ", en: "CONCEPT — RESEARCH PHASE", uz: "KONSEPSIYA — TADQIQOT BOSQICHIDA" },

  /* ---------- horizontal archive ---------- */
  ha_kicker: { ru: "АРХИВ — ГОРИЗОНТАЛЬНАЯ СЦЕНА", en: "ARCHIVE — HORIZONTAL SCENE", uz: "ARXIV — GORIZONTAL SAHNA" },
  ha_title: { ru: "ЧЕТЫРЕ ИСТОРИИ", en: "FOUR STORIES", uz: "TO'RTTA HIKOYA" },
  ha_hint: { ru: "Листайте — архив откроется вбок", en: "Scroll — the archive opens sideways", uz: "Aylantiring — arxiv yonga ochiladi" },

  /* ---------- services ---------- */
  svc_kicker: { ru: "ЧТО Я МОГУ ПОСТРОИТЬ ДЛЯ ВАС", en: "WHAT I CAN BUILD FOR YOU", uz: "SIZ UCHUN NIMA QURIB BEROLAMAN" },
  svc_title: { ru: "УСЛУГИ", en: "SERVICES", uz: "XIZMATLAR" },
  svc_sub: { ru: "Цифровые продукты от идеи до запуска. Начальная цена указана рядом с каждым типом.", en: "Digital products from idea to launch. Starting price next to each type.", uz: "G'oyadan ishga tushirishgacha raqamli mahsulotlar. Boshlang'ich narx har bir tur yonida." },
  svc_from: { ru: "ОТ", en: "FROM", uz: "DAN" },
  svc_disclaimer: {
    ru: "Это стартовые цены. Итоговая стоимость зависит от объёма, функций, интеграций и сложности дизайна.",
    en: "These are starting prices. Final cost depends on scope, features, integrations and design complexity.",
    uz: "Bular boshlang'ich narxlar. Yakuniy narx hajm, funksiyalar, integratsiyalar va dizayn murakkabligiga bog'liq.",
  },
  svc_quote: { ru: "Запросить расчёт", en: "Request a custom quote", uz: "Hisob-kitob so'rash" },
  svc_order: { ru: "Заказать такой", en: "Order this type", uz: "Shundayini buyurtma" },
  svc_best: { ru: "КОМУ ПОДХОДИТ", en: "BEST FOR", uz: "KIMGA MOS" },
  svc_incl: { ru: "ЧТО ВХОДИТ", en: "INCLUDED", uz: "NIMALAR KIRADI" },
  svc_custom: { ru: "ИНДИВИДУАЛЬНЫЙ РАСЧЁТ", en: "CUSTOM QUOTE", uz: "ALOHIDA HISOB" },
  svc_example: { ru: "ПРИМЕР", en: "EXAMPLE", uz: "NAMUNA" },
  svc_uzs: { ru: "сум", en: "UZS", uz: "so'm" },

  s1_t: { ru: "ВЕБ-САЙТЫ", en: "WEBSITES", uz: "VEB-SAYTLAR" },
  s1_d: { ru: "Лендинги, корпоративные и премиальные сайты с кинематографичной подачей.", en: "Landing pages, business and premium websites with cinematic presentation.", uz: "Lending, biznes va premium saytlar — kinematograf taqdimot bilan." },
  s1_f: { ru: "личные бренды, компании, агентства, запуски продуктов", en: "personal brands, companies, agencies, product launches", uz: "shaxsiy brendlar, kompaniyalar, agentliklar, mahsulot ishga tushirish" },
  s1_i: { ru: "адаптивный дизайн, анимации, форма связи, Telegram-интеграция, SEO-база, деплой", en: "responsive design, animation, contact form, Telegram integration, SEO foundation, deployment", uz: "responsiv dizayn, animatsiyalar, aloqa formi, Telegram integratsiya, SEO asos, joylashtirish" },
  s2_t: { ru: "TELEGRAM-БОТЫ", en: "TELEGRAM BOTS", uz: "TELEGRAM BOTLAR" },
  s2_d: { ru: "Боты для бизнеса: заявки, каталоги, админки, AI-диалоги.", en: "Bots for business: leads, catalogs, admin, AI conversations.", uz: "Biznes uchun botlar: arizalar, kataloglar, admin, AI dialoglar." },
  s2_f: { ru: "услуги, магазины, школы, локальный бизнес", en: "services, shops, schools, local businesses", uz: "xizmatlar, do'konlar, maktablar, mahalliy biznes" },
  s2_i: { ru: "команды и меню, сбор лидов, база данных, уведомления, мультиязычность, админ-логика", en: "commands & menus, lead collection, database, notifications, multilingual flow, admin logic", uz: "buyruqlar va menyu, lid yig'ish, ma'lumotlar bazasi, bildirishnomalar, ko'p tillilik, admin logika" },
  s3_t: { ru: "TELEGRAM MINI APP", en: "TELEGRAM MINI APP", uz: "TELEGRAM MINI APP" },
  s3_d: { ru: "Полноценное приложение внутри Telegram — без установки.", en: "A full app inside Telegram — no installation needed.", uz: "Telegram ichidagi to'liq ilova — o'rnatish shart emas." },
  s3_f: { ru: "маркетплейсы, бронирование, каталоги, сервисы", en: "marketplaces, booking, catalogs, services", uz: "marketplace'lar, bron qilish, kataloglar, xizmatlar" },
  s3_i: { ru: "Telegram-авторизация, профиль, каталог, бронь, платежи, кабинет, API", en: "Telegram auth, profile, catalog, booking, payments, dashboard, API", uz: "Telegram avtorizatsiya, profil, katalog, bron, to'lovlar, kabinet, API" },
  s4_t: { ru: "ВЕБ-ПРИЛОЖЕНИЯ", en: "WEB APPS", uz: "VEB ILOVALAR" },
  s4_d: { ru: "Панели, CRM, маркетплейсы и внутренние системы.", en: "Dashboards, CRMs, marketplaces and internal systems.", uz: "Panellar, CRM, marketplace'lar va ichki tizimlar." },
  s4_f: { ru: "компании с процессами, учебные центры, сервисы", en: "process-driven companies, learning centers, services", uz: "jarayonli kompaniyalar, o'quv markazlari, xizmatlar" },
  s4_i: { ru: "авторизация, роли, дашборды, база данных, админ, API, платежи", en: "authentication, roles, dashboards, database, admin, APIs, payments", uz: "avtorizatsiya, rollar, dashboardlar, baza, admin, API, to'lovlar" },
  s5_t: { ru: "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ", en: "MOBILE APPS", uz: "MOBIL ILOVALAR" },
  s5_d: { ru: "Android на Kotlin / Compose и кроссплатформенные продукты.", en: "Android with Kotlin / Compose and cross-platform products.", uz: "Kotlin / Compose'da Android va kross-platforma mahsulotlar." },
  s5_f: { ru: "стартапы, маркетплейсы, сервисы с картой", en: "startups, marketplaces, map-based services", uz: "startaplar, marketplace'lar, xaritaviy xizmatlar" },
  s5_i: { ru: "авторизация, API, база данных, уведомления, карты, админ", en: "authentication, API, database, notifications, maps, admin", uz: "avtorizatsiya, API, baza, bildirishnomalar, xaritalar, admin" },
  s6_t: { ru: "UI / UX ДИЗАЙН", en: "UI / UX DESIGN", uz: "UI / UX DIZAYN" },
  s6_d: { ru: "Структура, прототипы и интерфейсы, которые продают.", en: "Structure, prototypes and interfaces that sell.", uz: "Sotadigan tuzilma, prototiplar va interfeyslar." },
  s6_f: { ru: "стартапы, редизайн, новые продукты", en: "startups, redesigns, new products", uz: "startaplar, redizayn, yangi mahsulotlar" },
  s6_i: { ru: "UX-структура, архитектура страниц, компоненты, интерфейс, дизайн-система", en: "UX structure, page architecture, components, interface design, design system", uz: "UX tuzilma, sahifa arxitekturasi, komponentlar, interfeys, dizayn tizimi" },
  s7_t: { ru: "AI И АВТОМАТИЗАЦИЯ", en: "AI & AUTOMATION", uz: "AI VA AVTOMATLASHTIRISH" },
  s7_d: { ru: "AI-чатботы, ассистенты и автоматизация контента.", en: "AI chatbots, assistants and content automation.", uz: "AI chatbotlar, assistentlar va kontent avtomatlashtirish." },
  s7_f: { ru: "поддержка, контент, поиск, рекомендации", en: "support, content, search, recommendations", uz: "qo'llab-quvvatlash, kontent, qidiruv, tavsiyalar" },
  s7_i: { ru: "AI-чатбот, ассистент поддержки, автоматизация, AI-поиск, API-интеграция", en: "AI chatbot, support assistant, automation, AI search, API integration", uz: "AI chatbot, yordamchi assistent, avtomatlashtirish, AI qidiruv, API integratsiya" },

  lv_landing: { ru: "ЛЕНДИНГ", en: "LANDING", uz: "LANDING" },
  lv_business: { ru: "БИЗНЕС-САЙТ", en: "BUSINESS WEBSITE", uz: "BIZNES SAYT" },
  lv_premium: { ru: "ПРЕМИУМ / КАСТОМ", en: "PREMIUM / CUSTOM", uz: "PREMIUM / MAXSUS" },
  lv_basic_bot: { ru: "БАЗОВЫЙ БОТ", en: "BASIC BOT", uz: "ODDIY BOT" },
  lv_business_bot: { ru: "БИЗНЕС-БОТ", en: "BUSINESS BOT", uz: "BIZNES BOT" },
  lv_ai_bot: { ru: "ПРОДВИНУТЫЙ / AI", en: "ADVANCED / AI", uz: "ILG'OR / AI" },
  lv_miniapp: { ru: "MINI APP", en: "MINI APP", uz: "MINI APP" },
  lv_webapp: { ru: "ВЕБ-ПРИЛОЖЕНИЕ / СИСТЕМА", en: "WEB APP / SYSTEM", uz: "VEB ILOVA / TIZIM" },
  lv_custom: { ru: "КРУПНЫЙ ПРОДУКТ", en: "LARGE PRODUCT", uz: "KATTA MAHSULOT" },
  lv_android: { ru: "ANDROID APP", en: "ANDROID APP", uz: "ANDROID ILOVA" },
  lv_cross: { ru: "КРОССПЛАТФОРМА", en: "CROSS-PLATFORM", uz: "KROSS-PLATFORMA" },
  lv_advmob: { ru: "ПРОДВИНУТЫЙ ПРОДУКТ", en: "ADVANCED PRODUCT", uz: "ILG'OR MAHSULOT" },
  lv_uiux: { ru: "UI / UX ПРОЕКТ", en: "UI / UX PROJECT", uz: "UI / UX LOYIHA" },
  lv_ai: { ru: "AI ИНТЕГРАЦИЯ", en: "AI INTEGRATION", uz: "AI INTEGRATSIYA" },

  f_all: { ru: "ВСЕ", en: "ALL", uz: "BARCHASI" },
  f_web: { ru: "ВЕБ", en: "WEB", uz: "VEB" },
  f_telegram: { ru: "TELEGRAM", en: "TELEGRAM", uz: "TELEGRAM" },
  f_app: { ru: "ПРИЛОЖЕНИЯ", en: "APPS", uz: "ILOVALAR" },
  f_design: { ru: "ДИЗАЙН", en: "DESIGN", uz: "DIZAYN" },
  f_ai: { ru: "AI", en: "AI", uz: "AI" },
  f_products: { ru: "ПРОДУКТЫ", en: "PRODUCTS", uz: "MAHSULOTLAR" },
  f_live: { ru: "LIVE", en: "LIVE", uz: "JONLI" },
  f_mobile: { ru: "МОБИЛ", en: "MOBILE", uz: "MOBIL" },
  f_exp: { ru: "ЭКСПЕРИМЕНТЫ", en: "EXPERIMENTS", uz: "EKSPERIMENTLAR" },

  /* ---------- how pricing ---------- */
  prc_kicker: { ru: "ПРОЗРАЧНОСТЬ", en: "TRANSPARENCY", uz: "SHAFFOFLIK" },
  prc_title: { ru: "КАК СЧИТАЕТСЯ ЦЕНА", en: "HOW PRICING WORKS", uz: "NARX QANDAY HISOBLANADI" },
  prc_formula: { ru: "Базовая цена · сложность дизайна · функции · интеграции · языки · бэкенд · админ-система · сторонние сервисы = итоговая цена", en: "Base price · design complexity · features · integrations · languages · backend · admin system · third-party services = final price", uz: "Boshlang'ich narx · dizayn murakkabligi · funksiyalar · integratsiyalar · tillar · backend · admin tizimi · tomon xizmatlari = yakuniy narx" },
  prc_note: {
    ru: "Поэтому лендинг за 2,5 млн и маркетплейс за 15 млн — это не одно и то же. После короткого брифа я называю точную вилку до начала работы.",
    en: "That's why a 2.5M landing and a 15M marketplace are not the same thing. After a short brief I give you an exact range before work begins.",
    uz: "Shuning uchun 2,5 millionlik landing va 15 millionlik marketplace bir xil narsa emas. Qisqa briefdan so'ng ish boshlanishidan oldin aniq oraliqni aytaman.",
  },

  /* ---------- comparison ---------- */
  cmp_kicker: { ru: "СРАВНЕНИЕ", en: "COMPARE", uz: "TAQQOSLASH" },
  cmp_title: { ru: "ЧТО ВЫБРАТЬ?", en: "WHICH ONE DO YOU NEED?", uz: "QAYSI BIRI KERAK?" },
  cmp_purpose: { ru: "НАЗНАЧЕНИЕ", en: "PURPOSE", uz: "MAQSAD" },
  cmp_price: { ru: "СТАРТ", en: "STARTS", uz: "BOSHLANISHI" },
  cmp_features: { ru: "ТИПИЧНЫЕ ФУНКЦИИ", en: "TYPICAL FEATURES", uz: "ODATIY FUNKSIYALAR" },
  cmp_client: { ru: "ИДЕАЛЬНЫЙ КЛИЕНТ", en: "IDEAL CLIENT", uz: "IDEAL MIJOZ" },
  cmp_web: { ru: "представить бренд, продавать услугу", en: "present a brand, sell a service", uz: "brendni ko'rsatish, xizmat sotish" },
  cmp_webapp: { ru: "автоматизировать процессы компании", en: "automate company processes", uz: "kompaniya jarayonlarini avtomatlashtirish" },
  cmp_miniapp: { ru: "запустить продукт прямо в Telegram", en: "launch a product right inside Telegram", uz: "mahsulotni to'g'ridan-to'g'ri Telegramda ishga tushirish" },
  cmp_web_c: { ru: "эксперт, локальный бизнес, бренд", en: "expert, local business, brand", uz: "ekspert, mahalliy biznes, brend" },
  cmp_webapp_c: { ru: "компания с командой и процессами", en: "company with team and processes", uz: "jamoa va jarayonli kompaniya" },
  cmp_miniapp_c: { ru: "сервис с аудиторией в Telegram", en: "service with a Telegram audience", uz: "Telegram auditoriyali xizmat" },

  /* ---------- estimator ---------- */
  est_kicker: { ru: "ИНТЕРАКТИВНАЯ ОЦЕНКА", en: "INTERACTIVE ESTIMATE", uz: "INTERAKTIV BAHOLASH" },
  est_title: { ru: "ЧТО ВАМ НУЖНО?", en: "WHAT DO YOU NEED?", uz: "SIZGA NIMA KERAK?" },
  est_step: { ru: "ШАГ", en: "STEP", uz: "QADAM" },
  est_q1: { ru: "Тип продукта", en: "Product type", uz: "Mahsulot turi" },
  est_q2: { ru: "Сложность", en: "Complexity", uz: "Murakkablik" },
  est_q3: { ru: "Языки", en: "Languages", uz: "Tillar" },
  est_q4: { ru: "Интеграции", en: "Integrations", uz: "Integratsiyalar" },
  est_basic: { ru: "Базовый", en: "Basic", uz: "Oddiy" },
  est_standard: { ru: "Стандартный", en: "Standard", uz: "Standart" },
  est_advanced: { ru: "Продвинутый", en: "Advanced", uz: "Ilg'or" },
  est_none: { ru: "Нет", en: "None", uz: "Yo'q" },
  est_result: { ru: "ОРИЕНТИРОВОЧНАЯ ВИЛКА", en: "ESTIMATED STARTING RANGE", uz: "TAXMINIY BOSHLANG'ICH ORALIQ" },
  est_disclaimer: {
    ru: "Это оценка, а не окончательная смета. Точную цену я назову после короткого брифа.",
    en: "This is an estimate, not a final quote. I'll give the exact price after a short brief.",
    uz: "Bu taxmin, yakuniy smeta emas. Aniq narxni qisqa briefdan keyin aytaman.",
  },
  est_back: { ru: "Назад", en: "Back", uz: "Orqaga" },
  est_next: { ru: "Дальше", en: "Next", uz: "Keyingi" },
  est_restart: { ru: "Заново", en: "Restart", uz: "Qaytadan" },
  est_send: { ru: "Отправить запрос в Telegram", en: "Send request via Telegram", uz: "Telegramga so'rov yuborish" },

  /* ---------- faq ---------- */
  faq_kicker: { ru: "ВОПРОСЫ", en: "QUESTIONS", uz: "SAVOLLAR" },
  faq_title: { ru: "FAQ", en: "FAQ", uz: "FAQ" },
  q1: { ru: "Сколько стоит сайт?", en: "How much does a website cost?", uz: "Sayt qancha turadi?" },
  a1: { ru: "Лендинг — от 2,5 млн сум, бизнес-сайт — от 5,5 млн, премиум — от 8,5 млн. Итог зависит от объёма и функций.", en: "Landing from 2.5M UZS, business site from 5.5M, premium from 8.5M. The total depends on scope and features.", uz: "Landing — 2,5 mln so'mdan, biznes sayt — 5,5 mln dan, premium — 8,5 mln dan. Yakuniy narx hajm va funksiyalarga bog'liq." },
  q2: { ru: "Сколько времени занимает разработка?", en: "How long does development take?", uz: "Dasturlash qancha vaqt oladi?" },
  a2: { ru: "Лендинг — 5–10 дней, бизнес-сайт — 2–3 недели. Боты и приложения зависят от объёма — срок называю после брифа.", en: "Landing 5–10 days, business site 2–3 weeks. Bots and apps depend on scope — I name the timeline after the brief.", uz: "Landing — 5–10 kun, biznes sayt — 2–3 hafta. Bot va ilovalar hajmga bog'liq — muddatni briefdan keyin aytaman." },
  q3: { ru: "Можно сайт на узбекском и русском?", en: "Can you build in Uzbek and Russian?", uz: "O'zbek va rus tilida qilish mumkinmi?" },
  a3: { ru: "Да — мультиязычность закладывается в архитектуру с самого начала, английский тоже возможен.", en: "Yes — multilingual architecture is built in from the start, English is possible too.", uz: "Ha — ko'p tillilik dastlabki arxitekturadan boshlab qo'yiladi, ingliz tili ham mumkin." },
  q4: { ru: "Можно подключить Telegram?", en: "Can Telegram be connected?", uz: "Telegram ulash mumkinmi?" },
  a4: { ru: "Да — бот, уведомления, формы с отправкой в Telegram и полноценные Mini Apps.", en: "Yes — bots, notifications, forms sending to Telegram and full Mini Apps.", uz: "Ha — bot, bildirishnomalar, Telegramga yuboruvchi formalar va to'liq Mini Apps." },
  q5: { ru: "Можно подключить платёжные системы?", en: "Can payment systems be integrated?", uz: "To'lov tizimlarini ulash mumkinmi?" },
  a5: { ru: "Да, локальные провайдеры и Telegram Payments — в зависимости от проекта.", en: "Yes, local providers and Telegram Payments — depending on the project.", uz: "Ha, mahalliy provayderlar va Telegram Payments — loyihaga qarab." },
  q6: { ru: "Сделаете ли редизайн существующего сайта?", en: "Can you redesign an existing website?", uz: "Mavjud saytni yangilaysizmi?" },
  a6: { ru: "Да — аудит, новая структура и полный визуальный пересбор. Такие проекты мне особенно интересны.", en: "Yes — audit, new structure and a full visual rebuild. I especially enjoy projects like this.", uz: "Ha — audit, yangi tuzilma va to'liq vizual qayta qurish. Bunday loyihalar menga ayniqsa yoqadi." },
  q7: { ru: "Делаете мобильные приложения?", en: "Do you build mobile apps?", uz: "Mobil ilova qilasizmi?" },
  a7: { ru: "Android на Kotlin/Compose — да. Под iOS возможна кроссплатформенная архитектура.", en: "Android with Kotlin/Compose — yes. For iOS a cross-platform architecture is possible.", uz: "Kotlin/Compose'da Android — ha. iOS uchun kross-platforma arxitekturasi mumkin." },
  q8: { ru: "Можно начать проект с одной идеи?", en: "Can a project start from just an idea?", uz: "Faqat g'oyadan boshlash mumkinmi?" },
  a8: { ru: "Конечно — большинство моих продуктов начинались с вопроса «а можно ли лучше?». Помогу оформить идею в структуру и план.", en: "Of course — most of my products started with the question \u201Ccan this be better?\u201D. I'll help shape the idea into structure and plan.", uz: "Albatta — ko'pchilik mahsulotlarim «yaxshiroq qilib bo'ladimi?» savolidan boshlangan. G'oyani tuzilma va rejaga aylantirishga yordam beraman." },

  /* ---------- lab ---------- */
  lab_kicker: { ru: "ИНТЕРАКТИВНАЯ ПЛОЩАДКА", en: "INTERACTIVE PLAYGROUND", uz: "INTERAKTIV MAYDON" },
  lab_title: { ru: "ЛАБОРАТОРИЯ", en: "THE LAB", uz: "LABORATORIYA" },
  lab_lead: {
    ru: "Здесь нет зрителей — всё можно трогать. Каждый эксперимент по-настоящему работает.",
    en: "No spectators here — everything can be touched. Every experiment actually works.",
    uz: "Bu yerda tomoshabin yo'q — hammasini tegish mumkin. Har bir eksperiment haqiqiy ishlaydi.",
  },
  lab1_t: { ru: "КИНЕТИЧЕСКИЙ ШРИФТ", en: "KINETIC TYPE", uz: "KINETIK SHRIFT" },
  lab1_d: { ru: "Буквы убегают от курсора", en: "Letters run from the cursor", uz: "Harflar kursordan qochadi" },
  lab2_t: { ru: "МАГНИТНЫЙ UI", en: "MAGNETIC UI", uz: "MAGNIT UI" },
  lab2_d: { ru: "Кнопка тянется к курсору", en: "The button pulls toward the cursor", uz: "Tugma kursorga tortiladi" },
  lab3_t: { ru: "СЕТКА КУРСОРА", en: "CURSOR GRID", uz: "KURSOR PANJARASI" },
  lab3_d: { ru: "Клетки реагируют на близость", en: "Cells respond to proximity", uz: "Katakchalar yaqinlikka javob beradi" },
  lab4_t: { ru: "ДЕФОРМАЦИЯ ИЗОБРАЖЕНИЯ", en: "IMAGE DISTORTION", uz: "RASM DEFORMATSIYASI" },
  lab4_d: { ru: "Фото плавится от скорости курсора", en: "The image melts from cursor speed", uz: "Surat kursor tezligiga eriydi" },
  lab5_t: { ru: "ФИЗИКА СКРОЛЛА", en: "SCROLL PHYSICS", uz: "SKROLL FIZIKASI" },
  lab5_d: { ru: "Слово слышит скорость скролла", en: "The word hears scroll speed", uz: "So'z skroll tezligini eshitadi" },
  lab6_t: { ru: "AI-РАБОЧИЙ ПРОЦЕСС", en: "AI WORKFLOW", uz: "AI ISH JARAYONI" },
  lab6_d: { ru: "От идеи до продукта", en: "From idea to product", uz: "G'oyadan mahsulotgacha" },
  lab6_s1: { ru: "ИДЕЯ", en: "IDEA", uz: "G'OYA" },
  lab6_s2: { ru: "ПРОМПТ", en: "PROMPT", uz: "PROMPT" },
  lab6_s3: { ru: "ПРОТОТИП", en: "PROTOTYPE", uz: "PROTOTIP" },
  lab6_s4: { ru: "ИТЕРАЦИЯ", en: "ITERATION", uz: "ITERATSIYA" },
  lab6_s5: { ru: "ПРОДУКТ", en: "PRODUCT", uz: "MAHSULOT" },
  lab6_b: {
    ru: "ИИ — не волшебник в подсобке, а партнёр за моим столом. Я даю идею, он даёт скорость; я ломаю, он помогает собирать заново.",
    en: "AI isn't a magician in the back room — it's a partner at my desk. I bring the idea, it brings speed; I break things, it helps me reassemble.",
    uz: "AI — xonadagi sehrgar emas, stolimdagi sherik. Men g'oya beraman, u tezlik beradi; men buzam, u qayta yig'ishga yordam beradi.",
  },

  /* ---------- stack ---------- */
  stack_kicker: { ru: "КАРТА ТЕХНОЛОГИЙ", en: "TECHNOLOGY MAP", uz: "TEXNOLOGIYA XARITASI" },
  stack_title: { ru: "НА ЧЁМ СТОИТ СИСТЕМА", en: "WHAT THE SYSTEM STANDS ON", uz: "TIZIM NIMA USTIDA TURIBDI" },
  stack_deploy: { ru: "ДЕПЛОЙ", en: "DEPLOYMENT", uz: "JOYLASHTIRISH" },
  stack_eco: { ru: "ЭКОСИСТЕМА", en: "ECOSYSTEM", uz: "EKOTIZIM" },
  stack_mobile: { ru: "МОБИЛЬНОЕ", en: "MOBILE", uz: "MOBIL" },
  stack_ai: { ru: "AI-ПРОЦЕСС", en: "AI WORKFLOW", uz: "AI ISH JARAYONI" },
  stack_note: {
    ru: "ИИ-инструменты — не мой «секретный навык», а открытая часть процесса. Важно то, кто управляет результатом.",
    en: "AI tools are not my \u201Csecret skill\u201D — they're an open part of my process. What matters is who controls the result.",
    uz: "AI vositalar — mening «maxfiy ko'nikmam» emas, ish jarayonimning ochiq qismi. Muhimi — natijani kim boshqarayotgani.",
  },

  /* ---------- process ---------- */
  pr_kicker: { ru: "ЗАКРЕПЛЁННАЯ СЦЕНА", en: "PINNED SCENE", uz: "MAHKAM SAHNA" },
  pr_title: { ru: "КАК Я СТРОЮ", en: "HOW I BUILD", uz: "QANDAY QURAMAN" },
  pr_s1: { ru: "ИДЕЯ", en: "IDEA", uz: "G'OYA" },
  pr_s1_b: { ru: "Всё начинается с простого вопроса: «а можно ли это сделать лучше?»", en: "Everything starts with a simple question: \u201Ccan this be done better?\u201D", uz: "Hammasi oddiy savoldan boshlanadi: «buni yaxshiroq qilib bo'ladimi?»" },
  pr_s2: { ru: "ИССЛЕДОВАНИЕ", en: "RESEARCH", uz: "TADQIQOT" },
  pr_s2_b: { ru: "Для кого, зачем, что уже сделали другие — сначала понять.", en: "For whom, why, what others have done — understand first.", uz: "Kim uchun, nima uchun, boshqalar nima qilishgan — avval tushunish." },
  pr_s3: { ru: "СТРУКТУРА", en: "STRUCTURE", uz: "TUZILMA" },
  pr_s3_b: { ru: "Страницы, состояния, потоки данных — архитектура на бумаге до дизайна.", en: "Pages, states, data flows — paper architecture before design.", uz: "Sahifalar, holatlar, ma'lumot oqimi — dizayndan oldin qog'ozdagi arxitektura." },
  pr_s4: { ru: "ДИЗАЙН", en: "DESIGN", uz: "DIZAYN" },
  pr_s4_b: { ru: "Образ, типографика, движение — слой эмоций поверх структуры.", en: "Image, typography, motion — the emotion layer over structure.", uz: "Tasvir, tipografika, harakat — tuzilma ustidagi his-tuyg'u qatlami." },
  pr_s5: { ru: "СБОРКА", en: "BUILD", uz: "QURISH" },
  pr_s5_b: { ru: "Первая версия быстрая и неидеальная. Главное — чтобы дышала.", en: "The first version is fast and imperfect. What matters — it breathes.", uz: "Birinchi versiya tez va mukammal emas. Muhimi — nafas olishi." },
  pr_s6: { ru: "ЛОМАТЬ", en: "BREAK", uz: "BUZISH" },
  pr_s6_b: { ru: "Смотрю на свою работу жёстко: нахожу слабые места и ломаю их.", en: "I look at my own work harshly: find the weak spots and break them.", uz: "O'z ishimga qat'iy qarayman: zaif joylarni topib, buzaman." },
  pr_s7: { ru: "ПЕРЕСБОРКА", en: "REBUILD", uz: "QAYTA QURISH" },
  pr_s7_b: { ru: "Версия 02 почти всегда радикально лучше версии 01.", en: "Version 02 is almost always radically better than version 01.", uz: "Versiya 02 deyarli har doim versiya 01 dan tubdan yaxshi chiqadi." },
  pr_s8: { ru: "ЗАПУСК", en: "SHIP", uz: "JOYLASHTIRISH" },
  pr_s8_b: { ru: "Vercel, домен, индексация — продукт жив, только когда он в руках людей.", en: "Vercel, domain, indexing — a product is alive only in people's hands.", uz: "Vercel, domen, indeksatsiya — mahsulot odamlar qo'lida bo'lgandagina tirik." },
  pr_v1: { ru: "ВЕРСИЯ 01", en: "VERSION 01", uz: "VERSIYA 01" },
  pr_v2: { ru: "ВЕРСИЯ 02", en: "VERSION 02", uz: "VERSIYA 02" },
  pr_problem: { ru: "ПРОБЛЕМА", en: "PROBLEM", uz: "MUAMMO" },
  pr_iter: { ru: "ИТЕРАЦИЯ", en: "ITERATION", uz: "ITERATSIYA" },

  /* ---------- catalogue ---------- */
  cat_kicker: { ru: "ПОЛНЫЙ ИНДЕКС", en: "FULL INDEX", uz: "TO'LIQ INDEKS" },
  cat_title: { ru: "АРХИВ", en: "ARCHIVE", uz: "ARXIV" },

  /* ---------- now ---------- */
  now_kicker: { ru: "ТЕКУЩЕЕ СОСТОЯНИЕ — 2026", en: "CURRENT STATE — 2026", uz: "JORIY HOLAT — 2026" },
  now_title: { ru: "СЕЙЧАС", en: "NOW", uz: "HOZIR" },
  now_b1_t: { ru: "СТРОЮ", en: "BUILDING", uz: "QURYAPMAN" },
  now_b1_b: { ru: "новые цифровые продукты и развитие экосистемы UstaTop", en: "new digital products and expanding the UstaTop ecosystem", uz: "yangi raqamli mahsulotlar va UstaTop ekotizimini kengaytirish" },
  now_b2_t: { ru: "ИССЛЕДУЮ", en: "EXPLORING", uz: "KASHF QILYAPMAN" },
  now_b2_b: { ru: "глубокий интерактивный дизайн, кинетическую типографику и скролл-сцены", en: "deep interaction design, kinetic typography and scroll scenes", uz: "chuqur interaktiv dizayn, kinetik tipografika va scroll sahnalar" },
  now_b3_t: { ru: "УЧУСЬ", en: "LEARNING", uz: "O'RGANYAPMAN" },
  now_b3_b: { ru: "английский / IELTS, фронтенд-архитектуру и продуктовое мышление", en: "English / IELTS, frontend architecture and product thinking", uz: "ingliz tili / IELTS, frontend arxitekturasi va mahsulot fikrlashi" },
  now_b4_t: { ru: "ДУМАЮ О", en: "THINKING ABOUT", uz: "FIKRLAYAPMAN" },
  now_b4_b: { ru: "мобильных приложениях, AI-интеграциях и маркетплейсах", en: "mobile apps, AI integrations and marketplaces", uz: "mobil ilovalar, AI integratsiyalar va marketplace tizimlari" },

  /* ---------- next ---------- */
  nx_kicker: { ru: "КАРТА БУДУЩЕГО", en: "FUTURE MAP", uz: "KELAJAK XARITASI" },
  nx_title: { ru: "ЧТО ДАЛЬШЕ?", en: "WHAT'S NEXT?", uz: "KEYINGISI NIMA?" },
  nx_lead: {
    ru: "Не обещания — направления. Этот список обновляется каждый год.",
    en: "Not promises — directions. This list updates every year.",
    uz: "Va'dalar emas — yo'nalishlar. Bu ro'yxat har yili yangilanadi.",
  },
  nx_i1: { ru: "Более сильные и цельные цифровые продукты", en: "Stronger, more complete digital products", uz: "Kuchliroq, to'liq raqamli mahsulotlar" },
  nx_i2: { ru: "Продвинутые интерактивные сцены и микроанимации", en: "Advanced interaction scenes and micro-animations", uz: "Mukammal interaktiv sahnalar va mikro-animatsiyalar" },
  nx_i3: { ru: "Мобильные приложения — реальная разработка на Compose", en: "Mobile apps — real development with Compose", uz: "Mobil ilovalar — Compose ustida haqiqiy ishlab chiqish" },
  nx_i4: { ru: "AI-интеграции внутри продуктов", en: "AI integrations inside products", uz: "Mahsulot ichidagi AI integratsiyalar" },
  nx_i5: { ru: "Архитектура маркетплейсов и платёжных систем", en: "Marketplace and payment system architecture", uz: "Marketplace va to'lov tizimlari arxitekturasi" },
  nx_i6: { ru: "Сильные визуальные системы для брендов", en: "Strong visual systems for brands", uz: "Brendlar uchun kuchli vizual tizimlar" },

  /* ---------- contact ---------- */
  ct_kicker: { ru: "СВЯЗЬ — ОТКРЫТА", en: "CONTACT — OPEN", uz: "ALOQA — OCHIQ" },
  ct_l1: { ru: "ДАВАЙТЕ", en: "LET'S", uz: "KELING," },
  ct_l2: { ru: "СОЗДАДИМ ТО,", en: "BUILD SOMETHING", uz: "OCHISHGA ARZIYDIGAN" },
  ct_l3: { ru: "ЧТО ХОЧЕТСЯ ОТКРЫТЬ.", en: "WORTH OPENING.", uz: "NARSANI QURAMIZ." },
  ct_cta: { ru: "Написать в Telegram", en: "Message on Telegram", uz: "Telegram orqali yozish" },
  ct_ig: { ru: "Instagram", en: "Instagram", uz: "Instagram" },
  ct_links: { ru: "ПРОЕКТЫ ИЗ АРХИВА", en: "PROJECTS FROM THE ARCHIVE", uz: "ARXIVDAGI LOYIHALAR" },
  ct_start: { ru: "НАЧАТЬ ПРОЕКТ", en: "START A PROJECT", uz: "LOYIHANI BOSHLASH" },
  ct_more: { ru: "СТРОИТЬ ЕЩЁ МНОГО.", en: "MORE TO BUILD.", uz: "QURILADIGANLAR KO'P." },
  ct_foot_note: {
    ru: "Сайт построен на React · TypeScript · Tailwind · GSAP · Lenis. Личная студия — обновляется постоянно.",
    en: "This site is built with React · TypeScript · Tailwind · GSAP · Lenis. A personal studio — constantly evolving.",
    uz: "Sayt React · TypeScript · Tailwind · GSAP · Lenis bilan qurilgan. Shaxsiy studiya — doimiy yangilanadi.",
  },
  ct_rights: { ru: "ВСЕ ПРАВА — И ВСЕ ПЛАНЫ — ПРИНАДЛЕЖАТ DEV.АСАД.", en: "ALL RIGHTS — AND ALL PLANS — BELONG TO DEV.АСАД.", uz: "BARCHA HUQUQLAR — VA BARCHA REJALAR — DEV.AСАДNIKI." },

  /* ---------- contact flow ---------- */
  cf_q: { ru: "ЧТО НУЖНО СДЕЛАТЬ?", en: "WHAT DO YOU NEED DONE?", uz: "NIMA QILISH KERAK?" },
  cf_name: { ru: "Ваше имя", en: "Your name", uz: "Ismingiz" },
  cf_contact: { ru: "Telegram / телефон", en: "Telegram / phone", uz: "Telegram / telefon" },
  cf_desc: { ru: "Коротко о проекте", en: "Brief project description", uz: "Loyiha haqida qisqacha" },
  cf_budget: { ru: "Бюджет (необязательно)", en: "Budget (optional)", uz: "Byudjet (ixtimoiy)" },
  cf_send: { ru: "ОТПРАВИТЬ ЗАЯВКУ", en: "SEND REQUEST", uz: "SO'ROV YUBORISH" },
  cf_other: { ru: "ДРУГОЕ", en: "OTHER", uz: "BOSHQA" },
  cf_copied: { ru: "Текст заявки скопирован — отправьте его в Telegram", en: "Request text copied — send it in Telegram", uz: "So'rov matni nusxalandi — uni Telegramda yuboring" },
  cf_note_tg: { ru: "Кнопка откроет Telegram с готовым текстом заявки.", en: "The button opens Telegram with your request text ready.", uz: "Tugma Tayyor so'rov matni bilan Telegramni ochadi." },
  cf_placeholder_note: {
    ru: "[ личный контакт подключается в src/data/contacts.ts ]",
    en: "[ personal contact connects in src/data/contacts.ts ]",
    uz: "[ shaxsiy kontakt src/data/contacts.ts da ulanadi ]",
  },

  /* ---------- alt / aria ---------- */
  alt_kashmir: { ru: "Макет сайта Kashmir — премиальные шторы", en: "Kashmir — premium curtains website mockup", uz: "Kashmir — premium pardalar sayti maketi" },
  alt_ustatop: { ru: "Интерфейс платформы UstaTop", en: "UstaTop marketplace interface", uz: "UstaTop platformasi interfeysi" },
  alt_educrm: { ru: "Концепт панели EduCRM для учебных центров", en: "EduCRM dashboard concept for learning centers", uz: "O'quv markazlari uchun EduCRM paneli konsepsiyasi" },
  alt_drivera: { ru: "Концепт Drivera — аренда автомобилей", en: "Drivera — car rental concept", uz: "Drivera — avtomobil ijarasi konsepsiyasi" },
  alt_mobile: { ru: "Экраны Android-приложения UstaTop", en: "UstaTop Android app screens", uz: "UstaTop Android ilovasi ekranlari" },
  alt_ink: { ru: "Абстрактное изображение для лаборатории", en: "Abstract artwork for the lab", uz: "Laboratoriya uchun abstrakt tasvir" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "ru",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ru";
    const saved = localStorage.getItem("asdb-lang");
    return saved === "en" || saved === "uz" ? saved : "ru";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("asdb-lang", l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (k: string) => {
      const row = dict[k];
      if (!row) return k;
      return row[lang];
    },
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
