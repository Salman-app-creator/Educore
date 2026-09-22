/* ═══════════════════════════════════════════
   EDUCORE — script.js
   All JS for marketing website
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM refs ──────────────────────────── */
  const navbar       = document.getElementById('navbar');
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay= document.getElementById('mobileOverlay');
  const drawerClose  = document.getElementById('drawerClose');
  const scrollTopBtn = document.getElementById('scrollTop');
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  /* ══════════════════════════════════════════
     1. NAVBAR — transparent → solid on scroll
  ══════════════════════════════════════════ */
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load


  /* ══════════════════════════════════════════
     2. HAMBURGER MENU
  ══════════════════════════════════════════ */
  function openDrawer() {
    hamburger.classList.add('open');
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    hamburger.classList.remove('open');
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', () => {
    mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  drawerClose.addEventListener('click', closeDrawer);
  mobileOverlay.addEventListener('click', closeDrawer);

  // Close on link click
  document.querySelectorAll('.drawer-link, .drawer-cta').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ══════════════════════════════════════════
     3. SMOOTH SCROLL for anchor links
  ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ══════════════════════════════════════════
     4. ACTIVE NAV LINK on scroll
  ══════════════════════════════════════════ */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], div[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  sections.forEach(s => sectionObserver.observe(s));


  /* ══════════════════════════════════════════
     5. SCROLL-REVEAL animations
  ══════════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same grid/row
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('reveal'))
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 70, 350); // max 350ms stagger

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));


  /* ══════════════════════════════════════════
     6. ANIMATED COUNTERS
  ══════════════════════════════════════════ */
  function animateCounter(el) {
    const target  = parseInt(el.getAttribute('data-target'), 10);
    const suffix  = el.getAttribute('data-suffix') || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(ease(progress) * target);
      el.textContent = value + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterEls = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counterEls.forEach(el => counterObserver.observe(el));


  /* ══════════════════════════════════════════
     7. SCROLL TO TOP button
  ══════════════════════════════════════════ */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ══════════════════════════════════════════
     8. CONTACT FORM — validation + success
  ══════════════════════════════════════════ */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validatePhone(phone) {
    return /^[0-9\-\+\s\(\)]{7,15}$/.test(phone.trim());
  }
  function setError(input, hasError) {
    if (hasError) input.classList.add('error');
    else input.classList.remove('error');
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name     = document.getElementById('name');
      const school   = document.getElementById('school');
      const email    = document.getElementById('email');
      const phone    = document.getElementById('phone');
      const students = document.getElementById('students');

      let valid = true;

      setError(name,     !name.value.trim());
      setError(school,   !school.value.trim());
      setError(email,    !validateEmail(email.value));
      setError(phone,    !validatePhone(phone.value));
      setError(students, !students.value);

      if (!name.value.trim())          valid = false;
      if (!school.value.trim())        valid = false;
      if (!validateEmail(email.value)) valid = false;
      if (!validatePhone(phone.value)) valid = false;
      if (!students.value)             valid = false;

      if (!valid) {
        // Shake the first errored field
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.style.animation = 'shake 0.4s ease';
          firstError.addEventListener('animationend', () => {
            firstError.style.animation = '';
          }, { once: true });
        }
        return;
      }

      // Success
      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate async (static site — no backend)
      setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });

    // Remove error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => field.classList.remove('error'));
    });
  }


  /* ══════════════════════════════════════════
     9. FEATURE CARD — mouse-tracking glow
  ══════════════════════════════════════════ */
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });


  /* ══════════════════════════════════════════
     10. PARALLAX hero orbs on mousemove
  ══════════════════════════════════════════ */
  const hero = document.querySelector('.hero');
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return; // skip on mobile
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const orbs = hero.querySelectorAll('.orb');
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }


  /* ══════════════════════════════════════════
     11. SHAKE animation keyframe (injected)
  ══════════════════════════════════════════ */
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);


  /* ══════════════════════════════════════════
     12. PRICING CARD — stagger reveal fix
     (middle card is scaled, ensure proper order)
  ══════════════════════════════════════════ */
  // Already handled by stagger in revealObserver above.
  // Extra: add a subtle glow to featured card periodically
  const featuredCard = document.querySelector('.price-featured');
  if (featuredCard) {
    setInterval(() => {
      featuredCard.style.boxShadow = '0 8px 40px rgba(158,48,57,0.35), 0 0 0 1px rgba(158,48,57,0.2)';
      setTimeout(() => {
        featuredCard.style.boxShadow = '0 8px 40px rgba(158,48,57,0.2), 0 0 0 1px rgba(158,48,57,0.15)';
      }, 800);
    }, 2500);
  }


  /* ══════════════════════════════════════════
     13. Demo overlay — ensure correct z-index
         when browser mockup is hovered
  ══════════════════════════════════════════ */
  // Handled purely in CSS via .browser-mockup:hover .demo-overlay


  console.log('✅ EduCore website loaded. Built with ❤️ in Pakistan.');

})();
