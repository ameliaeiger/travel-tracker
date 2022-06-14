import Destination from "./Destination.js";

class DestinationRepo {
    constructor(data){
        this.destinations = data;
    };
    createNewDestination() {
        let destination = new Destination(destination.id, destination.estimatedLodgingCostPerDay, destination.estimatedFlightCostPerPerson, destination.image, destination.alt);
        return destination;
    };
    getDestById(arrayID){
        let destArray = [];
        this.destinations.forEach(function(destination){
            if (arrayID.includes(destination.id)){
                destArray.push(destination);
            };
        });
        return destArray;
    }
    getDestByName(cityName){
        let result = this.destinations.find(destination => destination.destination.includes(cityName));
        return result.id
    };
};

export default DestinationRepo;