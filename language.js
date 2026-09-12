// language.js
const translations = {
  es: {
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.education": "Educación",
    "nav.contact": "Contacto",
    "hero.title": "Cristian Silvera",
    "hero.subtitle": "QA Engineer | Software Tester | Test Automation",
    "hero.description": "Asegurando la calidad del software mediante pruebas manuales y automatizadas.",
    "btn.download": "Descargar CV",
    "btn.contact": "Contáctame"
    // ... el resto de tus claves
  },
  en: {
    "nav.about": "About me",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "hero.title": "Cristian Silvera",
    "hero.subtitle": "QA Engineer | Software Tester | Test Automation",
    "hero.description": "Ensuring software quality through manual and automated testing.",
    "btn.download": "Download CV",
    "btn.contact": "Contact me"
    // ... el resto de tus claves
  }
};

const DEFAULT_LANG = "es";

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // Elementos de texto
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      // Si el elemento tiene data-i18n-attr, cambia ese atributo (ej: placeholder, title)
      const attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, dict[key]);
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Elementos con HTML (negritas, links, etc.)
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  // Atributos específicos: placeholder, title, aria-label, alt
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] !== undefined) el.setAttribute("title", dict[key]);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(el => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key] !== undefined) el.setAttribute("alt", dict[key]);
  });

  // Actualizar <html lang>
  document.documentElement.lang = lang;

  // Actualizar el texto del botón
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.textContent = lang === "es" ? "EN" : "ES";
    btn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a Español");
  }

  // Guardar preferencia
  localStorage.setItem("lang", lang);
}

function initLanguage() {
  const saved = localStorage.getItem("lang");
  const initial = saved && translations[saved] ? saved : DEFAULT_LANG;
  applyLanguage(initial);

  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = localStorage.getItem("lang") || DEFAULT_LANG;
      const next = current === "es" ? "en" : "es";
      applyLanguage(next);
    });
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguage);
} else {
  initLanguage();
}
