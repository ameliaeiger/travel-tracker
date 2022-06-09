class Destination {
    constructor(id, destination, lodgingCost, flightCost, image, alt) {
        this.id = id;
        this.destination = destination;
        this.estimatedLodgingCostPerDay= lodgingCost;
        this.estimatedFlightCostPerPerson= flightCost;
        this.image= image;
        this.alt= alt;
        }
}

export default Destination;