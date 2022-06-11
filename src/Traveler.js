import DestinationRepo from "./DestinationRepo";
const dayjs = require('dayjs');

class Traveler{
    constructor(id, trips) {
        this.id = id;
        this.allTrips = trips;
        this.destinationIDs = this.getDestinationIDs();
    };
    calculateAnnualCost(destinationrepo){

    }
    getDestinationIDs() {
        return this.allTrips.map(destination => destination.destinationID);
    };
    findPastTrips(){
        console.log(this.allTrips)
        this.allTrips.filter(function(trip){
            console.log(trip.date);
            console.log(dayjs(new Date()).format("YYYY/MM/DD"));

        });
    };

};

export default Traveler;