// All page copy, Arabic first. Prices, contact details and plan limits are PLACEHOLDERS (see README).

export type Lang = 'ar' | 'en';

export type MenuItem = { name: string; price: string };
export type Playlist = {
  id: string;
  label: string;        // as shown in the phone app
  meta: string;         // items · schedule
  list: { title: string; items: MenuItem[] };
  // the big screen: one combo offer, the way real menu boards sell it (photo, what's in it, price, old price)
  offer: { key: 'shakshuka' | 'burger' | 'cake'; tag: string; title: string; items: string[]; price: string; was: string; note: string };
  side: { title: string; items?: MenuItem[]; offer?: string; offerNote?: string };
};

const SAR_AR = 'ر.س';

export const content = {
  ar: {
    lang: 'ar' as Lang,
    dir: 'rtl',
    title: 'لوحة — شاشات القوائم للمقاهي والمطاعم',
    description: 'لوحة تحوّل أي تلفاز في مقهاك أو مطعمك إلى لوحة قوائم رقمية تديرها من جوالك، وتواصل العرض حتى لو انقطع الإنترنت.',
    currency: SAR_AR,
    nav: {
      brand: 'لوحة',
      links: [
        { href: '#how', label: 'كيف تعمل' },
        { href: '#features', label: 'المزايا' },
        { href: '#pricing', label: 'الأسعار' },
        { href: '#faq', label: 'الأسئلة' },
      ],
      switchLabel: 'English',
      switchHref: '/en/', // site-relative: wrap in url() when linking
      switchLang: 'en',
      cta: 'ابدأ الآن',
      menu: 'القائمة',
      close: 'إغلاق',
    },
    hero: {
      // «تحكّم في جميع شاشات / [مطعمك] من جوالك»: the rotating word opens line 2
      before: 'تحكّم في جميع شاشات',
      words: ['مطعمك', 'مقهاك', 'أي نشاط عندك'],
      wordAfter: '',
      wordLine: 2,
      after: 'من جوالك',
      lead: 'حدّث قوائمك، غيّر أسعارك، وانشر عروضك على كل الشاشات خلال ثوانٍ.',
      cta: 'ابدأ مع لوحة',
      secondary: 'شاهد الأسعار',
      boardLabel: 'لوحة قوائم من ثلاث شاشات فوق الكاونتر',
      tryHint: 'جرّبها: اختر قائمة وانشرها.',
      wallLabel: 'شاشات الكاونتر في المقهى',
      nowShowing: 'يُعرض الآن:',
    },
    phone: {
      cafe: 'بُن الحي',
      branch: 'الفرع الرئيسي، حي الملقا',
      screens: '3 شاشات متصلة',
      screensOffline: 'الشاشات تعرض المحفوظ',
      choose: 'ماذا تعرض الآن؟',
      publish: 'انشر على 3 شاشات',
      sending: 'جارٍ الإرسال…',
      live: 'يُعرض الآن على 3 شاشات',
      queued: 'سيصل عند عودة الإنترنت',
      internet: 'الإنترنت في المقهى',
      internetOn: 'متصل',
      internetOff: 'مقطوع',
    },
    boardOffline: 'دون إنترنت · يعرض المحفوظ',
    playlists: [
      {
        id: 'breakfast',
        label: 'قائمة الفطور',
        meta: '8 عناصر · 6 ص – 11 ص',
        list: { title: 'الفطور', items: [
          { name: 'شكشوكة بالجبن', price: '24' },
          { name: 'فول وتميس', price: '18' },
          { name: 'كرواسون زبدة', price: '12' },
          { name: 'عصير برتقال', price: '14' },
        ] },
        offer: { key: 'shakshuka', tag: 'كومبو الفطور', title: 'شكشوكة الصباح', items: ['شكشوكة بالجبن', 'خبز', 'شاي أو قهوة'], price: '29', was: '36', note: 'كل يوم حتى 11 الصبح' },
        side: { title: 'مشروبات ساخنة', items: [
          { name: 'قهوة سعودية', price: '10' },
          { name: 'كابتشينو', price: '15' },
          { name: 'لاتيه', price: '16' },
          { name: 'شاي كرك', price: '8' },
        ] },
      },
      {
        id: 'lunch',
        label: 'وجبات الغداء',
        meta: '7 عناصر · 12 م – 4 م',
        list: { title: 'الغداء', items: [
          { name: 'برجر لحم', price: '28' },
          { name: 'شاورما دجاج عربي', price: '22' },
          { name: 'كلوب ساندويتش', price: '24' },
          { name: 'سلطة سيزر', price: '19' },
        ] },
        offer: { key: 'burger', tag: 'وجبة اليوم', title: 'وجبة البرجر', items: ['برجر لحم', 'بطاطس', 'مشروب بارد'], price: '35', was: '44', note: 'من 12 الظهر إلى 4 العصر' },
        side: { title: 'الإضافات', items: [
          { name: 'بطاطس كبيرة', price: '9' },
          { name: 'صوص ثوم', price: '3' },
          { name: 'عصير برتقال', price: '12' },
          { name: 'مشروب غازي', price: '5' },
        ] },
      },
      {
        id: 'coffee',
        label: 'قهوة وحلا',
        meta: '6 عناصر · 2 م – 6 م',
        list: { title: 'القهوة', items: [
          { name: 'لاتيه', price: '16' },
          { name: 'V60 إثيوبي', price: '19' },
          { name: 'فلات وايت', price: '17' },
          { name: 'قهوة سعودية', price: '10' },
        ] },
        offer: { key: 'cake', tag: 'عرض العصرية', title: 'لاتيه وكيكة', items: ['لاتيه حار أو بارد', 'قطعة كيك اليوم'], price: '24', was: '30', note: 'من 2 إلى 6 العصر' },
        side: { title: 'الحلا', items: [
          { name: 'تشيز كيك', price: '22' },
          { name: 'كيكة التمر', price: '14' },
          { name: 'كوكيز', price: '9' },
          { name: 'تمر سكري', price: '6' },
        ] },
      },
    ] as Playlist[],
    steps: {
      heading: 'كيف تعمل لوحة',
      items: [
        { line: 'صِل الجهاز بالتلفاز' },
        { line: 'امسح الرمز بجوالك' },
        { line: 'ارفع قوائمك وصورك' },
        { line: 'انشر خلال ثوانٍ' },
      ],
      pairing: {
        app: 'مشغّل لوحة',
        instruction: 'افتح تطبيق لوحة، ثم «إضافة شاشة»، وامسح هذا الرمز.',
        code: 'K7Q4MP',
        refresh: 'يتجدد الرمز كل 10 دقائق',
      },
    },
    announce: {
      heading: 'إعلان عاجل',
      inputLabel: 'اكتب إعلانًا ليظهر على الشاشات',
      initial: 'مغلق للصلاة، نعود بعد 20 دقيقة',
      examples: ['نفد الكرواسون اليوم، نعتذر', 'كوبان آيس لاتيه بـ 30 ر.س', 'مرحبًا بضيوف موسم الرياض'],
      exampleLabel: 'أمثلة:',
      statement: 'يظهر فوق القائمة، ويختفي لحاله.',
      durations: ['15 دقيقة', '30 دقيقة', 'ساعة'],
      durationLabel: 'المدة',
      ends: 'تعود القائمة بعد',
      tag: 'إعلان',
    },
    features: {
      heading: 'مزايا لوحة',
      items: [
        { title: 'تبديل تلقائي حسب وقت أنت تحدده', more: 'الفطور من 6 إلى 11 صباحًا، والغداء حتى 4 عصرًا، ثم قائمة المساء. يعمل الجدول على الشاشة نفسها، حتى دون إنترنت.', field: 'mint', on: true },
        { title: 'عروض مكمّلة حتى إذا انقطع النت', more: 'تحفظ الشاشة المحتوى عليها، وتعود إلى العرض وحدها بعد انقطاع الكهرباء.', field: 'saffron', on: true },
        { title: 'نبّهني إذا توقفت شاشة', more: 'يصلك تنبيه بعد 10 دقائق من انقطاع الشاشة، وآخر عند عودتها.', field: 'sea', on: false },
        { title: 'انشر على كل الفروع بلمسة', more: 'يُعرض الآن على 12 شاشة في 4 فروع، من الرياض إلى الخبر.', field: 'sand', on: false },
        { title: 'أعطِ كل مدير فرعه فقط', more: 'يدير المدير شاشات فرعه ومحتواه، وتبقى الفوترة والفريق بيدك.', field: 'teal', on: false },
      ],
    },
    pricing: {
      heading: 'باقات سنوية',
      cta: 'ابدأ بباقة',
      trialCta: 'ابدأ تجربتك المجانية',
      popular: 'الأكثر طلبًا',
      free: 'مجانًا',
      perYear: 'سنويًا',
      trialFor: '14 يوم',
      plans: [
        { id: 'trial', name: 'التجربة المجانية', price: 0, level: 1, range: 'شاشة واحدة', items: ['شاشة واحدة لمدة 14 يوم', 'كل مزايا الأساسية'] },
        { id: 'basic', name: 'الأساسية', price: 678, level: 1, range: 'شاشة واحدة', items: ['فرع واحد', 'ارفع صورك وفيديوهاتك من الجوال', 'قوائم عرض بلا حدود', 'تتغير الشاشة خلال ثوانٍ', 'تعرض حتى لو انقطع الإنترنت', 'تنبيه إذا توقفت الشاشة'] },
        { id: 'growth', name: 'النمو', price: 1870, level: 2, range: 'حتى 3 شاشات باشتراك واحد', items: ['كل ما في الأساسية', 'تطبيق خاص للمالك', 'إمكانية إضافة فرع', 'مساحة تخزين 128 جيجا', 'دعم فني', 'جدولة المحتوى'] },
        { id: 'vip', name: 'VIP', price: 4720, level: 3, range: 'شاشات بلا حدود', items: ['كل مزايا التطبيق', 'شاشات بلا حدود', 'مساحة تخزين بلا حدود', 'صلاحيات وتعدد المستخدمين', 'قوالب جاهزة للعروض', 'متجر تطبيقات'] },
      ],
      assure: ['شاملة الضريبة', 'تشتغل مع أي تلفاز'],
      hardware: 'جهاز التشغيل 199 ر.س، تدفعها مرة وحدة.',
    },
    faq: {
      heading: 'أسئلة شائعة',
      items: [
        { q: 'هل أحتاج تلفازًا ذكيًا؟', a: 'لا. أي تلفاز فيه <span class="ltr">HDMI</span> يكفي مع جهاز التشغيل.' },
        { q: 'ماذا يحدث إذا انقطع الإنترنت؟', a: 'الشاشة تكمّل تعرض المحفوظ، وتوصلها تعديلاتك لما يرجع النت.' },
        { q: 'كم يستغرق تركيب الشاشة؟', a: 'أقل من دقيقة: تمسح الرمز وخلاص.' },
        { q: 'هل يمكنني عرض مقاطع فيديو؟', a: 'نعم، ارفعها من جوالك ونجهّزها للتلفاز.' },
        { q: 'لدي أكثر من فرع، هل تناسبني؟', a: 'نعم، ولكل فرع مديره وشاشاته.' },
        { q: 'هل تدعم لوحة الشاشات الطولية والعرضية؟', a: 'نعم، تختار اتجاه كل شاشة من التطبيق.' },
        { q: 'هل أقدر أجدول المحتوى لكل فرع؟', a: 'نعم، لكل فرع جدوله الخاص.' },
        { q: 'هل أقدر أحدّث المحتوى فورًا؟', a: 'نعم، خلال ثوانٍ.' },
        { q: 'على أي جوال يشتغل تطبيق لوحة؟', a: 'أندرويد الحين، والآيفون قريب.' },
        { q: 'وش يصير بعد التجربة المجانية؟', a: 'تختار باقتك السنوية، وإذا ما كمّلت ما عليك شي.' },
      ],
    },
    // the «start» calls between sections (StartPair.astro after «how it works», StartPerks.astro after the features):
    // each one different, each built from the section it closes
    startPair: { title: 'شاشتك الأولى على بُعد دقيقة.', button: 'جهّز شاشتي الأولى', clock: 'وقت الربط' },
    startPerks: { title: 'جرّب كل هذا 14 يوم ببلاش.', button: 'ابدأ تجربتك المجانية', chips: ['🍳 قوائم تتبدل بوقتها', '📶 تعرض بدون نت', '🔔 تنبيه لو وقفت شاشة', '🚀 نشر لكل الفروع بلمسة', '👥 مدير لكل فرع', '📢 إعلانات عاجلة', '🎬 صور وفيديو من جوالك'] },
    cta: {
      line1: 'لوحتك جاهزة،',
      line2: 'وجوالك أيضًا.',
      button: 'ابدأ مع لوحة',
    },
    legal: {
      privacy: { title: 'سياسة الخصوصية — لوحة', description: 'ما نجمعه من بيانات في لوحة وكيف نحميها.' },
      terms: { title: 'شروط الاستخدام — لوحة', description: 'شروط استخدام تطبيقات لوحة.' },
    },
    start: {
      title: 'ابدأ مع لوحة — لوحة',
      description: 'عبّ بياناتك ويتواصل معك فريق لوحة خلال يوم عمل عشان نجهّز شاشاتك.',
      heading: 'خلّنا نجهّز شاشاتك',
      lead: '4 أسئلة، وتبدأ تجربتك.',
      nextTitle: 'وش اللي بيصير بعدها؟',
      next: [
        { title: 'تجاوب 4 أسئلة', text: 'اسمك ورقمك ونوع نشاطك وكم شاشة عندك. أقل من دقيقة.' },
        { title: 'تنشئ حسابك', text: 'نوديك على طول للوحة التحكم تسجّل فيها.' },
        { title: 'تبدأ تجربتك', text: '14 يوم مجانًا، وفريقنا معك لو احتجت أي شي.' },
      ],
      assure: 'التجربة مجانية 14 يوم.',
      // one question at a time (Start.astro); «{n}» is the step number
      stepOf: 'سؤال {n} من 4',
      nextBtn: 'التالي',
      backBtn: 'رجوع',
      enterHint: 'أو اضغط Enter',
      questions: { name: 'وش اسمك؟', phone: 'وش رقم جوالك؟', kind: 'وش نوع نشاطك؟', screens: 'كم شاشة عندك؟' },
      redirecting: 'نوديك الحين لصفحة التسجيل…',
      goConsole: 'كمّل للتسجيل',
      formTitle: 'بياناتك',
      required: 'مطلوب',
      optional: 'اختياري',
      fields: {
        name: { label: 'الاسم', error: 'اكتب اسمك' },
        phone: { label: 'رقم الجوال', hint: 'مثال: 05xxxxxxxx', error: 'اكتب رقم جوال سعودي صحيح يبدأ بـ 05' },
        business: { label: 'اسم المقهى أو المطعم', error: 'اكتب اسم نشاطك' },
        kind: { label: 'نوع النشاط', error: 'اختر نوع نشاطك', options: [
          { value: 'cafe', label: 'مقهى' }, { value: 'restaurant', label: 'مطعم' }, { value: 'bakery', label: 'مخبز أو حلويات' }, { value: 'other', label: 'غيره' },
        ] },
        screens: { label: 'عدد الشاشات', error: 'اختر عدد الشاشات', options: [
          { value: '1', label: 'شاشة وحدة' }, { value: '2-3', label: '2 – 3 شاشات' }, { value: '4-9', label: '4 – 9 شاشات' }, { value: '10+', label: '10 شاشات أو أكثر' },
        ] },
        city: { label: 'المدينة' },
        email: { label: 'البريد الإلكتروني', error: 'تأكد من البريد الإلكتروني' },
        notes: { label: 'شي تحب تقوله لنا؟' },
      },
      submit: 'ابدأ تجربتي',
      sending: 'جاري الإرسال…',
      privacy: 'بنستخدم بياناتك بس عشان نتواصل معك.',
      fixErrors: 'فيه حقول تحتاج تعديل.',
      doneTitle: 'تمام، وصلتنا بياناتك!',
      doneText: 'بيتواصل معك أحد فريقنا خلال يوم عمل على الرقم',
      doneBack: 'ارجع للصفحة الرئيسية',
      failText: 'ما قدرنا نرسل طلبك. جرّب مرة ثانية، أو كلّمنا على',
      mailSubject: 'طلب جديد من موقع لوحة',
      // the confirmation e-mail the visitor gets from no-reply@lawha.tech (mailer/), when they leave an e-mail
      reply: {
        subject: 'وصلنا طلبك، شكرًا لك!',
        preheader: 'بيتواصل معك أحد فريقنا في أقرب وقت.',
        heading: 'وصلنا طلبك، شكرًا لك!',
        hello: 'هلا {name}،',
        helloAnon: 'هلا،',
        intro: 'استلمنا طلبك من موقع لوحة، وبيتواصل معك أحد فريقنا في أقرب وقت على رقمك:',
        summary: 'ملخص طلبك',
        footer: 'وصلتك هذي الرسالة لأنك طلبت لوحة من موقعنا. عندك سؤال؟ رد على هذي الرسالة ويوصلنا على طول.',
        ignore: 'ما طلبت شي؟ تجاهل هذي الرسالة.',
      },
    },
    footer: {
      about: 'لوحة: شاشات القوائم للمقاهي والمطاعم.',
      address: 'الرياض، المملكة العربية السعودية',
      hours: 'الأحد إلى الخميس، 9 ص – 6 م',
      phone: '+966 50 000 0000',
      email: 'contact@lawha.tech',
      emailUser: 'contact',
      emailDomain: '@lawha.tech',
      cr: 'سجل تجاري 0000000000',
      top: 'إلى الأعلى',
      links: [
        { href: '/privacy/', label: 'الخصوصية' },
        { href: '/terms/', label: 'الشروط' },
        { href: '#', label: 'واتساب' },
        { href: '#', label: 'إنستغرام' },
      ],
      credits: 'صور الوجبات من مجموعات مفتوحة',
      creditsTitle: 'مصادر الصور والفيديو',
      city: 'الرياض 2026',
    },
  },

  en: {
    lang: 'en' as Lang,
    dir: 'ltr',
    title: 'Lawha — menu screens for cafés and restaurants',
    description: 'Lawha turns any TV in your café or restaurant into a digital menu board you run from your phone. Screens keep playing even when the internet drops.',
    currency: 'SAR',
    nav: {
      brand: 'Lawha',
      links: [
        { href: '#how', label: 'How it works' },
        { href: '#features', label: 'Features' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#faq', label: 'Questions' },
      ],
      switchLabel: 'العربية',
      switchHref: '/',
      switchLang: 'ar',
      cta: 'Get started',
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      before: 'Control every',
      words: ['restaurant', 'café', 'business'],
      wordAfter: 'screen',
      wordLine: 1,
      after: 'from your phone',
      lead: 'Update your menus, change your prices and post your offers to every screen in seconds.',
      cta: 'Start with Lawha',
      secondary: 'See pricing',
      boardLabel: 'A three-screen menu board above the counter',
      tryHint: 'Try it: pick a menu and publish.',
      wallLabel: 'The screens above the café counter',
      nowShowing: 'Now showing:',
    },
    phone: {
      cafe: 'Bun Al-Hay',
      branch: 'Main branch, Al Malqa',
      screens: '3 screens online',
      screensOffline: 'Screens play saved content',
      choose: 'What’s on now?',
      publish: 'Publish to 3 screens',
      sending: 'Sending…',
      live: 'Live on 3 screens',
      queued: 'Sends when the internet is back',
      internet: 'Café internet',
      internetOn: 'On',
      internetOff: 'Off',
    },
    boardOffline: 'Offline · playing saved',
    playlists: [
      {
        id: 'breakfast',
        label: 'Breakfast menu',
        meta: '8 items · 6–11 am',
        list: { title: 'Breakfast', items: [
          { name: 'Shakshuka & cheese', price: '24' },
          { name: 'Foul & tamees', price: '18' },
          { name: 'Butter croissant', price: '12' },
          { name: 'Orange juice', price: '14' },
        ] },
        offer: { key: 'shakshuka', tag: 'Breakfast combo', title: 'Morning shakshuka', items: ['Shakshuka & cheese', 'Bread', 'Tea or coffee'], price: '29', was: '36', note: 'Every day until 11 am' },
        side: { title: 'Hot drinks', items: [
          { name: 'Saudi coffee', price: '10' },
          { name: 'Cappuccino', price: '15' },
          { name: 'Latte', price: '16' },
          { name: 'Karak tea', price: '8' },
        ] },
      },
      {
        id: 'lunch',
        label: 'Lunch meals',
        meta: '7 items · 12–4 pm',
        list: { title: 'Lunch', items: [
          { name: 'Beef burger', price: '28' },
          { name: 'Chicken shawarma', price: '22' },
          { name: 'Club sandwich', price: '24' },
          { name: 'Caesar salad', price: '19' },
        ] },
        offer: { key: 'burger', tag: 'Meal of the day', title: 'Burger meal', items: ['Beef burger', 'Fries', 'Cold drink'], price: '35', was: '44', note: 'From 12 noon to 4 pm' },
        side: { title: 'Extras', items: [
          { name: 'Large fries', price: '9' },
          { name: 'Garlic sauce', price: '3' },
          { name: 'Orange juice', price: '12' },
          { name: 'Soft drink', price: '5' },
        ] },
      },
      {
        id: 'coffee',
        label: 'Coffee & sweets',
        meta: '6 items · 2–6 pm',
        list: { title: 'Coffee', items: [
          { name: 'Latte', price: '16' },
          { name: 'Ethiopian V60', price: '19' },
          { name: 'Flat white', price: '17' },
          { name: 'Saudi coffee', price: '10' },
        ] },
        offer: { key: 'cake', tag: 'Afternoon deal', title: 'Latte & cake', items: ['Hot or iced latte', 'Cake of the day'], price: '24', was: '30', note: 'From 2 to 6 pm' },
        side: { title: 'Sweets', items: [
          { name: 'Cheesecake', price: '22' },
          { name: 'Date cake', price: '14' },
          { name: 'Cookie', price: '9' },
          { name: 'Sukkari dates', price: '6' },
        ] },
      },
    ] as Playlist[],
    steps: {
      heading: 'How Lawha works',
      items: [
        { line: 'Plug the box into the TV' },
        { line: 'Scan the code with your phone' },
        { line: 'Upload your menus and photos' },
        { line: 'Publish in seconds' },
      ],
      pairing: {
        app: 'Lawha Player',
        instruction: 'Open the Lawha app, tap “Add screen”, and scan this code.',
        code: 'K7Q4MP',
        refresh: 'The code refreshes every 10 minutes',
      },
    },
    announce: {
      heading: 'Announcements',
      inputLabel: 'Type an announcement for the screens',
      initial: 'Closed for prayer, back in 20 minutes',
      examples: ['Sorry, croissants are sold out today', 'Two iced lattes for SAR 30', 'Welcome, Riyadh Season guests'],
      exampleLabel: 'Examples:',
      statement: 'It shows over the menu, then goes away by itself.',
      durations: ['15 min', '30 min', '1 hour'],
      durationLabel: 'Duration',
      ends: 'Menu returns in',
      tag: 'Announcement',
    },
    features: {
      heading: 'Lawha features',
      items: [
        { title: 'Auto-switch at the times you set', more: 'Breakfast 6 to 11 am, lunch until 4 pm, then the evening menu. The schedule runs on the screen itself, even offline.', field: 'mint', on: true },
        { title: 'Keep playing when the internet drops', more: 'Screens keep the content on the device and start playing again by themselves after a power cut.', field: 'saffron', on: true },
        { title: 'Tell me if a screen stops', more: 'You get an alert after a screen has been offline for 10 minutes, and another when it’s back.', field: 'sea', on: false },
        { title: 'Publish to every branch in one tap', more: 'Live on 12 screens in 4 branches, from Riyadh to Khobar.', field: 'sand', on: false },
        { title: 'Give each manager their own branch', more: 'Managers run their branch’s screens and content. Billing and the team stay with you.', field: 'teal', on: false },
      ],
    },
    pricing: {
      heading: 'Yearly plans',
      cta: 'Start with',
      trialCta: 'Start your free trial',
      popular: 'Most popular',
      free: 'Free',
      perYear: 'per year',
      trialFor: 'for 14 days',
      plans: [
        { id: 'trial', name: 'Free trial', price: 0, level: 1, range: 'One screen', items: ['One screen for 14 days', 'Everything in Basic'] },
        { id: 'basic', name: 'Basic', price: 678, level: 1, range: 'One screen', items: ['One branch', 'Upload photos and videos from your phone', 'Unlimited playlists', 'Screens change in seconds', 'Keeps playing when the internet drops', 'Alert if a screen stops'] },
        { id: 'growth', name: 'Growth', price: 1870, level: 2, range: 'Up to 3 screens on one plan', items: ['Everything in Basic', 'A dedicated owner app', 'Add a branch', '128 GB storage', 'Technical support', 'Content scheduling'] },
        { id: 'vip', name: 'VIP', price: 4720, level: 3, range: 'Unlimited screens', items: ['Every feature in the app', 'Unlimited screens', 'Unlimited storage', 'Roles and multiple users', 'Ready-made offer templates', 'App store'] },
      ],
      assure: ['VAT included', 'Works with any TV'],
      hardware: 'The player box is SAR 199, paid once.',
    },
    faq: {
      heading: 'Questions',
      items: [
        { q: 'Do I need a smart TV?', a: 'No. Any TV with HDMI works with the player box.' },
        { q: 'What if the internet drops?', a: 'The screen keeps playing what it saved, and your changes arrive when it’s back online.' },
        { q: 'How long does setup take?', a: 'Under a minute: scan the code and you’re done.' },
        { q: 'Can I show videos?', a: 'Yes. Upload from your phone and we prepare them for the TV.' },
        { q: 'I have several branches. Does it fit?', a: 'Yes. Each branch gets its own manager and screens.' },
        { q: 'Does Lawha support portrait and landscape screens?', a: 'Yes. Pick each screen’s orientation in the app.' },
        { q: 'Can I schedule content for each branch?', a: 'Yes. Every branch has its own schedule.' },
        { q: 'Can I update content instantly?', a: 'Yes, in seconds.' },
        { q: 'Which phones does the Lawha app run on?', a: 'Android now, iPhone soon.' },
        { q: 'What happens after the free trial?', a: 'You pick a yearly plan. If you stop, you pay nothing.' },
      ],
    },
    startPair: { title: 'Your first screen is a minute away.', button: 'Set up my first screen', clock: 'Pairing time' },
    startPerks: { title: 'Try all of this free for 14 days.', button: 'Start your free trial', chips: ['🍳 Menus that switch on time', '📶 Plays offline', '🔔 Alerts if a screen stops', '🚀 Publish to every branch', '👥 A manager per branch', '📢 Instant announcements', '🎬 Photos and video from your phone'] },
    cta: {
      line1: 'Your board is set.',
      line2: 'So is your phone.',
      button: 'Start with Lawha',
    },
    legal: {
      privacy: { title: 'Privacy policy — Lawha', description: 'What data Lawha collects and how we protect it.' },
      terms: { title: 'Terms of use — Lawha', description: 'The terms for using the Lawha apps.' },
    },
    start: {
      title: 'Start with Lawha — Lawha',
      description: 'Leave your details and the Lawha team will contact you within one working day to set up your screens.',
      heading: 'Let’s set up your screens',
      lead: 'Four questions, then your trial starts.',
      nextTitle: 'What happens next?',
      next: [
        { title: 'Answer 4 questions', text: 'Your name, number, type of business and how many screens. Under a minute.' },
        { title: 'Create your account', text: 'We take you straight to the Lawha console to sign up.' },
        { title: 'Start your trial', text: '14 days free, and our team is here if you need anything.' },
      ],
      assure: 'The trial is free for 14 days.',
      stepOf: 'Question {n} of 4',
      nextBtn: 'Next',
      backBtn: 'Back',
      enterHint: 'or press Enter',
      questions: { name: 'What’s your name?', phone: 'What’s your mobile number?', kind: 'What kind of business is it?', screens: 'How many screens do you have?' },
      redirecting: 'Taking you to sign up…',
      goConsole: 'Continue to sign up',
      formTitle: 'Your details',
      required: 'Required',
      optional: 'Optional',
      fields: {
        name: { label: 'Name', error: 'Enter your name' },
        phone: { label: 'Mobile number', hint: 'For example 05xxxxxxxx', error: 'Enter a Saudi mobile number starting with 05' },
        business: { label: 'Café or restaurant name', error: 'Enter your business name' },
        kind: { label: 'Type of business', error: 'Choose your type of business', options: [
          { value: 'cafe', label: 'Café' }, { value: 'restaurant', label: 'Restaurant' }, { value: 'bakery', label: 'Bakery or sweets' }, { value: 'other', label: 'Other' },
        ] },
        screens: { label: 'Screens', error: 'Choose how many screens', options: [
          { value: '1', label: 'One screen' }, { value: '2-3', label: '2 – 3 screens' }, { value: '4-9', label: '4 – 9 screens' }, { value: '10+', label: '10 screens or more' },
        ] },
        city: { label: 'City' },
        email: { label: 'Email', error: 'Check the email address' },
        notes: { label: 'Anything you’d like to tell us?' },
      },
      submit: 'Start my trial',
      sending: 'Sending…',
      privacy: 'We only use your details to contact you.',
      fixErrors: 'Some fields need fixing.',
      doneTitle: 'Got it, thank you!',
      doneText: 'Someone from our team will contact you within one working day on',
      doneBack: 'Back to the home page',
      failText: 'We couldn’t send your request. Try again, or call us on',
      mailSubject: 'New request from the Lawha website',
      reply: {
        subject: 'We got your request, thank you!',
        preheader: 'Someone from our team will be in touch as soon as possible.',
        heading: 'We got your request, thank you!',
        hello: 'Hi {name},',
        helloAnon: 'Hi there,',
        intro: 'Your request from the Lawha website reached us. Someone from our team will call you as soon as possible on:',
        summary: 'Your request',
        footer: 'You’re getting this email because you asked about Lawha on our website. Questions? Just reply to this email and it reaches our team.',
        ignore: 'Didn’t ask for this? You can ignore this email.',
      },
    },
    footer: {
      about: 'Lawha: menu screens for cafés and restaurants.',
      address: 'Riyadh, Saudi Arabia',
      hours: 'Sunday to Thursday, 9 am – 6 pm',
      phone: '+966 50 000 0000',
      email: 'contact@lawha.tech',
      emailUser: 'contact',
      emailDomain: '@lawha.tech',
      cr: 'CR 0000000000',
      top: 'Back to top',
      links: [
        { href: '/en/privacy/', label: 'Privacy' },
        { href: '/en/terms/', label: 'Terms' },
        { href: '#', label: 'WhatsApp' },
        { href: '#', label: 'Instagram' },
      ],
      credits: 'Meal photos from open collections',
      creditsTitle: 'Photo and video sources',
      city: 'Riyadh 2026',
    },
  },
};

export type Content = (typeof content)['ar'];

// Where «ابدأ مع لوحة» requests are emailed (through FormSubmit, see Start.astro). PLACEHOLDER until the owner gives the inbox.
export const LEADS_EMAIL = 'contact@lawha.tech';
// The «start» form's sender (mailer/, a Cloudflare Worker): mails the team and a confirmation to the visitor
// from no-reply@lawha.tech. Empty = fall back to FormSubmit (team e-mail only, no confirmation).
export const MAILER_URL = 'https://lawha-mailer.lawha.workers.dev/';

// A site-relative path ("/en/") under the deploy base, e.g. /lawha-website/en/ on GitHub Pages.
export const url = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;

// The console's sign-up page (the Lawha app repo, apps/console): signing up starts the 14-day trial by itself
// (TRIAL_DAYS in backend/functions/src/lib/config.ts). The start form sends the visitor here once their answers are in.
export const CONSOLE_SIGNUP = 'https://console.lawha.tech/sign-up';

// The «ابدأ مع لوحة» form page, optionally with a plan chosen on the pricing cards.
export const startHref = (c: Content, plan?: string) => url(`${c.lang === 'ar' ? '' : '/en'}/start/`) + (plan ? `?plan=${plan}` : '');
