/* ============================================================
   QABANA — Main Application (router, header, footer, pages)
   ============================================================ */

var Q = window.Qabana = window.Qabana || {};
Q.cart.load();

/* ============================================================
   ROUTER
   ============================================================ */
Q.routes = {};
Q.route = function(path, handler) { Q.routes[path] = handler; };

Q.navigate = function(path) {
  if (location.hash !== path) location.hash = path;
  else Q.renderPage(path);
};

Q.renderPage = function(path) {
  if (Q._pageCleanup) { Q._pageCleanup(); Q._pageCleanup = null; }
  const mount = document.getElementById('page-mount');
  mount.innerHTML = '';
  window.scrollTo(0, 0);

  // Match routes
  let matched = false;
  for (const pattern in Q.routes) {
    const re = pattern.replace(/:slug|:id/g, '([^/]+)');
    const match = path.match(new RegExp('^' + re + '$'));
    if (match) {
      Q.routes[pattern](match.slice(1));
      matched = true;
      break;
    }
  }
  if (!matched) Q.pages.notFound();

  Q.updateActiveNav(path);
};

Q.onHashChange = function() {
  const path = location.hash.slice(1) || '/';
  Q.renderPage(path);
};

window.addEventListener('hashchange', Q.onHashChange);

/* ---- Active nav highlight ---- */
Q.updateActiveNav = function(path) {
  document.querySelectorAll('.nav a, .drawer-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '#' + path || (path === '/' && href === '#/')) a.classList.add('active');
    else a.classList.remove('active');
  });
};

/* ============================================================
   HEADER
   ============================================================ */
Q.renderHeader = function() {
  const s = Q.data.siteSettings;
  const mount = document.getElementById('header-mount');
  const announcement = s.announcementEnabled ? '<div class="announcement"><span>' + Q.escape(s.announcement) + '</span></div>' : '';

  mount.innerHTML = announcement + `
  <header class="header">
    <div class="container header-inner">
      <a class="logo" href="#/">
        <span class="logo-mark">ق</span>
        <span>قابانا<small>قاب عکس و قاب‌سازی آنلاین</small></span>
      </a>
      <nav class="nav" aria-label="منوی اصلی">
        <a href="#/">خانه</a>
        <a href="#/products">محصولات</a>
        <div class="nav-dropdown">
          <a href="#/builder">قاب‌سازی آنلاین</a>
          <div class="nav-dropdown-menu">
            <a href="#/builder">شروع قاب‌سازی</a>
            <a href="#/category/ready-made">قاب عکس آماده</a>
            <a href="#/category/print-frame">چاپ و قاب عکس</a>
            <a href="#/category/decorative">قاب دکوراتیو</a>
          </div>
        </div>
        <a href="#/blog">وبلاگ</a>
        <a href="#/about">درباره ما</a>
        <a href="#/contact">تماس با ما</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" aria-label="جستجو" onclick="Q.openSearch()">🔍</button>
        <button class="icon-btn" aria-label="حساب کاربری" onclick="Q.toast('بخش حساب کاربری در این نسخه نمایشی فعال نیست.')">👤</button>
        <a class="icon-btn" href="#/cart" aria-label="سبد خرید" style="position:relative;text-decoration:none">
          🛒<span class="cart-badge hidden" id="cart-badge">۰</span>
        </a>
        <button class="icon-btn menu-toggle" aria-label="منو" onclick="Q.openDrawer()">☰</button>
      </div>
    </div>
  </header>
  <div class="drawer-overlay" id="drawer-overlay" onclick="Q.closeDrawer()"></div>
  <div class="drawer" id="drawer">
    <div class="drawer-header">
      <a class="logo" href="#/" onclick="Q.closeDrawer()"><span class="logo-mark">ق</span><span>قابانا</span></a>
      <button class="drawer-close" onclick="Q.closeDrawer()" aria-label="بستن">✕</button>
    </div>
    <nav class="drawer-nav" aria-label="منوی موبایل">
      <a href="#/" onclick="Q.closeDrawer()">خانه</a>
      <a href="#/products" onclick="Q.closeDrawer()">محصولات</a>
      <a href="#/builder" onclick="Q.closeDrawer()">قاب‌سازی آنلاین</a>
      <a href="#/category/ready-made" onclick="Q.closeDrawer()">قاب عکس آماده</a>
      <a href="#/category/print-frame" onclick="Q.closeDrawer()">چاپ و قاب عکس</a>
      <a href="#/category/decorative" onclick="Q.closeDrawer()">قاب دکوراتیو</a>
      <a href="#/blog" onclick="Q.closeDrawer()">وبلاگ</a>
      <a href="#/about" onclick="Q.closeDrawer()">درباره ما</a>
      <a href="#/contact" onclick="Q.closeDrawer()">تماس با ما</a>
      <a href="#/faq" onclick="Q.closeDrawer()">سؤالات متداول</a>
      <a href="#/shipping" onclick="Q.closeDrawer()">ارسال و تحویل</a>
      <a href="#/returns" onclick="Q.closeDrawer()">بازگشت کالا</a>
    </nav>
    <div class="drawer-actions">
      <a class="btn btn-primary btn-block" href="#/cart" onclick="Q.closeDrawer()">سبد خرید 🛒</a>
    </div>
  </div>
  <div class="search-overlay" id="search-overlay">
    <div class="search-box">
      <input type="text" id="search-input" placeholder="جستجو در محصولات و مطالب..." oninput="Q.doSearch(this.value)" autocomplete="off">
      <button class="search-clear" onclick="Q.closeSearch()">✕</button>
    </div>
    <div class="search-results" id="search-results"></div>
  </div>`;
  Q.cart.updateBadge();
};

Q.openDrawer = function() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
};
Q.closeDrawer = function() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
};

Q.openSearch = function() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.add('open');
  setTimeout(() => document.getElementById('search-input').focus(), 100);
};
Q.closeSearch = function() {
  document.getElementById('search-overlay').classList.remove('open');
  document.getElementById('search-input').value = '';
  document.getElementById('search-results').innerHTML = '';
};

Q.doSearch = function(query) {
  const results = document.getElementById('search-results');
  query = query.trim();
  if (query.length < 2) { results.innerHTML = ''; return; }

  const productMatches = Q.data.products.filter(p => p.name.includes(query) || p.desc.includes(query)).slice(0, 5);
  const blogMatches = Q.data.blogPosts.filter(b => b.title.includes(query) || b.excerpt.includes(query)).slice(0, 3);

  let html = '';
  if (productMatches.length) {
    html += '<h4 style="font-size:.8rem;color:var(--muted);margin:.5rem 0">محصولات</h4>';
    productMatches.forEach(p => {
      html += `<a class="search-result-item" href="#/product/${p.id}" onclick="Q.closeSearch()">
        <img src="${p.img}" alt="${Q.escape(p.name)}">
        <div><h4>${Q.escape(p.name)}</h4><span>${Q.formatPrice(p.salePrice || p.price)}</span></div>
      </a>`;
    });
  }
  if (blogMatches.length) {
    html += '<h4 style="font-size:.8rem;color:var(--muted);margin:.5rem 0">مطالب وبلاگ</h4>';
    blogMatches.forEach(b => {
      html += `<a class="search-result-item" href="#/blog/${b.slug}" onclick="Q.closeSearch()">
        <img src="${b.img}" alt="${Q.escape(b.title)}">
        <div><h4>${Q.escape(b.title)}</h4><span>${b.category}</span></div>
      </a>`;
    });
  }
  if (!html) html = '<p style="color:var(--muted);font-size:.875rem;padding:1rem 0">نتیجه‌ای یافت نشد. عبارت دیگری را امتحان کنید.</p>';
  results.innerHTML = html;
};

/* ============================================================
   FOOTER
   ============================================================ */
Q.renderFooter = function() {
  const s = Q.data.siteSettings;
  const mount = document.getElementById('footer-mount');
  mount.innerHTML = `
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="logo" href="#/"><span class="logo-mark">ق</span><span style="color:#fff">قابانا</span></a>
        <p>قابانا؛ راهی برای انتخاب قاب و نمایش زیباتر عکس‌ها و آثار هنری. اطلاعات تماس واقعی را پیش از انتشار جایگزین کنید.</p>
        <div class="footer-social">
          <a href="#/contact" aria-label="اینستاگرام">📷</a>
          <a href="#/contact" aria-label="تلگرام">✈️</a>
          <a href="#/contact" aria-label="آپارات">🎬</a>
          <a href="#/contact" aria-label="ایمیل">✉️</a>
        </div>
      </div>
      <div class="footer-col">
        <h3>دسترسی سریع</h3>
        <ul>
          <li><a href="#/">صفحه اصلی</a></li>
          <li><a href="#/products">محصولات</a></li>
          <li><a href="#/builder">قاب‌سازی آنلاین</a></li>
          <li><a href="#/blog">وبلاگ</a></li>
          <li><a href="#/about">درباره ما</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>راهنمای مشتریان</h3>
        <ul>
          <li><a href="#/contact">تماس با ما</a></li>
          <li><a href="#/faq">سؤالات متداول</a></li>
          <li><a href="#/shipping">ارسال و تحویل</a></li>
          <li><a href="#/returns">بازگشت کالا</a></li>
          <li><a href="#/privacy">حریم خصوصی</a></li>
          <li><a href="#/terms">قوانین و شرایط</a></li>
        </ul>
      </div>
      <div class="footer-col footer-contact">
        <h3>ارتباط با قابانا</h3>
        <p>📞 تلفن: <span dir="ltr">${Q.escape(s.phone)}</span></p>
        <p>✉️ ایمیل: <a href="mailto:${Q.escape(s.email)}" dir="ltr">${Q.escape(s.email)}</a></p>
        <p>🕐 ساعات کاری: ${Q.escape(s.hours)}</p>
        <p>📍 ${Q.escape(s.address)}</p>
      </div>
    </div>
    <div class="copyright">
      <div class="container">© ${Q.toFa('2020')} — ${Q.toFa('2026')} | کلیه حقوق مادی و معنوی برای قابانا محفوظ است.</div>
    </div>
  </footer>`;
};

/* ============================================================
   SHARED COMPONENTS
   ============================================================ */
Q.component = {};

Q.component.breadcrumbs = function(items) {
  return `<div class="breadcrumbs container">${items.map((item, i) => {
    const last = i === items.length - 1;
    return (last ? `<span class="current">${Q.escape(item.label)}</span>` : `<a href="${item.href}">${Q.escape(item.label)}</a>`) + (last ? '' : ' <span>›</span> ');
  }).join('')}</div>`;
};

Q.component.pageHeader = function(title, desc) {
  return `<section class="page-header"><div class="container"><h1>${Q.escape(title)}</h1>${desc ? '<p>' + Q.escape(desc) + '</p>' : ''}</div></section>`;
};

Q.component.productCard = function(p) {
  const price = p.salePrice || p.price;
  const oldPrice = p.salePrice ? `<span class="price-old">${Q.formatPrice(p.price)}</span>` : '';
  const badge = p.badge ? `<span class="product-badge ${p.badge === 'تخفیف' ? 'sale' : ''}">${Q.escape(p.badge)}</span>` : '';
  const availLabel = p.available ? '' : '<span class="demo-label">ناموجود</span>';
  return `<article class="product-card">
    <a href="#/product/${p.id}" class="product-img-wrap">
      ${badge}
      <img src="${p.img}" alt="${Q.escape(p.name)}" loading="lazy">
      <div class="product-quick"><button class="btn btn-ghost btn-sm" onclick="event.preventDefault();Q.navigate('#/product/${p.id}')">مشاهده محصول</button></div>
    </a>
    <div class="product-body">
      <h3><a href="#/product/${p.id}">${Q.escape(p.name)}</a></h3>
      <p class="product-desc">${Q.escape(p.desc.slice(0, 60))}…</p>
      <div class="product-price-row">
        <div><span class="price">${Q.formatPrice(price)}</span> ${oldPrice}</div>
        ${availLabel}
      </div>
      <div class="product-actions" style="margin-top:.5rem">
        ${p.available ? `<button class="btn btn-primary btn-sm btn-block" onclick="Q.quickAdd('${p.id}')">افزودن به سبد</button>` : '<button class="btn btn-outline btn-sm btn-block" disabled>ناموجود</button>'}
      </div>
    </div>
  </article>`;
};

Q.component.blogCard = function(b) {
  return `<article class="blog-card">
    <a href="#/blog/${b.slug}"><img class="blog-card-img" src="${b.img}" alt="${Q.escape(b.title)}" loading="lazy"></a>
    <div class="blog-card-body">
      <span class="blog-tag">${Q.escape(b.category)}</span>
      <h3><a href="#/blog/${b.slug}">${Q.escape(b.title)}</a></h3>
      <p>${Q.escape(b.excerpt)}</p>
      <div class="blog-meta"><span>${Q.formatDate(b.date)}</span> · <span>${Q.escape(b.readTime)}</span></div>
    </div>
  </article>`;
};

Q.quickAdd = function(productId) {
  const p = Q.getProduct(productId);
  if (!p) return;
  Q.cart.add({
    cartId: Q.genId(),
    id: p.id, name: p.name, price: p.salePrice || p.price, img: p.img, qty: 1, type: 'product',
  });
};

/* ============================================================
   PAGES
   ============================================================ */
Q.pages = {};

/* ---- HOME ---- */
Q.pages.home = function() {
  const slides = Q.data.heroSlides;
  const cats = Q.data.categories;
  const products = Q.data.products.slice(0, 8);
  const posts = Q.data.blogPosts.slice(0, 4);
  const features = Q.data.features;
  const steps = Q.data.steps;

  const mount = document.getElementById('page-mount');
  mount.innerHTML = `
  <section class="cinematic-hero" id="cinematic-hero">
    <div class="cinematic-hero-sticky" id="cinematic-hero-sticky">
      <div class="cinematic-video-wrap">
        <video class="cinematic-video" id="cinematic-video" preload="auto" muted playsinline webkit-playsinline src="assets/hero-video.mp4"></video>
        <div class="cinematic-loading" id="cinematic-loading">در حال بارگذاری تجربه سینمایی…</div>
      </div>
      <div class="cinematic-overlay" id="cinematic-overlay"></div>
      <div class="cinematic-content" id="cinematic-content">
        <span class="eyebrow">${Q.escape(slides[0].eyebrow)}</span>
        <h1>${Q.escape(slides[0].title)}</h1>
        <p>${Q.escape(slides[0].desc)}</p>
        <div class="hero-buttons">
          <a class="btn btn-primary btn-lg" href="${slides[0].primaryHref}">${Q.escape(slides[0].primaryCta)} ←</a>
          <a class="btn btn-outline" href="${slides[0].secondaryHref}">${Q.escape(slides[0].secondaryCta)}</a>
        </div>
      </div>
      <div class="cinematic-scroll-hint" id="cinematic-scroll-hint">برای تجربه سینمایی اسکرول کنید</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">دسته‌بندی‌ها</span>
        <h2>دسته‌بندی‌های قابانا</h2>
        <p>برای عکس‌ها، آثار هنری و دیوارهای خانه‌تان انتخاب کنید.</p>
      </div>
      <div class="grid grid-4">
        ${cats.map(c => `
        <a class="cat-card" href="${c.slug === 'online-builder' ? '#/builder' : '#/category/' + c.slug}">
          <img class="cat-card-img" src="${c.img}" alt="${Q.escape(c.name)}" loading="lazy">
          <div class="cat-card-body">
            <h3>${Q.escape(c.name)}</h3>
            <p>${Q.escape(c.desc)}</p>
            <span class="cat-card-link">مشاهده ←</span>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="container about-grid">
      <div>
        <span class="eyebrow light">درباره قابانا</span>
        <h2>قابانا؛ قاب‌هایی برای ماندگار کردن خاطرات</h2>
        <p>در قابانا می‌توانید برای عکس‌ها، آثار هنری و خاطرات ارزشمندتان قاب مناسبی انتخاب کنید. هدف ما ارائه تجربه‌ای ساده، زیبا و مطمئن برای انتخاب و سفارش قاب متناسب با سلیقه و فضای شماست.</p>
        <p>از قاب‌های ساده و مینیمال تا مدل‌های دکوراتیو، هر آنچه نیاز دارید را در چند مرحله ساده پیکربندی و سفارش دهید.</p>
        <div class="about-buttons">
          <a class="btn btn-light btn-lg" href="#/builder">شروع قاب‌سازی ←</a>
          <a class="btn btn-outline" href="#/about" style="border-color:rgba(255,255,255,.3);color:#fff">بیشتر بدانید</a>
        </div>
      </div>
      <div class="about-images">
        <img src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80" alt="اثر هنری در قاب" loading="lazy">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80" alt="دکوراسیون با آثار هنری" loading="lazy">
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">محصولات</span><h2>محصولات منتخب</h2><p>انتخابی از قاب‌های آماده و خدمات قاب‌سازی قابانا.</p></div>
        <a class="btn btn-outline" href="#/products">همه محصولات ←</a>
      </div>
      <div class="grid grid-4">
        ${products.map(p => Q.component.productCard(p)).join('')}
      </div>
    </div>
  </section>

  <section class="section section-bg-pale">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">چرا قابانا؟</span>
        <h2>چرا قابانا را انتخاب کنید؟</h2>
      </div>
      <div class="features-grid">
        ${features.map(f => `
        <div class="feature-card">
          <div class="feature-icon">${f.icon}</div>
          <h3>${Q.escape(f.title)}</h3>
          <p>${Q.escape(f.desc)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section-bg-bone">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">قاب‌سازی آنلاین</span>
        <h2>قاب دلخواهتان را چطور انتخاب کنید؟</h2>
        <p>در چهار مرحله ساده قاب متناسب با نیاز خود را پیکربندی کنید.</p>
      </div>
      <div class="steps-grid">
        ${steps.map(s => `
        <div class="step-card">
          <div class="step-num">${Q.escape(s.num)}</div>
          <h3>${Q.escape(s.title)}</h3>
          <p>${Q.escape(s.desc)}</p>
        </div>`).join('')}
      </div>
      <div style="text-align:center;margin-top:1.5rem">
        <a class="btn btn-primary btn-lg" href="#/builder">شروع قاب‌سازی آنلاین ←</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">وبلاگ</span><h2>از وبلاگ قابانا</h2><p>ایده‌هایی برای انتخاب قاب و زیباتر کردن فضای خانه.</p></div>
        <a class="btn btn-outline" href="#/blog">همه مطالب ←</a>
      </div>
      <div class="grid grid-4">
        ${posts.map(b => Q.component.blogCard(b)).join('')}
      </div>
    </div>
  </section>

  <section class="section section-bg-pale">
    <div class="container">
      <div class="editorial">
        <h2>قابانا؛ قاب عکس و قاب‌سازی آنلاین</h2>
        <p>انتخاب قاب مناسب بخشی از زیبایی نهایی یک عکس یا اثر هنری است. اندازه، رنگ، جنس و سبک قاب می‌توانند بر جلوه تصویر و هماهنگی آن با دکوراسیون تأثیر بگذارند. در قابانا می‌خواهیم مسیر بررسی دسته‌بندی‌ها و انتخاب قاب برای کاربران ساده و روشن باشد.</p>
        <h3>چطور قاب مناسب را انتخاب کنیم؟</h3>
        <p>پیش از انتخاب قاب، ابعاد تصویر و محل نصب را در نظر بگیرید. قاب‌های ساده معمولاً با فضاهای مینیمال هماهنگ‌اند و قاب‌های تزئینی ممکن است برای برخی آثار یا دکوراسیون‌های کلاسیک مناسب باشند. بهتر است رنگ قاب با رنگ‌های اصلی تصویر و فضای اطراف تعادل داشته باشد. برای راهنمایی بیشتر به <a href="#/blog">وبلاگ قابانا</a> مراجعه کنید.</p>
        <h3>قاب‌سازی آنلاین چه امکاناتی دارد؟</h3>
        <p>یک فرایند آنلاین مناسب می‌تواند انتخاب سبک قاب، واردکردن ابعاد، ارسال تصویر و بررسی مشخصات سفارش را ساده‌تر کند. امکاناتی مانند پیش‌نمایش زنده، محاسبه قیمت و ثبت سفارش بر اساس قوانین قابل پیکربندی پیاده‌سازی شده‌اند. برای شروع به <a href="#/builder">قاب‌سازی آنلاین</a> مراجعه کنید.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="newsletter">
        <span class="eyebrow" style="justify-content:center">خبرنامه</span>
        <h2>از جدیدترین قاب‌ها و تخفیف‌ها باخبر شوید</h2>
        <p>ایمیل خود را وارد کنید تا جدیدترین محصولات و پیشنهاد‌های ویژه برای شما ارسال شود.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault();Q.toast('عضویت شما در خبرنامه ثبت شد (نسخه نمایشی).','success');this.reset()">
          <input type="email" placeholder="ایمیل شما" required dir="ltr" style="text-align:right">
          <button type="submit" class="btn btn-primary">عضویت</button>
        </form>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="container">
      <div class="cta-band">
        <div><h2>برای خاطراتتان قاب مناسبی پیدا کنید</h2><p>از ایده گرفتن شروع کنید و مشخصات قاب دلخواهتان را انتخاب کنید.</p></div>
        <a class="btn btn-light btn-lg" href="#/builder">شروع قاب‌سازی آنلاین ←</a>
      </div>
    </div>
  </section>`;

  Q.initCinematicHero();
};

/* ---- Hero slider logic ---- */
Q._heroIndex = 0;
Q._heroTimer = null;
Q.initHeroSlider = function() {
  Q._heroIndex = 0;
  Q.startHeroAutoplay();
};
Q.heroGoTo = function(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
  Q._heroIndex = (idx + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === Q._heroIndex));
  dots.forEach((d, i) => d.classList.toggle('active', i === Q._heroIndex));
  Q.startHeroAutoplay();
};
Q.heroSlide = function(dir) { Q.heroGoTo(Q._heroIndex + dir); };
Q.startHeroAutoplay = function() {
  clearInterval(Q._heroTimer);
  Q._heroTimer = setInterval(() => Q.heroGoTo(Q._heroIndex + 1), 6000);
};

/* ---- Cinematic scroll-driven hero ---- */
Q.initCinematicHero = function() {
  var heroSection = document.getElementById('cinematic-hero');
  var video = document.getElementById('cinematic-video');
  var content = document.getElementById('cinematic-content');
  var overlay = document.getElementById('cinematic-overlay');
  var scrollHint = document.getElementById('cinematic-scroll-hint');
  var loading = document.getElementById('cinematic-loading');

  if (!video || !heroSection) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Reduced motion: static hero frame --- */
  if (reducedMotion) {
    heroSection.style.height = 'auto';
    var stickyEl = document.getElementById('cinematic-hero-sticky');
    if (stickyEl) stickyEl.style.position = 'relative';
    if (content) { content.style.opacity = '1'; content.style.transform = 'none'; }
    if (scrollHint) scrollHint.style.display = 'none';
    video.addEventListener('loadeddata', function ld() {
      video.removeEventListener('loadeddata', ld);
      try { video.currentTime = 0; } catch(e) {}
      if (loading) loading.style.display = 'none';
    });
    return;
  }

  /* --- Scroll-driven cinematic experience --- */
  var duration = 0;
  var maxTime = 0;
  var ready = false;
  var targetTime = 0;
  var rafId = null;
  var lastSetTime = -1;
  var seeking = false;
  var seekTimer = null;
  var lastActual = -1;

  function getProgress() {
    var rect = heroSection.getBoundingClientRect();
    var scrollable = heroSection.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.max(0, Math.min(1, -rect.top / scrollable));
  }

  /* Centralized seek: prevents canceling in-progress seeks which
     was causing the video to never reach the final frame */
  function doSeek(t) {
    seeking = true;
    try { video.currentTime = t; } catch(e) {}
    lastSetTime = t;
    if (seekTimer) clearTimeout(seekTimer);
    seekTimer = setTimeout(function() { seeking = false; }, 150);
  }

  function tick() {
    var p = ready ? getProgress() : 0;

    if (ready) {
      /* Directly map scroll progress to video time — no interpolation lag */
      targetTime = p * maxTime;
      if (!seeking && Math.abs(targetTime - lastSetTime) > 0.05) {
        doSeek(targetTime);
      }
    }

    /* Content fades and lifts as user scrolls into the cinematic */
    if (content) {
      content.style.opacity = Math.max(0, 1 - p * 2.5);
      content.style.transform = 'translateY(' + (p * -50) + 'px)';
    }
    /* Scroll hint fades quickly */
    if (scrollHint) {
      scrollHint.style.opacity = Math.max(0, 1 - p * 4);
    }
    /* Subtle depth: gentle zoom toward the artworks */
    video.style.transform = 'scale(' + (1 + p * 0.06) + ')';
    /* Overlay eases to reveal the artwork */
    if (overlay) {
      overlay.style.opacity = 1 - p * 0.4;
    }

    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function onReady() {
    duration = video.duration;
    if (!duration || isNaN(duration) || !isFinite(duration)) return;
    maxTime = Math.max(0, duration - 0.05);
    ready = true;
    seeking = false;
    lastActual = -1;
    try { video.currentTime = 0; } catch(e) {}
    lastSetTime = 0;
    targetTime = 0;
    if (loading) loading.style.display = 'none';
    start();
  }

  /* Reset seeking flag when browser completes a seek */
  function onSeeked() {
    seeking = false;
    var actual = video.currentTime;
    if (Math.abs(actual - lastActual) < 0.01) {
      /* Browser can't get closer — accept current position */
      lastSetTime = targetTime;
    } else {
      lastSetTime = actual;
    }
    lastActual = actual;
    if (seekTimer) { clearTimeout(seekTimer); seekTimer = null; }
  }

  if (video.readyState >= 2) {
    onReady();
  } else {
    video.addEventListener('loadeddata', onReady);
  }
  video.addEventListener('seeked', onSeeked);

  Q._pageCleanup = function() {
    if (rafId) cancelAnimationFrame(rafId);
    if (seekTimer) clearTimeout(seekTimer);
    video.removeEventListener('loadeddata', onReady);
    video.removeEventListener('seeked', onSeeked);
    try { video.pause(); } catch(e) {}
  };
};

/* ---- PRODUCTS ---- */
Q.pages.products = function() {
  const mount = document.getElementById('page-mount');
  const products = Q.data.products;
  const cats = Q.data.categories;

  mount.innerHTML = `
  ${Q.component.pageHeader('همه محصولات', 'کاتالوگ کامل قاب‌ها و خدمات قاب‌سازی قابانا')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'محصولات',href:'#/products'}])}
    <div class="catalog-layout">
      <aside class="filters" id="filters">
        <div class="filter-group">
          <h4>دسته‌بندی</h4>
          ${cats.map(c => `<div class="filter-option"><input type="checkbox" id="cat-${c.id}" value="${c.id}" onchange="Q.filterProducts()"><label for="cat-${c.id}">${Q.escape(c.name)}</label></div>`).join('')}
        </div>
        <div class="filter-group">
          <h4>محدوده قیمت</h4>
          <div class="price-range">
            <input type="number" id="price-min" placeholder="حداقل" onchange="Q.filterProducts()">
            <span>—</span>
            <input type="number" id="price-max" placeholder="حداکثر" onchange="Q.filterProducts()">
          </div>
        </div>
        <div class="filter-group">
          <h4>فقط موجودها</h4>
          <div class="filter-option"><input type="checkbox" id="avail-only" onchange="Q.filterProducts()"><label for="avail-only">نمایش فقط محصولات موجود</label></div>
        </div>
      </aside>
      <div>
        <div class="catalog-toolbar">
          <button class="btn btn-outline btn-sm filter-toggle" onclick="document.getElementById('filters').classList.toggle('open')">فیلترها ⚙</button>
          <span class="catalog-count" id="catalog-count">${Q.toFa(products.length)} محصول</span>
          <select id="sort-select" onchange="Q.filterProducts()">
            <option value="default">مرتب‌سازی: پیش‌فرض</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="name">نام محصول</option>
          </select>
        </div>
        <div class="grid grid-auto" id="product-grid">
          ${products.map(p => Q.component.productCard(p)).join('')}
        </div>
        <div id="empty-catalog" class="empty-state" style="display:none">
          <div class="icon">🔍</div>
          <h3>محصولی یافت نشد</h3>
          <p>فیلترها را تغییر دهید یا همه محصولات را مشاهده کنید.</p>
          <button class="btn btn-primary" onclick="Q.clearFilters()">پاک کردن فیلترها</button>
        </div>
      </div>
    </div>
  </div>`;
};

Q.filterProducts = function() {
  const checkedCats = Array.from(document.querySelectorAll('.filter-option input[id^="cat-"]:checked')).map(i => i.value);
  const minPrice = parseInt(document.getElementById('price-min').value) || 0;
  const maxPrice = parseInt(document.getElementById('price-max').value) || Infinity;
  const availOnly = document.getElementById('avail-only').checked;
  const sort = document.getElementById('sort-select').value;

  let products = Q.data.products.filter(p => {
    if (checkedCats.length && !checkedCats.includes(p.category)) return false;
    const price = p.salePrice || p.price;
    if (price < minPrice || price > maxPrice) return false;
    if (availOnly && !p.available) return false;
    return true;
  });

  if (sort === 'price-asc') products.sort((a,b) => (a.salePrice||a.price) - (b.salePrice||b.price));
  else if (sort === 'price-desc') products.sort((a,b) => (b.salePrice||b.price) - (a.salePrice||a.price));
  else if (sort === 'name') products.sort((a,b) => a.name.localeCompare(b.name, 'fa'));

  const grid = document.getElementById('product-grid');
  const empty = document.getElementById('empty-catalog');
  const count = document.getElementById('catalog-count');

  if (products.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
    grid.innerHTML = products.map(p => Q.component.productCard(p)).join('');
  }
  count.textContent = Q.toFa(products.length) + ' محصول';
};

Q.clearFilters = function() {
  document.querySelectorAll('.filter-option input').forEach(i => i.checked = false);
  document.getElementById('price-min').value = '';
  document.getElementById('price-max').value = '';
  document.getElementById('sort-select').value = 'default';
  Q.filterProducts();
};

/* ---- PRODUCT DETAIL ---- */
Q.pages.productDetail = function(id) {
  const p = Q.getProduct(id[0]);
  if (!p) { Q.pages.notFound(); return; }
  const cat = Q.getCategory(p.category);
  const related = Q.data.products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const price = p.salePrice || p.price;
  const oldPrice = p.salePrice ? `<span class="price-old">${Q.formatPrice(p.price)}</span>` : '';

  document.getElementById('page-mount').innerHTML = `
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'محصولات',href:'#/products'},{label:Q.escape(cat?cat.name:'محصول'),href:'#/category/'+p.category},{label:Q.escape(p.name),href:'#/product/'+p.id}])}
  </div>
  <div class="container product-detail">
    <div class="product-gallery">
      <div class="gallery-main"><img src="${p.img}" alt="${Q.escape(p.name)}" id="gallery-main-img"></div>
      <div class="gallery-thumbs">
        <div class="gallery-thumb active" onclick="Q.swapGallery(this,'${p.img}')"><img src="${p.img}" alt=""></div>
        <div class="gallery-thumb" onclick="Q.swapGallery(this,'${p.img}')"><img src="${p.img}" alt=""></div>
        <div class="gallery-thumb" onclick="Q.swapGallery(this,'${p.img}')"><img src="${p.img}" alt=""></div>
      </div>
    </div>
    <div class="product-info">
      ${p.badge ? `<span class="product-badge ${p.badge==='تخفیف'?'sale':''}">${Q.escape(p.badge)}</span>` : ''}
      <h1>${Q.escape(p.name)}</h1>
      <p class="product-desc">${Q.escape(p.desc)}</p>
      <div class="price">${Q.formatPrice(price)} ${oldPrice}</div>
      <div class="product-specs">
        ${Object.entries(p.specs).map(([k,v]) => `<div class="spec-row"><span class="spec-label">${Q.escape(k)}</span><span class="spec-value">${Q.escape(v)}</span></div>`).join('')}
      </div>
      <div class="qty-selector">
        <span style="font-size:.875rem;font-weight:600;margin-inline-end:.5rem">تعداد:</span>
        <button class="qty-btn" onclick="Q.changeDetailQty(-1)">−</button>
        <input class="qty-input" type="text" value="۱" id="detail-qty" readonly>
        <button class="qty-btn" onclick="Q.changeDetailQty(1)">+</button>
      </div>
      <div class="product-detail-actions">
        ${p.available
          ? `<button class="btn btn-primary btn-lg" onclick="Q.addToCartFromDetail('${p.id}')">افزودن به سبد خرید</button>`
          : '<button class="btn btn-outline btn-lg" disabled>ناموجود</button>'}
        <a class="btn btn-outline btn-lg" href="#/builder">سفارش قاب سفارشی</a>
      </div>
      <div style="margin-top:1.5rem;padding:1rem;background:var(--pale);border-radius:var(--r);font-size:.8125rem;color:var(--muted)">
        🚚 ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان · 🔄 بازگشت ۷ روزه قاب‌های آماده
      </div>
    </div>
  </div>
  ${related.length ? `<section class="section"><div class="container"><div class="section-head"><h2>محصولات مرتبط</h2></div><div class="grid grid-4">${related.map(r => Q.component.productCard(r)).join('')}</div></div></section>` : ''}`;

  Q._detailQty = 1;
};

Q.swapGallery = function(thumb, src) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  document.getElementById('gallery-main-img').src = src;
};

Q.changeDetailQty = function(delta) {
  Q._detailQty = Math.max(1, Q._detailQty + delta);
  document.getElementById('detail-qty').value = Q.toFa(Q._detailQty);
};

Q.addToCartFromDetail = function(id) {
  const p = Q.getProduct(id);
  if (!p) return;
  Q.cart.add({
    cartId: Q.genId(), id: p.id, name: p.name, price: p.salePrice || p.price, img: p.img, qty: Q._detailQty, type: 'product',
  });
};

/* ---- CATEGORY ---- */
Q.pages.category = function(slug) {
  const cat = Q.getCategory(slug[0]);
  if (!cat) { Q.pages.notFound(); return; }
  const products = Q.data.products.filter(p => p.category === cat.id);
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader(cat.name, cat.desc)}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'محصولات',href:'#/products'},{label:cat.name,href:'#/category/'+cat.slug}])}
    <div style="padding:1rem 0">
      ${products.length ? `<div class="grid grid-auto">${products.map(p => Q.component.productCard(p)).join('')}</div>` :
      `<div class="empty-state"><div class="icon">📦</div><h3>محصولی در این دسته یافت نشد</h3><p>به‌زودی محصولات جدیدی به این دسته اضافه می‌شود.</p><a class="btn btn-primary" href="#/products">مشاهده همه محصولات</a></div>`}
    </div>
  </div>`;
};

/* ---- FRAME BUILDER ---- */
Q._builder = {
  step: 1,
  workflow: null,
  style: null,
  width: 30,
  height: 40,
  unit: 'cm',
  orientation: 'portrait',
  matting: false,
  image: null,
  imageName: null,
};

Q.pages.builder = function() {
  Q._builder.step = 1;
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('قاب‌سازی آنلاین', 'قاب دلخواهتان را در چند مرحله ساده پیکربندی کنید')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'قاب‌سازی آنلاین',href:'#/builder'}])}
    <div class="builder-layout">
      <div class="builder-steps-panel" id="builder-steps"></div>
      <div class="builder-preview-panel" id="builder-preview"></div>
    </div>
  </div>`;
  Q.renderBuilderStep();
  Q.renderBuilderPreview();
};

Q.renderBuilderStep = function() {
  const b = Q._builder;
  const stepsEl = document.getElementById('builder-steps');
  const stepNames = ['نوع سفارش', 'سبک قاب', 'ابعاد', 'بارگذاری تصویر', 'بررسی و قیمت'];

  stepsEl.innerHTML = `
  <div class="builder-step-indicator">
    ${stepNames.map((name, i) => {
      const n = i + 1;
      return `<div class="step-indicator-item ${n === b.step ? 'active' : ''} ${n < b.step ? 'done' : ''}" onclick="Q.goBuilderStep(${n})">
        <span class="step-indicator-num">${n < b.step ? '✓' : Q.toFa(n)}</span>
        <span>${Q.escape(name)}</span>
      </div>`;
    }).join('')}
  </div>
  <div id="builder-step-content"></div>
  <div class="price-summary" id="builder-price-summary" style="${b.step === 5 ? '' : 'display:none'}"></div>
  <div class="builder-nav" id="builder-nav"></div>`;

  Q.renderStepContent();
  Q.renderBuilderNav();
  if (b.step === 5) Q.renderPriceSummary();
};

Q.renderStepContent = function() {
  const b = Q._builder;
  const el = document.getElementById('builder-step-content');

  if (b.step === 1) {
    const workflows = [
      { id: 'ready', icon: '🖼️', title: 'قاب آماده', desc: 'از قاب‌های آماده موجود انتخاب کنید' },
      { id: 'print', icon: '🖨️', title: 'چاپ و قاب عکس', desc: 'عکس خود را چاپ و قاب کنید' },
      { id: 'custom', icon: '⚙️', title: 'قاب سفارشی', desc: 'قاب را با ابعاد دلخواه پیکربندی کنید' },
      { id: 'consult', icon: '💬', title: 'درخواست مشاوره', desc: 'برای موارد خاص مشاوره بخواهید' },
    ];
    el.innerHTML = `<div class="builder-panel"><h3>نوع سفارش را انتخاب کنید</h3>
    <div class="workflow-options">
      ${workflows.map(w => `<div class="workflow-option ${b.workflow === w.id ? 'selected' : ''}" onclick="Q.selectWorkflow('${w.id}')">
        <span class="workflow-option-icon">${w.icon}</span>
        <div><h4>${Q.escape(w.title)}</h4><p>${Q.escape(w.desc)}</p></div>
      </div>`).join('')}
    </div></div>`;
  }

  else if (b.step === 2) {
    el.innerHTML = `<div class="builder-panel"><h3>سبک قاب را انتخاب کنید</h3>
    <div class="style-grid">
      ${Q.data.frameStyles.map(s => `<div class="style-option ${b.style === s.id ? 'selected' : ''}" onclick="Q.selectStyle('${s.id}')">
        <div class="style-swatch" style="background:${s.color};border:3px solid ${s.border}"></div>
        <div class="style-option-name">${Q.escape(s.name)}</div>
      </div>`).join('')}
    </div></div>`;
  }

  else if (b.step === 3) {
    el.innerHTML = `<div class="builder-panel"><h3>ابعاد قاب را تعیین کنید</h3>
    <div class="dims-form">
      <div class="dims-row">
        <div class="form-field">
          <label>عرض (سانتی‌متر)</label>
          <input type="number" id="dim-width" value="${b.width}" min="10" max="100" onchange="Q.updateDims()">
          <span class="hint">حداقل ۱۰، حداکثر ۱۰۰ سانتی‌متر</span>
        </div>
        <div class="form-field">
          <label>ارتفاع (سانتی‌متر)</label>
          <input type="number" id="dim-height" value="${b.height}" min="10" max="100" onchange="Q.updateDims()">
          <span class="hint">حداقل ۱۰، حداکثر ۱۰۰ سانتی‌متر</span>
        </div>
      </div>
      <div class="form-field">
        <label>جهت</label>
        <div class="size-presets">
          <button class="size-preset ${b.orientation==='portrait'?'selected':''}" onclick="Q.setOrientation('portrait')">عمودی (پرتره)</button>
          <button class="size-preset ${b.orientation==='landscape'?'selected':''}" onclick="Q.setOrientation('landscape')">افقی (لنداسکیپ)</button>
        </div>
      </div>
      <div class="form-field">
        <label>ابعاد استاندارد</label>
        <div class="size-presets">
          ${Q.data.sizePresets.map(s => `<button class="size-preset" onclick="Q.setPreset(${s.w},${s.h})">${s.label}</button>`).join('')}
        </div>
      </div>
      <div class="form-field">
        <label><input type="checkbox" id="matting" ${b.matting?'checked':''} onchange="Q._builder.matting=this.checked;Q.renderBuilderPreview();Q.renderPriceSummary()" style="width:auto;margin-inline-start:.3rem"> پاس‌پارتو (حاشیه سفید)</label>
      </div>
    </div>
    <div id="dim-error"></div>
    </div>`;
  }

  else if (b.step === 4) {
    if (b.workflow === 'ready' || b.workflow === 'custom') {
      el.innerHTML = `<div class="builder-panel"><h3>بارگذاری تصویر (اختیاری)</h3>
      <p style="font-size:.8125rem;color:var(--muted);margin-bottom:1rem">برای پیش‌نمایش بهتر می‌توانید تصویر خود را بارگذاری کنید. این مرحله برای قاب آماده و سفارشی اختیاری است.</p>
      ${Q.renderUploadZone()}</div>`;
    } else if (b.workflow === 'print') {
      el.innerHTML = `<div class="builder-panel"><h3>بارگذاری تصویر</h3>
      <p style="font-size:.8125rem;color:var(--muted);margin-bottom:1rem">برای چاپ و قاب عکس، تصویر خود را بارگذاری کنید.</p>
      ${Q.renderUploadZone()}</div>`;
    } else {
      el.innerHTML = `<div class="builder-panel"><h3>درخواست مشاوره</h3>
      <p style="font-size:.8125rem;color:var(--muted);margin-bottom:1rem">برای موارد خاص می‌توانید درخواست مشاوره ثبت کنید. تصویر مرجع را بارگذاری کنید (اختیاری).</p>
      ${Q.renderUploadZone()}</div>`;
    }
  }

  else if (b.step === 5) {
    el.innerHTML = `<div class="builder-panel"><h3>بررسی سفارش</h3>
    <div id="order-review"></div></div>`;
    Q.renderOrderReview();
  }
};

Q.renderUploadZone = function() {
  const b = Q._builder;
  if (b.image) {
    return `<div class="upload-preview">
      <img src="${b.image}" alt="پیش‌نمایش تصویر">
      <button class="remove-btn" onclick="Q.removeImage()" aria-label="حذف تصویر">✕</button>
    </div>
    <button class="btn btn-outline btn-sm" style="margin-top:.5rem" onclick="Q.triggerUpload()">تغییر تصویر</button>
    <input type="file" id="file-input" accept="image/jpeg,image/png,image/webp" style="display:none" onchange="Q.handleUpload(this)">`;
  }
  return `<div class="upload-zone" id="upload-zone" onclick="Q.triggerUpload()" ondragover="event.preventDefault();this.classList.add('dragover')" ondragleave="this.classList.remove('dragover')" ondrop="Q.handleDrop(event)">
    <div class="upload-icon">📤</div>
    <p>برای بارگذاری کلیک کنید یا تصویر را اینجا رها کنید</p>
    <span class="upload-hint">فرمت‌های JPG، PNG، WEBP — حداکثر ۱۰ مگابایت</span>
  </div>
  <input type="file" id="file-input" accept="image/jpeg,image/png,image/webp" style="display:none" onchange="Q.handleUpload(this)">`;
};

Q.triggerUpload = function() { document.getElementById('file-input').click(); };

Q.handleDrop = function(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) Q.processFile(file);
};

Q.handleUpload = function(input) {
  const file = input.files[0];
  if (file) Q.processFile(file);
};

Q.processFile = function(file) {
  if (!file.type.match(/image\/(jpeg|png|webp)/)) {
    Q.toast('فرمت فایل پشتیبانی نمی‌شود. فقط JPG، PNG و WEBP.', 'error');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    Q.toast('حجم فایل بیش از ۱۰ مگابایت است.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    Q._builder.image = e.target.result;
    Q._builder.imageName = file.name;
    Q.toast('تصویر با موفقیت بارگذاری شد', 'success');
    Q.renderStepContent();
    Q.renderBuilderPreview();
  };
  reader.readAsDataURL(file);
};

Q.removeImage = function() {
  Q._builder.image = null;
  Q._builder.imageName = null;
  Q.renderStepContent();
  Q.renderBuilderPreview();
};

Q.selectWorkflow = function(id) {
  Q._builder.workflow = id;
  Q.renderStepContent();
};

Q.selectStyle = function(id) {
  Q._builder.style = id;
  Q.renderStepContent();
  Q.renderBuilderPreview();
};

Q.updateDims = function() {
  const w = parseInt(document.getElementById('dim-width').value);
  const h = parseInt(document.getElementById('dim-height').value);
  const errEl = document.getElementById('dim-error');
  let err = '';
  if (w < 10 || w > 100) err = 'عرض باید بین ۱۰ تا ۱۰۰ سانتی‌متر باشد.';
  if (h < 10 || h > 100) err = 'ارتفاع باید بین ۱۰ تا ۱۰۰ سانتی‌متر باشد.';
  if (errEl) errEl.innerHTML = err ? `<div class="form-error">${err}</div>` : '';
  if (!err) {
    Q._builder.width = w;
    Q._builder.height = h;
    if (w > h) Q._builder.orientation = 'landscape';
    else if (h > w) Q._builder.orientation = 'portrait';
    Q.renderBuilderPreview();
    Q.renderPriceSummary();
  }
};

Q.setOrientation = function(o) {
  Q._builder.orientation = o;
  if (o === 'landscape' && Q._builder.width < Q._builder.height) {
    [Q._builder.width, Q._builder.height] = [Q._builder.height, Q._builder.width];
  } else if (o === 'portrait' && Q._builder.width > Q._builder.height) {
    [Q._builder.width, Q._builder.height] = [Q._builder.height, Q._builder.width];
  }
  Q.renderStepContent();
  Q.renderBuilderPreview();
};

Q.setPreset = function(w, h) {
  Q._builder.width = w;
  Q._builder.height = h;
  Q._builder.orientation = w > h ? 'landscape' : 'portrait';
  Q.renderStepContent();
  Q.renderBuilderPreview();
};

Q.goBuilderStep = function(n) {
  if (n > 1 && !Q._builder.workflow) { Q.toast('ابتدا نوع سفارش را انتخاب کنید.', 'error'); return; }
  if (n > 2 && !Q._builder.style) { Q.toast('ابتدا سبک قاب را انتخاب کنید.', 'error'); return; }
  Q._builder.step = n;
  Q.renderBuilderStep();
  Q.renderBuilderPreview();
};

Q.renderBuilderNav = function() {
  const b = Q._builder;
  const el = document.getElementById('builder-nav');
  if (!el) return;
  let html = '';
  if (b.step > 1) html += `<button class="btn btn-outline" onclick="Q._builder.step--;Q.renderBuilderStep();Q.renderBuilderPreview()">→ مرحله قبل</button>`;
  else html += '<span></span>';
  if (b.step < 5) {
    html += `<button class="btn btn-primary" onclick="Q.nextBuilderStep()">مرحله بعد ←</button>`;
  } else {
    if (b.workflow === 'consult') {
      html += `<button class="btn btn-primary" onclick="Q.submitConsultRequest()">ثبت درخواست مشاوره</button>`;
    } else {
      html += `<button class="btn btn-primary" onclick="Q.addBuilderToCart()">افزودن به سبد خرید</button>`;
    }
  }
  el.innerHTML = html;
};

Q.nextBuilderStep = function() {
  const b = Q._builder;
  if (b.step === 1 && !b.workflow) { Q.toast('نوع سفارش را انتخاب کنید.', 'error'); return; }
  if (b.step === 2 && !b.style) { Q.toast('سبک قاب را انتخاب کنید.', 'error'); return; }
  if (b.step === 3) {
    if (b.width < 10 || b.width > 100 || b.height < 10 || b.height > 100) {
      Q.toast('ابعاد باید بین ۱۰ تا ۱۰۰ سانتی‌متر باشد.', 'error'); return;
    }
  }
  if (b.step === 4 && b.workflow === 'print' && !b.image) {
    Q.toast('برای چاپ و قاب، بارگذاری تصویر الزامی است.', 'error'); return;
  }
  b.step++;
  Q.renderBuilderStep();
  Q.renderBuilderPreview();
};

Q.calcPrice = function() {
  const b = Q._builder;
  if (!b.style) return 0;
  const style = Q.data.frameStyles.find(s => s.id === b.style);
  if (!style) return 0;
  const perimeter = (b.width + b.height) * 2;
  let price = style.basePrice + (perimeter * style.perCm);
  if (b.matting) price += Math.round(perimeter * 300);
  if (b.workflow === 'print') price += 80000;
  return Math.round(price);
};

Q.renderPriceSummary = function() {
  const b = Q._builder;
  const el = document.getElementById('builder-price-summary');
  if (!el || b.step !== 5) return;
  const style = Q.data.frameStyles.find(s => s.id === b.style);
  const total = Q.calcPrice();

  el.innerHTML = `
  <h3>خلاصه قیمت</h3>
  <div class="price-row"><span>سبک قاب</span><span>${style ? Q.escape(style.name) : '—'}</span></div>
  <div class="price-row"><span>ابعاد</span><span>${Q.toFa(b.width)} × ${Q.toFa(b.height)} سانتی‌متر</span></div>
  ${b.matting ? '<div class="price-row"><span>پاس‌پارتو</span><span>دارد</span></div>' : ''}
  ${b.workflow === 'print' ? '<div class="price-row"><span>چاپ عکس</span><span>دارد</span></div>' : ''}
  <div class="price-row total"><span>قیمت نهایی</span><span class="price-value">${Q.formatPrice(total)}</span></div>`;
};

Q.renderOrderReview = function() {
  const b = Q._builder;
  const style = Q.data.frameStyles.find(s => s.id === b.style);
  const el = document.getElementById('order-review');
  if (!el) return;
  const workflowNames = { ready: 'قاب آماده', print: 'چاپ و قاب عکس', custom: 'قاب سفارشی', consult: 'درخواست مشاوره' };
  el.innerHTML = `
  <div class="preview-info" style="border:0;padding:0">
    <div class="preview-info-row"><span class="label">نوع سفارش:</span><span class="value">${Q.escape(workflowNames[b.workflow] || '—')}</span></div>
    <div class="preview-info-row"><span class="label">سبک قاب:</span><span class="value">${style ? Q.escape(style.name) : '—'}</span></div>
    <div class="preview-info-row"><span class="label">ابعاد:</span><span class="value">${Q.toFa(b.width)} × ${Q.toFa(b.height)} سانتی‌متر</span></div>
    <div class="preview-info-row"><span class="label">جهت:</span><span class="value">${b.orientation === 'portrait' ? 'عمودی' : 'افقی'}</span></div>
    <div class="preview-info-row"><span class="label">پاس‌پارتو:</span><span class="value">${b.matting ? 'دارد' : 'ندارد'}</span></div>
    <div class="preview-info-row"><span class="label">تصویر:</span><span class="value">${b.image ? Q.escape(b.imageName || 'بارگذاری شده') : 'بدون تصویر'}</span></div>
  </div>`;
};

Q.renderBuilderPreview = function() {
  const b = Q._builder;
  const el = document.getElementById('builder-preview');
  if (!el) return;
  const style = Q.data.frameStyles.find(s => s.id === b.style);

  // Calculate preview dimensions (max 280px)
  const maxDim = 280;
  const ratio = b.width / b.height;
  let pw, ph;
  if (ratio > 1) { pw = maxDim; ph = Math.round(maxDim / ratio); }
  else { ph = maxDim; pw = Math.round(maxDim * ratio); }

  const frameColor = style ? style.color : '#ccc';
  const borderColor = style ? style.border : '#aaa';
  const borderWidth = 14;
  const matPadding = b.matting ? '20px' : '0';

  // Wall background based on style
  let wallBg = 'linear-gradient(135deg, #F0EDE8, #E8E4DE)';
  if (style) {
    if (style.id === 'dark-wood') wallBg = 'linear-gradient(135deg, #E8E0D5, #DDD4C8)';
    else if (style.id === 'gold') wallBg = 'linear-gradient(135deg, #F5F0E5, #EDE5D5)';
    else if (style.id === 'white') wallBg = 'linear-gradient(135deg, #ECECEC, #E0E0E0)';
    else if (style.id === 'black') wallBg = 'linear-gradient(135deg, #E8E8E8, #DCDCDC)';
  }

  el.innerHTML = `
  <div class="preview-wall" style="background:${wallBg}">
    <div class="preview-frame-wrap">
      <div class="preview-frame" style="width:${pw}px;height:${ph}px;background:${frameColor};border:2px solid ${borderColor};padding:${borderWidth}px">
        <div class="preview-frame-inner" style="${b.matting ? 'padding:'+matPadding+';background:#fff' : ''}">
          ${b.image
            ? `<img src="${b.image}" alt="تصویر شما" style="border-radius:2px">`
            : `<div class="preview-placeholder">${style ? Q.escape(style.name) : 'پیش‌نمایش قاب'}<br><span style="font-size:.7rem">${Q.toFa(b.width)}×${Q.toFa(b.height)} سانتی‌متر</span></div>`}
        </div>
      </div>
    </div>
  </div>
  <div class="preview-info">
    <div class="preview-info-row"><span class="label">سبک:</span><span class="value">${style ? Q.escape(style.name) : 'انتخاب نشده'}</span></div>
    <div class="preview-info-row"><span class="label">ابعاد:</span><span class="value">${Q.toFa(b.width)} × ${Q.toFa(b.height)} سانتی‌متر</span></div>
    <div class="preview-info-row"><span class="label">قیمت:</span><span class="value">${b.style ? Q.formatPrice(Q.calcPrice()) : '—'}</span></div>
  </div>`;
};

Q.addBuilderToCart = function() {
  const b = Q._builder;
  const style = Q.data.frameStyles.find(s => s.id === b.style);
  if (!style) { Q.toast('سبک قاب را انتخاب کنید.', 'error'); return; }
  const price = Q.calcPrice();
  const name = 'قاب سفارشی - ' + style.name + ' (' + Q.toFa(b.width) + '×' + Q.toFa(b.height) + ')';
  const config = {
    workflow: b.workflow, style: style.name, width: b.width, height: b.height,
    orientation: b.orientation, matting: b.matting, image: b.image ? 'بارگذاری شده' : null,
  };
  Q.cart.add({
    cartId: Q.genId(), id: 'custom_' + Date.now(), name: name, price: price, img: b.image || style ? Q.data.categories[0].img : '', qty: 1, type: 'custom', config: config,
  });
  Q.navigate('#/cart');
};

Q.submitConsultRequest = function() {
  Q.toast('درخواست مشاوره شما ثبت شد. به‌زودی با شما تماس می‌گیریم.', 'success');
  Q.navigate('#/contact');
};

/* ---- CART ---- */
Q.pages.cart = function() {
  const mount = document.getElementById('page-mount');
  if (Q.cart.items.length === 0) {
    mount.innerHTML = `
    ${Q.component.pageHeader('سبد خرید', '')}
    <div class="container">
      <div class="empty-state">
        <div class="icon">🛒</div>
        <h3>سبد خرید شما خالی است</h3>
        <p>محصولات را مرور کنید یا قاب دلخواه خود را بسازید.</p>
        <div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-primary" href="#/products">مشاهده محصولات</a>
          <a class="btn btn-outline" href="#/builder">قاب‌سازی آنلاین</a>
        </div>
      </div>
    </div>`;
    return;
  }

  mount.innerHTML = `
  ${Q.component.pageHeader('سبد خرید', '')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'سبد خرید',href:'#/cart'}])}
    <div class="cart-layout">
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-summary" id="cart-summary"></div>
    </div>
  </div>`;
  Q.renderCartItems();
};

Q.renderCartItems = function() {
  const itemsEl = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  if (!itemsEl) return;

  itemsEl.innerHTML = Q.cart.items.map(item => `
  <div class="cart-item">
    <div class="cart-item-img"><img src="${item.img || ''}" alt="${Q.escape(item.name)}"></div>
    <div class="cart-item-info">
      <h4>${Q.escape(item.name)}</h4>
      ${item.config ? `<div class="cart-item-config">${Object.entries(item.config).filter(([k,v]) => v).map(([k,v]) => Q.escape(k) + ': ' + Q.escape(v)).join(' · ')}</div>` : ''}
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="Q.cartUpdate('${item.cartId}',-1)">−</button>
        <span style="min-width:30px;text-align:center">${Q.toFa(item.qty)}</span>
        <button class="qty-btn" onclick="Q.cartUpdate('${item.cartId}',1)">+</button>
      </div>
    </div>
    <div class="cart-item-actions">
      <div class="cart-item-price">${Q.formatPrice(item.price * item.qty)}</div>
      <button class="cart-item-remove" onclick="Q.cartRemove('${item.cartId}')">حذف</button>
    </div>
  </div>`).join('');

  summaryEl.innerHTML = `
  <h3>خلاصه سفارش</h3>
  <div class="summary-row"><span>جمع کل:</span><span>${Q.formatPrice(Q.cart.subtotal())}</span></div>
  <div class="summary-row"><span>هزینه ارسال:</span><span>${Q.cart.shipping() === 0 ? 'رایگان' : Q.formatPrice(Q.cart.shipping())}</span></div>
  <div class="summary-row total"><span>مبلغ نهایی:</span><span>${Q.formatPrice(Q.cart.total())}</span></div>
  <a class="btn btn-primary btn-block btn-lg" href="#/checkout" style="margin-top:1rem">ادامه خرید ←</a>
  <button class="btn btn-outline btn-block" style="margin-top:.5rem" onclick="Q.cart.clear();Q.renderCartItems();Q.navigate('#/cart')">پاک کردن سبد</button>`;
};

Q.cartUpdate = function(cartId, delta) {
  const item = Q.cart.items.find(i => i.cartId === cartId);
  if (item) { Q.cart.updateQty(cartId, item.qty + delta); Q.renderCartItems(); }
};

Q.cartRemove = function(cartId) {
  Q.cart.remove(cartId);
  Q.renderCartItems();
  if (Q.cart.items.length === 0) Q.navigate('#/cart');
};

/* ---- CHECKOUT ---- */
Q.pages.checkout = function() {
  if (Q.cart.items.length === 0) { Q.navigate('#/cart'); return; }
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('تسویه حساب', 'اطلاعات خود را وارد کنید تا سفارش را نهایی کنید')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'سبد خرید',href:'#/cart'},{label:'تسویه حساب',href:'#/checkout'}])}
    <div class="checkout-layout">
      <div>
        <div class="checkout-section" id="checkout-contact">
          <h3>اطلاعات تماس</h3>
          <div class="form-grid">
            <div class="form-field"><label>نام و نام خانوادگی *</label><input type="text" id="co-name" placeholder="نام کامل"></div>
            <div class="form-field"><label>شماره موبایل *</label><input type="tel" id="co-phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" style="text-align:right"></div>
            <div class="form-field full"><label>ایمیل</label><input type="email" id="co-email" placeholder="email@example.com" dir="ltr" style="text-align:right"></div>
          </div>
        </div>
        <div class="checkout-section" id="checkout-address">
          <h3>نشانی ارسال</h3>
          <div class="form-grid">
            <div class="form-field"><label>استان *</label><input type="text" id="co-province" placeholder="استان"></div>
            <div class="form-field"><label>شهر *</label><input type="text" id="co-city" placeholder="شهر"></div>
            <div class="form-field full"><label>نشانی کامل *</label><textarea id="co-address" rows="3" placeholder="نشانی پستی کامل"></textarea></div>
            <div class="form-field"><label>کد پستی</label><input type="text" id="co-postal" placeholder="کد پستی" dir="ltr" style="text-align:right"></div>
          </div>
        </div>
        <div class="checkout-section" id="checkout-payment">
          <h3>روش پرداخت</h3>
          <div class="payment-methods">
            <div class="payment-method selected" onclick="Q.selectPayment(this,'online')"><input type="radio" name="payment" checked> پرداخت آنلاین (درگاه پرداخت)</div>
            <div class="payment-method" onclick="Q.selectPayment(this,'cod')"><input type="radio" name="payment"> پرداخت در محل (نقدی)</div>
          </div>
          <div style="margin-top:1rem;padding:.75rem;background:var(--pale);border-radius:var(--r-sm);font-size:.75rem;color:var(--muted)">
            ⚠️ درگاه پرداخت هنوز پیکربندی نشده است. پرداخت آنلاین پس از اتصال درگاه فعال می‌شود.
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-block" style="margin-top:1rem" onclick="Q.placeOrder()">ثبت سفارش ←</button>
      </div>
      <div class="cart-summary" id="checkout-summary"></div>
    </div>
  </div>`;
  Q.renderCheckoutSummary();
};

Q._paymentMethod = 'online';
Q.selectPayment = function(el, method) {
  document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
  Q._paymentMethod = method;
};

Q.renderCheckoutSummary = function() {
  const el = document.getElementById('checkout-summary');
  if (!el) return;
  el.innerHTML = `
  <h3>خلاصه سفارش</h3>
  ${Q.cart.items.map(item => `
  <div class="summary-row"><span>${Q.escape(item.name)} (${Q.toFa(item.qty)})</span><span>${Q.formatPrice(item.price * item.qty)}</span></div>
  `).join('')}
  <div class="summary-row"><span>هزینه ارسال:</span><span>${Q.cart.shipping() === 0 ? 'رایگان' : Q.formatPrice(Q.cart.shipping())}</span></div>
  <div class="summary-row total"><span>مبلغ نهایی:</span><span>${Q.formatPrice(Q.cart.total())}</span></div>`;
};

Q.placeOrder = function() {
  const name = document.getElementById('co-name').value.trim();
  const phone = document.getElementById('co-phone').value.trim();
  const province = document.getElementById('co-province').value.trim();
  const city = document.getElementById('co-city').value.trim();
  const address = document.getElementById('co-address').value.trim();

  if (!name) { Q.toast('نام و نام خانوادگی را وارد کنید.', 'error'); return; }
  if (!phone) { Q.toast('شماره موبایل را وارد کنید.', 'error'); return; }
  if (!province || !city || !address) { Q.toast('نشانی ارسال را کامل کنید.', 'error'); return; }

  const orderId = 'QB' + Date.now().toString().slice(-6);
  Q.cart.clear();
  Q.navigate('#/order/' + orderId);
};

/* ---- ORDER CONFIRMATION ---- */
Q.route('/order/:id', function(id) {
  document.getElementById('page-mount').innerHTML = `
  <div class="container">
    <div class="order-confirmation">
      <div class="icon">✅</div>
      <h1>سفارش شما ثبت شد!</h1>
      <p style="font-size:1rem;margin-bottom:.5rem">شماره سفارش: <strong dir="ltr">${Q.toFa(id[0])}</strong></p>
      <p>سفارش شما با موفقیت ثبت شد. به‌زودی با شما تماس می‌گیریم تا جزئیات ارسال را هماهنگ کنیم.</p>
      <p style="font-size:.8125rem;color:var(--muted);margin-top:1rem">پرداخت آنلاین پس از پیکربندی درگاه پرداخت فعال خواهد شد. در حال حاضر سفارش شما برای پرداخت در محل ثبت شده است.</p>
      <div style="display:flex;gap:.5rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap">
        <a class="btn btn-primary" href="#/">بازگشت به خانه</a>
        <a class="btn btn-outline" href="#/products">ادامه خرید</a>
      </div>
    </div>
  </div>`;
});

/* ---- BLOG LISTING ---- */
Q.pages.blog = function() {
  const posts = Q.data.blogPosts;
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('وبلاگ قابانا', 'ایده‌هایی برای انتخاب قاب و زیباتر کردن فضای خانه')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'وبلاگ',href:'#/blog'}])}
    <div class="blog-grid">
      ${posts.map(b => Q.component.blogCard(b)).join('')}
    </div>
  </div>`;
};

/* ---- BLOG ARTICLE ---- */
Q.pages.blogArticle = function(slug) {
  const post = Q.getPost(slug[0]);
  if (!post) { Q.pages.notFound(); return; }
  const related = Q.data.blogPosts.filter(b => b.slug !== post.slug).slice(0, 3);

  document.getElementById('page-mount').innerHTML = `
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'وبلاگ',href:'#/blog'},{label:post.title,href:'#/blog/'+post.slug}])}
  </div>
  <article class="blog-article">
    <div class="container">
      <div class="article-hero"><img src="${post.img}" alt="${Q.escape(post.title)}"></div>
      <div class="article-body">
        <span class="blog-tag">${Q.escape(post.category)}</span>
        <h1>${Q.escape(post.title)}</h1>
        <div class="article-meta"><span>📅 ${Q.formatDate(post.date)}</span><span>⏱️ ${Q.escape(post.readTime)}</span></div>
        <p>${Q.escape(post.excerpt)}</p>
        <p>در این مقاله سعی می‌کنیم نکات کلیدی و کاربردی را برای شما توضیح دهیم. انتخاب قاب مناسب یکی از مهم‌ترین تصمیم‌ها برای نمایش بهتر عکس‌ها و آثار هنری است و باید با دقت انجام شود.</p>
        <h2>نکات اصلی</h2>
        <p>اولین نکته این است که همیشه ابعاد تصویر و فضای نصب را قبل از خرید قاب در نظر بگیرید. قابی که خیلی بزرگ یا خیلی کوچک باشد، جلوه نهایی را تحت تأثیر قرار می‌دهد.</p>
        <p>دومین نکته، هماهنگی رنگ قاب با دکوراسیون محیط است. قاب‌های چوبی گرم و طبیعی معمولاً با فضاهای کلاسیک و سنتی هماهنگ‌اند، در حالی که قاب‌های مینیمال و سفید برای فضاهای مدرن مناسب‌تر هستند.</p>
        <h3>نتیجه‌گیری</h3>
        <p>با رعایت این نکات ساده می‌توانید قابی انتخاب کنید که هم عکس یا اثر هنری شما را بهتر نمایش دهد و هم با فضای اطراف هماهنگ باشد. برای تجربه عملی، به <a href="#/builder">قاب‌سازی آنلاین</a> مراجعه کنید.</p>
      </div>
    </div>
  </article>
  ${related.length ? `<section class="section"><div class="container"><div class="section-head"><h2>مطالب مرتبط</h2></div><div class="grid grid-3">${related.map(b => Q.component.blogCard(b)).join('')}</div></div></section>` : ''}`;
};

/* ---- ABOUT ---- */
Q.pages.about = function() {
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('درباره قابانا', 'قاب‌هایی برای ماندگار کردن خاطرات')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'درباره ما',href:'#/about'}])}
    <div class="page-content">
      <h2>قابانا کیست؟</h2>
      <p>قابانا یک کسب‌وکار آنلاین در زمینه قاب عکس، چاپ و قاب‌سازی سفارشی است. هدف ما ارائه تجربه‌ای ساده، زیبا و مطمئن برای انتخاب و سفارش قاب متناسب با سلیقه و فضای شماست.</p>
      <h2>خدمات قابانا</h2>
      <p>ما طیف گسترده‌ای از خدمات را ارائه می‌دهیم: قاب‌های آماده در ابعاد استاندارد، چاپ و قاب عکس با کیفیت بالا، قاب‌های دکوراتیو برای هماهنگی با دکوراسیون، و قاب‌سازی آنلاین با امکان پیکربندی کامل.</p>
      <h2>قاب‌سازی آنلاین</h2>
      <p>با ابزار قاب‌سازی آنلاین قابانا، می‌توانید در چند مرحله ساده قاب دلخواه خود را پیکربندی کنید: انتخاب سبک، تعیین ابعاد، بارگذاری تصویر و محاسبه قیمت. پیش‌نمایش زنده به شما کمک می‌کند تا نتیجه را قبل از سفارش مشاهده کنید.</p>
      <h2>تعهد ما</h2>
      <p>ما متعهد به ارائه محصول باکیفیت و تجربه‌ای روان برای مشتریان هستیم. اطلاعات دقیق درباره مواد، ابعاد و قیمت‌ها در دسترس شما قرار دارد تا انتخاب آگاهانه‌تری داشته باشید.</p>
      <div style="margin-top:2rem"><a class="btn btn-primary btn-lg" href="#/builder">شروع قاب‌سازی آنلاین ←</a></div>
    </div>
  </div>`;
};

/* ---- CONTACT ---- */
Q.pages.contact = function() {
  const s = Q.data.siteSettings;
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('تماس با ما', 'سؤال یا پیشنهاد دارید؟ با ما در ارتباط باشید')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'تماس با ما',href:'#/contact'}])}
    <div class="contact-layout">
      <div class="contact-form-card">
        <h3 style="margin-bottom:1rem">فرم تماس</h3>
        <form onsubmit="Q.submitContact(event)">
          <div class="form-grid">
            <div class="form-field"><label>نام و نام خانوادگی *</label><input type="text" id="contact-name" required placeholder="نام شما"></div>
            <div class="form-field"><label>ایمیل یا تلفن *</label><input type="text" id="contact-email" required placeholder="راه ارتباطی" dir="ltr" style="text-align:right"></div>
            <div class="form-field full"><label>موضوع *</label><input type="text" id="contact-subject" required placeholder="موضوع پیام"></div>
            <div class="form-field full"><label>پیام *</label><textarea id="contact-message" rows="5" required placeholder="متن پیام شما"></textarea></div>
          </div>
          <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top:1rem">ارسال پیام</button>
        </form>
      </div>
      <div class="contact-info-card">
        <div class="contact-info-item"><div class="contact-info-icon">📞</div><div><h4>تلفن</h4><p dir="ltr" style="text-align:right">${Q.escape(s.phone)}</p></div></div>
        <div class="contact-info-item"><div class="contact-info-icon">✉️</div><div><h4>ایمیل</h4><p dir="ltr" style="text-align:right">${Q.escape(s.email)}</p></div></div>
        <div class="contact-info-item"><div class="contact-info-icon">🕐</div><div><h4>ساعات کاری</h4><p>${Q.escape(s.hours)}</p></div></div>
        <div class="contact-info-item"><div class="contact-info-icon">📍</div><div><h4>نشانی</h4><p>${Q.escape(s.address)}</p></div></div>
      </div>
    </div>
  </div>`;
};

Q.submitContact = function(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  if (!name) { Q.toast('نام خود را وارد کنید.', 'error'); return; }
  Q.toast('پیام شما ارسال شد. به‌زودی پاسخ می‌دهیم.', 'success');
  e.target.reset();
};

/* ---- FAQ ---- */
Q.pages.faq = function() {
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('سؤالات متداول', 'پاسخ به پرسش‌های رایج مشتریان')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'سؤالات متداول',href:'#/faq'}])}
    <div class="page-content">
      ${Q.data.faqs.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-question" onclick="Q.toggleFAQ(${i})">${Q.escape(f.q)}<span class="faq-toggle">+</span></div>
        <div class="faq-answer"><p>${Q.escape(f.a)}</p></div>
      </div>`).join('')}
      <div style="margin-top:2rem;text-align:center">
        <p>پاسخ سؤال خود را پیدا نکردید؟</p>
        <a class="btn btn-primary" href="#/contact">تماس با ما</a>
      </div>
    </div>
  </div>`;
};

Q.toggleFAQ = function(i) {
  document.getElementById('faq-' + i).classList.toggle('open');
};

/* ---- SHIPPING ---- */
Q.pages.shipping = function() {
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('ارسال و تحویل', 'اطلاعات کامل درباره ارسال سفارش‌ها')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'ارسال و تحویل',href:'#/shipping'}])}
    <div class="page-content">
      ${Q.data.shippingInfo.map(item => `<h2>${Q.escape(item.q)}</h2><p>${Q.escape(item.a)}</p>`).join('')}
    </div>
  </div>`;
};

/* ---- RETURNS ---- */
Q.pages.returns = function() {
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('بازگشت کالا', 'شرایط و راهنمای بازگشت سفارش‌ها')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'بازگشت کالا',href:'#/returns'}])}
    <div class="page-content">
      <h2>شرایط بازگشت</h2>
      <ul>${Q.data.returnsInfo.map(item => `<li>${Q.escape(item)}</li>`).join('')}</ul>
      <h2>نحوه درخواست بازگشت</h2>
      <p>برای درخواست بازگشت کالا، از طریق صفحه <a href="#/contact">تماس با ما</a> با پشتیبانی در ارتباط باشید و شماره سفارش و دلیل بازگشت را ذکر کنید.</p>
    </div>
  </div>`;
};

/* ---- PRIVACY ---- */
Q.pages.privacy = function() {
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('حریم خصوصی', 'سیاست حفاظت از اطلاعات کاربران')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'حریم خصوصی',href:'#/privacy'}])}
    <div class="page-content">
      <h2>جمع‌آوری اطلاعات</h2>
      <p>قابانا اطلاعات شخصی شما را تنها برای پردازش سفارش‌ها، پاسخ به درخواست‌ها و بهبود خدمات جمع‌آوری می‌کند. این اطلاعات شامل نام، نشانی، شماره تماس و ایمیل شما می‌شود.</p>
      <h2>استفاده از اطلاعات</h2>
      <p>اطلاعات شما برای ارسال سفارش، ارتباط درباره وضعیت سفارش و پاسخ به پرسش‌ها استفاده می‌شود. ما اطلاعات شما را به اشخاص ثالث فروخته یا در اختیار آن‌ها قرار نمی‌دهیم.</p>
      <h2>تصاویر بارگذاری شده</h2>
      <p>تصاویری که برای چاپ و قاب‌سازی بارگذاری می‌کنید، تنها برای پردازش سفارش شما استفاده می‌شوند و پس از تکمیل فرایند حذف می‌شوند.</p>
      <h2>کوکی‌ها</h2>
      <p>این وب‌سایت از کوکی‌ها برای ذخیره سبد خرید و بهبود تجربه کاربری استفاده می‌کند. می‌توانید کوکی‌ها را در تنظیمات مرورگر خود غیرفعال کنید.</p>
    </div>
  </div>`;
};

/* ---- TERMS ---- */
Q.pages.terms = function() {
  document.getElementById('page-mount').innerHTML = `
  ${Q.component.pageHeader('قوانین و شرایط', 'شرایط استفاده از خدمات قابانا')}
  <div class="container">
    ${Q.component.breadcrumbs([{label:'خانه',href:'#/'},{label:'قوانین و شرایط',href:'#/terms'}])}
    <div class="page-content">
      <h2>پذیرش شرایط</h2>
      <p>با استفاده از وب‌سایت قابانا و ثبت سفارش، شما شرایط زیر را می‌پذیرید. در صورت عدم موافقت، لطفاً از خدمات استفاده نکنید.</p>
      <h2>سفارش‌ها</h2>
      <p>تمام سفارش‌ها پس از تأیید و پرداخت (یا انتخاب پرداخت در محل) پردازش می‌شوند. قابانا حق لغو سفارش را در صورت مشکلات فنی یا موجود نبودن کالا محفوظ می‌داند.</p>
      <h2>قاب‌سازی سفارشی</h2>
      <p>سفارش‌های قاب‌سازی با ابعاد و مشخصات دلخواه، پس از تولید قابل بازگشت نیستند. لطفاً قبل از نهایی کردن سفارش، ابعاد و مشخصات را با دقت بررسی کنید.</p>
      <h2>قیمت‌ها</h2>
      <p>قیمت‌های نمایش‌داده‌شده در وب‌سایت ممکن است تغییر کنند. قیمت نهایی سفارش در مرحله پرداخت نمایش داده می‌شود.</p>
      <h2>مالکیت محتوا</h2>
      <p>تمام محتوای وب‌سایت شامل متن، تصاویر و طراحی متعلق به قابانا است و استفاده بدون مجوز ممنوع است.</p>
    </div>
  </div>`;
};

/* ---- NOT FOUND ---- */
Q.pages.notFound = function() {
  document.getElementById('page-mount').innerHTML = `
  <div class="container">
    <div class="empty-state" style="padding:5rem 1rem">
      <div class="icon">🔍</div>
      <h3>صفحه یافت نشد</h3>
      <p>صفحه‌ای که دنبال آن بودید وجود ندارد یا منتقل شده است.</p>
      <a class="btn btn-primary" href="#/">بازگشت به خانه</a>
    </div>
  </div>`;
};

/* ============================================================
   SCROLL PROGRESS (RTL: right to left)
   ============================================================ */
window.addEventListener('scroll', function() {
  const bar = document.getElementById('scroll-progress');
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (scrolled / max) * 100 : 0;
  bar.style.width = pct + '%';
});

/* ============================================================
   ROUTE REGISTRATION
   ============================================================ */
Q.route('/', Q.pages.home);
Q.route('/products', Q.pages.products);
Q.route('/product/:id', Q.pages.productDetail);
Q.route('/category/:slug', Q.pages.category);
Q.route('/builder', Q.pages.builder);
Q.route('/cart', Q.pages.cart);
Q.route('/checkout', Q.pages.checkout);
Q.route('/blog', Q.pages.blog);
Q.route('/blog/:slug', Q.pages.blogArticle);
Q.route('/about', Q.pages.about);
Q.route('/contact', Q.pages.contact);
Q.route('/faq', Q.pages.faq);
Q.route('/shipping', Q.pages.shipping);
Q.route('/returns', Q.pages.returns);
Q.route('/privacy', Q.pages.privacy);
Q.route('/terms', Q.pages.terms);

/* ============================================================
   INIT
   ============================================================ */
Q.init = function() {
  Q.renderHeader();
  Q.renderFooter();
  Q.onHashChange();
};

document.addEventListener('DOMContentLoaded', Q.init);
