/* ============================================================
   QABANA — Demo Data
   All data is clearly editable demo content. Replace with real
   backend / database when available.
   ============================================================ */

var Q = window.Qabana = window.Qabana || {};

Q.data = {
  siteSettings: {
    announcement: 'قاب‌سازی آنلاین قابانا | ارسال رایگان سفارش‌های بالای ۵۰۰٬۰۰۰ تومان',
    announcementEnabled: true,
    phone: '۰۲۱-۸۸۶۹۱۹۹۵',
    email: 'info@qabana.example',
    address: 'نشانی رسمی پس از تأیید در اینجا درج می‌شود',
    hours: 'شنبه تا پنجشنبه، ۹ تا ۱۸',
    currency: 'تومان',
  },

  heroSlides: [
    {
      eyebrow: 'قاب‌هایی متناسب با سلیقه شما',
      title: 'متنوع‌ترین قاب‌ها برای زیباتر کردن دیوارهای شما',
      desc: 'قاب دلخواهتان را انتخاب کنید و به عکس‌ها و خاطراتتان جلوه‌ای ماندگار ببخشید.',
      primaryCta: 'شروع قاب‌سازی آنلاین',
      primaryHref: '#/builder',
      secondaryCta: 'مشاهده محصولات',
      secondaryHref: '#/products',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
      alt: 'دکوراسیون مدرن با قاب‌های هنری',
    },
    {
      eyebrow: 'چاپ و قاب عکس',
      title: 'خاطره‌هایتان را در قابی ماندگار زنده کنید',
      desc: 'عکس خود را بارگذاری کنید، قاب را انتخاب کنید و ما آن را برایتان چاپ و قاب‌سازی می‌کنیم.',
      primaryCta: 'شروع چاپ و قاب',
      primaryHref: '#/builder',
      secondaryCta: 'بیشتر بدانید',
      secondaryHref: '#/about',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1400&q=85',
      alt: 'چاپ و قاب اثر هنری',
    },
    {
      eyebrow: 'دیوار گالری',
      title: 'دیوار خانه‌تان را به یک گالری هنری تبدیل کنید',
      desc: 'با ترکیب قاب‌های متنوع و هماهنگ، فضایی شخصی و چشم‌نواز خلق کنید.',
      primaryCta: 'کشف ایده‌ها',
      primaryHref: '#/blog',
      secondaryCta: 'مشاهده قاب دکوراتیو',
      secondaryHref: '#/category/decorative',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=85',
      alt: 'دیوار گالری با چندین قاب',
    },
  ],

  categories: [
    { id: 'ready-made', slug: 'ready-made', name: 'قاب عکس آماده', desc: 'قاب‌های آماده برای عکس‌ها و خاطرات شما', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=80', icon: '🖼️' },
    { id: 'print-frame', slug: 'print-frame', name: 'چاپ و قاب عکس', desc: 'تصویر دلخواهتان را چاپ و قاب کنید', img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80', icon: '🖨️' },
    { id: 'decorative', slug: 'decorative', name: 'قاب دکوراتیو', desc: 'هماهنگ با سبک دکوراسیون شما', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80', icon: '🎨' },
    { id: 'online-builder', slug: 'online-builder', name: 'قاب‌سازی آنلاین', desc: 'قاب دلخواهتان را در چند مرحله بسازید', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80', icon: '⚙️' },
  ],

  products: [
    { id: 'p1', name: 'قاب چوبی کلاسیک', category: 'ready-made', price: 180000, salePrice: null, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=80', desc: 'قاب چوبی کلاسیک با طراحی گرم و طبیعی، مناسب عکس‌های خانوادگی و آثار هنری.', specs: { 'جنس': 'چوب راش', 'رنگ': 'طبیعی', 'ابعاد': '۳۰×۴۰ سانتی‌متر', 'ضخامت قاب': '۲ سانتی‌متر' }, available: true, badge: null },
    { id: 'p2', name: 'قاب مینیمال سفید', category: 'ready-made', price: 145000, salePrice: 120000, img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80', desc: 'قاب مینیمال سفید با خطوط ساده، ایده‌آل برای فضاهای مدرن و مینیمال.', specs: { 'جنس': 'ام‌دی‌اف', 'رنگ': 'سفید', 'ابعاد': '۲۰×۳۰ سانتی‌متر', 'ضخامت قاب': '۱.۵ سانتی‌متر' }, available: true, badge: 'تخفیف' },
    { id: 'p3', name: 'قاب اثر هنری طلایی', category: 'decorative', price: 320000, salePrice: null, img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80', desc: 'قاب دکوراتیو با روکش طلایی، مناسب آثار هنری و نقاشی‌های کلاسیک.', specs: { 'جنس': 'چوب با روکش', 'رنگ': 'طلایی', 'ابعاد': '۴۰×۵۰ سانتی‌متر', 'ضخامت قاب': '۴ سانتی‌متر' }, available: true, badge: null },
    { id: 'p4', name: 'قاب مشکی مدرن', category: 'ready-made', price: 165000, salePrice: null, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', desc: 'قاب مشکی با طراحی مدرن، برای عکس‌های پرتره و آثار سیاه‌وسفید.', specs: { 'جنس': 'ام‌دی‌اف', 'رنگ': 'مشکی', 'ابعاد': '۳۰×۴۰ سانتی‌متر', 'ضخامت قاب': '۲ سانتی‌متر' }, available: true, badge: null },
    { id: 'p5', name: 'چاپ و قاب عکس سفارشی', category: 'print-frame', price: 250000, salePrice: 210000, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80', desc: 'عکس خود را بارگذاری کنید، ما آن را با بالاترین کیفیت چاپ و قاب می‌کنیم.', specs: { 'نوع چاپ': 'فوتوگرافیک', 'کیفیت': '۳۰۰ dpi', 'کاغذ': 'براق', 'قاب': 'بر اساس انتخاب شما' }, available: true, badge: 'تخفیف' },
    { id: 'p6', name: 'قاب دکوراتیو چوب تیره', category: 'decorative', price: 280000, salePrice: null, img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80', desc: 'قاب با چوب تیره و طرح دکوراتیو، مناسب فضاهای کلاسیک و گرم.', specs: { 'جنس': 'چوب گردو', 'رنگ': 'قهوه‌ای تیره', 'ابعاد': '۳۰×۴۰ سانتی‌متر', 'ضخامت قاب': '۳ سانتی‌متر' }, available: true, badge: null },
    { id: 'p7', name: 'ست قاب دیوار گالری', category: 'decorative', price: 590000, salePrice: null, img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=80', desc: 'ست ۵ تایی قاب با ابعاد متنوع برای ساخت دیوار گالری.', specs: { 'تعداد': '۵ عدد', 'جنس': 'چوب و ام‌دی‌اف', 'ابعاد': 'متنوع', 'رنگ': 'ترکیبی' }, available: true, badge: 'جدید' },
    { id: 'p8', name: 'قاب آینه دکوراتیو', category: 'decorative', price: 390000, salePrice: null, img: 'https://images.unsplash.com/photo-1578500494199-6b15cc1d0c1a?auto=format&fit=crop&w=700&q=80', desc: 'آینه دکوراتیو با قاب چوبی، زیبایی و نور را به فضای شما اضافه می‌کند.', specs: { 'جنس قاب': 'چوب', 'نوع آینه': 'شفاف', 'ابعاد': '۴۰×۶۰ سانتی‌متر', 'ضخامت قاب': '۵ سانتی‌متر' }, available: true, badge: null },
    { id: 'p9', name: 'قاب چوب روشن مینیمال', category: 'ready-made', price: 155000, salePrice: null, img: 'https://images.unsplash.com/photo-1600210492493-8c9b3f3a3a3a?auto=format&fit=crop&w=700&q=80', desc: 'قاب چوب روشن با طراحی ساده و مینیمال، مناسب عکس‌های خانگی.', specs: { 'جنس': 'چوب راش', 'رنگ': 'روشن', 'ابعاد': '۲۰×۳۰ سانتی‌متر', 'ضخامت قاب': '۱.۵ سانتی‌متر' }, available: true, badge: null },
    { id: 'p10', name: 'چاپ روی بوم نقاشی', category: 'print-frame', price: 350000, salePrice: null, img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80', desc: 'چاپ اثر هنری شما روی بوم نقاشی با کیفیت بالا و رنگ‌پذیری عالی.', specs: { 'نوع چاپ': 'کانون', 'کیفیت': '۳۰۰ dpi', 'بوم': 'کتن', 'ابعاد': 'بر اساس سفارش' }, available: true, badge: 'جدید' },
    { id: 'p11', name: 'قاب دو لایه با پاس‌پارتو', category: 'ready-made', price: 220000, salePrice: 185000, img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80', desc: 'قاب دو لایه با پاس‌پارتو سفید، جلوه‌ای حرفه‌ای به عکس می‌بخشد.', specs: { 'جنس': 'چوب', 'پاس‌پارتو': 'سفید', 'ابعاد': '۳۰×۴۰ سانتی‌متر', 'ضخامت قاب': '۲.۵ سانتی‌متر' }, available: true, badge: 'تخفیف' },
    { id: 'p12', name: 'قاب آکریلیک شفاف', category: 'ready-made', price: 195000, salePrice: null, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', desc: 'قاب آکریلیک شفاف با ظاهر مدرن و سبک، مناسب فضاهای معاصر.', specs: { 'جنس': 'آکریلیک', 'رنگ': 'شفاف', 'ابعاد': '۲۰×۳۰ سانتی‌متر', 'ضخامت قاب': '۱ سانتی‌متر' }, available: false, badge: null },
  ],

  frameStyles: [
    { id: 'natural-wood', name: 'چوب طبیعی', color: '#C4A276', border: '#B8956A', swatch: '🪵', basePrice: 50000, perCm: 1200 },
    { id: 'dark-wood', name: 'چوب تیره', color: '#5C3D2E', border: '#4A3125', swatch: '🌲', basePrice: 60000, perCm: 1400 },
    { id: 'black', name: 'مشکی', color: '#2A2A2A', border: '#1A1A1A', swatch: '⬛', basePrice: 45000, perCm: 1000 },
    { id: 'white', name: 'سفید', color: '#F5F5F5', border: '#E0E0E0', swatch: '⬜', basePrice: 45000, perCm: 1000 },
    { id: 'gold', name: 'طلایی', color: '#D4A843', border: '#B89030', swatch: '🟨', basePrice: 80000, perCm: 2000 },
    { id: 'minimal', name: 'مینیمال', color: '#E8E8E8', border: '#CCCCCC', swatch: '▫️', basePrice: 40000, perCm: 800 },
  ],

  sizePresets: [
    { label: '۱۰×۱۵', w: 10, h: 15 },
    { label: '۱۳×۱۸', w: 13, h: 18 },
    { label: '۲۰×۳۰', w: 20, h: 30 },
    { label: '۳۰×۴۰', w: 30, h: 40 },
    { label: '۴۰×۵۰', w: 40, h: 50 },
    { label: '۵۰×۷۰', w: 50, h: 70 },
  ],

  blogPosts: [
    { id: 'b1', slug: 'how-to-choose-frame', title: 'چطور قاب مناسب دکوراسیون خانه را انتخاب کنیم؟', excerpt: 'هماهنگی رنگ، اندازه و سبک قاب می‌تواند ظاهر دیوار را کاملاً تغییر دهد. در این مقاله نکات کلیدی انتخاب قاب را بررسی می‌کنیم.', category: 'دکوراسیون', date: '۱۴۰۳/۰۷/۱۵', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80', readTime: '۵ دقیقه' },
    { id: 'b2', slug: 'gallery-wall-guide', title: 'راهنمای ساخت یک دیوار گالری چشم‌نواز', excerpt: 'ترکیب قاب‌ها را با اندازه‌گیری و برنامه‌ریزی شروع کنید. اصول چیدمان و ترکیب ابعاد را در این مقاله یاد بگیرید.', category: 'چیدمان دیوار', date: '۱۴۰۳/۰۷/۱۰', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80', readTime: '۷ دقیقه' },
    { id: 'b3', slug: 'wood-vs-minimal-frame', title: 'قاب چوبی بهتر است یا قاب مینیمال؟', excerpt: 'انتخاب قاب به اثر، سلیقه و محیط نصب بستگی دارد. مزایا و معایب هر سبک را مقایسه می‌کنیم.', category: 'راهنمای خرید', date: '۱۴۰۳/۰۶/۲۸', img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=700&q=80', readTime: '۴ دقیقه' },
    { id: 'b4', slug: 'photo-display-tips', title: 'نکته‌هایی برای نمایش بهتر عکس‌ها و آثار هنری', excerpt: 'نور، محل نصب و تناسب ابعاد را در نظر بگیرید تا آثار شما بهترین جلوه را داشته باشند.', category: 'نگهداری آثار', date: '۱۴۰۳/۰۶/۲۰', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=700&q=80', readTime: '۶ دقیقه' },
    { id: 'b5', slug: 'frame-color-matching', title: 'هماهنگی رنگ قاب با طراحی داخلی', excerpt: 'رنگ قاب باید با پالت رنگی فضای شما هماهنگ باشد. راهنمای انتخاب رنگ قاب را بخوانید.', category: 'دکوراسیون', date: '۱۴۰۳/۰۶/۱۵', img: 'https://images.unsplash.com/photo-1578500494199-6b15cc1d0c1a?auto=format&fit=crop&w=700&q=80', readTime: '۵ دقیقه' },
    { id: 'b6', slug: 'custom-sizing-guide', title: 'راهنمای انتخاب ابعاد قاب سفارشی', excerpt: 'ابعاد قاب را چطور تعیین کنیم؟ از ابعاد استاندارد تا سفارشی، همه چیز را در این مقاله توضیح می‌دهیم.', category: 'راهنمای خرید', date: '۱۴۰۳/۰۶/۰۸', img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80', readTime: '۸ دقیقه' },
  ],

  faqs: [
    { q: 'قاب‌سازی آنلاین چطور کار می‌کند؟', a: 'در صفحه قاب‌سازی آنلاین می‌توانید نوع قاب، سبک، ابعاد و در صورت نیاز تصویر خود را انتخاب کنید. پس از مرور پیش‌نمایش و محاسبه قیمت، سفارش را به سبد خرید اضافه می‌کنید.' },
    { q: 'حداقل و حداکثر ابعاد قابل سفارش چقدر است؟', a: 'حداقل ابعاد ۱۰×۱۰ سانتی‌متر و حداکثر ۱۰۰×۱۰۰ سانتی‌متر است. برای ابعاد بزرگ‌تر می‌توانید درخواست مشاوره ثبت کنید.' },
    { q: 'چه فرمت‌هایی را می‌توانم بارگذاری کنم؟', a: 'فرمت‌های JPG، PNG و WEBP با حداکثر حجم ۱۰ مگابایت پشتیبانی می‌شوند. تصاویر با کیفیت بالاتر نتیجه چاپ بهتری دارند.' },
    { q: 'زمان تحویل سفارش چقدر است؟', a: 'زمان دقیق تحویل پس از تأیید سفارش اعلام می‌شود. به‌طور معمول سفارش‌های آماده ۳ تا ۵ روز کاری و سفارش‌های سفارشی ۷ تا ۱۰ روز کاری زمان نیاز دارند.' },
    { q: 'آیا امکان بازگشت کالا وجود دارد؟', a: 'قاب‌های آماده در صورت سالم بودن و در شرایط اولیه قابل بازگشت هستند. سفارش‌های سفارشی و چاپ شخصی قابل بازگشت نیستند.' },
    { q: 'هزینه ارسال چگونه محاسبه می‌شود؟', a: 'هزینه ارسال بر اساس وزن، ابعاد و مقصد محاسبه می‌شود و در مرحله پرداخت نمایش داده می‌شود. سفارش‌های بالای ۵۰۰٬۰۰۰ تومان ارسال رایگان دارند.' },
    { q: 'آیا می‌توانم قاب با ابعاد دلخواه سفارش دهم؟', a: 'بله، در قاب‌سازی آنلاین می‌توانید ابعاد دلخواه را وارد کنید. برای ابعاد خارج از محدوده استاندارد، درخواست مشاوره ثبت کنید.' },
  ],

  features: [
    { icon: '🎯', title: 'انتخاب شخصی قاب', desc: 'سبک، رنگ و ابعاد قاب را متناسب با سلیقه و فضای خود انتخاب کنید.' },
    { icon: '🖼️', title: 'سبک‌های متنوع', desc: 'از چوب طبیعی تا مینیمال و دکوراتیو، سبک‌های گوناگون در دسترس شماست.' },
    { icon: '🖱️', title: 'سفارش آنلاین آسان', desc: 'در چند مرحله ساده، قاب دلخواه خود را پیکربندی و سفارش دهید.' },
    { icon: '📐', title: 'راهنمای ابعاد', desc: 'ابعاد استاندارد و سفارشی با اعتبارسنجی دقیق در دسترس شماست.' },
    { icon: '📤', title: 'بارگذاری تصویر', desc: 'عکس خود را به‌سادگی بارگذاری و پیش‌نمایش زنده را بررسی کنید.' },
    { icon: '💬', title: 'پشتیبانی مشتریان', desc: 'تیم پشتیبانی قابانا برای پاسخ به سؤالات شما در دسترس است.' },
  ],

  steps: [
    { num: '۰۱', title: 'انتخاب نوع قاب', desc: 'سبک و رنگی متناسب با عکس و فضای خود انتخاب کنید.' },
    { num: '۰۲', title: 'تعیین ابعاد', desc: 'عرض و ارتفاع موردنظر را بر اساس ابعاد قابل سفارش وارد کنید.' },
    { num: '۰۳', title: 'بارگذاری تصویر', desc: 'در صورت نیاز، تصویر خود را بارگذاری و پیش‌نمایش را بررسی کنید.' },
    { num: '۰۴', title: 'بررسی و سفارش', desc: 'مشخصات و قیمت را بررسی کرده و سفارش را نهایی کنید.' },
  ],

  reviews: [],

  shippingInfo: [
    { q: 'زمان ارسال', a: 'سفارش‌های آماده معمولاً ۳ تا ۵ روز کاری و سفارش‌های سفارشی ۷ تا ۱۰ روز کارساعمل می‌شوند. زمان دقیق پس از تأیید سفارش پیامک می‌شود.' },
    { q: 'هزینه ارسال', a: 'هزینه ارسال بر اساس وزن، ابعاد و مقصد محاسبه می‌شود و در مرحله پرداخت نمایش داده می‌شود. سفارش‌های بالای ۵۰۰٬۰۰۰ تومان از ارسال رایگان بهره‌مند می‌شوند.' },
    { q: 'مناطق تحت پوشش', a: 'ارسال به سراسر ایران از طریق شرکت‌های پستی معتبر انجام می‌شود. اطلاعات دقیق مناطق تحت پوشش پس از تأیید نهایی در دسترس قرار می‌گیرد.' },
    { q: 'بسته‌بندی', a: 'تمام سفارش‌ها با بسته‌بندی ایمن و مناسب فرم‌های شکننده ارسال می‌شوند تا در مسیر آسیب نبینند.' },
  ],

  returnsInfo: [
    'قاب‌های آماده در صورت سالم بودن و در شرایط اولیه تا ۷ روز پس از تحویل قابل بازگشت هستند.',
    'سفارش‌های سفارشی، چاپ شخصی و قاب‌سازی با ابعاد دلخواه قابل بازگشت نیستند.',
    'در صورت دریافت کالای آسیب‌دیده، بلافاصله با تماس یا ایمیل پشتیبانی در ارتباط باشید.',
    'هزینه ارسال بازگشت در موارد نقص کالا بر عهده قابانا است.',
  ],
};
