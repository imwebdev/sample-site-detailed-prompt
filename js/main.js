/* ===== vMix Production Hub — Main JS ===== */

(function () {
  'use strict';

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Animated Counters ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ---------- Feature Card Filtering ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var featureCards = document.querySelectorAll('.feature-card');

  if (filterBtns.length > 0 && featureCards.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active state
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter');

        featureCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---------- Tutorial Search ---------- */
  var searchInput = document.getElementById('tutorial-search');
  var tutorialCards = document.querySelectorAll('.tutorial-list-card');

  if (searchInput && tutorialCards.length > 0) {
    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();

      tutorialCards.forEach(function (card) {
        var title = (card.querySelector('h3') || {}).textContent || '';
        var tags = card.getAttribute('data-tags') || '';
        var text = (title + ' ' + tags).toLowerCase();

        if (text.indexOf(query) !== -1) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Active Nav Link Highlighting ---------- */
  function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Desktop nav
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var linkPage = href.split('/').pop();
      link.classList.toggle('active', linkPage === currentPage);
    });

    // Mobile nav
    document.querySelectorAll('#mobile-menu a').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var linkPage = href.split('/').pop();
      link.classList.toggle('active', linkPage === currentPage);
    });
  }

  setActiveNav();

  /* ---------- Fade-in on Scroll ---------- */
  var animateElements = document.querySelectorAll('[data-animate]');
  if (animateElements.length > 0) {
    var animateObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach(function (el) {
      el.style.opacity = '0';
      animateObserver.observe(el);
    });
  }
})();
