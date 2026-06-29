class Participant {

    constructor(name) {

        this.id = crypto.randomUUID();

        this.name = name;

        // Harrastukset joissa henkilö on mukana
        this.activities = [];

        // Autot joiden kuluihin henkilö osallistuu
        this.vehicles = [];

    }

    setName(name) {

        this.name = name;

    }

    addActivity(activityId) {

        if (!this.activities.includes(activityId)) {

            this.activities.push(activityId);

        }

    }

    removeActivity(activityId) {

        this.activities = this.activities.filter(
            id => id !== activityId
        );

    }

    hasActivity(activityId) {

        return this.activities.includes(activityId);

    }

    addVehicle(vehicleId) {

        if (!this.vehicles.includes(vehicleId)) {

            this.vehicles.push(vehicleId);

        }

    }

    removeVehicle(vehicleId) {

        this.vehicles = this.vehicles.filter(
            id => id !== vehicleId
        );

    }

    hasVehicle(vehicleId) {

        return this.vehicles.includes(vehicleId);

    }

    activityTotal(project) {

        let total = 0;

        project.activities.forEach(activity => {

            if (this.hasActivity(activity.id)) {

                total += activity.perPayer();

            }

        });

        return total;

    }

    vehicleTotal(project) {

        let total = 0;

        project.vehicles.forEach(vehicle => {

            if (this.hasVehicle(vehicle.id)) {

                total += vehicle.perPayer();

            }

        });

        return total;

    }

    grandTotal(project) {

        return (

            this.activityTotal(project)

            +

            this.vehicleTotal(project)

        );

    }

    toJSON() {

        return {

            id: this.id,

            name: this.name,

            activities: this.activities,

            vehicles: this.vehicles

        };

    }

    static fromJSON(data) {

        const participant = new Participant(data.name);

        participant.id = data.id;

        participant.activities = data.activities || [];

        participant.vehicles = data.vehicles || [];

        return participant;

    }

}
