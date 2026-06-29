const App = {

    version: "3.0.0",

    project: null,

    init() {

        console.log("Laskurit v" + this.version);

        this.project = Storage.load();

        this.bindEvents();

        UI.render();

    },

    bindEvents() {

        // Tumma tila
        const themeButton = document.getElementById("themeToggle");

        if (themeButton) {

            themeButton.addEventListener("click", () => {

                Theme.toggle();

            });

        }

        // Lisää harrastus
        const addActivityBtn = document.getElementById("addActivityBtn");

        if (addActivityBtn) {

            addActivityBtn.addEventListener("click", () => {

                UI.showActivityDialog();

            });

        }

        // Lisää auto
        const addVehicleBtn = document.getElementById("addVehicleBtn");

        if (addVehicleBtn) {

            addVehicleBtn.addEventListener("click", () => {

                UI.showVehicleDialog();

            });

        }

        // Lisää osallistuja
        const addParticipantBtn = document.getElementById("addParticipantBtn");

        if (addParticipantBtn) {

            addParticipantBtn.addEventListener("click", () => {

                UI.showParticipantDialog();

            });

        }

        // Muistiinpanot

        const notes = document.getElementById("notes");

        if (notes) {

            notes.value = this.project.notes;

            notes.addEventListener("input", e => {

                this.project.setNotes(e.target.value);

                this.save();

            });

        }

        // lb → kg

        const lbInput = document.getElementById("lbInput");

        if (lbInput) {

            lbInput.addEventListener("input", e => {

                const lb = Number(e.target.value);

                const kg = lb * 0.45359237;

                document.getElementById("kgResult").textContent =

                    kg.toFixed(2) + " kg";

            });

        }

    },

    save() {

        Storage.save(this.project);

        UI.updateSummary();

    },

    addActivity(activity) {

        this.project.addActivity(activity);

        this.save();

        UI.render();

    },

    addVehicle(vehicle) {

        this.project.addVehicle(vehicle);

        this.save();

        UI.render();

    },

    addParticipant(participant) {

        this.project.addParticipant(participant);

        this.save();

        UI.render();

    },

    deleteActivity(id) {

        this.project.removeActivity(id);

        this.save();

        UI.render();

    },

    deleteVehicle(id) {

        this.project.removeVehicle(id);

        this.save();

        UI.render();

    },

    deleteParticipant(id) {

        this.project.removeParticipant(id);

        this.save();

        UI.render();

    }

};

window.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
