class Vehicle {

    constructor(
        name,
        distance = 0,
        consumption = 0,
        fuelPrice = 0,
        payers = 1
    ) {

        this.id = crypto.randomUUID();

        this.name = name;

        this.distance = Number(distance);

        this.consumption = Number(consumption);

        this.fuelPrice = Number(fuelPrice);

        this.payers = Number(payers);

    }

    liters() {

        return (this.distance / 100) * this.consumption;

    }

    total() {

        return this.liters() * this.fuelPrice;

    }

    perPayer() {

        if (this.payers <= 0) {

            return 0;

        }

        return this.total() / this.payers;

    }

    setName(name) {

        this.name = name;

    }

    setDistance(distance) {

        this.distance = Number(distance);

    }

    setConsumption(consumption) {

        this.consumption = Number(consumption);

    }

    setFuelPrice(price) {

        this.fuelPrice = Number(price);

    }

    setPayers(count) {

        this.payers = Number(count);

    }

    toJSON() {

        return {

            id: this.id,

            name: this.name,

            distance: this.distance,

            consumption: this.consumption,

            fuelPrice: this.fuelPrice,

            payers: this.payers

        };

    }

    static fromJSON(data) {

        const vehicle = new Vehicle(

            data.name,

            data.distance,

            data.consumption,

            data.fuelPrice,

            data.payers

        );

        vehicle.id = data.id;

        return vehicle;

    }

}
