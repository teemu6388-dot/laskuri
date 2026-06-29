const UI = {

    render() {

        this.renderActivities();

        this.renderVehicles();

        this.renderParticipants();

        this.updateSummary();

    },

    renderActivities() {

        const container = document.getElementById("activitiesList");

        container.innerHTML = "";

        if (App.project.activities.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    Ei harrastuksia.
                </div>
            `;

            return;

        }

        App.project.activities.forEach(activity => {

            container.appendChild(

                this.createActivityCard(activity)

            );

        });

    },

    renderVehicles() {

        const container = document.getElementById("vehiclesList");

        container.innerHTML = "";

        if (App.project.vehicles.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    Ei autoja.
                </div>
            `;

            return;

        }

        App.project.vehicles.forEach(vehicle => {

            container.appendChild(

                this.createVehicleCard(vehicle)

            );

        });

    },

    renderParticipants() {

        const container = document.getElementById("participantsList");

        container.innerHTML = "";

        if (App.project.participants.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    Ei osallistujia.
                </div>
            `;

            return;

        }

        App.project.participants.forEach(participant => {

            container.appendChild(

                this.createParticipantCard(participant)

            );

        });

    },

    updateSummary() {

        document.getElementById("activitiesTotal").textContent =
            App.project.getActivitiesTotal().toFixed(2) + " €";

        document.getElementById("vehiclesTotal").textContent =
            App.project.getVehiclesTotal().toFixed(2) + " €";

        document.getElementById("grandTotal").textContent =

         createActivityCard(activity) {

        const card = document.createElement("div");

        card.className = "item-card fade-in";

        card.innerHTML = `

            <div class="flex-between">

                <h3>${activity.name}</h3>

                <div>

                    <button class="icon-button edit-activity">
                        ✏️
                    </button>

                    <button class="icon-button delete-activity">
                        🗑️
                    </button>

                </div>

            </div>

            <p>Hinta / hlö: <strong>${activity.pricePerPerson.toFixed(2)} €</strong></p>

            <p>Osallistujia: <strong>${activity.participants}</strong></p>

            <p>Maksajia: <strong>${activity.payers}</strong></p>

            <hr>

            <p>Yhteensä:
                <strong>${activity.total().toFixed(2)} €</strong>
            </p>

            <p>Per maksaja:
                <strong>${activity.perPayer().toFixed(2)} €</strong>
            </p>

        `;

        card.querySelector(".delete-activity")

            .addEventListener("click", () => {

                if (confirm(`Poistetaanko "${activity.name}"?`)) {

                    App.deleteActivity(activity.id);

                }

            });

        card.querySelector(".edit-activity")

            .addEventListener("click", () => {

                UI.showActivityDialog(activity);

            });

        return card;

    },



    createVehicleCard(vehicle) {

        const card = document.createElement("div");

        card.className = "item-card fade-in";

        card.innerHTML = `

            <div class="flex-between">

                <h3>${vehicle.name}</h3>

                <div>

                    <button class="icon-button edit-vehicle">
                        ✏️
                    </button>

                    <button class="icon-button delete-vehicle">
                        🗑️
                    </button>

                </div>

            </div>

            <p>Matka:
                <strong>${vehicle.distance.toFixed(1)} km</strong>
            </p>

            <p>Kulutus:
                <strong>${vehicle.consumption.toFixed(1)} l /100 km</strong>
            </p>

            <p>Polttoaine:
                <strong>${vehicle.fuelPrice.toFixed(2)} €/l</strong>
            </p>

            <hr>

            <p>Litrat:
                <strong>${vehicle.liters().toFixed(2)} l</strong>
            </p>

            <p>Yhteensä:
                <strong>${vehicle.total().toFixed(2)} €</strong>
            </p>

            <p>Per maksaja:
                <strong>${vehicle.perPayer().toFixed(2)} €</strong>
            </p>

        `;

        card.querySelector(".delete-vehicle")

            .addEventListener("click", () => {

                if (confirm(`Poistetaanko "${vehicle.name}"?`)) {

                    App.deleteVehicle(vehicle.id);

                }

            });

        card.querySelector(".edit-vehicle")

            .addEventListener("click", () => {

                UI.showVehicleDialog(vehicle);

            });

        return card;

    },



    createParticipantCard(participant) {

        const card = document.createElement("div");

        card.className = "item-card fade-in";

        card.innerHTML = `

            <div class="flex-between">

                <h3>${participant.name}</h3>

                <div>

                    <button class="icon-button edit-participant">
                        ✏️
                    </button>

                    <button class="icon-button delete-participant">
                        🗑️
                    </button>

                </div>

            </div>

            <p>Harrastuksia:
                <strong>${participant.activities.length}</strong>
            </p>

            <p>Autoja:
                <strong>${participant.vehicles.length}</strong>
            </p>

            <hr>

            <p>Maksettavaa:

                <strong>

                    ${participant.grandTotal(App.project).toFixed(2)} €

                </strong>

            </p>

        `;

        card.querySelector(".delete-participant")

            .addEventListener("click", () => {

                if (confirm(`Poistetaanko "${participant.name}"?`)) {

                    App.deleteParticipant(participant.id);

                }

            });

        card.querySelector(".edit-participant")

            .addEventListener("click", () => {

                UI.showParticipantDialog(participant);

            });

        return card;

    },     

      showActivityDialog(activity = null) {

        const editing = activity !== null;

        const name = prompt(
            "Harrastuksen nimi",
            editing ? activity.name : ""
        );

        if (name === null || name.trim() === "") return;

        const price = Number(prompt(
            "Hinta / henkilö (€)",
            editing ? activity.pricePerPerson : 0
        ));

        const participants = Number(prompt(
            "Osallistujien määrä",
            editing ? activity.participants : 0
        ));

        const payers = Number(prompt(
            "Maksajien määrä",
            editing ? activity.payers : 1
        ));

        if (editing) {

            activity.setName(name);
            activity.setPrice(price);
            activity.setParticipants(participants);
            activity.setPayers(payers);

            App.save();
            this.render();

            return;

        }

        App.addActivity(

            new Activity(

                name,
                price,
                participants,
                payers

            )

        );

    },



    showVehicleDialog(vehicle = null) {

        const editing = vehicle !== null;

        const name = prompt(
            "Auton nimi",
            editing ? vehicle.name : ""
        );

        if (name === null || name.trim() === "") return;

        const distance = Number(prompt(
            "Matka (km)",
            editing ? vehicle.distance : 0
        ));

        const consumption = Number(prompt(
            "Kulutus (l / 100 km)",
            editing ? vehicle.consumption : 0
        ));

        const fuelPrice = Number(prompt(
            "Polttoaineen hinta (€/l)",
            editing ? vehicle.fuelPrice : 0
        ));

        const payers = Number(prompt(
            "Maksajien määrä",
            editing ? vehicle.payers : 1
        ));

        if (editing) {

            vehicle.setName(name);
            vehicle.setDistance(distance);
            vehicle.setConsumption(consumption);
            vehicle.setFuelPrice(fuelPrice);
            vehicle.setPayers(payers);

            App.save();
            this.render();

            return;

        }

        App.addVehicle(

            new Vehicle(

                name,
                distance,
                consumption,
                fuelPrice,
                payers

            )

        );

    },

showParticipantDialog(participant = null) {

    const editing = participant !== null;

    const name = prompt(
        "Osallistujan nimi",
        editing ? participant.name : ""
    );

    if (!name) return;

    let person = editing
        ? participant
        : new Participant(name);

    person.setName(name);

    // Harrastukset

    App.project.activities.forEach(activity => {

        const selected = confirm(
            `Osallistuuko "${name}" harrastukseen:\n\n${activity.name}?`
        );

        if (selected) {

            person.addActivity(activity.id);

        } else {

            person.removeActivity(activity.id);

        }

    });

    // Autot

    App.project.vehicles.forEach(vehicle => {

        const selected = confirm(
            `Osallistuuko "${name}" auton "${vehicle.name}" kuluihin?`
        );

        if (selected) {

            person.addVehicle(vehicle.id);

        } else {

            person.removeVehicle(vehicle.id);

        }

    });

    if (!editing) {

        App.addParticipant(person);

    } else {

        App.save();

        this.render();

    }

},

   

        App.addParticipant(

            new Participant(name)

        );

    },
            App.project.getGrandTotal().toFixed(2) + " €";

    },

createActivitiesChecklist(participant) {

    return App.project.activities.map(activity => `

        <label class="checkbox-row">

            <input
                type="checkbox"
                value="${activity.id}"
                ${participant.hasActivity(activity.id) ? "checked" : ""}
            >

            ${activity.name}

        </label>

    `).join("");

},

createVehiclesChecklist(participant) {

    return App.project.vehicles.map(vehicle => `

        <label class="checkbox-row">

            <input
                type="checkbox"
                value="${vehicle.id}"
                ${participant.hasVehicle(vehicle.id) ? "checked" : ""}
            >

            ${vehicle.name}

        </label>

    `).join("");

},
