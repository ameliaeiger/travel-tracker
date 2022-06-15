const dayjs = require('dayjs');


class TripRepo {
    constructor(data){
        this.trips = data;
    }
    returnAllUserTrips(id){
        return this.trips.filter(trip => {
            return trip.userID == id
        });
    };
    getAnnualCost = (trips) => {
        let sum = trips.reduce((acc, trip) => {
          acc += trip.tripCost;
          return acc;
        }, 0);
        return Math.round((sum * 10) / 10);
      };
    getTripsThisYear(trips) {
        return trips.filter(trip => {
            if ((trip.category == "past") && (dayjs(trip.date) > dayjs("2022/01/01"))){
                return trip
            };
        });
    };
      
};

export default TripRepo;