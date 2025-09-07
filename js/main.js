/* Main JS for navigation, carousel, form validation, smooth scroll, scroll-top */
document.addEventListener('DOMContentLoaded', function () {
  // set copyright years
  const years = [ 'year','year2','year3','year4' ];
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // NAV TOGGLE (works with multiple headers)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    const nav = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      btn.classList.toggle('open');
    });
  });

  // CLOSE NAV when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const openNav = document.querySelector('.site-nav.open');
    if (!openNav) return;
    const toggles = Array.from(document.querySelectorAll('.nav-toggle'));
    const isToggle = toggles.some(t=>t.contains(e.target));
    if (!openNav.contains(e.target) && !isToggle) {
      openNav.classList.remove('open');
    }
  });

  // SMOOTH SCROLL for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // SIMPLE CAROUSEL
  (function initCarousel() {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;
    const track = carousel.querySelector('[data-carousel-track]');
    const items = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-carousel-btn="prev"]');
    const nextBtn = carousel.querySelector('[data-carousel-btn="next"]');
    let index = 0;

    function update() {
      const itemWidth = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(items[0]).marginRight || 0);
      track.style.transform = `translateX(${ -index * itemWidth }px)`;
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      update();
    });
    nextBtn.addEventListener('click', () => {
      index = Math.min(items.length - 1, index + 1);
      update();
    });

    // resize observer to adjust transform
    window.addEventListener('resize', update);
    update();
  })();

  // SCROLL-TO-TOP
  const scrollBtn = document.querySelectorAll('.scroll-top');
  function toggleScrollTop() {
    const show = window.scrollY > 300;
    scrollBtn.forEach(b => b.style.display = show ? 'block' : 'none');
  }
  window.addEventListener('scroll', toggleScrollTop);
  scrollBtn.forEach(b => b.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'})));
  toggleScrollTop();

  // FORM VALIDATION (contact form)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      // clear errors
      form.querySelectorAll('.error').forEach(el => el.textContent = '');

      if (!name.value.trim()) {
        showError('name', 'Please enter your name.');
        valid = false;
      }
      if (!validateEmail(email.value)) {
        showError('email', 'Please enter a valid email.');
        valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError('message', 'Please write a message (at least 10 characters).');
        valid = false;
      }

      if (!valid) return;

      // Simulate successful submission (replace with real API / email handler)
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.textContent = 'Message sent — thank you! (This demo uses client-side validation only.)';
        form.reset();
      }, 800);
    });

    function showError(field, msg) {
      const el = form.querySelector(`.error[data-error-for="${field}"]`);
      if (el) el.textContent = msg;
    }
    function validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email);
    }
  }
});

