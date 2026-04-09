    /* =========================================
       STAYHEALTH — JAVASCRIPT
       Custom cursor, nav, scroll reveals,
       mobile menu, back-to-top
       ========================================= */

    'use strict';

    // ======= CUSTOM CURSOR =======
    (function initCursor() {
      const cursor = document.getElementById('cursor');
      const follower = document.getElementById('cursor-follower');
      if (!cursor || !follower) return;

      // Only on non-touch devices
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          cursor.style.left = mouseX + 'px';
          cursor.style.top = mouseY + 'px';
        });

        // Smooth follower
        function animateFollower() {
          followerX += (mouseX - followerX) * 0.12;
          followerY += (mouseY - followerY) * 0.12;
          follower.style.left = followerX + 'px';
          follower.style.top = followerY + 'px';
          requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover state on interactive elements
        const interactables = document.querySelectorAll('a, button, input, label, [role="listitem"]');
        interactables.forEach(el => {
          el.addEventListener('mouseenter', () => follower.classList.add('hover'));
          el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
      } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
      }
    })();

    // ======= NAV: SCROLL + MOBILE TOGGLE =======
    (function initNav() {
      const nav = document.getElementById('nav');
      const toggle = document.getElementById('nav-toggle');
      const menu = document.getElementById('nav-menu');
      const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

      if (!nav || !toggle || !menu) return;

      // Scrolled state
      function onScroll() {
        if (window.scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Mobile toggle
      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on nav link click
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
          document.body.style.overflow = '';
        }
      });

      // Active link on scroll (IntersectionObserver)
      const sections = document.querySelectorAll('section[id]');
      if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                  link.classList.add('active');
                }
              });
            }
          });
        }, { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' });
        sections.forEach(s => sectionObserver.observe(s));
      }
    })();

    // ======= SCROLL REVEAL =======
    (function initReveal() {
      const elements = document.querySelectorAll('[data-reveal]');
      if (!elements.length) return;

      if ('IntersectionObserver' in window) {
        // Respect prefers-reduced-motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
          elements.forEach(el => el.classList.add('revealed'));
          return;
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Stagger children if parent is a grid/list
              const parent = entry.target.parentElement;
              if (parent) {
                const siblings = Array.from(parent.querySelectorAll('[data-reveal]'));
                const idx = siblings.indexOf(entry.target);
                if (idx > 0) {
                  entry.target.style.transitionDelay = (idx * 0.1) + 's';
                }
              }
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -60px 0px'
        });

        elements.forEach(el => observer.observe(el));
      } else {
        // Fallback: show all immediately
        elements.forEach(el => el.classList.add('revealed'));
      }
    })();

    // ======= BACK TO TOP =======
    (function initBackToTop() {
      const btn = document.getElementById('back-top');
      if (!btn) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }, { passive: true });

      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    })();

    // ======= CHECKLIST: Celebrate completions =======
    (function initChecklist() {
      const checks = document.querySelectorAll('.today-check');
      if (!checks.length) return;

      checks.forEach(check => {
        check.addEventListener('change', () => {
          const completed = document.querySelectorAll('.today-check:checked').length;

          // Announce to screen readers
          const announcement = document.createElement('div');
          announcement.setAttribute('role', 'status');
          announcement.setAttribute('aria-live', 'polite');
          announcement.className = 'sr-only';
          if (completed === checks.length) {
            announcement.textContent = 'Amazing! You\'ve completed all 5 habits for today. Your health journey has begun!';
            // Small visual celebration
            confettiCelebrate();
          } else {
            announcement.textContent = `${completed} of ${checks.length} habits checked. Keep going!`;
          }
          document.body.appendChild(announcement);
          setTimeout(() => announcement.remove(), 3000);
        });
      });

      function confettiCelebrate() {
        const colors = ['#c8a84b', '#5a7a4a', '#a8c89a', '#e0c06a', '#f5f0e8'];
        const totalParticles = 40;

        for (let i = 0; i < totalParticles; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
        position: fixed;
        width: ${4 + Math.random() * 6}px;
        height: ${4 + Math.random() * 6}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        left: ${30 + Math.random() * 40}%;
        top: 60%;
        pointer-events: none;
        z-index: 9999;
        opacity: 1;
        transform: translate(0,0) rotate(0deg);
        transition: transform ${0.8 + Math.random() * 0.8}s cubic-bezier(0,1,0.5,1),
                    opacity ${0.6 + Math.random() * 0.4}s ease ${0.4 + Math.random() * 0.3}s;
      `;
          document.body.appendChild(particle);

          requestAnimationFrame(() => {
            const tx = (Math.random() - 0.5) * 300;
            const ty = -200 - Math.random() * 300;
            const rot = (Math.random() - 0.5) * 720;
            particle.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
            particle.style.opacity = '0';
          });

          setTimeout(() => particle.remove(), 1600);
        }
      }
    })();

    // ======= SMOOTH ANCHOR SCROLL (offset for nav) =======
    (function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          const navHeight = 72;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top, behavior: 'smooth' });
          // Update URL without jumping
          history.pushState(null, null, href);
          // Focus management for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        });
      });
    })();

    // ======= WAIST METER: animate numbers =======
    (function initWaistAnimations() {
      const waistValues = document.querySelectorAll('.waist-value');
      if (!waistValues.length) return;

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        waistValues.forEach(el => observer.observe(el));
      }
    })();

    // ======= FORMULA CARDS: keyboard navigation =======
    (function initFormulaCards() {
      const cards = document.querySelectorAll('.formula-card');
      cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            card.classList.toggle('focused');
          }
        });
      });
    })();

    // ======= PRELOAD OPTIMIZATION =======
    (function optimizeImages() {
      // Add loading="lazy" to any future images
      document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      });
    })();

    // ======= PERFORMANCE: Log Core Web Vitals hints =======
    (function () {
      if ('PerformanceObserver' in window) {
        try {
          const lcp = new PerformanceObserver((list) => {
            // LCP observed — useful for debugging
            list.getEntries().forEach(() => { });
          });
          lcp.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) { }
      }
    })();
