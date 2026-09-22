/* ============================================================
   EDUCORE — SCRIPT.JS
   Interactivity: Navbar, Smooth Scroll, Animations, Form
   Author: Salman Latif
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. NAVBAR SCROLL EFFECT ---------- */
  const navbar = document.querySelector('.navbar');
  const toTopBtn = document.getElementById('toTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (window.scrollY > 500) {
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  });


  /* ---------- 2. HAMBURGER MENU TOGGLE ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }


  /* ---------- 3. SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.offsetTop - 80; // navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ---------- 4. FADE-IN ON SCROLL (IntersectionObserver) ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // animate only once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for old browsers
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ---------- 5. SCROLL TO TOP ---------- */
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ---------- 6. CONTACT FORM HANDLING ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const school = document.getElementById('school').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!name || !school || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Simulate form submission (replace with actual backend/Formspree)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(function () {
            formSuccess.classList.remove('show');
          }, 6000);
        }
      }, 1200);
    });
  }


  /* ---------- 7. DYNAMIC YEAR IN FOOTER ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* ---------- 8. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

});
