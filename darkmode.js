// Dark mode functionality
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');
const languageSwitch = document.getElementById('language-switch');

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode');
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// Language functionality
const translatePage = async (lang) => {
  try {
    const response = await fetch('translations.json');
    const translations = await response.json();
    const elements = document.querySelectorAll('[data-lang-key]');

    elements.forEach((el) => {
      const key = el.getAttribute('data-lang-key');
      el.textContent = translations[lang][key] || el.textContent;
    });

    localStorage.setItem('language', lang);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
};

// Set initial language from localStorage or default to Spanish
const savedLanguage = localStorage.getItem('language') || 'es';
languageSwitch.value = savedLanguage;
translatePage(savedLanguage);

languageSwitch.addEventListener('change', (event) => {
  translatePage(event.target.value);
});
