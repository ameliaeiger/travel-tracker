import DestinationRepo from "./DestinationRepo";

class Traveler{
    constructor(id, trips) {
        this.id = id;
        this.allTrips = trips;
        this.destinationIDs = this.getDestinationIDs();



        // Stuff that I might want to add later
        // this.trips = trips;
        // this.annualSpent = 0;
    };
    calculateAnnualCost(destinationrepo){

    }
    getDestinationIDs() {
        return this.allTrips.map(destination => destination.destinationID);
    };
    getDestinationData(travelerDestinationObj){
        travelerDestinationObj.map(function(destination){
            let dataObj = {
                ["destination"]:destination.destination,
                ["image"]:destination.image,
                ["alt"]:destination.alt
            }
            console.log(dataObj);
            return dataObj;
        });
    };

};

export default Traveler;