class Storage {

    static KEY = "laskurit_v3_project";

    /**
     * Tallentaa koko projektin localStorageen
     */
    static save(project) {

        if (!project) return;

        project.updateModified();

        localStorage.setItem(

            Storage.KEY,

            JSON.stringify(project)

        );

    }

    /**
     * Lataa projektin
     */
    static load() {

        const json = localStorage.getItem(Storage.KEY);

        if (!json) {

            return new Project();

        }

        try {

            const data = JSON.parse(json);

            const project = new Project(data.name);

            project.id = data.id;
            project.version = data.version;
            project.created = data.created;
            project.modified = data.modified;
            project.notes = data.notes || "";

            // Harrastukset
            project.activities = (data.activities || []).map(a =>
                Activity.fromJSON(a)
            );

            // Autot
            project.vehicles = (data.vehicles || []).map(v =>
                Vehicle.fromJSON(v)
            );

            // Osallistujat
            project.participants = (data.participants || []).map(p =>
                Participant.fromJSON(p)
            );

            return project;

        }

        catch (e) {

            console.error("Projektin lataus epäonnistui", e);

            return new Project();

        }

    }

    /**
     * Tyhjentää tallennetun projektin
     */
    static clear() {

        localStorage.removeItem(Storage.KEY);

    }

    /**
     * Vie projektin JSON-muodossa
     */
    static export(project) {

        return JSON.stringify(project, null, 4);

    }

    /**
     * Tuo JSON
     */
    static import(json) {

        try {

            localStorage.setItem(

                Storage.KEY,

                json

            );

            return Storage.load();

        }

        catch (e) {

            console.error(e);

            return new Project();

        }

    }

}
