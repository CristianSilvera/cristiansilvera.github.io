const DEFAULT_LANG = "es";

async function initLanguage() {

    try {

        // Cargar translations.json
        const response = await fetch("./translations.json", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(
                `No se pudo cargar translations.json. HTTP ${response.status}`
            );
        }

        const translations = await response.json();

        // Recuperar idioma guardado
        const savedLanguage = localStorage.getItem("lang");

        const initialLanguage =
            savedLanguage && translations[savedLanguage]
                ? savedLanguage
                : DEFAULT_LANG;

        // Aplicar idioma inicial
        applyLanguage(initialLanguage, translations);

        // Selector de idioma
        const languageSwitch =
            document.getElementById("language-switch");

        if (languageSwitch) {

            languageSwitch.value = initialLanguage;

            languageSwitch.addEventListener("change", function () {

                const selectedLanguage = this.value;

                if (translations[selectedLanguage]) {

                    applyLanguage(
                        selectedLanguage,
                        translations
                    );

                }

            });
        }

    } catch (error) {

        console.error(
            "Error inicializando el sistema de idiomas:",
            error
        );

    }
}


function applyLanguage(lang, translations) {

    const dictionary = translations[lang];

    if (!dictionary) {
        console.error(
            `No existe traducción para el idioma: ${lang}`
        );
        return;
    }


    // ==========================================
    // TEXTOS
    // ==========================================

    document
        .querySelectorAll("[data-lang-key]")
        .forEach(element => {

            const key =
                element.getAttribute("data-lang-key");

            if (Object.prototype.hasOwnProperty.call(dictionary, key)) {

                element.textContent = dictionary[key];

            } else {

                console.warn(
                    `Falta la traducción "${key}" en "${lang}"`
                );

            }

        });


    // ==========================================
    // IDIOMA DEL DOCUMENTO
    // ==========================================

    document.documentElement.lang = lang;


    // ==========================================
    // GUARDAR IDIOMA
    // ==========================================

    localStorage.setItem("lang", lang);


    // ==========================================
    // ACTUALIZAR SELECTOR
    // ==========================================

    const languageSwitch =
        document.getElementById("language-switch");

    if (languageSwitch) {
        languageSwitch.value = lang;
    }

}


// ==========================================
// EJECUTAR CUANDO EL DOM ESTÉ LISTO
// ==========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initLanguage
    );

} else {

    initLanguage();

}
