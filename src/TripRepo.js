class TripRepo {
    constructor(data){
        this.trips = data;
    }
    returnAllUserTrips(id){
        return this.trips.filter(trip => {
            return trip.userID === id
        })
    }
}

export default TripRepo;