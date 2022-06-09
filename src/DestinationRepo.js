import Destination from "./Destination.js";

class DestinationRepo {
    constructor(data){
        this.destinations = data;
    }
    createNewDestination() {
        let destination = new Destination(destination.id, destination.estimatedLodgingCostPerDay, destination.estimatedFlightCostPerPerson, destination.image, destination.alt);
        return destination
    }
}

export default DestinationRepo;