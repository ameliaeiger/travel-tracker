const dayjs = require('dayjs');

class Traveler{
    constructor(id, name, type, trips) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.trips = trips;
    };
    getDestinationIDs(trips) {
        return trips.map(destination => destination.destinationID);
    };
};

export default Traveler;