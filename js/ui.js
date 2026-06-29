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
                    Ei aktiviteetteja lisättynä.
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
                    Ei autoja lisättynä.
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
                    Ei osallistujia lisättynä.
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
            App.project.getGrandTotal().toFixed(2) + " €";

    },

    formatMoney(value) {

        return Number(value).toFixed(2) + " €";

    },

    formatNumber(value, decimals = 1) {

        return Number(value).toFixed(decimals);

    },

    createButton(icon, className, title) {

        const button = document.createElement("button");

        button.className = `icon-button ${className}`;

        button.title = title;

        button.textContent = icon;

        return button;

    },

        createActivityCard(activity) {

        const card = document.createElement("div");
        card.className = "item-card slide-up";

        card.innerHTML = `
            <div class="flex-between">

                <div>

                    <h3>${activity.name}</h3>

                    <p>Hinta / hlö:
                        <strong>${this.formatMoney(activity.pricePerPerson)}</strong>
                    </p>

                    <p>Osallistujia:
                        <strong>${activity.participants}</strong>
                    </p>

                    <p>Maksajia:
                        <strong>${activity.payers}</strong>
                    </p>

                    <p>Yhteensä:
                        <strong>${this.formatMoney(activity.total())}</strong>
                    </p>

                    <p>Per maksaja:
                        <strong>${this.formatMoney(activity.perPayer())}</strong>
                    </p>

                </div>

                <div class="flex-column gap-10"></div>

            </div>
        `;

        const actions = card.querySelector(".flex-column");

        const editButton =
            this.createButton("✏️", "edit", "Muokkaa");

        editButton.onclick = () => {

            this.showActivityDialog(activity);

        };

        const deleteButton =
            this.createButton("🗑️", "delete", "Poista");

        deleteButton.onclick = () => {

            if (confirm(`Poistetaanko "${activity.name}"?`)) {

                App.deleteActivity(activity.id);

            }

        };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        return card;

    },



    createVehicleCard(vehicle) {

        const card = document.createElement("div");

        card.className = "item-card slide-up";

        card.innerHTML = `
            <div class="flex-between">

                <div>

                    <h3>${vehicle.name}</h3>

                    <p>Matka:
                        <strong>${this.formatNumber(vehicle.distance)} km</strong>
                    </p>

                    <p>Kulutus:
                        <strong>${this.formatNumber(vehicle.consumption)} l /100 km</strong>
                    </p>

                    <p>Polttoaine:
                        <strong>${this.formatMoney(vehicle.fuelPrice)}</strong>
                    </p>

                    <p>Litrat:
                        <strong>${this.formatNumber(vehicle.liters(),2)} l</strong>
                    </p>

                    <p>Yhteensä:
                        <strong>${this.formatMoney(vehicle.total())}</strong>
                    </p>

                    <p>Per maksaja:
                        <strong>${this.formatMoney(vehicle.perPayer())}</strong>
                    </p>

                </div>

                <div class="flex-column gap-10"></div>

            </div>
        `;

        const actions = card.querySelector(".flex-column");

        const editButton =
            this.createButton("✏️", "edit", "Muokkaa");

        editButton.onclick = () => {

            this.showVehicleDialog(vehicle);

        };

        const deleteButton =
            this.createButton("🗑️", "delete", "Poista");

        deleteButton.onclick = () => {

            if (confirm(`Poistetaanko "${vehicle.name}"?`)) {

                App.deleteVehicle(vehicle.id);

            }

        };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        return card;

    },



    createParticipantCard(participant) {

        const card = document.createElement("div");

        card.className = "item-card slide-up";

        card.innerHTML = `
            <div class="flex-between">

                <div>

                    <h3>${participant.name}</h3>

                    <p>Aktiviteetteja:
                        <strong>${participant.activities.length}</strong>
                    </p>

                    <p>Autoja:
                        <strong>${participant.vehicles.length}</strong>
                    </p>

                    <p>Maksettavaa:
                        <strong>${this.formatMoney(
                            participant.grandTotal(App.project)
                        )}</strong>
                    </p>

                </div>

                <div class="flex-column gap-10"></div>

            </div>
        `;

        const actions = card.querySelector(".flex-column");

        const editButton =
            this.createButton("✏️", "edit", "Muokkaa");

        editButton.onclick = () => {

            this.showParticipantDialog(participant);

        };

        const deleteButton =
            this.createButton("🗑️", "delete", "Poista");

        deleteButton.onclick = () => {

            if (confirm(`Poistetaanko "${participant.name}"?`)) {

                App.deleteParticipant(participant.id);

            }

        };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        return card;

    },

        openSheet(title, html, onSave) {

        const overlay =
            document.getElementById("overlay");

        const sheet =
            document.getElementById("bottomSheet");

        const content =
            document.getElementById("sheetContent");

        content.innerHTML = `

            <h2>${title}</h2>

            <div class="mt-20">

                ${html}

            </div>

            <div class="flex gap-10 mt-20">

                <button
                    id="sheetCancel"
                    class="primary-button w-100">

                    Peruuta

                </button>

                <button
                    id="sheetSave"
                    class="primary-button w-100">

                    Tallenna

                </button>

            </div>

        `;

        overlay.classList.remove("hidden");

        sheet.classList.remove("hidden");

        document
            .getElementById("sheetCancel")
            .onclick = () => this.closeSheet();

        overlay.onclick = () => this.closeSheet();

        document
            .getElementById("sheetSave")
            .onclick = () => {

                onSave();

                this.closeSheet();

            };

    },



    closeSheet() {

        document
            .getElementById("overlay")
            .classList.add("hidden");

        document
            .getElementById("bottomSheet")
            .classList.add("hidden");

    },



    toast(message = "Tallennettu") {

        const toast =
            document.getElementById("toast");

        toast.textContent = message;

        toast.classList.remove("hidden");

        setTimeout(() => {

            toast.classList.add("hidden");

        }, 2000);

    },



    createActivitiesChecklist(participant) {

        return App.project.activities.map(activity => `

            <label class="checkbox-row">

                <input
                    type="checkbox"
                    class="activity-checkbox"
                    value="${activity.id}"
                    ${participant.hasActivity(activity.id)
                        ? "checked"
                        : ""}>

                <span>

                    ${activity.name}

                </span>

            </label>

        `).join("");

    },



    createVehiclesChecklist(participant) {

        return App.project.vehicles.map(vehicle => `

            <label class="checkbox-row">

                <input
                    type="checkbox"
                    class="vehicle-checkbox"
                    value="${vehicle.id}"
                    ${participant.hasVehicle(vehicle.id)
                        ? "checked"
                        : ""}>

                <span>

                    ${vehicle.name}

                </span>

            </label>

        `).join("");

    },
        showActivityDialog(activity = null) {

        const editing = activity !== null;

        this.openSheet(

            editing ? "Muokkaa aktiviteettia" : "Lisää aktiviteetti",

            `
            <label>Nimi</label>
            <input id="activityName" value="${editing ? activity.name : ""}">

            <label class="mt-20">Hinta / henkilö (€)</label>
            <input id="activityPrice" type="number" step="0.01"
                   value="${editing ? activity.pricePerPerson : 0}">

            <label class="mt-20">Osallistujia</label>
            <input id="activityParticipants" type="number"
                   value="${editing ? activity.participants : 0}">

            <label class="mt-20">Maksajia</label>
            <input id="activityPayers" type="number"
                   value="${editing ? activity.payers : 1}">
            `,

            () => {

                const name =
                    document.getElementById("activityName").value.trim();

                if (!name) {

                    this.toast("Anna aktiviteetin nimi");

                    return;

                }

                const price =
                    Number(document.getElementById("activityPrice").value);

                const participants =
                    Number(document.getElementById("activityParticipants").value);

                const payers =
                    Number(document.getElementById("activityPayers").value);

                if (editing) {

                    activity.setName(name);
                    activity.setPrice(price);
                    activity.setParticipants(participants);
                    activity.setPayers(payers);

                    App.save();

                } else {

                    App.addActivity(

                        new Activity(
                            name,
                            price,
                            participants,
                            payers
                        )

                    );

                }

                this.render();

                this.toast("Aktiviteetti tallennettu");

            }

        );

    },



    showVehicleDialog(vehicle = null) {

        const editing = vehicle !== null;

        this.openSheet(

            editing ? "Muokkaa autoa" : "Lisää autoa",

            `
            <label>Nimi</label>
            <input id="vehicleName" value="${editing ? vehicle.name : ""}">

            <label class="mt-20">Matka (km)</label>
            <input id="vehicleDistance" type="number"
                   value="${editing ? vehicle.distance : 0}">

            <label class="mt-20">Kulutus (l /100 km)</label>
            <input id="vehicleConsumption" type="number" step="0.1"
                   value="${editing ? vehicle.consumption : 0}">

            <label class="mt-20">Polttoaine €/l</label>
            <input id="vehicleFuelPrice" type="number" step="0.01"
                   value="${editing ? vehicle.fuelPrice : 0}">

            <label class="mt-20">Maksajia</label>
            <input id="vehiclePayers" type="number"
                   value="${editing ? vehicle.payers : 1}">
            `,

            () => {

                const name =
                    document.getElementById("vehicleName").value.trim();

                if (!name) {

                    this.toast("Anna auton nimi");

                    return;

                }

                const distance =
                    Number(document.getElementById("vehicleDistance").value);

                const consumption =
                    Number(document.getElementById("vehicleConsumption").value);

                const fuel =
                    Number(document.getElementById("vehicleFuelPrice").value);

                const payers =
                    Number(document.getElementById("vehiclePayers").value);

                if (editing) {

                    vehicle.setName(name);
                    vehicle.setDistance(distance);
                    vehicle.setConsumption(consumption);
                    vehicle.setFuelPrice(fuel);
                    vehicle.setPayers(payers);

                    App.save();

                } else {

                    App.addVehicle(

                        new Vehicle(
                            name,
                            distance,
                            consumption,
                            fuel,
                            payers
                        )

                    );

                }

                this.render();

                this.toast("Auto tallennettu");

            }

        );

    },



    showParticipantDialog(participant = null) {

        const editing = participant !== null;

        const person =
            editing ? participant : new Participant("");

        this.openSheet(

            editing ? "Muokkaa osallistujaa" : "Lisää osallistuja",

            `
            <label>Nimi</label>

            <input id="participantName"
                   value="${person.name}">

            <h3 class="mt-20">Harrastukset</h3>

            ${this.createActivitiesChecklist(person)}

            <h3 class="mt-20">Autot</h3>

            ${this.createVehiclesChecklist(person)}
            `,

            () => {

                const name =
                    document.getElementById("participantName").value.trim();

                if (!name) {

                    this.toast("Anna osallistujan nimi");

                    return;

                }

                person.setName(name);

                person.activities = [];
                person.vehicles = [];

                document
                    .querySelectorAll(".activity-checkbox")
                    .forEach(cb => {

                        if (cb.checked) {

                            person.addActivity(cb.value);

                        }

                    });

                document
                    .querySelectorAll(".vehicle-checkbox")
                    .forEach(cb => {

                        if (cb.checked) {

                            person.addVehicle(cb.value);

                        }

                    });

                if (!editing) {

                    App.addParticipant(person);

                } else {

                    App.save();

                }

                this.render();

                this.toast("Osallistuja tallennettu");

            }

        );

    }

};
