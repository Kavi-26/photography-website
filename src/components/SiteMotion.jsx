import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const DONE_DELAY = 2000;

const SELECTOR = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'img', 'button.ps-button', '.ps-button', 'a.ps-button',
  'label', 'input', 'textarea', 'select', 'summary', 'blockquote',
  'li', 'time', 'figcaption',
  '.eyebrow', '.kicker', '.reasons-kicker',
  '.pull', '.blog-card', '.feature', '.price-row',
  '.faq-row', '.faq-rule', '.step', '.package', '.reason',
  '.links-row > a', '.ig-handle', '.socials a', '.to-top',
  '.foot-item > a', '.foot-item > span',
  '.story-nav', '.pager',
].join(',');

const GRID = '.card-grid, .reason-grid, .team-row, .ig-row, .compare, .links-row, .steps, .food-copy, .split-about, .about-tease';

function getAnimType(el) {
  const tag = el.tagName.toLowerCase();
  if (el.matches('.faq-rule')) return 'line';
  if (tag === 'img') return 'photo';
  if (['h1', 'h2'].includes(tag)) return 'heading';
  if (el.matches('.ps-button, button.ps-button, a.ps-button')) return 'btn';
  return 'fade';
}

function eligible(el) {
  if (el.closest('.kk-menu, .kk-overlay, .hero-slide, .tint, .lightbox-overlay, .foot-item ul, .kk-logo')) return false;
  if (el.closest('.hero') && !el.closest('.hero-copy')) return false;
  if (el.matches('small') && el.closest('figcaption, .links-row')) return false;
  if (el.matches('input, textarea, select') && el.closest('label')) return false;
  if (el.tagName === 'A' && el.querySelector('img, h1, h2, h3')) return false;
  if (el.tagName === 'LI' && el.querySelector('img, h1, h2')) return false;
  if (el.classList.contains('kk-anim')) return false;
  return true;
}

function inView(el) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const topOffset = window.scrollY < 10 ? 0 : 40;
  return rect.top <= window.innerHeight - topOffset && rect.bottom >= 0;
}

function getSiblingIndex(el) {
  const parent = el.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.querySelectorAll(SELECTOR)).filter((node) => node === el || !node.closest('.kk-menu, .foot-item ul'));
  const idx = siblings.indexOf(el);
  return idx < 0 ? 0 : idx;
}

function delayFor(el) {
  const grid = el.closest(GRID);
  if (grid && el.parentElement !== grid) {
    let node = el;
    while (node.parentElement && node.parentElement !== grid) node = node.parentElement;
    const cardIndex = Math.max(0, [...grid.children].indexOf(node));
    const inner = Math.min(getSiblingIndex(el), 4);
    return Math.min(cardIndex, 6) * 100 + inner * 50;
  }
  return Math.min(getSiblingIndex(el), 5) * 80;
}

function initParallax() {
  const elements = new Map();
  let raf = 0;

  const collect = () => {
    document.querySelectorAll('.love img, .banner img, .post-hero img').forEach((el) => {
      if (!elements.has(el)) elements.set(el, { rate: 0.15, scale: 1.06 });
    });
    document.querySelectorAll('.page-banner > img, .photo-col > img').forEach((el) => {
      if (!elements.has(el)) elements.set(el, { rate: 0.12, scale: 1.06 });
    });
    document.querySelectorAll('.about-photo img').forEach((el) => {
      if (!elements.has(el)) elements.set(el, { rate: 0.08, scale: 1.04 });
    });
    document.querySelectorAll('.deco').forEach((el) => {
      if (!elements.has(el)) elements.set(el, { rate: 0.06, scale: 1.06 });
    });
  };

  const tick = () => {
    elements.forEach((opts, el) => {
      if (!el.isConnected) {
        elements.delete(el);
        return;
      }
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (viewCenter - center) * opts.rate;
      el.style.transform = `translate3d(0, ${offset}px, 0) scale(${opts.scale})`;
    });
  };

  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  };

  collect();
  window.addEventListener('scroll', onScroll, { passive: true });
  const mo = new MutationObserver(collect);
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    mo.disconnect();
  };
}

function initScrollBar() {
  let bar = document.getElementById('kk-scroll-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'kk-scroll-bar';
    document.body.appendChild(bar);
  }

  const onScroll = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}

function playPageEnter() {
  const main = document.querySelector('main');
  if (!main) return;
  main.classList.remove('kk-page-in');
  void main.offsetWidth;
  main.classList.add('kk-page-in');
}

export default function SiteMotion() {
  const { pathname } = useLocation();
  const cleanupParallax = useRef(null);
  const cleanupScrollBar = useRef(null);

  useEffect(() => {
    document.getElementById('kk-cursor')?.remove();
    document.getElementById('kk-cursor-dot')?.remove();
    document.getElementById('kk-page-overlay')?.remove();
    if (!cleanupParallax.current) cleanupParallax.current = initParallax();
    if (!cleanupScrollBar.current) cleanupScrollBar.current = initScrollBar();
    return () => {
      if (cleanupParallax.current) { cleanupParallax.current(); cleanupParallax.current = null; }
      if (cleanupScrollBar.current) { cleanupScrollBar.current(); cleanupScrollBar.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    playPageEnter();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const roots = [
      document.querySelector('main'),
      document.querySelector('.site-footer'),
      document.querySelector('.kk-nav'),
    ].filter(Boolean);

    const pending = new Set();
    const timers = new Set();
    let frame = 0;
    let io = null;

    const start = (el) => {
      if (!el.classList.contains('kk-anim') || el.classList.contains('kk-anim-on')) return;
      el.classList.add('kk-anim-on');
      const timer = setTimeout(() => {
        el.classList.add('kk-anim-done');
        timers.delete(timer);
      }, DONE_DELAY + delayFor(el));
      timers.add(timer);
    };

    const flush = () => {
      pending.forEach((el) => { if (inView(el)) start(el); });
      pending.clear();
    };

    const arm = (el) => {
      if (!(el instanceof Element)) return;
      if (!el.matches(SELECTOR)) return;
      if (!eligible(el)) return;
      const type = getAnimType(el);
      el.classList.add('kk-anim', `kk-anim--${type}`);
      el.style.setProperty('--kk-delay', `${delayFor(el)}ms`);
      pending.add(el);
      if (io) io.observe(el);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(flush); });
    };

    const collect = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches(SELECTOR)) arm(node);
      node.querySelectorAll(SELECTOR).forEach(arm);
    };

    const onScroll = () => {
      document.querySelectorAll('.kk-anim:not(.kk-anim-on)').forEach((el) => {
        if (inView(el)) start(el);
      });
    };

    roots.forEach(collect);

    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) start(entry.target);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.08 });

    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(collect));
    });

    document.querySelectorAll('.kk-anim:not(.kk-anim-on)').forEach((el) => io.observe(el));
    roots.forEach((root) => observer.observe(root, { childList: true, subtree: true }));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => clearTimeout(timer));
      document.querySelectorAll('.kk-anim:not(.kk-anim-on)').forEach((el) => {
        el.classList.remove('kk-anim', 'kk-anim-on', 'kk-anim-done', 'kk-anim--fade', 'kk-anim--heading', 'kk-anim--photo', 'kk-anim--btn', 'kk-anim--line');
        el.style.removeProperty('--kk-delay');
      });
      observer.disconnect();
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return null;
}
