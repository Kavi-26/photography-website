import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DURATION = 1400;
const SELECTOR = 'h1,h2,h3,h4,h5,h6,p,img,button,.ps-button,label,input,textarea,summary,blockquote,li,a,time';

function eligible(el) {
  if (el.closest('.kk-menu, .kk-overlay, .hero-slide, .tint')) return false;
  if (el.closest('.hero') && !el.closest('.hero-copy')) return false;
  if (el.tagName === 'A' && el.querySelector('img, h1, h2, h3')) return false;
  if (el.tagName === 'LI' && el.querySelector('img, h1, h2')) return false;
  return true;
}

function inView(el) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;
  const top = window.scrollY < 10 ? 0 : 10;
  const bottom = window.innerHeight - 10;
  return rect.top <= bottom && rect.bottom >= top;
}

export default function SiteMotion() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const roots = [document.querySelector('main'), document.querySelector('.site-footer'), document.querySelector('.kk-nav')].filter(Boolean);
    const pending = new Set();
    const timers = new Set();
    let frame = 0;

    const start = (el) => {
      if (!el.classList.contains('kk-anim') || el.classList.contains('kk-anim-on')) return;
      el.classList.add('kk-anim-on');
      const timer = window.setTimeout(() => {
        el.classList.add('kk-anim-done');
        timers.delete(timer);
      }, DURATION + 100);
      timers.add(timer);
    };

    const flush = () => {
      pending.forEach((el) => {
        if (inView(el)) start(el);
      });
      pending.clear();
    };

    const arm = (el) => {
      if (!(el instanceof Element) || !el.matches(SELECTOR) || !eligible(el) || el.classList.contains('kk-anim')) return;
      el.classList.add('kk-anim');
      pending.add(el);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(flush);
      });
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
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      document.querySelectorAll('.kk-anim:not(.kk-anim-on)').forEach((el) => el.classList.remove('kk-anim'));
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return null;
}
