(function () {
  var path = window.location.pathname;
  var isEnglishPage = path.indexOf('/en/') !== -1 || path.endsWith('/en');

  // Build redirect URLs relative to current page
  function toEnglish() {
    var base = path.substring(0, path.lastIndexOf('/'));
    return base + '/en/index.html';
  }

  function toPortuguese() {
    var base = path.substring(0, path.lastIndexOf('/'));
    // go up from /en/ to parent
    var parent = base.substring(0, base.lastIndexOf('/'));
    return parent + '/index.html';
  }

  var stored = localStorage.getItem('lang');

  if (stored) {
    if (stored === 'en' && !isEnglishPage) {
      window.location.replace(toEnglish());
      return;
    }
    if (stored === 'pt' && isEnglishPage) {
      window.location.replace(toPortuguese());
      return;
    }
  } else {
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var detectedLang = 'pt';

    if (browserLang.startsWith('en')) {
      detectedLang = 'en';
    } else if (browserLang.startsWith('pt')) {
      detectedLang = 'pt';
    }

    localStorage.setItem('lang', detectedLang);

    if (detectedLang === 'en' && !isEnglishPage) {
      window.location.replace(toEnglish());
      return;
    }
    if (detectedLang === 'pt' && isEnglishPage) {
      window.location.replace(toPortuguese());
      return;
    }
  }

  // Save language preference when clicking switcher buttons
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        localStorage.setItem('lang', btn.textContent.trim().toLowerCase());
      });
    });
  });
})();
