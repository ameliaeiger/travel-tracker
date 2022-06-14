import DestinationRepo from "./DestinationRepo";
const dayjs = require('dayjs');

class Traveler{
    constructor(id, name, type, trips) {
        this.id = id;
        this.name = name;
        this.type = type;
        // this.allTrips = trips;
        // this.allDestinations = destRepo;
        // this.pastTrips = "";
        // this.pastTripKeys = this.findPastTrips();
        // this.futureTrips = "";
        // this.futureTripKeys = this.findFutureTrips();
        // this.destinationIDs = this.getDestinationIDs();
    };

    getDestinationIDs(trips) {
        return trips.map(destination => destination.destinationID);
    };
    // findTotalCost(){
    //     let object;
    //     let objectArray = [];

    //     console.log("Past Trips: ", this.pastTrips)
    //     this.allDestinations.destinations.filter(destination => {
    //         if (this.pastTripKeys.includes(destination.id)){
    //             let numTravelers = this.pastTrips[0].travelers;
    //             let duration = this.pastTrips[0].duration;
    //             object = {
    //                 ["id"]: destination.id,
    //                 ["lodging"]: destination.estimatedLodgingCostPerDay * duration,
    //                 ["flight"]: destination.estimatedFlightCostPerPerson * numTravelers,
    //             };
    //         objectArray.push(object)
    //         };
    //     });


    //     console.log(objectArray)

    //     objectArray.forEach(object => {

    //     })
    // };
    // findPastTrips(){
    //     let pastTrips = this.allTrips.filter(function(trip){
    //         let today = dayjs(new Date()).format("YYYY/MM/DD");
    //         if (dayjs(trip.date).format("YYYY/MM/DD") < today){
    //             return trip;
    //         };
    //     });
    //     this.pastTrips = pastTrips;
    //     let keys = this.getDestinationIDs(this.pastTrips);
    //     return keys
    // };
    // findFutureTrips(){
    //     let futureTrips = this.allTrips.filter(function(trip){
    //         let today = dayjs(new Date()).format("YYYY/MM/DD");
    //         if (dayjs(trip.date).format("YYYY/MM/DD") > today){
    //             return trip;
    //         };
    //     });
    //     this.futureTrips = futureTrips;
    //     let keys = this.getDestinationIDs(this.futureTrips);
    //     return keys
    // };
};

export default Traveler;