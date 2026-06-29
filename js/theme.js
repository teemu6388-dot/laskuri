const Theme = {

    STORAGE_KEY: "laskurit_theme",

    init() {

        const saved = localStorage.getItem(this.STORAGE_KEY);

        if (saved === "dark") {

            document.body.classList.add("dark");

        }

        this.updateIcon();

    },

    toggle() {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(

            this.STORAGE_KEY,

            dark ? "dark" : "light"

        );

        this.updateIcon();

    },

    updateIcon() {

        const button =
            document.getElementById("themeToggle");

        if (!button) return;

        if (document.body.classList.contains("dark")) {

            button.textContent = "☀️";

            button.title = "Vaalea tila";

        } else {

            button.textContent = "🌙";

            button.title = "Tumma tila";

        }

    }

};

window.addEventListener(

    "DOMContentLoaded",

    () => Theme.init()

);
