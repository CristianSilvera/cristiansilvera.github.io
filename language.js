```javascript
// =========================================
// SISTEMA DE IDIOMAS
// =========================================

const languageSwitch = document.getElementById('language-switch');

const translatePage = async (lang) => {
    try {
        // Cargar traducciones
        const response = await fetch('./translations.json', {
            cache: 'no-cache'
        });

        if (!response.ok) {
            throw new Error(
                `No se pudo cargar translations.json. HTTP ${response.status}`
            );
        }

        const translations = await response.json();

        // Verificar que exista el idioma solicitado
        if (!translations[lang]) {
            throw new Error(`El idioma "${lang}" no existe en translations.json`);
        }

        // Traducir elementos de la página
        const elements = document.querySelectorAll('[data-lang-key]');

        elements.forEach((element) => {
            const key = element.getAttribute('data-lang-key');

            if (translations[lang][key] !== undefined) {
                element.textContent = translations[lang][key];
            }
        });

        // Actualizar idioma del documento
        document.documentElement.lang = lang;

        // Actualizar título de la pestaña
        const titles = {
            es: 'Cristian Silvera - QA Engineer | Software Tester',
            en: 'Cristian Silvera - QA Engineer | Software Tester',
            pt: 'Cristian Silvera - QA Engineer | Testador de Software'
        };

        document.title = titles[lang] || titles.es;

        // Guardar idioma seleccionado
        localStorage.setItem('language', lang);

        // Mantener el selector sincronizado
        languageSwitch.value = lang;

        console.log(`Idioma cambiado correctamente a: ${lang}`);

    } catch (error) {
        console.error('Error al cargar las traducciones:', error);
    }
};


// =========================================
// IDIOMA INICIAL
// =========================================

const savedLanguage = localStorage.getItem('language') || 'es';

// Establecer idioma seleccionado
languageSwitch.value = savedLanguage;

// Traducir página
translatePage(savedLanguage);


// =========================================
// CAMBIO DE IDIOMA
// =========================================

languageSwitch.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;

    translatePage(selectedLanguage);
});
```
