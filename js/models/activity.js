class Activity {

    constructor(
        name,
        pricePerPerson = 0,
        participants = 0,
        payers = 1
    ) {

        this.id = crypto.randomUUID();

        this.name = name;

        this.pricePerPerson = Number(pricePerPerson);

        this.participants = Number(participants);

        this.payers = Number(payers);

    }

    total() {

        return this.pricePerPerson * this.participants;

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

    setPrice(price) {

        this.pricePerPerson = Number(price);

    }

    setParticipants(count) {

        this.participants = Number(count);

    }

    setPayers(count) {

        this.payers = Number(count);

    }

    toJSON() {

        return {

            id: this.id,

            name: this.name,

            pricePerPerson: this.pricePerPerson,

            participants: this.participants,

            payers: this.payers

        };

    }

    static fromJSON(data) {

        const activity = new Activity(

            data.name,

            data.pricePerPerson,

            data.participants,

            data.payers

        );

        activity.id = data.id;

        return activity;

    }

}
