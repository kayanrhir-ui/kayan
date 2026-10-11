/* ============================================================
   QABANA — Store (cart, toast, helpers)
   ============================================================ */

var Q = window.Qabana = window.Qabana || {};

/* ---- Persian number helpers ---- */
Q.toFa = function(num) {
  if (num === null || num === undefined) return '';
  return String(num).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

Q.formatPrice = function(num) {
  if (!num && num !== 0) return '—';
  return Q.toFa(num.toLocaleString('en-US')) + ' ' + Q.data.siteSettings.currency;
};

Q.formatDate = function(str) {
  return Q.toFa(str);
};

/* ---- Cart store (localStorage) ---- */
Q.cart = {
  items: [],

  load() {
    try {
      const raw = localStorage.getItem('qabana_cart');
      this.items = raw ? JSON.parse(raw) : [];
    } catch(e) { this.items = []; }
    return this.items;
  },

  save() {
    try { localStorage.setItem('qabana_cart', JSON.stringify(this.items)); }
    catch(e) {}
    this.updateBadge();
  },

  add(item) {
    // item: { id, name, price, img, qty, type, config }
    const existing = this.items.find(i => i.cartId === item.cartId);
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      item.qty = item.qty || 1;
      this.items.push(item);
    }
    this.save();
    Q.toast(item.name + ' به سبد اضافه شد', 'success');
  },

  remove(cartId) {
    this.items = this.items.filter(i => i.cartId !== cartId);
    this.save();
  },

  updateQty(cartId, qty) {
    const item = this.items.find(i => i.cartId === cartId);
    if (item) { item.qty = Math.max(1, qty); this.save(); }
  },

  clear() {
    this.items = [];
    this.save();
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  shipping() {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    if (sub >= 500000) return 0;
    return 45000;
  },

  total() {
    return this.subtotal() + this.shipping();
  },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const c = this.count();
    if (c > 0) {
      badge.textContent = Q.toFa(c);
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  },
};

/* ---- Toast ---- */
Q.toast = function(msg, type) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(Q._toastTimer);
  Q._toastTimer = setTimeout(() => { el.className = 'toast'; }, 3000);
};

/* ---- Modal ---- */
Q.modal = function(contentHTML) {
  const root = document.getElementById('modal-root');
  root.innerHTML = '<div class="modal-overlay" id="modal-overlay"><div class="modal">' + contentHTML + '</div></div>';
  const overlay = document.getElementById('modal-overlay');
  requestAnimationFrame(() => overlay.classList.add('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('modal-close')) Q.closeModal();
  });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { Q.closeModal(); document.removeEventListener('keydown', esc); }
  });
};

Q.closeModal = function() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) { overlay.classList.remove('open'); setTimeout(() => { document.getElementById('modal-root').innerHTML = ''; }, 200); }
};

/* ---- Helpers ---- */
Q.getProduct = function(id) {
  return Q.data.products.find(p => p.id === id);
};

Q.getCategory = function(slug) {
  return Q.data.categories.find(c => c.slug === slug);
};

Q.getPost = function(slug) {
  return Q.data.blogPosts.find(p => p.slug === slug);
};

Q.escape = function(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
};

Q.genId = function() {
  return 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
};
