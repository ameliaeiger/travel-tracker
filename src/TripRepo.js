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
    getAnnualCost = () => {
        return this.trips.reduce((acc, trip) => {
          acc += trip.tripCost;
          return acc;
        }, 0);
      };
    // getTripsThisYear() {

    //     console.log(this.trips)
    //     return this.trips.filter(trip => {
    //         if (trip.category == "past" && dayjs(trip.date) > dayjs().format("YYYY/MM/DD")){
    //             console.log(trip)
    //             return trip
    //         };
    //     });
    // };
      
};

export default TripRepo;