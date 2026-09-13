// ==========================================
// DARK MODE
// ==========================================

let darkmode = localStorage.getItem("darkmode");

const themeSwitch = document.getElementById("theme-switch");


// Activar modo oscuro
const enableDarkmode = () => {

    document.body.classList.add("darkmode");

    localStorage.setItem(
        "darkmode",
        "active"
    );
};


// Desactivar modo oscuro
const disableDarkmode = () => {

    document.body.classList.remove("darkmode");

    localStorage.setItem(
        "darkmode",
        "inactive"
    );
};


// Recuperar preferencia guardada
if (darkmode === "active") {

    enableDarkmode();

}


// Botón de cambio de tema
if (themeSwitch) {

    themeSwitch.addEventListener(
        "click",
        () => {

            darkmode =
                localStorage.getItem("darkmode");

            if (darkmode !== "active") {

                enableDarkmode();

            } else {

                disableDarkmode();

            }

        }
    );

}


// ==========================================
// COPYRIGHT
// ==========================================

const currentYear =
    document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}
