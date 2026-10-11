import { useLayoutEffect, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const DONE_DELAY = 1600;

const SELECTOR = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'img', 'button.ps-button', '.ps-button', 'a.ps-button',
  'label', 'input', 'textarea', 'summary', 'blockquote',
  'li', 'time', '.eyebrow', '.kicker', '.reasons-kicker',
  '.pull', '.blog-card', '.feature', '.price-row',
  '.faq-row', '.step', '.package', '.reason',
].join(',');

function getAnimType(el) {
  const tag = el.tagName.toLowerCase();
  if (tag === 'img') return 'photo';
  if (['h1', 'h2'].includes(tag)) return 'heading';
  if (el.matches('.ps-button, button.ps-button, a.ps-button')) return 'btn';
  return 'fade';
}

function eligible(el) {
  if (el.closest('.kk-menu, .kk-overlay, .hero-slide, .tint')) return false;
  if (el.closest('.hero') && !el.closest('.hero-copy')) return false;
  if (el.tagName === 'A' && el.querySelector('img, h1, h2, h3')) return false;
  if (el.tagName === 'LI' && el.querySelector('img, h1, h2')) return false;
  if (el.classList.contains('kk-anim')) return false;
  return true;
}

function inView(el) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const topOffset = window.scrollY < 10 ? 0 : 50;
  return rect.top <= window.innerHeight - topOffset && rect.bottom >= 0;
}

function getSiblingIndex(el) {
  const parent = el.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.querySelectorAll(SELECTOR));
  const idx = siblings.indexOf(el);
  return Math.min(idx, 5);
}

function initParallax() {
  const elements = new Map();

  const collect = () => {
    document.querySelectorAll('.love img, .banner img, .post-hero img').forEach((el) => {
      if (!elements.has(el)) elements.set(el, { rate: 0.15 });
    });
    document.querySelectorAll('.deco').forEach((el) => {
      if (!elements.has(el)) elements.set(el, { rate: 0.06 });
    });
  };

  const tick = () => {
    elements.forEach((opts, el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (viewCenter - center) * opts.rate;
      el.style.transform = `translateY(${offset}px) scale(1.06)`;
    });
  };

  collect();
  window.addEventListener('scroll', tick, { passive: true });
  const mo = new MutationObserver(collect);
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    window.removeEventListener('scroll', tick);
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
  return () => window.removeEventListener('scroll', onScroll);
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const roots = [
      document.querySelector('main'),
      document.querySelector('.site-footer'),
      document.querySelector('.kk-nav'),
    ].filter(Boolean);

    const pending = new Set();
    const timers = new Set();
    let frame = 0;

    const start = (el) => {
      if (!el.classList.contains('kk-anim') || el.classList.contains('kk-anim-on')) return;
      el.classList.add('kk-anim-on');
      const timer = setTimeout(() => {
        el.classList.add('kk-anim-done');
        timers.delete(timer);
      }, DONE_DELAY);
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
      const sibIdx = getSiblingIndex(el);
      el.classList.add('kk-anim', `kk-anim--${type}`);
      el.style.setProperty('--kk-delay', `${sibIdx * 80}ms`);
      pending.add(el);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(flush); });
    };

    const collect = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches(SELECTOR)) arm(node);
      node.querySelectorAll(SELECTOR).forEach(arm);
    };

    roots.forEach(collect);

    const onScroll = () => {
      document.querySelectorAll('.kk-anim:not(.kk-anim-on)').forEach((el) => {
        if (inView(el)) start(el);
      });
    };

    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(collect));
    });
    roots.forEach((root) => observer.observe(root, { childList: true, subtree: true }));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => clearTimeout(timer));
      document.querySelectorAll('.kk-anim:not(.kk-anim-on)').forEach((el) => {
        el.classList.remove('kk-anim', 'kk-anim-on', 'kk-anim-done');
        el.style.removeProperty('--kk-delay');
      });
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return null;
}
