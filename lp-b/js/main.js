/* ============================================================
   main.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // ヒーロー キャプションライン（polyline: 水平 → 右端で斜め下）
  // ----------------------------------------------------------
  const captionEl    = document.querySelector('.hero__caption');
  const captionSvg   = document.querySelector('.hero__caption-line');
  const captionPoly  = document.querySelector('.hero__caption-polyline');
  const captionRline = document.querySelector('.hero__caption-rline');

  function updateCaptionLine() {
    if (!captionEl || !captionSvg || !captionPoly) return;
    const w   = captionEl.offsetWidth;
    const h   = window.innerWidth <= 767 ? 8 : 12;  // SP: 14px テキストに合わせて縮小
    const mid = Math.round(w * 0.47); // 斜め線の開始位置（全幅の約47%）
    const gap = 16;  // 斜め終点と右線の隙間

    captionSvg.setAttribute('width',   w);
    captionSvg.setAttribute('height',  h);
    captionSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    // 左：水平 → 右端で斜め下（3点 polyline）
    captionPoly.setAttribute('points', `0,0 ${mid - h},0 ${mid},${h}`);

    // 右：水平線（斜め終点の下レベルから右端まで）
    captionRline?.setAttribute('x1', mid + gap);
    captionRline?.setAttribute('y1', 0);
    captionRline?.setAttribute('x2', w);
    captionRline?.setAttribute('y2', 0);
  }

  updateCaptionLine();

  if (captionEl && window.ResizeObserver) {
    new ResizeObserver(() => requestAnimationFrame(updateCaptionLine)).observe(captionEl);
  } else {
    window.addEventListener('resize', updateCaptionLine);
  }

  // ----------------------------------------------------------
  // ロゴクリック → ページトップへスムーズスクロール
  // ----------------------------------------------------------
  document.querySelectorAll('.header__logo, .footer__logo').forEach(logo => {
    logo.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ----------------------------------------------------------
  // ハンバーガーメニュー
  // ----------------------------------------------------------
  const hamburger = document.querySelector('[data-action="toggle-drawer"]');
  const drawer    = document.getElementById('js-drawer');
  const overlay   = document.getElementById('js-drawer-overlay');

  const openDrawer = () => {
    hamburger?.setAttribute('aria-expanded', 'true');
    drawer?.classList.add('is-open');
    drawer?.setAttribute('aria-hidden', 'false');
    overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    hamburger?.setAttribute('aria-expanded', 'false');
    drawer?.classList.remove('is-open');
    drawer?.setAttribute('aria-hidden', 'true');
    overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  // data-action で一元管理
  const handlers = {
    'toggle-drawer': () => {
      hamburger?.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer();
    },
    'close-drawer': closeDrawer,
  };

  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => handlers[el.dataset.action]?.());
  });

  overlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeDrawer));

  // ----------------------------------------------------------
  // スクロールアニメーション（data-animate で一元管理）
  // ----------------------------------------------------------
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('is-visible');
        animateObserver.unobserve(target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-animate]').forEach(el => animateObserver.observe(el));

  // ----------------------------------------------------------
  // 追従CTA（FV通過後に表示、お問い合わせ手前で非表示）
  // ----------------------------------------------------------
  const floatingCta = document.getElementById('js-floating-cta');
  const hero        = document.getElementById('hero');
  const contact     = document.getElementById('contact');

  if (floatingCta && hero && contact) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (target === hero)    floatingCta.classList.toggle('is-visible', !isIntersecting);
        if (target === contact) floatingCta.classList.toggle('is-hidden',   isIntersecting);
      });
    }, { threshold: 0 });

    ctaObserver.observe(hero);
    ctaObserver.observe(contact);
  }

});
