document.addEventListener("DOMContentLoaded", function() {
  // CURSEUR CUSTOM
  const cursor = document.querySelector('.custom-cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('button, a, input, textarea, [tabindex]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
    });
  });

  // THEME SWITCH + SVG MINIMALISTE
  const themeSwitch = document.getElementById('themeSwitch');
  function setThemeIcon(isDark) {
    if (!themeSwitch) return;
    if (isDark) {
      // Lune minimaliste
      themeSwitch.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 14.5A7 7 0 1 1 12.5 3a6 6 0 1 0 4.5 11.5z" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      `;
    } else {
      // Soleil minimaliste
      themeSwitch.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <g stroke="currentColor" stroke-width="2">
            <line x1="12" y1="2" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="2" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </g>
        </svg>
      `;
    }
  }
  let darkMode = localStorage.getItem('theme') === 'dark';
  if (darkMode) document.body.classList.add('dark');
  setThemeIcon(document.body.classList.contains('dark')); // Affiche bon icône au load

  if (themeSwitch) {
    themeSwitch.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      setThemeIcon(document.body.classList.contains('dark'));
      updateLogoForTheme();
    });
  }

  // LOGO QUI SUIT LE THÈME
  const logoImg = document.getElementById('logoImg');
  function updateLogoForTheme() {
    if (!logoImg) return;
    if (document.body.classList.contains('dark')) {
      logoImg.src = '../img/logo-light.png';
    } else {
      logoImg.src = '../img/logo-dark.png';
    }
  }
  updateLogoForTheme();

  // SWITCH LANGUE
  const langSwitch = document.getElementById('langSwitch');
  let currentLang = localStorage.getItem('lang') || 'fr';
  function updateLang(lang) {
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang);
    });
    localStorage.setItem('lang', lang);
    if (langSwitch) {
      langSwitch.textContent = lang === 'fr' ? 'EN' : 'FR';
      langSwitch.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Basculer en français');
    }
  }
  if (langSwitch) {
    langSwitch.addEventListener('click', function() {
      currentLang = (currentLang === 'fr' ? 'en' : 'fr');
      updateLang(currentLang);
    });
    updateLang(currentLang);
  }

  // RACCOURCIS CLAVIER
  document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key.toLowerCase() === 'c') window.location.href = 'contact.html';
    if (e.altKey && e.key.toLowerCase() === 'a') window.location.href = 'about.html';
    if (e.altKey && e.key.toLowerCase() === 'p') window.location.href = 'portfolio.html';
    if (e.altKey && e.key.toLowerCase() === 'i') window.location.href = 'index.html';
  });

  // EFFET SONORE
  const sound = document.getElementById('sound');
  const entrerBtn = document.getElementById('entrerBtn');
  if (entrerBtn && sound) {
    entrerBtn.addEventListener('click', function() {
      sound.currentTime = 0;
      sound.play();
      setTimeout(function(){
        window.location.href = 'portfolio.html';
      }, 400);
    });
  }
  const portfolioBtn = document.getElementById('portfolioBtn');
  if (portfolioBtn && sound) {
    portfolioBtn.addEventListener('click', function() {
      sound.currentTime = 0;
      sound.play();
      setTimeout(function(){
        window.open('https://nathan02gene11b0.myportfolio.com/', '_blank');
      }, 380);
    });
  }

  // CONTACT FORM FEEDBACK
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert(currentLang === 'fr'
        ? 'Merci pour votre message ! Je vous répondrai rapidement.'
        : 'Thank you for your message! I will get back to you soon.'
      );
      contactForm.reset();
    });
  }

  // PWA SERVICE WORKER
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }

  // MENU BURGER FLOATING
  const floatingBurger = document.querySelector('.floating-burger-menu');
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerLinks = document.getElementById('burgerLinks');
  const burgerEntrer = document.getElementById('burgerEntrer');

  if (burgerBtn && floatingBurger) {
    burgerBtn.addEventListener('click', function() {
      floatingBurger.classList.toggle('open');
      // Focus premier lien accessibilité
      if (floatingBurger.classList.contains('open')) {
        setTimeout(() => {
          const firstLink = burgerLinks.querySelector('.burger-link');
          if (firstLink) firstLink.focus();
        }, 180);
      }
    });
    // Fermer ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape" && floatingBurger.classList.contains('open')) {
        floatingBurger.classList.remove('open');
        burgerBtn.focus();
      }
    });
  }
  // Effet sonore bouton "Entrer"
  if (burgerEntrer && sound) {
    burgerEntrer.addEventListener('click', function() {
      sound.currentTime = 0;
      sound.play();
      setTimeout(function(){
        window.location.href = 'portfolio.html';
      }, 400);
    });
  }

});
