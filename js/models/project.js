class Project {

    constructor(name = "Uusi projekti") {

        this.id = crypto.randomUUID();

        this.version = "3.0.0";

        this.name = name;

        this.created = new Date().toISOString();

        this.modified = new Date().toISOString();

        this.activities = [];

        this.vehicles = [];

        this.participants = [];

        this.notes = "";

    }

    updateModified() {

        this.modified = new Date().toISOString();

    }

    setName(name) {

        this.name = name;

        this.updateModified();

    }

    setNotes(notes) {

        this.notes = notes;

        this.updateModified();

    }

    addActivity(activity) {

        this.activities.push(activity);

        this.updateModified();

    }

    removeActivity(id) {

        this.activities = this.activities.filter(a => a.id !== id);

        this.updateModified();

    }

    getActivity(id) {

        return this.activities.find(a => a.id === id);

    }

    addVehicle(vehicle) {

        this.vehicles.push(vehicle);

        this.updateModified();

    }

    removeVehicle(id) {

        this.vehicles = this.vehicles.filter(v => v.id !== id);

        this.updateModified();

    }

    getVehicle(id) {

        return this.vehicles.find(v => v.id === id);

    }

    addParticipant(participant) {

        this.participants.push(participant);

        this.updateModified();

    }

    removeParticipant(id) {

        this.participants =
            this.participants.filter(p => p.id !== id);

        this.updateModified();

    }

    getParticipant(id) {

        return this.participants.find(p => p.id === id);

    }

    getActivitiesTotal() {

        return this.activities.reduce(

            (sum, activity) => sum + activity.total(),

            0

        );

    }

    getVehiclesTotal() {

        return this.vehicles.reduce(

            (sum, vehicle) => sum + vehicle.total(),

            0

        );

    }

    getGrandTotal() {

        return (

            this.getActivitiesTotal()

            +

            this.getVehiclesTotal()

        );

    }

}
