(function() {
  'use strict';

  // User-prompt typewriter animation.
  // Types the `data-full` text into the target, one character at a time,
  // with a small jitter to feel human. Total runtime ~1700ms to stay within
  // the budget before the timeline animation kicks off at draw-delay=1900ms.
  const typingTarget = document.querySelector('[data-typing-target]');
  if (typingTarget) {
    const full = typingTarget.getAttribute('data-full') || '';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      typingTarget.textContent = full;
    } else {
      // Target ~1500ms total; base 22ms/char with ±12ms jitter
      const baseDelay = Math.max(14, Math.min(28, 1500 / Math.max(full.length, 1)));
      let i = 0;
      const tick = () => {
        if (i <= full.length) {
          typingTarget.textContent = full.slice(0, i);
          i++;
          const jitter = (Math.random() - 0.5) * 12;
          setTimeout(tick, baseDelay + jitter);
        }
      };
      // Small initial pause so the empty box is visible for a beat
      setTimeout(tick, 350);
    }
  }

  // Nav scroll blur (40px threshold per spec)
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Capture section tabs
  const steps = document.querySelectorAll('.step');
  const panels = document.querySelectorAll('.cap-panel');
  const mobileDesc = document.getElementById('mobileDesc');

  const activate = (panelId) => {
    steps.forEach(s => {
      const isActive = s.dataset.panel === panelId;
      s.classList.toggle('active', isActive);
      s.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive && mobileDesc) {
        const desc = s.querySelector('.step-desc');
        if (desc) mobileDesc.textContent = desc.textContent;
      }
    });
    panels.forEach(p => {
      p.classList.toggle('active', p.dataset.panel === panelId);
    });
  };

  steps.forEach(step => {
    step.addEventListener('click', () => activate(step.dataset.panel));
    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(step.dataset.panel);
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' ||
          e.key === 'ArrowUp'   || e.key === 'ArrowLeft') {
        e.preventDefault();
        const idx = Array.from(steps).indexOf(step);
        const fwd = e.key === 'ArrowDown' || e.key === 'ArrowRight';
        const next = fwd ? (idx + 1) % steps.length : (idx - 1 + steps.length) % steps.length;
        steps[next].focus();
        activate(steps[next].dataset.panel);
      }
    });
  });

  // Scroll-triggered reveals
  /* Capture tabs */
  document.querySelectorAll('.capture-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      const wrap = tab.closest('.capture-tabs');
      if (!wrap) return;
      wrap.querySelectorAll('.capture-tab').forEach(t => {
        const on = t === tab;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      wrap.querySelectorAll('.capture-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }
})();
