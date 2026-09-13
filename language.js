const DEFAULT_LANG = "es";
const TRANSLATIONS_FILE = "translations.json";

/**
 * Carga las traducciones desde translations.json
 */
async function loadTranslations() {
    try {
        const response = await fetch(TRANSLATIONS_FILE, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `No se pudo cargar ${TRANSLATIONS_FILE}. HTTP ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {
        console.error("Error cargando translations.json:", error);
        return null;
    }
}


/**
 * Aplica el idioma seleccionado a todos
 * los elementos que tengan data-lang-key.
 */
function applyLanguage(lang, translations) {

    if (!translations || !translations[lang]) {
        console.error(`No existe el idioma: ${lang}`);
        return;
    }

    const dictionary = translations[lang];

    /*
     * Elementos normales de texto
     *
     * Ejemplo:
     * <h2 data-lang-key="profile">Perfil profesional</h2>
     */
    document.querySelectorAll("[data-lang-key]").forEach(element => {

        const key = element.getAttribute("data-lang-key");

        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        } else {
            console.warn(
                `Traducción no encontrada: "${key}" para "${lang}"`
            );
        }
    });


    /*
     * Elementos que necesitan HTML interno.
     *
     * Ejemplo:
     * <p data-lang-html-key="profile-text"></p>
     */
    document.querySelectorAll("[data-lang-html-key]").forEach(element => {

        const key = element.getAttribute("data-lang-html-key");

        if (dictionary[key] !== undefined) {
            element.innerHTML = dictionary[key];
        } else {
            console.warn(
                `Traducción HTML no encontrada: "${key}" para "${lang}"`
            );
        }
    });


    /*
     * Atributos personalizados.
     *
     * Ejemplo:
     * <input data-lang-key="email" data-lang-attribute="placeholder">
     */
    document.querySelectorAll("[data-lang-key][data-lang-attribute]").forEach(element => {

        const key = element.getAttribute("data-lang-key");
        const attribute = element.getAttribute("data-lang-attribute");

        if (dictionary[key] !== undefined) {
            element.setAttribute(attribute, dictionary[key]);
        }
    });


    /*
     * Actualizar atributo lang del documento.
     */
    document.documentElement.lang = lang;


    /*
     * Actualizar selector de idioma.
     */
    const languageSwitch = document.getElementById("language-switch");

    if (languageSwitch) {
        languageSwitch.value = lang;
    }


    /*
     * Guardar idioma seleccionado.
     */
    localStorage.setItem("lang", lang);
}


/**
 * Inicializa el sistema de idiomas.
 */
async function initLanguage() {

    const translations = await loadTranslations();

    if (!translations) {
        console.error(
            "No se pudo inicializar el sistema de idiomas."
        );
        return;
    }


    /*
     * Recuperar idioma guardado.
     */
    const savedLanguage = localStorage.getItem("lang");


    /*
     * Determinar idioma inicial.
     *
     * Si existe un idioma guardado y está disponible,
     * se utiliza.
     *
     * De lo contrario, se utiliza español.
     */
    const initialLanguage =
        savedLanguage && translations[savedLanguage]
            ? savedLanguage
            : DEFAULT_LANG;


    /*
     * Aplicar idioma inicial.
     */
    applyLanguage(initialLanguage, translations);


    /*
     * Selector de idioma.
     */
    const languageSwitch = document.getElementById("language-switch");

    if (languageSwitch) {

        languageSwitch.addEventListener("change", function () {

            const selectedLanguage = this.value;

            if (translations[selectedLanguage]) {

                applyLanguage(
                    selectedLanguage,
                    translations
                );

            } else {

                console.error(
                    `Idioma no disponible: ${selectedLanguage}`
                );
            }
        });
    }
}


/**
 * Ejecutar cuando el DOM esté listo.
 */
if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initLanguage
    );

} else {

    initLanguage();

}
