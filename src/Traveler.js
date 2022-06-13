import DestinationRepo from "./DestinationRepo";
const dayjs = require('dayjs');

class Traveler{
    constructor(id, name, type, trips, destRepo) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.allTrips = trips;
        this.allDestinations = destRepo;
        this.pastTrips = "";
        this.pastTripKeys = this.findPastTrips();
        // this.destinationIDs = this.getDestinationIDs();
    };
    calculateAnnualCost(destinationrepo){

    }
    getDestinationIDs(trips) {
        return this.allTrips.map(destination => destination.destinationID);
    };



    findPastTrips(){
        let pastTrips = this.allTrips.filter(function(trip){
            let today = dayjs(new Date()).format("YYYY/MM/DD");
            if (trip.date < today){
                return trip;
            };
        });
        this.pastTrips = pastTrips;
        this.pastTripKeys = pastTrips;
        let keys = this.getDestinationIDs(this.pastTrips);
        return keys
    };
};

export default Traveler;